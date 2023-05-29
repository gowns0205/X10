<template>
  <div id="bc">
    <h3>비밀번호 확인</h3>
    <div id="subContainer">
      <b-form-input v-model="password" type="password" class="input" />
      <button @click="pwCheck">확인</button>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      password: "",
    };
  },
  methods: {
    pwCheck() {
      console.log("눌렸음");
      //비밀번호 대조
      const _this = this;
      axios({
        url: `http://localhost:9999/api-user/password/${sessionStorage.getItem(
          "loginUser"
        )}/${_this.password}`,
        method: "GET",
        data: sessionStorage.getItem("loginUser"),
      }).then((res) => {
        if (res.data > 0) {
          _this.$router.push("/mypage/my-info/edit-info");
        } else {
          alert("비밀번호가 일치하지 않습니다.");
        }
      });
    },
  },
};
</script>
<style scoped>
#bc {
  height: 100%;
}
#subContainer {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 70px;
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
</style>
