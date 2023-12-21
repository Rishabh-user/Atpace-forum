import { createRouter, createWebHistory } from "vue-router";
// import HomeView from '../views/HomeView.vue'
const UserProfileDetail = () =>
  import(/* webpackChunkName: "Profile_Details" */ "../components/Profile/UserProfile.vue")
const MainPost = () =>
  import(/* webpackChunkName: "Main_Post" */ "../components/Post/MainPost.vue")
const AllSpaces = () =>
  import(/* webpackChunkName: "All_Spaces" */ "../components/AllSpaces.vue")
const SpaceDetails = () =>
  import(/* webpackChunkName: "Space_Details" */ "../components/SpaceDetails.vue")
const EventSpaceDetails = () =>
  import(/* webpackChunkName: "Event_Space_Details" */ "../components/EventSpaceDetails.vue")
const Login = () =>
  import(/* webpackChunkName: "Login" */ "../components/Header/LoginButton.vue")
const UserSignup = () =>
  import(/* webpackChunkName: "Signup" */ "../components/Header/SignupButton.vue")
const UserLogout = () =>
  import(/* webpackChunkName: "Logout" */ "../components/UserLogout")
const PostDetails = () =>
  import(/* webpackChunkName: "Post_Details" */ "../components/Post/PostDetails")
const EditProfile = () =>
  import(/* webpackChunkName: "Edit_Profile" */ "../components/Profile/EditProfile.vue")
const ResetPassword = () =>
  import(/* webpackChunkName: "Reset_Password" */ "../components/ResetPassword.vue")
const NewPost = () =>
  import(/* webpackChunkName: "New_Post" */ "../components/Post/NewPost.vue")
const NewEventPost = () =>
  import(/* webpackChunkName: "New_Event_Post" */ "../components/Post/NewEventPost.vue")
const ReportPost = () =>
  import(/* webpackChunkName: "Report_Post" */ "../components/Post/ReportPost.vue")
const EditPost = () =>
  import(/* webpackChunkName: "Edit_Post" */ "../components/Post/EditPost.vue")
const GetNotification = () =>
  import(/* webpackChunkName: "Notification" */ "../components/Header/Notification.vue")
const ChangePassword = () =>
  import(/* webpackChunkName: "Change_Password" */ "../components/Header/ChangePassword.vue")
const AttachmentDetail = () =>
  import(/* webpackChunkName: "Attachment_Details" */ "../components/AttachmentDetail.vue")
const PageNotFound = () =>
  import(/* webpackChunkName: "Page_Not_Found" */ "../components/PageNotFound.vue")
const ChatMessage = () =>
  import(/* webpackChunkName: "Chat_Message" */ "../components/ChatMessage.vue")
const EditEventPost = () =>
  import(/* webpackChunkName: "Edit_Event_Post" */ "../components/Post/EditEventPost.vue")
// const IOSDeeplink = () =>
//   import(/* webpackChunkName: "IOS_Deep_Link" */ "../components/IOSDeeplink.vue")
// const AndroidDeeplink = () =>
//   import(/* webpackChunkName: "IOS_Deep_Link" */ "../components/AndroidDeeplink.vue")
const ReviewContent = () =>
  import(/* webpackChunkName: "Review_Content" */ "../components/ReviewContent.vue")
  
// import UserProfileDetail from "../components/Profile/UserProfile.vue";
// import MainPost from "../components/Post/MainPost.vue";
// import AllSpaces from "../components/AllSpaces.vue";
// import SpaceDetails from "../components/SpaceDetails.vue";
// import EventSpaceDetails from "../components/EventSpaceDetails.vue";
// import Login from "../components/Header/LoginButton.vue";
// import UserSignup from "../components/Header/SignupButton.vue";
// import UserLogout from "../components/UserLogout";
// import PostDetails from "../components/Post/PostDetails";
// import EditProfile from "../components/Profile/EditProfile.vue";
// import ResetPassword from "../components/ResetPassword.vue";
// import NewPost from "../components/Post/NewPost.vue";
// import NewEventPost from "../components/Post/NewEventPost.vue";
// import ReportPost from "../components/Post/ReportPost.vue";
// import EditPost from "../components/Post/EditPost.vue";
// import GetNotification from "../components/Header/Notification.vue";
// import ChangePassword from "../components/Header/ChangePassword.vue";
// import AttachmentDetail from "../components/AttachmentDetail.vue";
// import PageNotFound from "../components/PageNotFound.vue";
// import ChatMessage from "../components/ChatMessage.vue";
// import LinkPreview from "../components/LinkPreview.vue";
const routes = [
  // { path: '/apple-app-site-association', component: IOSDeeplink, name:"IOSDeepLink" },
  // { path: '/.well-known/assetlinks.json', component: AndroidDeeplink, name:"AndroidDeepLink" },
  {
    path: "/",
    name: "MainPost",
    component: MainPost,
  },
  {
    path: "/user-profile/:id",
    name: "UserProfileDetail",
    component: UserProfileDetail,
  },
  {
    path: "/edit-profile/:id",
    name: "EditProfileDetail",
    component: EditProfile,
  },
  {
    path: "/new-post/:id",
    name: "NewPost",
    component: NewPost,
  },
  {
    path: "/new-event-post/:id",
    name: "NewEventPost",
    component: NewEventPost,
  },
  {
    path: "/message/:id",
    name: "Message",
    component: ChatMessage,
  },
  {
    path: "/message/",
    name: "ChatMessage",
    component: ChatMessage,
  },
  {
    path: "/edit-post/:id",
    name: "EditPost",
    component: EditPost,
  },
  {
    path: "/edit-event-post/:id",
    name: "EditEventPost",
    component: EditEventPost,
  },
  {
    path: "/get-notification",
    name: "GetNotification",
    component: GetNotification,
  },
  {
    path: "/report-post/:id",
    name: "ReportPost",
    component: ReportPost,
  },
  {
    path: "/attachment-detail/:name",
    name: "AttachmentDetail",
    component: AttachmentDetail,
  },
  {
    path: "/change-password/:id",
    name: "ChangePassword",
    component: ChangePassword,
  },
  {
    path: "/reset-password",
    name: "ResetPassword",
    component: ResetPassword,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/logout",
    name: "UserLogout",
    component: UserLogout,
  },
  {
    path: "/signup",
    name: "UserSignup",
    component: UserSignup,
  },
  {
    path: "/all-groups/:id",
    name: "AllSpaces",
    component: AllSpaces,
  },
  {
    path: "/review-content/",
    name: "ReviewContent",
    component: ReviewContent,
  },
  {
    path: "/space-link/:id",
    name: "SpaceDetails",
    component: SpaceDetails,
  },
  {
    path: "/event-space-link/:id",
    name: "EventSpaceDetails",
    component: EventSpaceDetails,
  },
  {
    path: "/post-details/:id",
    name: "PostDetails",
    component: PostDetails,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "PageNotFound",
    component: PageNotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.afterEach((to) => {
  if (localStorage.getItem("current_route") != to.path) {
    localStorage.setItem("last_route", localStorage.getItem("current_route"));
    localStorage.setItem("current_route", to.path);
  }
});

export default router;
