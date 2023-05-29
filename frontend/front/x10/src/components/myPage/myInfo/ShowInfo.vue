<template>
  <div id="bc">
    <h3>내 정보</h3>
    <div id="subContainer">
      <b-form>
        <!-- 프로필 이미지 등록 -->
        <div id="profile">
          <div id="imgContainer">
            <img v-if="!hasImage" src="/img/user.png" alt="" />
            <img
              v-else
              :src="`http://localhost:9999/api-user/download/${userSeq}`"
              alt=""
            />
          </div>
        </div>
        <div class="label">아이디</div>
        <div style="display: flex">
          <b-form-input
            v-if="socialLogin"
            v-model="loginUser.id"
            class="input"
            placeholder="소셜로그인입니다."
            readonly
          />
          <b-form-input v-else v-model="loginUser.id" class="input" readonly />
        </div>

        <div class="label">이메일</div>
        <div style="display: flex">
          <b-form-input
            class="input"
            type="text"
            v-model="loginUser.email"
            readonly
          />
        </div>
        <div class="label">닉네임</div>
        <b-form-input
          v-model="loginUser.nickname"
          class="input"
          type="text"
          readonly
        />
      </b-form>
      <!-- 잘 안눌려서 router-link에서 a로 바꿈 -->
      <router-link v-if="!socialLogin" to="/mypage/my-info/check-password"
        ><button>정보 수정하기</button></router-link
      >
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      hasImage: false,
      socialLogin: false,
      userSeq: 0,
      loginUser: {
        id: "",
        email: "",
        nickname: "",
      },
    };
  },
  created() {
    const _this = this;
    if (sessionStorage.getItem("socialLogin")) this.socialLogin = true;
    axios({
      url: `http://localhost:9999/api-user/${sessionStorage.getItem(
        "loginUser"
      )}`,
      method: "POST",
      data: sessionStorage.getItem("loginUser"),
    }).then((res) => {
      _this.loginUser.nickname = res.data.nickname;
      _this.loginUser.id = res.data.id;
      _this.loginUser.email = res.data.email;
    });
    this.userSeq = sessionStorage.getItem("loginUser");
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
/* 서울 6반 김병찬 무한 명예 */
#bc {
  height: 100%;
  min-height: max-content;
  display: flex;
  flex-direction: column;
}
#subContainer {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
#profile {
  display: flex;
  justify-content: center;
}
#imgContainer {
  width: 120px;
  height: 120px;
  border-radius: 60px;
  overflow: hidden;
}
#imgContainer img {
  width: 120px;
}
.input {
  width: 300px;
}
button {
  margin-top: 10px;
  color: ivory;
  width: 300px;
  height: 38px;
  border-radius: 5px;
  border: none;
  background-color: rgb(231, 86, 57);
}
a,
a:hover {
  text-decoration: none;
  color: ivory;
}
</style>
