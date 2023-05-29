<template>
  <div id="container">
    <b-form id="signUpForm" @submit.stop.prevent>
      <h2>회원가입</h2>
      <!-- 프로필 이미지 등록 -->
      <div class="label">아이디</div>
      <div style="display: flex">
        <b-form-input
          style="width: 340px"
          :id="user.id.length > 0 ? 'input-live' : 'input-none'"
          :state="user.id.length > 0 ? idCheck && idUnique : null"
          v-model="user.id"
          class="input"
          required
        ></b-form-input>
        <button @click="idExists" class="button">중복 확인</button>
      </div>

      <span class="warning" v-if="user.id.length > 0 ? !idCheck : false">
        아이디는 6-12자의 영문 소문자와 숫자로만 구성되어야 합니다.
      </span>
      <span v-else><br /></span>
      <!-- <b-form-invalid-feedback
        :state="user.id.length || !idCheck ? !duplicated : true"
      >
        이미 등록된 아이디입니다.
      </b-form-invalid-feedback> -->
      <div class="label">비밀번호</div>
      <b-form-input
        class="input"
        type="password"
        v-model="user.password"
        :id="user.password.length ? 'input-live' : 'input-none'"
        :state="user.password.length ? pwCheck : null"
        required
      ></b-form-input>

      <span class="warning" v-if="user.password.length ? !pwCheck : false">
        비밀번호는 8-16자의 영문 소문자로 구성되어야 하며 숫자와 특수문자를 하나
        이상 포함하여야 합니다.
      </span>
      <span v-else><br /><br /></span>
      <div class="label">비밀번호 확인</div>
      <b-form-input
        class="input"
        type="password"
        v-model="user.passwordConfirm"
        :id="user.passwordConfirm.length ? 'input-live' : 'input-none'"
        :state="user.passwordConfirm.length ? pwConfirm : null"
        required
      ></b-form-input>
      <span
        class="warning"
        v-if="user.passwordConfirm.length ? !pwConfirm : false"
      >
        비밀번호가 일치하지 않습니다.
      </span>
      <span v-else><br /></span>
      <div class="label">이메일</div>
      <div style="display: flex">
        <b-form-input
          style="width: 340px"
          class="input"
          type="text"
          v-model="user.email"
          :id="user.email.length > 0 ? 'input-live' : 'input-none'"
          :state="user.email.length > 0 ? emailCheck && emailUnique : null"
          required
        ></b-form-input>
        <button @click="emailExists" class="button">중복 확인</button>
      </div>
      <span class="warning" v-if="user.email.length > 0 ? !emailCheck : false">
        이메일 형식에 맞지 않습니다.
      </span>
      <span v-else><br /></span>
      <div class="label">닉네임</div>
      <b-form-input
        v-model="user.nickname"
        class="input"
        type="text"
        required
      ></b-form-input>
      <!-- 유효성 검사 -->
      <button @click="regist" class="signUpButton" type="submit" variant="info">
        회원가입
      </button>
    </b-form>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "UserSignUp",
  data() {
    return {
      user: {
        id: "",
        password: "",
        passwordConfirm: "",
        email: "",
        nickname: "",
      },
      idCheck: false,
      pwCheck: false,
      pwConfirm: false,
      emailCheck: false,
      idUnique: false,
      emailUnique: false,
    };
  },
  methods: {
    regist() {
      if (
        this.idCheck &&
        this.pwCheck &&
        this.pwConfirm &&
        this.emailCheck &&
        this.idUnique &&
        this.emailUnique
      ) {
        // var user = {
        //   password: this.user.password,
        //   file,
        //   nickname: this.user.nickname,
        //   id: this.user.id,
        //   email: this.user.email,
        //   userSeq,
        // };
        const _this = this;
        const data = new FormData();
        data.append("id", this.user.id);
        data.append("password", this.user.password);
        data.append("nickname", this.user.nickname);
        data.append("email", this.user.email);
        axios({
          url: `http://localhost:9999/api-user/signup`,
          method: "POST",
          contentType: "multipart/form-data",
          data: data,
        }).then(() => {
          console.log("회원가입 성공!");
          alert(`${_this.user.nickname}님 환영합니다!`);
          _this.$router.push("/");
        });
      } else {
        alert("양식을 다시 확인해 주세요.");
        return;
      }
    },
    idExists() {
      if (!this.idCheck) {
        alert("사용할 수 없는 아이디입니다.");
        return;
      }
      var _this = this;
      const API_URL = `http://localhost:9999/api-user/idcheck/${this.user.id}`;
      axios({
        url: API_URL,
        method: "GET",
      }).then(function (res) {
        if (res.data > 0) {
          alert("이미 등록되어 있는 아이디입니다.");
          return;
        } else {
          alert("사용할 수 있는 아이디입니다.");
          _this.idUnique = true;
        }
      });
    },
    emailExists() {
      if (!this.emailCheck) {
        alert("이메일 형식에 맞지 않습니다.");
        return;
      }
      var _this = this;
      const API_URL = `http://localhost:9999/api-user/emailcheck/${this.user.email}`;
      axios({
        url: API_URL,
        method: "GET",
      }).then(function (res) {
        if (res.data > 0) {
          alert("이미 등록되어 있는 이메일입니다.");
          return;
        } else {
          alert("사용할 수 있는 이메일입니다.");
          _this.emailUnique = true;
        }
      });
    },
    checkId() {
      const validateId = /^[a-z0-9]{6,12}$/;
      if (validateId.test(this.user.id) || !this.user.id) {
        this.idCheck = true;
        return;
      }
      this.idCheck = false;
      return;
      //;
    },
    // checkDuplication() {},
    checkEmail() {
      // 이메일 형식 검사
      const validateEmail =
        /^[A-Za-z0-9_\\.\\-]+@[A-Za-z0-9\\-]+\.[A-Za-z0-9\\-]+/;

      if (validateEmail.test(this.user.email) || !this.user.email) {
        this.emailCheck = true;
        return;
      }
      this.emailCheck = false;
      return;
    },
    checkPassword() {
      const validatePassword =
        /^(?=.*[a-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;

      if (validatePassword.test(this.user.password) || !this.user.password) {
        this.pwCheck = true;
        return;
      }
      this.pwCheck = false;
      return;
    },
    confirmPassword() {
      if (
        (this.user.password.length &&
          this.user.passwordConfirm.length &&
          this.user.password === this.user.passwordConfirm) ||
        this.user.passwordConfirm.length === 0
      ) {
        this.pwConfirm = true;
        return;
      }
      this.pwConfirm = false;
      return;
    },
  },
  watch: {
    "user.email": function () {
      this.checkEmail();
    },
    "user.id": function () {
      this.checkId();
    },
    "user.password": function () {
      this.checkPassword();
      this.confirmPassword();
    },
    "user.passwordConfirm": function () {
      this.checkPassword();
      this.confirmPassword();
    },
  },
};
</script>

<style scoped>
#container {
  padding-top: 100px;
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
#signUpForm {
  width: 420px;
}
.label {
  width: 400px;
  text-align: left;
}
.input {
  margin-bottom: 5px;
}
.signUpButton {
  color: ivory;
  width: 420px;
  height: 38px;
  border-radius: 5px;
  border: none;
  background-color: rgb(231, 86, 57);
}
.warning {
  color: crimson;
}
.button {
  color: black;
  border-radius: 5px;
  border: none;
  background-color: #e2e2e2;
  font-size: 14px;
  margin-left: 5px;
  text-align: center;
  width: 75px;
  height: 38px;
}
</style>
