<template>
  <section class="yellow">
    <div>
      <p>Star Wars</p>
      <button @click="onGetData" class="api-button">Get data from swapi</button>
      <swapi-table :vehicles="vehicles" />

      <swapi-bar-chart :planets="planets" />
    </div>
  </section>
</template>

<script>
import { swapiData, getSwapiPlanetPopulation } from "./js/swapi";
import SwapiTable from "./components/SwapiTable";
import SwapiBarChart from "./components/SwapiBarChart";

export default {
  name: "App",
  data() {
    return {
      vehicles: [],
      planets: [],
      planetNames: [
        { name: "Tatooine", color: "#FB6311" },
        { name: "Alderaan", color: "#546A7B" },
        { name: "Naboo", color: "#9FB798" },
        { name: "Bespin", color: "#ddb892" },
        { name: "Endor", color: "#81b29a" },
      ],
    };
  },
  components: {
    SwapiTable,
    SwapiBarChart,
  },
  methods: {
    async onGetData() {
      this.vehicles = await swapiData();
    },
    async getPlanetPopulation() {
      const planets = await getSwapiPlanetPopulation(this.planetNames);
      const maxPercent = planets[0].population;
      planets.map((planet) => {
        planet.percent = Math.ceil((planet.population / maxPercent) * 100);
        if (planet.percent < 5) {
          planet.percent = 5;
        }
      });

      this.planets = planets;
    },
  },
  mounted() {
    this.getPlanetPopulation();
  },
};
</script>

<style>
p {
  margin: 0;
}
body,
html {
  font-family: "Droid Sans", arial, verdana, sans-serif;
  font-weight: 700;
}
html {
  background: #000 url(//cssanimation.rocks/demo/starwars/images/bg.jpg);
}
.yellow {
  color: #ff6;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.api-button {
  background: #fff;
  padding: 10px 20px;
  color: black;
  font-size: 1.2em;
}
* {
  box-sizing: border-box;
}
</style>
