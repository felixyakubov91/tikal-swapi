<template>
  <section v-if="planets && planets.length > 0" class="container rotate">
    <!-- :data-percent="`${planet.percent}%`" -->
    <div v-for="planet in planets" :key="planet" class="skillbar">
      <div class="skillbar-title" :style="{ background: planet.color }">
        <span>{{ planet.name }}</span>
      </div>
      <div
        class="skillbar-bar"
        :style="{ background: planet.color, width: planet.percent + '%' }"
      ></div>
      <div class="skill-bar-percent">{{ planet.population }}</div>
    </div>
  </section>
</template>

<script>
export default {
  name: "SwapiBarChart",
  props: {
    planets: {
      type: Array,
      required: true,
    },
  },
  //   watch: {
  //     planets(newVal) {
  //       if (newVal && newVal.length > 0) {
  //         this.setSkillbar();
  //       }
  //     },
  //   },
  //   methods: {
  //     setSkillbar() {
  //       const skillbars = document.querySelectorAll(".skillbar");
  //       skillbars.forEach((skillbar) => {
  //         const bar = skillbar.querySelector(".skillbar-bar");
  //         bar.style.width = skillbar.getAttribute("data-percent");
  //       });
  //     },
  //   },
};
</script>

<style scoped>
.container {
  transform: rotate(-90deg);
  max-width: 300px;
  margin: 0 auto;
}

.skillbar {
  position: relative;
  display: block;
  margin-bottom: 15px;
  width: 400px;
  height: 120px;
  border-radius: 3px;
}

.skillbar-title {
  position: absolute;
  top: 40px;
  left: -40px;
  width: 100px;
  font-weight: bold;
  font-size: 13px;
  color: #ffffff;
  background: #6adcfa;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
  transform: rotate(90deg);
}

.skillbar-title span {
  display: block;
  height: 20px;
  line-height: 20px;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
}

.skillbar-bar {
  height: 100px;
  width: 0px;
  background: #6adcfa;
  border-radius: 3px;
}

.skill-bar-percent {
  /* transform: rotate(90deg); */
  position: absolute;
  right: 0;
  top: 40px;
  font-size: 11px;
  /* height: 35px; */
  line-height: 20px;
  color: #ffffff;
}
</style>