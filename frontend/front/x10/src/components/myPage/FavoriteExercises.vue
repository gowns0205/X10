<template>
  <div id="myView">
    <h3>찜한 운동</h3>
    <div id="subContainer">
      <div v-if="exercises" style="display: flex">
        <div
          v-for="(sports, index) in exercises"
          :key="index + 1"
          class="imgContainer"
        >
          <router-link :to="`/exercise/${sports.exerciseSeq}`">
            <img :src="results[sports.exerciseSeq - 1].imgSrc" alt="" />
            <div class="caption">
              <button @click.prevent.stop="unlike(sports.exerciseSeq)">
                <img src="/img/cancel.png" alt="" />
              </button>
            </div>
          </router-link>
        </div>
      </div>
      <div v-else>찜한 운동이 없습니다.</div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { mapState } from "vuex";
export default {
  computed: { ...mapState(["results"]) },
  created() {
    const _this = this;
    axios({
      url: `http://localhost:9999/api/xten/favoriteexercises/${sessionStorage.getItem(
        "loginUser"
      )}`,
      method: "GET",
    }).then((res) => {
      _this.exercises = res.data;
    });
  },
  data() {
    return {
      exercises: [],
    };
  },
  updated() {
    const _this = this;
    axios({
      url: `http://localhost:9999/api/xten/favoriteexercises/${sessionStorage.getItem(
        "loginUser"
      )}`,
      method: "GET",
    }).then((res) => {
      _this.exercises = res.data;
    });
  },
  methods: {
    unlike(id) {
      const _this = this;
      axios({
        url: `http://localhost:9999/api/xten/favoriteexercises/${sessionStorage.getItem(
          "loginUser"
        )}/${id}`,
        method: "DELETE",
      }).then(() => {
        alert("찜에서 삭제되었습니다.");
        for (let i = 0; i < _this.exercises.length; i++) {
          if (id == _this.exercises[i].exerciseSeq) {
            _this.exercises.splice(i, 1);
            break;
          }
        }
      });
      // this.$router.push("/mypage/favorite-exercises");
    },
  },
};
</script>

<style scoped>
.caption {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  position: absolute;
  top: 0;
  left: 0;
  color: #fff;
  padding: 20px;
  box-sizing: border-box;
  opacity: 0;
  transition: 0.5s;
}
.caption button {
  position: absolute;
  bottom: 14px;
  left: 100px;
  border: none;
  background: transparent;
  width: 28px;
  height: 28px;
}
.caption button img {
  position: absolute;
  width: 28px;
  height: 28px;
}

#myView {
  height: 100%;
  width: 80%;
  display: flex;
  flex-direction: column;
}
#subContainer {
  flex: 1;
}
.imgContainer {
  margin: 5px;
  text-align: center;
  width: 240px;
  height: 160px;
  overflow: hidden;
  position: relative;
}

.imgContainer img {
  top: 0;
  left: 0;
  position: absolute;
  height: 180px;
  transition: all 0.2s linear;
}
.imgContainer:hover img {
  transform: scale(1.3);
}
.imgContainer:hover .caption {
  opacity: 1;
}
</style>
