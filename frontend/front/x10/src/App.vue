<template>
  <div id="app">
    <home-view-banner></home-view-banner>
    <router-view></router-view>
    <footer>
      <div style="display: flex">
        <img src="/img/github-mark.png" alt="" />
        <div id="contact">
          <div><a href="https://github.com/melonpanna">최고 김정현</a></div>
          <div><a href="https://github.com/haegod">최저 이해준</a></div>
        </div>
      </div>
      <div>🧘‍♂️ A SOUND MIND IN A SOUND BODY 🏃‍♂️</div>
      <div>X10</div>
    </footer>
  </div>
</template>

<script>
import HomeViewBanner from "@/components/HomeViewBanner.vue";

export default {
  name: "App",
  components: { HomeViewBanner },
};
</script>

<style scoped>
@import url(//fonts.googleapis.com/earlyaccess/notosanskr.css);

#app {
  font-family: "Noto Sans KR", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

footer {
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 100px;
  background-color: #e2e2e2;
  /* background-color:#808685; */
}
footer div img {
  width: 2vw;
  height: 2vw;
}
#contact {
  padding-left: 1vw;
}
#contact a {
  text-decoration: none;
  color: black;
}
</style>
