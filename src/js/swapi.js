import axios from "axios";
import { numberWithCommas, sortByProperty } from "./utils.js";

const swapiUrl = "https://swapi.dev/api";

const getSingleSwapiItem = (url) => {
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((res) => {
        const data = res.data;
        resolve(data);
      })
      .catch((err) => {
        console.error(err);
        reject;
      });
  });
};

const getSwapiPlanetPopulation = async (planetNames) => {
  if (!planetNames || planetNames.length == 0) {
    return null;
  }

  let planets = [];
  for (const planet of planetNames) {
    const url = `${swapiUrl}/planets/?search=${planet.name}`;
    const planetData = await getSwapiData({ url });
    if (planetData) {
      const { name, population } = planetData[0];
      planets.push({
        name,
        population: parseInt(population),
        color: planet.color,
      });
    }
  }
  if (planets.length == 0) {
    return null;
  }
  planets = sortByProperty(planets, "population");

  return planets;
};

const getSwapiData = async ({ url, payload = [], resolver = null }) => {
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((res) => {
        const data = res.data;
        const payloadData = [...payload, ...data.results];

        if (data.next) {
          getSwapiData({
            url: data.next,
            payload: payloadData,
            resolver: resolver || resolve,
          });
        } else {
          resolver && resolver(payloadData);
          resolve(payloadData);
        }
      })
      .catch((err) => {
        console.log(err);
        reject;
      });
  });
};

const getVehicles = async () => {
  let vehicles = await getSwapiData({ url: `${swapiUrl}/vehicles` });
  if (vehicles) {
    vehicles = vehicles.filter((item) => {
      if (item.pilots && item.pilots.length > 0) {
        return item;
      }
    });
  }
  if (vehicles.length == 0) {
    return null;
  }

  return vehicles;
};

const getPilots = async (pilots) => {
  let result = [];
  for (const pilot of pilots) {
    const data = await getSingleSwapiItem(pilot);
    result.push(data);
  }
  return result;
};

const getHomeworld = async (url) => {
  return await getSingleSwapiItem(url);
};

export default async function swapiData() {
  let vehicles = await getVehicles();
  if (!vehicles || vehicles.length == 0) {
    return false;
  }

  let resultTableData = [];

  //{vehicle.name}
  //[{planet.name}, {population}]
  //[{pilot.name}]

  for (const vehicle of vehicles) {
    const obj = {
      vehicleName: vehicle.name,
      pilots: [],
      planets: [],
      totalPopulation: 0,
    };

    if (vehicle.pilots && vehicle.pilots.length > 0) {
      vehicle.pilots = await getPilots(vehicle.pilots);

      for (const pilot of vehicle.pilots) {
        obj.pilots.push({ name: pilot.name });
        pilot.homeworld = await getHomeworld(pilot.homeworld);

        const { name, population } = pilot.homeworld;
        if (population !== "unknown") {
          obj.totalPopulation += parseInt(population);
        }
        obj.planets.push({ name, population });
      }
    }
    resultTableData.push(obj);
  }

  if (resultTableData.length == 0) {
    return null;
  }

  resultTableData = sortByProperty(resultTableData, "totalPopulation");

  resultTableData.forEach((vehicle) => {
    vehicle.totalPopulation =
      vehicle.totalPopulation == 0
        ? "unknown"
        : numberWithCommas(vehicle.totalPopulation);
  });

  return resultTableData;
}

// const flatten = (arr) => {
//   return arr.reduce((flat, toFlatten) => {
//     return flat.concat(
//       Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten
//     );
//   }, []);
// };

export { getSwapiPlanetPopulation, swapiData };
