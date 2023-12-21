<template>

  <AskMe />

</template>

<script>
import AskMe from "./components/AskMe.vue";
import { useToast } from "vue-toastification";
export default {

    
  name: "App",
   setup() {
    // Get toast interface
    const toast = useToast();
   
    return { toast };
  },
  components: {
    // UserProfileDetail,

    AskMe,
  },
};
</script>

<style lang="scss">
// #app {
//   font-family: Avenir, Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
// }

// nav {
//   padding: 30px;

//   a {
//     font-weight: bold;
//     color: #2c3e50;

//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }

kbd {
  padding: 4px 10px;
  font-size: 90%;
  color: #fff;
  background-color: #333;
  border-radius: 3px;
  -webkit-box-shadow: inset 0 -1px 0 rgb(0 0 0 / 25%);
  box-shadow: inset 0 -1px 0 rgb(0 0 0 / 25%);
  float: right;
}

article.question.question-type-normal {
  border-radius: 17px;
  // border-color: purple;
}

article.question.question-type-normal:hover {
  border: 1px solid #735cdf;
  // background-color: whitesmoke;
}

@media only screen and (min-width: 452px) and (max-width: 767px) {
  .question-type-normal.question h2,
  .question-type-poll.question h2 {
    padding-right: 0;
    padding-top: 0;
  }
}

.user-profile-img {
  width: 60px;
}
.user-profile-img img {
  margin-top:2px;
  width: 60px;
  height: 60px;
  overflow: hidden;
  -moz-border-radius: 50%;
  // border: 1px solid #e0e0e0;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}


.page-content {
  border-radius: 25px;
}

.user-profile p {
  margin: 0;
}
input.button.color.small.submit {
  width: 20%;
}
.tab a.current {
    
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
}

.loaderr {
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #5c22da;
  width: 50px;
  height: 50px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
  position:absolute;
  left: 50%;
  z-index: 999;
}

/* Safari */
@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

div#google_translate_element {
    position: absolute;
    top: 1px;
    right: 1px;
    z-index: 1;
}
.goog-te-gadget {
  // position: absolute!important;
  // margin-left: 75px!important;
  color: transparent !important;
  width: 160px;
}
.goog-te-gadget {
  color: transparent !important;
}

.goog-te-gadget .goog-te-combo {
  color: white !important;
  margin: 25px 0 !important;
  font-size: 15px;
  background:#735cdf;
  padding: 7px;
  border-radius: 15px;
}
.goog-logo-link {
  display:none !important;
}
.VIpgJd-ZVi9od-l4eHX-hSRGPd{
  display:none !important;
}
// .VIpgJd-ZVi9od-ORHb{
//   display:none !important;
// }

// .goog-te-banner-frame.skiptranslate {
//   display: none !important;
// }
html.translated-ltr {
    margin-top: -35px;
}
</style>
