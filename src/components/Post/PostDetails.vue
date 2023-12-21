<template>
  <div id="wrap" class="grid_1200">
    <section class="container main-content">
      <div class="row">
        <div class="col-md-9">
          <div style="margin-bottom:25px; font-size: 15px;">
            <router-link :to="last_route">
            <i class="icon-reply" aria-hidden="true"></i> Back to {{this.space_name}}
          </router-link>
          </div> 
          <MainPost post_detail="post_detail" @values="getName"/>
          
          <div class="clearfix"></div>
          <br>
          <div class="clearfix-gap"></div>

          <PostComments :is_display = "this.is_display" />

         
        </div>
        <!-- End main -->
      </div>
      <!-- End row -->
    </section>
    <!-- End container -->
  </div>
  <!-- End wrap -->
</template>

<script>
// import axios from "axios";
import MainPost from "../Post/MainPost.vue";
import PostComments from "../PostComments.vue"

export default {
  name: "PostDetails",
  components: {
    MainPost,
    PostComments,
  },
  data() {
    return {
      post: [],
      post_id: "",
      body: "",
      span_like_count: "",
      span_like: "",
      is_like_zero: "",
      comment_like_count: "",
      last_route: localStorage.getItem("last_route"),
      space_name:"",
      is_display:"",
    };
  },
  
  mounted() {
    // this.getPost();
  },
  watch: {
    $route() {
      // this.getPost();
    },
  },

  methods: {
    getName(value) {
      console.log("value", value);
      this.space_name = value.space_name;
      this.is_display = value.is_display;
    },
    
    
    postComment() {
      if (this.$store.state.id == null) {
        window.location.replace("/login");
      }
    },
  },
};
</script>
