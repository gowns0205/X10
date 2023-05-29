<template>
  <div id="myView">
    <h3>찜한 영상</h3>
    <div id="subContainer">
      <div v-if="videos" style="display: flex">
        <div
          v-for="(v, i) in videos"
          :key="v.videoUrl"
          @click="openModal(i)"
          class="imgContainer"
        >
          <img :src="thumbnails[i]" alt="" />
          <div class="caption">
            <button @click.stop="unlike(v.videoUrl)">
              <img src="/img/cancel.png" alt="" />
            </button>
          </div>
        </div>
      </div>
      <div v-else>찜한 영상이 없습니다.</div>

      <b-modal
        size="lg"
        id="bv-modal-example"
        hide-footer
        ref="modal"
        :title="video.videoTitle"
        @show="resetModal"
        @hidden="resetModal"
        @ok="handleOk"
      >
        <form ref="form" @submit.stop.prevent="handleSubmit">
          <b-form-group
            label-for="name-input"
            invalid-feedback="Name is required"
            :state="nameState"
          >
            <div class="videoContainer">
              <iframe
                width="600"
                height="360"
                :src="video.videoUrl"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              ></iframe>
            </div>
            <b-button
              class="mt-3"
              block
              @click="$bvModal.hide('bv-modal-example')"
              >닫기</b-button
            >
          </b-form-group>
        </form>
      </b-modal>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  computed: {
    thumbnails() {
      var temp = [];
      for (let i = 0; i < this.videos.length; i++) {
        let t = this.videos[i].videoUrl.split("/");
        temp.push(
          `https://img.youtube.com/vi/${t[t.length - 1]}/mqdefault.jpg`
        );
      }
      return temp;
    },
  },
  updated() {
    const _this = this;
    axios({
      url: `http://localhost:9999/api/xten/favoritevideos/${sessionStorage.getItem(
        "loginUser"
      )}`,
      method: "GET",
    }).then((res) => {
      _this.videos = res.data;
    });
  },
  created() {
    const _this = this;
    axios({
      url: `http://localhost:9999/api/xten/favoritevideos/${sessionStorage.getItem(
        "loginUser"
      )}`,
      method: "GET",
    }).then((res) => {
      _this.videos = res.data;
    });
  },
  data() {
    return {
      video: {
        favoriteVideosSeq: 0,
        userSeq: 0,
        videoUrl: "",
        videoTitle: "",
        // thumbnails: "",
      },
      videos: [],
      name: "",
      nameState: null,
      submittedNames: [],
    };
  },
  methods: {
    openModal(i) {
      this.video = this.videos[i];
      this.$refs.modal.show();
    },
    unlike(url) {
      console.log(url);
      const _this = this;
      // data.append("userSeq", sessionStorage.getItem("loginUser"));
      // data.append("videoUrl", url);
      axios({
        url: `http://localhost:9999/api/xten/favoritevideos`,
        method: "DELETE",
        data: {
          userSeq: sessionStorage.getItem("loginUser"),
          videoUrl: url,
          videoTitle: "",
        },
      }).then(() => {
        for (let i = 0; i < _this.videos.length; i++) {
          if (url == _this.videos[i].videoUrl) {
            _this.videos.splice(i, 1);
            break;
          }
        }
        alert("찜에서 삭제되었습니다.");
      });
      // this.$router.push("/mypage/favorite-exercises");
    },
    resetModal() {
      this.name = "";
      this.nameState = null;
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
};
</script>

<style scoped>
.modal {
  /* width: 700px; */
  --bs-modal-width: 800px;
}
.videoContainer {
  width: 100%;
  display: flex;
  justify-content: center;
}
#myView {
  height: 100%;
  width: 80%;
  display: flex;
  flex-direction: column;
}
.showVideo,
.showVideo:hover,
.showVideo:focus {
  border-radius: 0;
  background-color: transparent;
}
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

#subContainer {
  flex: 1;
}
.imgContainer {
  text-align: center;
  width: 240px;
  height: 130px;
  margin: 5px;
  overflow: hidden;
  position: relative;
}

.imgContainer img {
  top: 0;
  left: 0;
  position: absolute;
  width: 100%;
  transition: all 0.2s linear;
}

.imgContainer:hover .caption {
  opacity: 1;
}
</style>
