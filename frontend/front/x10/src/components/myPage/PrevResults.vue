<template>
  <div id="myView">
    <h3>검사 결과 보기</h3>
    <!-- <div style="width: 100%" class="table">
      <div>종목</div>
      <div>날짜</div>
    </div> -->
    <div v-if="testResults" style="display: flex; width: 100%; flex-wrap: wrap">
      <div v-for="(t, i) in testResults" :key="i" class="testResult">
        <router-link :to="`/exercise-test/${t.exerciseSeq}`">
          <div>{{ results[t.exerciseSeq - 1].name }}</div>
          <div>{{ t.testDate }}</div>
          <div>
            <button @click.stop.prevent="deleteResult(t.testResultSeq)">
              <img src="/img/trash.png" alt="" />
            </button>
          </div>
        </router-link>
      </div>
    </div>
    <div v-else>검사 결과가 없습니다.</div>
  </div>
</template>
<script>
import axios from "axios";
import { mapState } from "vuex";
export default {
  data() {
    return {
      testResults: [],
    };
  },
  updated() {
    const _this = this;
    axios({
      url: `http://localhost:9999/api/xten/testresults/${sessionStorage.getItem(
        "loginUser"
      )}`,
      method: "GET",
    }).then((res) => {
      _this.testResults = res.data;
    });
  },
  created() {
    const _this = this;
    axios({
      url: `http://localhost:9999/api/xten/testresults/${sessionStorage.getItem(
        "loginUser"
      )}`,
      method: "GET",
    }).then((res) => {
      _this.testResults = res.data;
    });
  },
  computed: {
    ...mapState(["results"]),
  },
  methods: {
    deleteResult(seq) {
      const _this = this;
      axios({
        url: `http://localhost:9999/api/xten/testresults/${sessionStorage.getItem(
          "loginUser"
        )}/${seq}`,
        method: "DELETE",
      })
        .then(() => {
          for (let i = 0; i < _this.testResults.length; i++) {
            if (seq == _this.testResults[i].testResultSeq) {
              _this.testResults.splice(i, 1);
              break;
            }
          }
          alert("삭제되었습니다.");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style scoped>
#myView {
  display: flex;
  align-items: center;
  height: 100%;
  width: 80%;
  flex-direction: column;
}
.table {
  display: flex;
}
.table div:nth-child(1) {
  flex-grow: 8;
}
.table div:nth-child(2) {
  flex-grow: 7;
}
a,
a:focus,
a:hover {
  text-decoration: none;
  color: black;
}
.testResult {
  border-radius: 10px;
  margin: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  width: 160px;
  background-color: #f1f3f5;
  transition: all 0.2s linear;
}
.testResult:hover {
  transform: scale(1.1);
  box-shadow: 3px 3px 3px 3px #ced4da;
}
.testResult div:nth-child(1) {
  font-size: 20px;
  flex-grow: 9;
} /* 
.testResult div:nth-child(2) {
  flex-grow: 2;
}
.testResult div:nth-child(3) {
  flex-grow: 2;
} */
.testResult button {
  border: none;
  background: transparent;
  width: 28px;
  height: 28px;
}
.testResult button img {
  width: 28px;
  height: 28px;
}
.imgContainer {
  width: 28px;
  height: 28px;
  overflow: hidden;
}
.imgContainer img {
  height: 28px;
}
</style>
