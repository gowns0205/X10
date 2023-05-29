<template>
  <div id="container">
    <div class="imgContainer">
      <img :src="results[id].imgSrc" alt="" />
    </div>
    <div class="abstract">
      <div>
        <div>
          <h3>{{ results[id].name }}</h3>
        </div>
        <div>{{ results[id].abstract }}</div>
      </div>
      <div>
        <button id="like" @click="like">
          <img v-if="isLiked" src="/img/like.png" alt="" />
          <img v-else src="/img/dislike.png" alt="" />
        </button>
      </div>
    </div>
    <div id="menu">
      <div @click="select(1)" style="border-bottom: 2px solid white">
        운동 소개
      </div>
      <div @click="select(2)">영상 보기</div>
    </div>
    <div id="introduction">
      <h2>운동 소개</h2>
      <p style="text-align: left">{{ results[id].explanation }}</p>
    </div>
    <div id="showVideos">
      <h2>영상 보기</h2>
      <div>
        <ul class="youtube-list">
          <li
            v-for="(video, index) in videos"
            :key="video.id.videoId"
            @click="show(index)"
          >
            <img
              class="thumbnails"
              :src="`https://img.youtube.com/vi/${video.id.videoId}/mqdefault.jpg`"
            />
            <div class="videoTitle">{{ video.snippet.title }}</div>
          </li>
        </ul>
      </div>
      <button @click="clickTop" id="moveToTop">
        <img src="/img/top.png" alt="" />
      </button>
    </div>
    <b-modal
      size="lg"
      id="bv-modal-example"
      hide-footer
      ref="modal"
      :title="temp.snippet.title"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label-for="name-input"
          invalid-feedback="Name is required"
        >
          <div class="videoContainer">
            <iframe
              width="600"
              height="360"
              :src="tempSrc"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </div>
          <div style="display: flex; justify-content: space-between">
            <b-button
              class="mt-3"
              block
              @click="$bvModal.hide('bv-modal-example')"
              >닫기</b-button
            >
            <button id="videoLike" @click="videoLike">
              <img v-if="tempLike" src="/img/like.png" alt="" />
              <img v-else src="/img/dislike.png" alt="" />
            </button>
          </div>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>
