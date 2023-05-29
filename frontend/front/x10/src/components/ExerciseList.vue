<template>
  <div>
    <div id="container">
      <div
        v-for="(sports, index) in results"
        :key="index + 1"
        class="imgContainer"
      >
        <router-link :to="`/exercise/${index + 1}`">
          <img :src="sports.imgSrc" alt="" />
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["results"]),
  },
};
</script>

<style scoped>
#container {
  /* height:max-content; */
  min-height: 90vh;
  padding-top: 100px;
  padding-left: 100px;
  padding-right: 100px;
  display: flex;
  flex-wrap: wrap;
  /* justify-content: center; */
}
.imgContainer {
  margin: 10px;
  /* border:2px solid blue; */
  width: 300px;
  height: 180px;
  overflow: hidden;
}
.imgContainer img {
  height: 200px;
  transition: all 0.2s linear;
}
.imgContainer:hover img {
  transform: scale(1.3);
}
</style>
