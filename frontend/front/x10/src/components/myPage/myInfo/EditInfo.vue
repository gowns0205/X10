<template>
  <div id="bc">
    <h3>내 정보 수정</h3>
    <div id="subContainer">
      <b-form id="form">
        <!-- 이미지 수정하기 -->
        <div id="profile">
          <div id="tempImgContainer">
            <!-- src="https://image.xportsnews.com/contents/images/upload/article/2022/0330/1648629511608484.jpg" -->
            <img v-if="!hasImage" src="/img/user.png" alt="" />
            <img
              v-else
              :src="`http://localhost:9999/api-user/download/${user.userSeq}`"
              alt=""
            />
          </div>
        </div>
        <div>
          <input
            ref="profileImg"
            id="profileImg"
            accept="image/*"
            @change="imgUpload($event.target)"
            type="file"
          />
        </div>
        <div class="label">아이디</div>
        <div style="display: flex">
          <b-form-input v-model="user.id" class="input" readonly />
        </div>
        <div class="label">비밀번호</div>
        <div>
          <b-form-input
            class="input"
            type="password"
            v-model="user.password"
            :id="user.password.length ? 'input-live' : 'input-none'"
            :state="user.password.length ? pwCheck : null"
            required
          ></b-form-input>
        </div>

        <span
          style="color: crimson"
          class="warning"
          v-if="user.password.length ? !pwCheck : false"
        >
          비밀번호는 8-16자의 영문 소문자로 구성되어야 하며 숫자와 특수문자를
          하나 이상 포함하여야 합니다.
        </span>
        <div class="label">비밀번호 확인</div>
        <div>
          <b-form-input
            class="input"
            type="password"
            v-model="user.passwordConfirm"
            :id="user.passwordConfirm.length ? 'input-live' : 'input-none'"
            :state="user.passwordConfirm.length ? pwConfirm : null"
            required
          ></b-form-input>
        </div>

        <span
          style="color: crimson"
          class="warning"
          v-if="user.passwordConfirm.length ? !pwConfirm : false"
        >
          비밀번호가 일치하지 않습니다.
        </span>
        <div class="label">이메일</div>
        <div style="display: flex">
          <b-form-input
            style="width: 220px"
            class="input"
            type="text"
            v-model="user.email"
            :id="user.email.length > 0 ? 'input-live' : 'input-none'"
            :state="user.email.length > 0 ? emailCheck && emailUnique : null"
            required
          ></b-form-input>
          <button @click.stop.prevent="emailExists" class="button">
            중복 확인
          </button>
        </div>
        <span
          style="color: crimson"
          class="warning"
          v-if="user.email.length > 0 ? !emailCheck : false"
        >
          이메일 형식에 맞지 않습니다.
        </span>
        <div class="label">닉네임</div>
        <div>
          <b-form-input v-model="user.nickname" class="input" type="text" />
        </div>
      </b-form>
      <button @click="editUser" id="edit">정보 수정하기</button>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      hasImage: false,
      user: {
        userSeq: 0,
        id: "",
        password: "",
        passwordConfirm: "",
        orgEmail: "",
        email: "",
        orgNickname: "",
        nickname: "",
        img: {},
      },
      pwCheck: false,
      pwConfirm: false,
      emailCheck: true,
      emailUnique: true,
      imgChanged: false,
    };
  },
  methods: {
    imgUpload(input) {
      var reader = new FileReader();
      reader.onload = (e) => {
        const previewImage = document.querySelector("#tempImgContainer>img");
        previewImage.src = e.target.result;
      };
      reader.readAsDataURL(input.files[0]);
      this.user.img = this.$refs["profileImg"].files[0];
      this.imgChanged = true;
      this.hasImage = true;
    },
    editUser() {
      var _this = this;
      console.log(Object.keys(this.user.img).length);
      if (
        this.user.password.length > 0 &&
        this.user.passwordConfirm.length > 0 &&
        this.pwCheck &&
        this.pwConfirm &&
        this.emailCheck &&
        this.emailUnique
      ) {
        if (this.imgChanged) {
          const data2 = new FormData();
          // var img = document.querySelector("#profileImg")[0];
          data2.append("file", _this.user.img);
          axios({
            url: `http://localhost:9999/api-user/change/${sessionStorage.getItem(
              "loginUser"
            )}`,
            method: "POST",
            contentType: "multipart/form-data",
            data: data2,
          })
            .then(() => {
              console.log("사진 변경 완료");
            })
            .catch((err) => {
              console.log(err);
              alert("양식을 다시 확인해 주세요.");
            });
        }
        const data = new FormData();
        data.append("password", this.user.password);
        data.append("email", this.user.email);
        data.append("nickname", this.user.nickname);
        axios({
          headers: {
            "Access-Control-Allow-Origin": `http://localhost:3000`,
            "Access-Control-Allow-Credentials": "true",
          },
          url: `http://localhost:9999/api-user/edit/${sessionStorage.getItem(
            "loginUser"
          )}`,
          method: "PUT",
          contentType: "multipart/form-data",
          data: data,
        })
          .then(() => {
            // console.log("수정 성공");
            alert("성공적으로 수정되었습니다.");
            if (_this.user.orgNickname !== _this.user.nickname) {
              _this.$store.dispatch("editNickname", _this.user.nickname);
            }
            _this.$store.dispatch(
              "setLoginUser",
              sessionStorage.getItem("loginUser")
            );
            _this.$router.push("/mypage/my-info");
            _this.$router.go(0);
          })
          .catch((err) => {
            console.log(err);
            alert("양식을 다시 확인해 주세요.");
          });
      } else {
        alert("양식을 다시 확인해 주세요.");
        return;
      }
    },
    emailExists() {
      if (this.user.orgEmail == this.user.email) {
        alert("사용 중인 이메일 주소입니다.");
        return;
      }
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
        if (res.data == 1) {
          alert("이미 등록되어 있는 이메일입니다.");
          _this.emailUnique = false;
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
      if (this.orgEmail !== this.email) this.emailUnique = false;
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
  created() {
    const _this = this;
    axios({
      url: `http://localhost:9999/api-user/${sessionStorage.getItem(
        "loginUser"
      )}`,
      method: "POST",
      data: sessionStorage.getItem("loginUser"),
    }).then((res) => {
      _this.user.nickname = res.data.nickname;
      _this.user.orgNickname = res.data.nickname;
      _this.user.id = res.data.id;
      _this.user.email = res.data.email;
      _this.user.orgEmail = res.data.email;
    });
    this.user.userSeq = sessionStorage.getItem("loginUser");
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
#form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
/* 서울 6반 김병찬 무한 명예 */
#bc {
  height: 100%;
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
#tempImgContainer {
  /* border: 2px solid blue; */
  width: 120px;
  height: 120px;
  border-radius: 60px;
  overflow: hidden;
}
#tempImgContainer img {
  width: 120px;
}
.input {
  width: 300px;
}
#edit {
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
