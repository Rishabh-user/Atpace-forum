<template>
<div v-if="loading">
  <div class="loaderr"></div>
</div>
<div v-else>
<div v-if="comments.length == 0">
  <div id="dropcaps" class="row">
    <div class="col-md-12">
      <div class="page-content page-shortcode">
        <div class="boxedtitle page-title t_center"><h2>No Comments</h2></div>
        <!-- <div class="clearfix"></div> -->
      </div>
    </div>
  </div>
</div>
<div v-else>
  <div v-for="comment in comments" :key="comment.id">
    <div id="dropcaps" class="row">
      <div class="col-md-12">
        <div class="page-content page-shortcode">
          <div class="user-profile-img"><img width="60" height="60" :src="comment.user_profile_image" alt="admin"></div>
          <ul>
            <li><router-link :to="{ name: 'PostDetails', params: { id: comment.post_id }}">{{comment.post_name}}</router-link></li>
            <li>{{comment.created_at}}</li>
          </ul>
          <hr >
        
          <div class="clearfix"></div>
          
          <p style="font-size:18px;">{{ comment.description }}</p>
        </div>
      </div>
    </div>
    <!-- <div class="col-md-12">	
    <div class="page-content">
        
    </div>
  </div> -->
  </div>
</div>
</div>
</template>

<script>
import axios from "axios";

export default {
  name: "UserComment",
  data() {
    return {
      comments: [],
      loading: false,
    };
  },
  watch: {
      $route() {
        this.getUserComments()
      },
  },
  mounted() {
    this.getUserComments()
  },
  methods: {
    getUserComments(){
      this.loading = true
      var id = this.$route.params.id;
      console.log("user_id_comment", id);
        axios
          .get("atpace-community/user-all-comment/"+id+"/", {
            params:{
              timezone: this.$store.state.timezone
            }
          })
          .then((response) => {
            console.log("All_comments ", response.data.data.user_all_comments);
            this.comments = response.data.data.user_all_comments;
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => (this.loading = false));
    }
  },
};
</script>
