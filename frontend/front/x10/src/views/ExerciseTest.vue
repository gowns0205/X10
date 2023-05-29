<template>
  <div id="container">
    <div>{{ idx + 1 }} / 12</div>
    <div id="imgContainer">
      <img :src="questions[idx].imgSrc" alt="" />
    </div>
    <div id="question">{{ questions[idx].question }}</div>
    <input
      style="display: none"
      value="-1"
      v-model="selected[idx]"
      id="unselected"
      name="ans"
      type="radio"
    />
    <div class="choice">
      <div>
        <input
          value="0"
          v-model="selected[idx]"
          id="one"
          name="ans"
          type="radio"
        />
        <label for="one">{{ questions[idx].choices[0].text }}</label>
      </div>
    </div>
    <div class="choice">
      <div>
        <input
          value="1"
          v-model="selected[idx]"
          id="two"
          name="ans"
          type="radio"
        />
        <label for="two">{{ questions[idx].choices[1].text }}</label>
      </div>
    </div>
    <div id="qMove">
      <div>
        <button id="prev" style="display: none" @click="prev">이전 질문</button>
      </div>
      <button id="submit" style="display: none" @click="cal">
        검사 결과 보기
      </button>
      <div><button id="next" @click="next">다음 질문</button></div>
    </div>
    <div class="progressBar">
      <div class="progress"></div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      idx: 0,
      selected: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
      // selected:[1,0,1,1,1,0,0,1,1,0,0,1],
      // ans:[[],[],[],[],[],[],[],[],[],[],[],[]],
      sports: [
        "테니스",
        "실내 클라이밍",
        "수영",
        "주짓수",
        "필라테스",
        "헬스",
        "킥복싱",
        "등산",
        "GX",
        "러닝",
        "축구",
        "홈트",
      ],
      questions: [
        {
          question: "자네는 남자인가? 아니면 여자인가?",
          choices: [
            { text: "상남자", benefit: [5, 6, 1, 7, 10, 3] },
            { text: "상여자", benefit: [4, 11, 2, 8, 9] },
          ],
          //이 질문에서 점수 받는 애들의 인덱스,
          imgSrc:
            "https://mblogthumb-phinf.pstatic.net/MjAyMDA3MjBfMjgg/MDAxNTk1MjQ5NDc2NTcw.EmCnNUifH39RCMF_Jk16TwBiD8P4xBf1J0gTW76y2lgg.wrTxsce8p-MpEqA1beeTiRLDvTFNzcioyDA4q2fs_DQg.PNG.thswnstjd789/%EC%BA%A1%EC%B2%98_2020_07_20_21_30_56_944.png?type=w800",
        },
        {
          question: "자네는 운동이 처음인가?",
          choices: [
            { text: "네 (❁´◡`❁)", benefit: [2, 8, 9] },
            { text: "아니오 ᕦ(ò_óˇ)ᕤ", benefit: [0, 1, 3] },
          ],
          imgSrc: "/img/q2.jpg",
        },
        {
          question: "자네에게 더 필요한 것은?",
          choices: [
            { text: "근육 만들기", benefit: [5] },
            { text: "체형 교정", benefit: [4] },
          ],
          imgSrc:
            "https://i.namu.wiki/i/oukb0OZj3b-xAoQET0yKbEA2gToMLAarV0vekEQHEiW9CwYeXJDXIMIU_0jHibQIPYlnN-unUwndc2kOabFawTDV9TbkFjKAcA4tXJhwAriGngPKa_H_QImV6sNsz-c7GjCOx7RHbcd54Nug5iswVw.webp",
        },
        {
          question: "자네는 어느 때 운동하는 걸 선호하는가?",
          choices: [
            { text: "평일", benefit: [5, 4, 6, 2, 3, 8, 9] },
            { text: "주말", benefit: [0, 1, 7, 10] },
          ],
          imgSrc:
            "https://opgg-com-image.akamaized.net/attach/images/20210411140034.1654171.jpg",
        },
        {
          question: "어디서 운동하고 싶은가?",
          choices: [
            { text: "실내", benefit: [5, 4, 11, 6, 1, 2, 3, 8] },
            { text: "야외", benefit: [7, 10, 9] },
          ],
          imgSrc:
            "https://san.chosun.com/news/photo/202107/14996_62752_3628.jpg",
        },
        {
          question: "땀 흘리는 운동을 선호하는가?",
          choices: [
            { text: "예", benefit: [5, 0, 6, 7, 10, 3, 8, 9] },
            { text: "아니오", benefit: [4, 1, 2] },
          ],
          imgSrc: "https://img2.ruliweb.com/img/img_link7/50/49515_3.jpg",
        },
        {
          question: "단시간에 효과적인 체중 감량을 필요로 하는가?",
          choices: [
            { text: "예", benefit: [5, 0, 11, 6, 2, 10, 8, 9] },
            { text: "아니오", benefit: [4, 1, 7] },
          ],
          imgSrc:
            "https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/201311/01/htm_201311011834240104011.jpg",
        },
        {
          question: "솔직히...운동하는 모습 인스타에 올리고 싶지?",
          choices: [
            { text: "예", benefit: [5, 4, 0, 1, 9] },
            { text: "아니오", benefit: [11, 6, 2] },
          ],
          imgSrc:
            "https://www.pathsocial.com/wp-content/uploads/2023/03/ag.webp",
        },
        {
          question: "다같이 하는 운동을 선호하는가?",
          choices: [
            { text: "예", benefit: [6, 1, 7, 10, 3, 8] },
            { text: "아니오", benefit: [5, 11, 9, 2] },
          ],
          imgSrc:
            "https://thumb.zumst.com/400x250/https://static.news.zumst.com/images/96/2017/08/03/cb19d896cf834bf9870187d95f63a072.jpg",
        },
        {
          question: "운동에 어느 정도의 비용을 투자할 수 있는가?",
          choices: [
            { text: "한 달에 10만원 미만", benefit: [11, 2, 9] },
            { text: "그 이상도 상관없다", benefit: [4, 0, 1, 7] },
          ],
          imgSrc: "https://r2.jjalbot.com/2023/03/a8NABqncKX.jpeg",
        },
        {
          question: "상대와 승부를 내는 운동이 좋다",
          choices: [
            { text: "예", benefit: [0, 6, 10, 3] },
            { text: "아니오", benefit: [5, 4, 11, 7, 8, 9] },
          ],
          imgSrc:
            "https://mblogthumb-phinf.pstatic.net/MjAxNzEyMjVfNTkg/MDAxNTE0MTc3ODUxMDQy.sqhGAW4wPI3fCwuEAJun3wD1osJta0XppHW2qNAFBQYg.UG0CTVC7_YoeUuT12cFSker4x3g1DEYek58aHgJYUtog.GIF.ysca5837/p24.gif?type=w800",
        },
        {
          question: "한 시간 이내의 운동을 원한다",
          choices: [
            { text: "예", benefit: [5, 4, 11, 7, 8, 9] },
            { text: "더 길어도 된다", benefit: [0, 6, 1, 7, 10, 3] },
          ],
          imgSrc:
            "https://i.pinimg.com/originals/e8/02/a0/e802a0d5ac1839d9f84c5fc82e9fd00c.jpg",
        },
      ],
      pp: 100 / 12,
    };
  },
  methods: {
    cal() {
      if (this.selected[this.idx] === -1) {
        alert("문항을 선택해주세요.");
        return;
      }
      let score = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      for (var i = 0; i < 12; i++) {
        console.log(this.questions[i].choices[this.selected[i]].benefit);
        for (let value of this.questions[i].choices[this.selected[i]].benefit) {
          score[value] += 1;
        }
      }
      console.log("점수: ", score);
      var result = score.indexOf(Math.max(...score));
      console.log(result);
      // const _this = this;
      //검사 결과 저장
      if (sessionStorage.getItem("loginUser")) {
        axios({
          url: `http://localhost:9999/api/xten/testresults/${sessionStorage.getItem(
            "loginUser"
          )}/${result + 1}`,
          method: "POST",
        });
      }
      this.$router.push(`/exercise-test/${result + 1}`);
      return;
    },
    next() {
      if (this.selected[this.idx] === -1) {
        alert("문항을 선택해주세요.");
        return;
      }
      this.idx += 1;
      if (this.idx > 0) {
        document.querySelector("#prev").style.display = "block";
      }
      if (this.idx == 11) {
        document.querySelector("#next").style.display = "none";
        console.log(this.idx);
        document.querySelector("#submit").style.display = "block";
      } else {
        document.querySelector("#submit").style.display = "none";
      }
      this.pp += 100 / 12;
      document.querySelector(".progress").style.width = this.pp + "%";
      document.querySelector(
        ".progress"
      ).style.transition = `width 0.5s linear`;
    },
    prev() {
      this.idx -= 1;
      if (this.idx === 0) {
        document.querySelector("#prev").style.display = "none";
      } else {
        document.querySelector("#prev").style.display = "block";
      }
      document.querySelector("#submit").style.display = "none";
      document.querySelector("#next").style.display = "block";
      this.pp -= 100 / 12;
      document.querySelector(".progress").style.width = this.pp + "%";
      document.querySelector(
        ".progress"
      ).style.transition = `width 0.5s linear`;
    },
  },
};
</script>
<style scoped>
#container {
  padding-top: 100px;
  padding-bottom: 30px;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
#wrapper {
  border-radius: 20px;
  width: 60%;
  padding: 20px;
  height: 100%;
  /* border: 2px solid blue; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* background-color: #e2e2e2; */
}

#imgContainer img {
  height: 220px;
}
#question {
  font-size: 24px;
  margin-top: 10px;
  margin-bottom: 10px;
}
.choice {
  transition: 0.1s linear;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 600px;
  height: 70px;
  background-color: #ffccbc;
  margin-bottom: 10px;
  border-radius: 20px;
}
.choice:hover {
  /* background-color:#ffdabf;
   */
  box-shadow: 3px 3px 3px 3px #ced4da;
}
.progressBar {
  border-radius: 50px;
  width: 600px;
  height: 18px;
  /* background-color: #fffafa; */
  background-color: #e2e2e2;
  font-weight: 600;
  font-size: 0.8rem;
}

.progressBar .progress {
  border-radius: inherit;
  width: 8.333%;
  height: 18px;
  padding: 0;
  text-align: center;
  background-color: #e76161;
  color: #111;
}
#qMove {
  display: flex;
  width: 500px;
  justify-content: space-between;
  margin-bottom: 10px;
}
#qMove button {
  border: none;
}
</style>