<script>
import { mapState } from "vuex";
import axios from "axios";
export default {
  computed: { ...mapState(["results"]) },
  data() {
    return {
      tempSrc: "",
      tempLike: false,
      temp: {
        id: {
          videoId: "",
        },
        snippet: {
          title: "",
        },
      },
      videos: [],
      id: 0,
      // exercise: "수영",
      // content: "어이 허성백이 수영 좀 치나??",
      isLiked: false,
    };
  },
  created() {
    const API_KEY = process.env.VUE_APP_YOUTUBE_API_KEY;
    const _this = this;
    const pathName = new URL(document.location).pathname.split("/");
    this.id = pathName[pathName.length - 1] - 1;
    axios({
      url: "https://www.googleapis.com/youtube/v3/search",
      method: "GET",
      params: {
        key: API_KEY,
        part: "snippet",
        q: `${_this.results[pathName[pathName.length - 1] - 1].name} 배우기`,
        type: "video",
        maxResults: 10,
      },
    })
      // .then((res) => {
      //   console.log(res.data.items);
      // })
      .then((res) => {
        // console.log(res);
        _this.videos = res.data.items;
      })
      .catch((err) => console.log(err));

    axios({
      url: `http://localhost:9999/api/xten/favoriteexercises/${sessionStorage.getItem(
        "loginUser"
      )}`,
      method: "GET",
    }).then((res) => {
      for (let i = 0; i < res.data.length; i++) {
        if (res.data[i].exerciseSeq === _this.id) {
          _this.isLiked = true;
          break;
        }
      }
    });
  },
  methods: {
    videoLike() {
      const _this = this;
      var data2 = new FormData();
      data2.append("userSeq", sessionStorage.getItem("loginUser"));
      data2.append("videoUrl", this.tempSrc);
      if (this.tempLike) {
        axios({
          url: `http://localhost:9999/api/xten/favoritevideos`,
          method: "DELETE",
          data: {
            userSeq: sessionStorage.getItem("loginUser"),
            videoUrl: _this.temp.id.videoId,
            videoTitle: "",
          },
        }).then(() => {
          // for (let i = 0; i < _this.videos.length; i++) {
          //   if (_this.temp.id.videoId == _this.videos[i].videoUrl) {
          //     _this.videos.splice(i, 1);
          //     break;
          //   }
          // }
          _this.tempLike = false;
          alert("찜에서 삭제되었습니다.");
        });
      } else {
        var data = new FormData();
        data.append("userSeq", sessionStorage.getItem("loginUser"));
        data.append("videoUrl", this.tempSrc);
        data.append("videoTitle", this.temp.snippet.title);
        axios({
          url: `http://localhost:9999/api/xten/favoritevideos/`,
          method: "POST",
          data: data,
          contentType: "multipart/form-data",
        })
          .then(() => {
            _this.tempLike = true;
            alert("찜한 영상에 등록되었습니다.");
          })
          .catch((err) => console.log(err));
      }
    },
    show(index) {
      const _this = this;
      this.temp = this.videos[index];
      this.tempSrc = `https://youtube.com/embed/${this.temp.id.videoId}`;
      //내가 얘를 찜했나 봐야 됨
      axios({
        url: `http://localhost:9999/api/xten/favoritevideos/${sessionStorage.getItem(
          "loginUser"
        )}`,
        method: "GET",
      }).then((res) => {
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].videoUrl === _this.tempSrc) {
            _this.tempLike = true;
            break;
          }
        }
      });
      this.openModal();
    },
    openModal() {
      this.$refs.modal.show();
    },
    clickTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    like() {
      const _this = this;
      if (!this.isLiked) {
        axios({
          url: `http://localhost:9999/api/xten/favoriteexercises/${sessionStorage.getItem(
            "loginUser"
          )}/${_this.id + 1}`,
          method: "POST",
        }).then(() => {
          alert("찜한 운동에 추가되었습니다.");
          _this.isLiked = true;
        });
      } else {
        axios({
          url: `http://localhost:9999/api/xten/favoriteexercises/${sessionStorage.getItem(
            "loginUser"
          )}/${_this.id + 1}`,
          method: "DELETE",
        }).then(() => {
          alert("찜한 운동에서 삭제되었습니다.");
          _this.isLiked = false;
        });
        return;
      }
    },
    select(index) {
      let arr = document.querySelectorAll("#menu *");
      for (var i = 0; i < arr.length; i++) {
        arr.item(i).style.borderBottom = "";
      }
      document.querySelector(
        `#menu>div:nth-child(${index})`
      ).style.borderBottom = "2px solid black";
      var location;
      if (index === 1) {
        location = document.querySelector("#introduction").offsetTop - 100;
      } else {
        location = document.querySelector("#showVideos").offsetTop - 100;
      }
      window.scrollTo({ top: location, behavior: "smooth" });
    },
  },
  // created() {
  //   window.scrollTo({ top: 0, behavior: "auto" });
  // },
  mounted() {
    let arr = document.querySelectorAll("#menu *");
    for (var i = 0; i < arr.length; i++) {
      arr.item(i).style.borderBottom = "";
    }
    document.querySelector("#menu>div:nth-child(1)").style.borderBottom =
      "2px solid black";
  },
};
</script>
<style scoped>
.videoContainer {
  width: 100%;
  display: flex;
  justify-content: center;
}
.modal {
  width: 700px;
  /* --bs-modal-width: 800px; */
}
#videoLike {
  background-color: transparent;
  border: none;
}
#videoLike img {
  width: 36px;
}
#container {
  padding-left: 120px;
  padding-right: 120px;
  /* border: 2px solid pink; */
  height: max-content;
  min-height: 90vw;
  padding-top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.imgContainer {
  width: 600px;
}
.imgContainer img {
  width: 600px;
}
.abstract {
  width: 550px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.abstract img {
  width: 40px;
}
.abstract div div {
  text-align: left;
}
#menu {
  width: 800px;
  display: flex;
}
#menu > div {
  font-size: 22px;
  width: 120px;
  margin-bottom: 6px;
  text-align: center;
}
#introduction {
  padding-bottom: 200px;
  padding-left: 100px;
  padding-right: 100px;
}
#showVideos {
  width: 100%;
  padding-bottom: 200px;
}
#like {
  background-color: transparent;
  border: none;
}
#moveToTop {
  background-color: transparent;
  border: none;
}
#moveToTop img {
  position: fixed;
  bottom: 150px;
  right: 100px;
  width: 50px;
}
.youtube-list {
  display: flex;
  list-style: none;
  flex-wrap: wrap;
  justify-content: center;
}
.youtube-list li {
  margin: 10px;
  flex-wrap: wrap;
}
.thumbnails {
  width: 260px;
  transition: 0.1s linear;
}
.thumbnails:hover {
  transform: scale(1.1);
}
.videoTitle {
  width: 260px;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
  overflow: hidden;
}
#introduction p {
  line-height: 200%;
  font-size: 18px;
}
</style>
