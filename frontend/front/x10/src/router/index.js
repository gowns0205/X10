import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "@/views/HomeView";
import UserLogin from "@/views/UserLogin";
import UserSignUp from "@/views/UserSignUp";
import MyPage from "@/views/MyPage";
import ExerciseView from "@/views/ExerciseView";
import ExerciseList from "@/components/ExerciseList";
import ExerciseDetail from "@/components/ExerciseDetail";
import ExerciseTest from "@/views/ExerciseTest";
import ExerciseTestResult from "@/views/ExerciseTestResult";
import CheckPassword from "@/components/myPage/myInfo/CheckPassword";
import EditInfo from "@/components/myPage/myInfo/EditInfo";
import MyInfo from "@/components/myPage/myInfo/MyInfo";
import ShowInfo from "@/components/myPage/myInfo/ShowInfo";
import FavoriteExercises from "@/components/myPage/FavoriteExercises";
import FavoriteVideos from "@/components/myPage/FavoriteVideos";
import PrevResults from "@/components/myPage/PrevResults";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "HomeView",
    component: HomeView,
  },
  {
    path: "/exercise",
    component: ExerciseView,
    children: [
      {
        path: "",
        name: "ExerciseList",
        component: ExerciseList,
      },
      {
        path: ":exerciseSeq",
        name: "ExerciseDetail",
        component: ExerciseDetail,
      },
    ],
    // component: () =>
    //   import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },

  {
    path: "/exercise-test",
    name: "ExerciseTest",
    component: ExerciseTest,
  },
  {
    path: "/exercise-test/:exerciseSeq",
    name: "ExerciseTestResult",
    component: ExerciseTestResult,
  },
  {
    path: "/mypage",
    component: MyPage,
    children: [
      {
        path: "my-info",
        component: MyInfo,
        children: [
          {
            path: "",
            name: "ShowInfo",
            component: ShowInfo,
          },
          {
            path: "check-password",
            name: "CheckPassword",
            component: CheckPassword,
          },
          {
            path: "edit-info",
            name: "EditInfo",
            component: EditInfo,
          },
        ],
      },
      {
        path: "prev-results",
        name: "PrevResults",
        component: PrevResults,
      },
      {
        path: "favorite-exercises",
        name: "FavoriteExercises",
        component: FavoriteExercises,
      },
      {
        path: "favorite-videos",
        name: "FavoriteVideos",
        component: FavoriteVideos,
      },
    ],
  },
  {
    path: "/login",
    name: "UserLogin",
    component: UserLogin,
  },
  {
    path: "/signup",
    name: "UserSignUp",
    component: UserSignUp,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
