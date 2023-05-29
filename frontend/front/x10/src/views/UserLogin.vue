<template>
  <div id="container">
    <b-form class="loginForm">
      <h2>로그인</h2>
      <b-form-group class="input-group">
        <b-form-input
          class="input"
          v-model="id"
          placeholder="아이디"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group class="input-group">
        <b-form-input
          class="input"
          v-model="password"
          placeholder="비밀번호"
          type="password"
          required
        ></b-form-input>
      </b-form-group>

      <button class="loginButton" @click.stop.prevent="login">로그인</button>
    </b-form>
    <div id="socialForm">
      <h4>소셜 로그인</h4>
      <div>
        <!-- <div class="socialButton" @click="naverLogin">
          <img src="/img/naver.png" alt="" />
        </div>-->

        <div @click="googleLogin" class="socialButton">
          <img src="/img/google.png" alt="" />
        </div>
        <div @click="kakaoLogin" class="socialButton">
          <img src="/img/kakao.png" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
export default {
  name: "UserLogin",
  data() {
    return {
      //KFC 무한명예
      codes: "",
      Navercode: "",
      state: "",
      id: "",
      password: "",
    };
  },
  computed: {
    ...mapState(["isKakao", "isGoogle"]),
  },
  created() {
    if (this.$route.query.scope) this.create("google");
    else this.create("kakao");
  },
  methods: {
    create(regId) {
      this.codes = this.$route.query.code;
      console.log(this.codes);
      const _this = this;
      //구글
      if (this.codes.length > 0) {
        axios({
          url: `http://localhost:9999/api-user/login/oauth2`,
          // data: _this.codes,
          method: "GET",
          params: {
            registrationId: regId,
            code: _this.codes,
          },
        })
          .then((res) => {
            console.log(res.data);
            if (res.data > 0) {
              sessionStorage.setItem("loginUser", res.data);
              sessionStorage.setItem("socialLogin", regId);
              alert("로그인 성공!!!");
              _this.$store.dispatch("setLoginUser", res.data);
              _this.$store.dispatch("kakaoOff");
              _this.$store.dispatch("googleOff");
              _this.$router.push({ name: "HomeView" });
              _this.$router.go(0);
              // axios({
              //   url: `http://localhost:9999/api-user/${res.data}`,
              //   method: "POST",
              //   data: sessionStorage.getItem("loginUser"),
              // }).then((res) => {
              //   console.log(res.data.nickname);
              //   _this.$store.dispatch("editNickname",res.data.nickname);
              // });
            }
          })
          .catch(() => {
            alert("아이디나 비밀번호를 다시 확인해 주세요.");
          });
      }

      console.log(this.state);
    },
    kakaoLogin() {
      this.$store.dispatch("googleOff");
      this.$store.dispatch("kakaoLogin");
      const params = {
        redirectUri: "http://localhost:8080/login",
      };
      window.Kakao.Auth.authorize(params);
      // window.location.href =
      //   "https://kauth.kakao.com/oauth/authorize?client_id=&74187e39353cc7c38367ca2b676f38ad&redirect_uri=http://localhost:8080/login&response_type=code";
      // const token_url = "https://kauth.kakao.com/oauth/token";

      // const data = {
      //   grant_type: "authorization_code",
      //   client_id: "74187e39353cc7c38367ca2b676f38ad",
      //   redirect_uri: "http://localhost:8080/login",
      //   code: this.codes,
      // };

      // axios
      //   .post(token_url, data, {
      //     headers: {
      //       "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      //     },
      //   })
      //   .then((res) => {
      //     console.log("response: " + res);
      //   })
      //   .catch(function (error) {
      //     console.log("error", error);
      //   });
    },
    getToken() {
      const _this = this;
      const REST_API = "http://localhost:9999";
      const API_URL = `${REST_API}/api-user/login/oauth2/kakao`;
      const params = {
        code: this.codes,
      };
      axios({
        url: API_URL,
        method: "GET",
        params: params,
        withCredentials: true,
      })
        .then((res) => {
          console.log(res.data);
          if (res.data.key == "signUp") {
            alert("회원이 아닙니다 가입해 주세요!");
            _this.router.push({ name: "signUp", query: { id: res.data.id } });
          } else {
            alert("일단 성공");
            this.$store.commit("LOGIN_DATA", res.data);
            _this.router.push({ name: "home" });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    naverLogin() {
      this.state = "ecfrh2a4teorujk1km9q4hhfhbk7ab3o0svpdv";
      window.location.href = `https://nid.naver.com/oauth2.0/authorize?client_id=fncWKiTan43O0IPWloEH&redirect_uri=http://localhost:8080/login&response_type=code&state=${this.state}`;
    },
    // parseJwt(token) {
    //   var base64Url = token.split(".")[1];
    //   var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    //   var jsonPayload = decodeURIComponent(
    //     atob(base64)
    //       .split("")
    //       .map(function (c) {
    //         return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
    //       })
    //       .join("")
    //   );

    //   return JSON.parse(jsonPayload);
    // },
    // handleCredentialResponse(response) {
    //   // decodeJwtResponse() is a custom function defined by you
    //   // to decode the credential response.
    //   const responsePayload = this.parseJwt(response.credential);

    //   console.log("ID: " + responsePayload.sub);
    //   console.log("Full Name: " + responsePayload.name);
    //   console.log("Given Name: " + responsePayload.given_name);
    //   console.log("Family Name: " + responsePayload.family_name);
    //   console.log("Image URL: " + responsePayload.picture);
    //   console.log("Email: " + responsePayload.email);
    // },

    googleLogin() {
      this.$store.dispatch("googleLogin");
      this.$store.dispatch("kakaoOff");
      window.location.href =
        "https://accounts.google.com/o/oauth2/auth/oauthchooseaccount?client_id=1086471094366-slrtcuocf95k5tv47j0gvlsijmdlvd07.apps.googleusercontent.com&redirect_uri=http://localhost:8080/login&response_type=code&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile&service=lso&o2v=1&flowName=GeneralOAuthFlow";
    },
    // kakaoLogin() {
    //   axios({
    //     url: `http://kauth.kakao.com/oauth/authorize?response_type=code&client_id=74187e39353cc7c38367ca2b676f38ad&redirect_uri=http://localhost:9999/api-user/login/oauth2/kakao`,
    //     method: "GET",
    //     // contentType: "multipart/form-data",
    //   }).then((res) => {
    //     console.log(res.data);
    //   });
    // },
    login() {
      const _this = this;
      axios({
        url: `http://localhost:9999/api-user/login`,
        method: "POST",
        // contentType: "multipart/form-data",
        data: {
          id: this.id,
          password: this.password,
        },
      })
        .then((res) => {
          console.log(res.data);
          if (res.data > 0) {
            sessionStorage.setItem("loginUser", res.data);
            alert("로그인 성공!!!");
            _this.$store.dispatch("setLoginUser", res.data);
            _this.$router.push({ name: "HomeView" });
            _this.$router.go(0);
            // axios({
            //   url: `http://localhost:9999/api-user/${res.data}`,
            //   method: "POST",
            //   data: sessionStorage.getItem("loginUser"),
            // }).then((res) => {
            //   console.log(res.data.nickname);
            //   _this.$store.dispatch("editNickname",res.data.nickname);
            // });
          }
        })
        .catch(() => {
          alert("아이디나 비밀번호를 다시 확인해 주세요.");
        });
    },
  },
};
</script>
<style scoped>
/* .socialButton {
  padding: 5px;
}
.socialButton img {
  width: 40px;
} */
#socialForm {
  margin-top: 100px;
}
#container {
  padding-top: 100px;
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
#userLogin {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.loginForm {
  display: flex;
  flex-direction: column;
}
.loginForm .input {
  width: 300px;
  margin-bottom: 5px;
}
.loginButton {
  color: ivory;
  width: 300px;
  height: 38px;
  border-radius: 5px;
  border: none;
  background-color: rgb(231, 86, 57);
}
</style>
