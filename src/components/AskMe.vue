<template>
  <div v-if="$route.name == 'PageNotFound' | $route.name == 'IOSDeepLink' | $route.name == 'AndroidDeepLink'">
      <router-view />
  </div>

  <div v-else id="" class="grid_1200 wrap">
    
    <!-- <TopHeader /> -->
    <!-- End header-top -->

    <SideNavbar />
    <NavigationBar />
    <!-- End header -->

    <BreadCrumbs />
    <!-- End breadcrumbs -->

    <section class="container main-content page-left-sidebar">
      <div class="row">
         <!-- <aside v-if="$route.name != 'Login' & $route.name != 'UserSignup' & $route.name != 'ResetPassword'" class="col-md-3 sidebar">
          <SideNavbar />
          <LeftSidebar />
        </aside> -->
        <div v-if="$route.name != 'Message' & $route.name != 'ChatMessage'" class="col-md-9 col-sm-12">

          <router-view />

          <!-- End page-content -->
        </div>
        <div v-else class="col-md-12 col-sm-12">

          <router-view />

        </div>

        <!-- End main -->
        <aside v-if="$route.name != 'Login' & $route.name != 'UserSignup' & $route.name != 'ChatMessage' & $route.name != 'Message' & $route.name != 'ResetPassword'" class="col-md-3 sidebar">
          <!-- <SideNavbar /> -->
          <LeftSidebar />
        </aside>
        <!-- End sidebar -->
      </div>
      <!-- End row -->
    </section>
    <!-- End container -->

    <!-- <UpperFooter /> -->

    <!-- End footer -->
    <EndFooter />
    <!-- End footer-bottom -->
  <div class="go-up"><i class="icon-chevron-up"></i></div>
    
  </div>
 
</template>

<script>
// import MainHeader from "./MainHeader.vue";
import LeftSidebar from "./LeftSidebar.vue";
// import MainPost from "./MainPost.vue";
// import TopHeader from "./TopHeader.vue";
import NavigationBar from "./Navigation.vue";
import BreadCrumbs from './Breadcrumbs.vue';
// import UpperFooter from "./Footer.vue";
import EndFooter from "./EndFooter.vue";
import SideNavbar from "./SideNavbar.vue";

export default {
  name: "AskMe",
  components: {
    // MainHeader,
    LeftSidebar,
    // MainPost,
    // TopHeader,
    NavigationBar,
    BreadCrumbs,
    // UpperFooter,
    EndFooter,
    SideNavbar,

},
  methods:{
    removeModal(){
      this.$store.dispatch('removeModal')
    }
  }
};
</script>
