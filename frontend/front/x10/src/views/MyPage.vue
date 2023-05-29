<template>
  <div id="mypage">
    <div id="container">
      <div id="loginUserInfo">
        <div id="imgContainer">
          <img v-if="!hasImage" src="/img/user.png" alt="" />
          <img
            v-else
            :src="`http://localhost:9999/api-user/download/${userSeq}`"
            alt=""
          />
        </div>
        <div id="welcome">
          <div>{{ nickname }}님, 환영합니다.</div>
        </div>
      </div>
      <div id="sub">
        <div id="side">
          <router-link to="/mypage/my-info">내 정보</router-link>
          <router-link to="/mypage/prev-results">검사 결과 보기</router-link>
          <router-link to="/mypage/favorite-exercises">찜한 운동</router-link>
          <router-link to="/mypage/favorite-videos">찜한 영상</router-link>
        </div>
        <div id="subView">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import axios from "axios";
export default {
  data() {
    return {
      nickname: "",
      userSeq: 0,
      hasImage: false,
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  created() {
    const _this = this;
    this.userSeq = sessionStorage.getItem("loginUser");
    axios({
      url: `http://localhost:9999/api-user/${sessionStorage.getItem(
        "loginUser"
      )}`,
      method: "POST",
      data: sessionStorage.getItem("loginUser"),
    }).then((res) => {
      // console.log(res.data.nickname);
      _this.nickname = res.data.nickname;
    });
    axios({
      url: `http://localhost:9999/api-user/download/${sessionStorage.getItem(
        "loginUser"
      )}`,
      method: "GET",
    }).then((res) => {
      if (!res.data) {
        _this.hasImage = false;
      } else {
        _this.hasImage = true;
      }
    });
  },
};
</script>
<style scoped>
#mypage {
  height: 100%;
}
#container {
  padding-top: 100px;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
}
#loginUserInfo {
  display: flex;
  padding-top: 30px;
  align-items: center;
  position: relative;
  left: 18vw;
}
#imgContainer {
  width: 80px;
  height: 80px;
  border-radius: 40px;
  overflow: hidden;
}
#welcome {
  padding-left: 10px;
  height: inherit;
  display: flex;
  align-items: center;
}
#imgContainer img {
  width: 80px;
}
#side {
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
#side a {
  display: block;
  padding-top: 20px;
  margin-bottom: 20px;
  font-size: 18px;
  color: black;
  text-decoration: none;
}
#side a:hover {
  color: rgb(231, 86, 57);
  font-weight: 540;
  transition: 0.3s;
}
#side a.router-link-active,
#side a.router-link-active {
  color: rgb(231, 86, 57);
  font-weight: 540;
  display: block;
}
#userInfo {
  width: 100%;
  height: 100px;
}
#sub {
  min-height: 100%;
  /* 나머지 공간을 sub로 채움 */
  display: flex;
  align-items: center;
  justify-content: center;
  /* border: 2px solid blue; */
  width: 100%;
  flex: 1;
}
#subView {
  /* border: 2px solid brown; */
  height: 65vh;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  width: 60vw;
  padding-top: 20px;
  padding-bottom: 20px;
}
</style>
