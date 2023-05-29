import Vue from "vue";
import Vuex from "vuex";
// import router from "@/router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isKakao: false,
    isGoogle: false,
    user: {
      userSeq: 0,
      nickname: "",
    },
    results: [
      {
        name: "테니스",
        explanation: `테니스 코트 중앙에 네트를 두고 넘어온 공이 자신의 진영에 두 번 바운드되기 전에 라켓을 이용하여 상대 진영으로 넘기는 라켓 구기 스포츠입니다. 게임의 방식은 1:1로 승부를 벌이는 단식, 2:2로 팀을 이뤄 승부를 벌이는 복식이 있습니다. “심리전이 테니스의 모든 것” 이라는 말이 있을 정도로 정신적인 부분이 많이 차지하는 스포츠입니다. 또한 역사가 깊고, 예절을 중시하는 특성으로 인해 ‘신사의 스포츠’라는 이름을 얻고 있기도 합니다. 
          
          `,
        similar: ["배드민턴", "스쿼시"],
        imgSrc:
          "https://media.npr.org/assets/img/2022/09/15/gettyimages-652713978_wide-1f254fbf57b336ac973aa10cae64203038b2cb3a.jpg",
        abstract: "테니스로 완성하는 실전 압축 근육",
      },
      {
        name: "실내 클라이밍",
        explanation:
          "클라이밍은 산악 등지에서 경험할 수 있는 암벽 등반을 인공 시설물을 이용하여 즐기는 스포츠입니다. 손끝부터 발끝까지 전신을 사용하여 신체의 근육을 고루 발달시킬 수 있으며, 근력과 근지구력, 심폐 지구력과 같은 기초 체력 향상에 도움이 됩니다. 또한, 자연 암박등반에 비해 안전하고 누구나 즐길 수 있으며, 완등 시 성취감을 느낄 수 있습니다. ",
        similar: [],
        abstract: "완등해 나갈 때의 짜릿함",
        imgSrc:
          "https://spirit-files-bucket.s3.ap-northeast-2.amazonaws.com/6ihi69ea46ciadi6bye2dggu0p79",
      },
      {
        name: "수영",
        explanation:
          "수영은 손과 발을 사용하여 물 위나 물속을 자유롭게 이동 또는 정지하는 운동입니다. 현대인들의 생활체육에 적합하고 남녀노소 누구나 즐길 수 있으며 스포츠 종목 중에서 비교적 운동으로서의 숙달 방법이 단순한 편입니다. 전신적 운동이고, 큰 호흡운동을 요구하기 때문에 근육이나 심폐의 발달에 좋으며, 수중 안전에 대한 자신감 뿐만 아니라 다른 사람의 안전에도 도움을 줄 수 있는 좋은 운동입니다. ",
        similar: [],
        abstract: "대표적인 유산소 운동",
        imgSrc:
          "https://mblogthumb-phinf.pstatic.net/20151023_80/ganaswimming_1445576667653sLpbr_JPEG/1.jpg?type=w2",
      },
      {
        name: "주짓수",
        explanation:
          "주짓수는 일본의 전통 무예인 유술을 바탕으로 만들어졌습니다. 메치기, 유리한 포지션을 선점하여 팔다리 관절 꺾기, 목 조르기 등의 기술로 상대방을 제압하는 실전 격투의 성향이 강한 운동입니다. 본인보다 체격이 크거나 힘이 센 상대를 컨트롤 하여 이길 수 있는 기술을 지니고 있기 때문에, 호신술의 역할도 수행할 수 있습니다. ",
        similar: ["유도"],
        abstract: "무기를 사용하지 않고 상대를 제압하는 무술",
        imgSrc:
          "https://images.unsplash.com/photo-1576149146095-caa19d4de102?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1031&q=80",
      },
      {
        name: "필라테스",
        explanation:
          "필라테스는 재활과 자세 교정의 목적으로 신체 유연성, 근육을 발달시키는 운동입니다. 특히 각 동작을 수행함에 있어서, 높은 정확도 및 호흡과의 조화를 요구합니다. 필라테스는 코어의 힘, 자세, 조화와 몸의 유연성을 개선합니다. 복근, 등, 허리 주변 근육 강화를 통해 좋은 자세를 만들고, 이를 통해 신체 스트레스 감소와 회복력 강화를 기대할 수 있습니다.  ",
        similar: ["요가"],
        abstract: "신체의 중립을 찾아가다",
        imgSrc:
          "https://cdn.class101.net/images/d169098f-1ad0-4ea8-9e75-570b68360dfa/original",
      },
      {
        name: "헬스",
        explanation:
          "바벨이나 덤벨 또는 전용 트레이닝 머신을 사용하여 근력, 근육량의 증가 등의 목적을 위해 수행하는 운동입니다. 일상에서 접할 수 없는 무거운 중량을 통해 원하는 근육에 부위별로 과부하를 주는 것이 핵심으로, 넒은 의미로는 단백질 단백질 등 영양소의 섭취 방법과, 근육의 발달을 최대화하기 위한 보충제의 섭취 및 휴식 방법 등도 포함합니다. ",
        similar: ["크로스핏"],
        abstract: "Classic is the best",
        imgSrc:
          "https://caloriesburnedhq.com/img/calories-burned-weight-lifting-1.jpg",
      },
      {
        name: "킥복싱",
        explanation:
          "킥복싱은 주먹과 발을 사용하여 공격과 방어를 하는 일본의 격투기로서, 무에타이를 많이 참고해 나온 무술입니다. 전신을 사용하는 격투기이기 때문에 상체와 하체의 근육을 고루 발달 시킬 수 있으며, 다양한 발차기 동작을 수행함으로서 발과 다리의 유연성을 향상 시킬 수 있습니다. 또한 타격을 통해 스트레스를 해소할 수 있고, 자기 통제와 집중력을 향상시키는 데 도움이 됩니다. ",
        similar: ["무에타이", "복싱"],
        abstract: "나도 할 수 있다 어퍼컷",
        imgSrc:
          "https://cdn.onefc.com/wp-content/uploads/2019/02/Nieky-Holzken-DSC_1483.jpg",
      },
      {
        name: "등산",
        explanation:
          "등산은 심신을 단련하고 즐거움을 찾고자 하는 행위 중 하나로서, 산을 오르는 것 자체가 목적이며, 숲 속의 맑은 공기를 마실 수 있다는 점에서 건강에도 긍정적 효과를 누릴 수 있는 대표적인 유산소 운동입니다. 등산은 모험심과 성취감을 맛보게 함으로써 인내심을 기를 수 있게 해줍니다. 또한 에너지 소비가 높은 운동으로 체지방 감소에 효과가 있으며, 우울증을 해소하는 등 정신 건강에도 도움이 됩니다. ",
        similar: [],
        abstract: "이래 봬도 체력 소모가 많은 운동!",
        imgSrc:
          " https://www.bergans.com/se/pub_images/original/fasthikingheader.jpg",
      },
      {
        name: "GX (Group Exercise)",
        explanation:
          "G.X(Group Exercise)는 그룹 운동 프로그램으로, 앞에서 리드하는 트레이너와 음악에 맞추어 에어로빅, 요가, 태보, 스피닝 등의 단체운동을 수행합니다. 혼자가 아니라 그룹으로 진행하기 때문에 의지가 약해 운동을 금방 포기하는 사람들이나, 이제 막 운동을 시작한 초보자들도 쉽게 즐기면서 운동할 수 있습니다. 또한 유산소 및 근력운동을 통해 균형 잡힌 몸매를 가꿀 수 있도록 도와줍니다. ",
        similar: ["스피닝"],
        abstract: "함께라서 더 즐겁게",
        imgSrc:
          "https://media-cldnry.s-nbcnews.com/image/upload/newscms/2020_23/1576521/workout-classes-kb-main-200603.jpg",
      },
      {
        name: "러닝",
        explanation:
          "러닝은 인간이 원초적으로 갖고 있는 행동이다. 러닝은 무릎 관절 주변의 근육을 강화하고 뼈의 밀도를 높이는데 도움을 준다.선수 수준의 훈련은 무릎에 무리를 줄 수 있지만, 회복을 포함하는 실용적인 러닝 플랜은 신체를 더욱 강하게 만들어준다. 올바른 자세를 취하고 제대로 된 휴식을 병행한다면, 즉 제대로 뛰는 법을 안다면 아프지 않고 오래오래 뛸 수 있다.",
        similar: ["줄넘기"],
        abstract: "달릴 때는 내가 없어져요",
        imgSrc:
          "https://blog.bonsecours.com/wp-content/uploads/2023/02/Ben-Risks-of-Running.jpg",
      },
      {
        name: "축구",
        explanation:
          "축구는 손과 팔을 공에 대지 않고 주로 발을 이용해 축구공을 상대 골대에 넣어 점수를 얻고, 승패를 가리는 구기 스포츠입니다. 축구는 전세계적으로 가장 인기가 많은 스포츠이며, 공과 적당한 공터만 있으면 할 수 있기 때문에 진입장벽이 낮다는 장점이 있습니다. 또한 축구는 하체 근력을 강화시켜 주고, 심폐지구력 향상과 청소년의 신경 발달에 도움을 줄 수 있습니다.",
        similar: ["풋살"],
        abstract: "모두가 사랑하는 스포츠",
        imgSrc: " https://a.espncdn.com/photo/2018/0515/r370950_1600x800cc.jpg",
      },
      {
        name: "홈트",
        explanation:
          "홈 트레이닝은 거창한 도구 없이 집에서 할 수 있는 운동방식을 말합니다. 주로 맨몸운동으로 수행하며, 팔굽혀펴기, 스쿼트, 크런치 등 유명하고 기본적인 동작들만 꾸준히 해줘도 큰 효과를 볼 수 있기 때문에 초보자들에게 추천되는 운동입니다. 최근에는 유튜브 등지에 홈 트레이닝에 다루는 채널, 혹은 전용 어플리케이션이 다수 존재하여 쉽게 배울 수 있습니다.",
        similar: ["링피트"],
        abstract: "혼자서도 충분히 할 수 있다",
        imgSrc:
          "https://hips.hearstapps.com/hmg-prod/images/woman-watching-sports-training-online-on-laptop-royalty-free-image-1584717965.jpg",
      },
    ],
  },
  getters: {},
  mutations: {
    SET_LOGIN_USER: function (state, payload) {
      state.user.userSeq = payload;
    },
    EDIT_NICKNAME: function (state, payload) {
      state.user.nickname = payload;
    },
    LOGOUT: function (state) {
      state.user.userSeq = 0;
    },
    KAKAO_LOGIN: function (state) {
      state.isKakao = true;
    },
    GOOGLE_LOGIN: function (state) {
      state.isGoogle = true;
    },
    KAKAO_OFF: function (state) {
      state.isKakao = false;
    },
    GOOGLE_OFF: function (state) {
      state.isGoogle = false;
    },
  },
  actions: {
    setLoginUser({ commit }, payload) {
      commit("SET_LOGIN_USER", payload);
    },
    editNickname({ commit }, payload) {
      commit("EDIT_NICKNAME", payload);
    },
    logout({ commit }) {
      commit("LOGOUT");
    },
    kakaoLogin({ commit }) {
      commit("KAKAO_LOGIN");
    },
    kakaoOff({ commit }) {
      commit("KAKAO_OFF");
    },
    googleLogin({ commit }) {
      commit("GOOGLE_LOGIN");
    },
    googleOff({ commit }) {
      commit("GOOGLE_OFF");
    },
  },
  modules: {},
});
