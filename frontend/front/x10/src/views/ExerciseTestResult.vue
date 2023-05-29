<template>
  <div id="container">
    <div id="result">
      <div>
        <span>당신과 어울리는 운동은...</span><br />
        <h2>{{ results[id].name }}</h2>
      </div>
      <div id="imgContainer">
        <img :src="results[id].imgSrc" alt="사진" />
      </div>
      <div style="text-align: left; padding-bottom: 100px">
        {{ results[id].explanation }}
      </div>
      <div v-if="results[id].similar.length > 0" style="margin-bottom: 100px">
        <h3>비슷한 운동들</h3>
        <div>
          <div v-for="(elem, i) in results[id].similar" :key="i">
            {{ elem }}
          </div>
        </div>
      </div>
      <!-- 영상 검색으로 따오기 -->
      <div><h3>이런 영상은 어때요?</h3></div>
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
      <div>
        <!-- 이것도 db에서 -->
        <!-- <div><h5>당신의 유형은 전체 유형 중 ~%</h5></div> -->
      </div>
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
            <button id="like" @click="like">
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
import axios from "axios";
import { mapState } from "vuex";
export default {
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
    };
  },
  computed: {
    ...mapState(["results"]),
  },
  methods: {
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
    like() {
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
    resetModal() {
      this.name = "";
    },
    handleOk(bvModalEvent) {
      // Prevent modal from closing
      bvModalEvent.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return;
      }
      // Push the name to submitted names
      this.submittedNames.push(this.name);
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide("modal-prevent-closing");
      });
    },
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
        q: `${_this.results[pathName[pathName.length - 1] - 1].name} 입문`,
        type: "video",
        maxResults: 8,
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
  },
};
</script>
<style scoped>
.videoTitle {
  width: 260px;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
  overflow: hidden;
}
.modal {
  /* width: 700px; */
  --bs-modal-width: 800px;
}
#like {
  background-color: transparent;
  border: none;
}
#like img {
  width: 36px;
}
#container {
  padding-top: 100px;
  min-height: 90vh;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
#result {
  height: 100%;
  /* border: 2px solid blue; */
  width: 60vw;
}
#imgContainer img {
  max-width: 500px;
}
.youtube-list {
  display: flex;
  list-style: none;
  flex-wrap: wrap;
  /* justify-content: center; */
}
.youtube-list li {
  margin: 10px;
  flex-wrap: wrap;
}
.videoContainer {
  width: 100%;
  display: flex;
  justify-content: center;
}
.thumbnails {
  width: 260px;
  transition: 0.1s linear;
}
.thumbnails:hover {
  transform: scale(1.1);
}
</style>
