<template>
  <header>
    <div style="width: 110px; padding-left: 10px">
      <img style="width: 50px" src="@/assets/logo.png" alt="" />
    </div>
    <div style="width: 500px">
      <router-link to="/">홈</router-link>
      <router-link to="/exercise">둘러보기</router-link>
      <div v-if="userSeq" id="logout" @click="logout">로그아웃</div>
      <router-link v-else to="/login">로그인</router-link>
      <router-link v-if="userSeq" to="/mypage/my-info">마이페이지</router-link>
      <router-link v-else to="/signup">회원가입</router-link>
    </div>
    <div style="width: 120px"></div>
  </header>
</template>
<script>
import axios from "axios";
// import { mapState } from "vuex";

export default {
  name: "HomeViewBanner",
  data() {
    return {
      userSeq: 0,
      signedIn: true,
    };
  },
  created() {
    this.userSeq = sessionStorage.getItem("loginUser");
  },
  // computed: {
  //   ...mapState(["user"]),
  // },
  methods: {
    logout() {
      const _this = this;
      //로그아웃 처리
      alert("로그아웃 되었습니다.");
      this.signedIn = false;
      axios({
        method: "GET",
        url: `http://localhost:9999/api-user/logout`,
      }).then(() => {
        sessionStorage.removeItem("loginUser");
        sessionStorage.removeItem("socialLogin");
        if (_this.$route.path !== "/") _this.$router.push("/");
        _this.$router.go(0);
      });
      return;
    },
  },
};
</script>
<style scoped>
header {
  width: 100%;
  z-index: 100;
  background-color: white;
  position: fixed;
  height: 100px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
header div {
  display: flex;
  justify-content: space-around;
}
div a {
  font-size: 18px;
  color: black;
  text-decoration: none;
}
div a:hover {
  color: rgb(231, 86, 57);
  font-weight: 540;
  transition: 0.3s;
}
a.router-link-active:not(:first-child),
a.router-link-active:hover:not(:first-child) {
  color: rgb(231, 86, 57);
  font-weight: 540;
  display: block;
}
a.router-link-exact-active,
a.router-link-exact-active:hover {
  color: rgb(231, 86, 57);
  font-weight: 540;
  display: block;
}

#logout {
  font-size: 18px;
  color: black;
  text-decoration: none;
}
#logout:hover {
  color: rgb(231, 86, 57);
  font-weight: 540;
  transition: 0.3s;
}
/* @import url(//fonts.googleapis.com/earlyaccess/notosanskr.css); */
</style>
