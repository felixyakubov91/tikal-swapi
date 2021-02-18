<template>
  <section class="padding-20">
    <table class="container" v-if="vehicles && vehicles.length > 0">
      <thead>
        <tr>
          <th v-for="header in headers" :key="header">{{ header }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(vehicle, index) in vehicles" :key="index">
          <td>{{ vehicle.vehicleName }}</td>
          <td>
            <div class="column">
              <div
                v-for="(planet, planetIndex) in vehicle.planets"
                :key="planetIndex"
              >
                {{ planet.name }}
              </div>
            </div>
          </td>
          <td>{{ vehicle.totalPopulation }}</td>
          <td>
            <div class="column">
              <p
                v-for="(pilot, pilotIndex) in vehicle.pilots"
                :key="pilotIndex"
              >
                {{ pilot.name }}
              </p>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
export default {
  name: "SwapiTable",
  data() {
    return {
      headers: ["Vehicle Name", "Planet", "Total Population", "Pilot"],
    };
  },
  props: {
    vehicles: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.column {
  display: flex;
  flex-direction: column;
}
.padding-20 {
  padding: 20px;
}
.container th {
  font-weight: bold;
  text-align: left;
  color: white;
}
.container th:first-child {
  min-width: 300px;
}

.container td {
  font-weight: normal;
  font-size: 1em;
  box-shadow: 0 2px 2px -2px #0e1119;
}

.container {
  text-align: left;
  overflow: hidden;
  width: 80%;
  margin: 0 auto;
  display: table;
}

.container td,
.container th {
  padding: 1em;
}

/* Background-color of the odd rows */
.container tr:nth-child(odd) {
  background-color: #323c50;
}

/* Background-color of the even rows */
.container tr:nth-child(even) {
  background-color: #2c3446;
}

.container th {
  background-color: #1f2739;
}

.container td:hover {
  background-color: #ff6;
  color: #222;
  transition: all 0.2s ease-in;
}
</style>