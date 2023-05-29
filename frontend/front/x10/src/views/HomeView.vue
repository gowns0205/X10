<template>
  <div class="home">
    <div id="container">
      <b-carousel
        id="carousel-1"
        :interval="4000"
        fade
        controls
        indicators
        label-next
        label-prev
        background="#000000"
        style="text-shadow: 1px 1px 2px #333"
        img-width="1000"
        img-height="500"
      >
        <!-- Text slides with image -->
        <b-carousel-slide
          text="당신의 마음을 정조준!나와 맞는 운동을 찾는 것으로부터 시작"
          class="slide"
          img-src="/img/archery.jpg"
        >
          <b-button pill id="testButton">
            <a href="/exercise-test">테스트하러 가기!</a>
          </b-button>
        </b-carousel-slide>
        <b-carousel-slide
          img-src="https://img.sbs.co.kr/newimg/news/20220108/201626285_1280.jpg"
          class="slide"
        >
        </b-carousel-slide>

        <b-carousel-slide
          img-src="https://cdn.iusm.co.kr/news/photo/202303/1011447_560431_404.jpg"
          class="slide"
        ></b-carousel-slide>

        <b-carousel-slide class="slide">
          <template #img>
            <img
              class="d-block img-fluid w-100"
              src="https://img.sbs.co.kr/newimg/news/20220318/201647884_1280.jpg"
              alt="image slot"
            />
          </template>
        </b-carousel-slide>
      </b-carousel>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "HomeView",
  components: {},
};
</script>
<style scoped>
.home {
  display: flex;
  justify-content: center;
}
#container {
  padding-top: 100px;
  height: 90vh;
  display: flex;
  align-items: center;
  padding-bottom: 60px;
  width: 1000px;
  overflow: hidden;
  /* height: 300px; */
}
#testButton {
  border: none;
  color: black;
  background-color: #e2e2e2;
}
.slide {
  width: 1000px;
  height: 600px;
  opacity: 0.95;
  height: 500px;
  overflow: hidden;
}
#testButton a,
a:hover {
  text-decoration: none;
  color: black;
}
</style>
