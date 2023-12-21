<template>
  <div class="row app" >
    <div>
      <div class="col-md-12">
        <div class="tabs-warp question-tab">
          <div class="page-title">
            <h2>
              <span class="icon_i"
              ><span icon_size="50"
                ><i
                  v-if="space_privacy == 'Public'"
                  i_color="#735cdf"
                  i_hover="#735cdf"
                  class="icon-folder-open-alt color_default"
                  style="font-size: 25px; color: #735cdf"
                ></i>
                <i
                  v-else
                  i_color="#735cdf"
                  i_hover="#735cdf"
                  class="icon-lock color_default"
                  style="font-size: 25px; color: #735cdf"
                ></i></span
              ></span>
             
                {{ this.space_name }}
   
                <div v-if="space_privacy == 'Public'" style=" margin-bottom: 50px;">
                  <div v-if="member_joined == true">
                    <router-link :to="{ name: 'NewPost', params: { id: $route.params.id } }"
                    style="float: right; padding: 7px 15px; background: #735cdf"
                    class="button small blue-button custom-button signup"
                    >New Post</router-link>
                  </div>
                  <div v-else>
                    <router-link
                    v-if="$store.state.id != null"
                    to="" @click="joinSpace(group_id)"
                    style="float: right; padding: 7px 15px; background: #735cdf"
                    class="button small blue-button custom-button signup"
                    >Join Space</router-link>
                    <router-link
                    v-else
                    to="/login"
                    style="float: right; padding: 7px 15px; background: #735cdf"
                    class="button small blue-button custom-button signup"
                    >Join Space</router-link>
                  </div> 
                </div>
                <div v-else style=" margin-bottom: 50px;">
                  <div v-if="member_joined == true">
                    <router-link :to="{ name: 'NewPost', params: { id: $route.params.id } }"
                    style="float: right; padding: 7px 15px; background: #735cdf"
                    class="button small blue-button custom-button signup"
                    >New Post</router-link>
                  </div>  
                </div>

            </h2>
          </div>
          <ul class="tabs">

            <li class="tab" style="list-style: none;">
              <router-link to="" @click="ShowPosts()" class="" ref="post"
                >Posts</router-link
              >
            </li>
            <li class="tab" style="list-style: none;" v-show="$store.state.id">
              <router-link to="" @click="ShowPinnedPost()" class="" ref="pinnedPost"
                >Pinned Posts</router-link
              >
            </li>

            <div v-if="space_privacy == 'Public' | (space_privacy == 'Private' & member_joined == true)">
              <select name="space" id="space" ref="selectedItem" style="float:right; width: 111px;
                    height: 42px;
                    background: white;" @change="filterPost()">
    
                    <option selected value="new">New Post</option>
                    <option value="old">Old Post</option>                  
              </select>
            </div>
          </ul>
          
          <!-- End signup -->
          <!-- </div>
            </div> -->
          <br /><br />
          <div v-if="displayPosts" class="tab-inner-warp">
            <div class="tab-inner">
              <MainPost @values="getName" :filterValue="filterValue"/>
            </div>
          </div>
          <div v-if="displayPinnedPost" class="col-md-12">
            <div class="tab-inner-warp">
              <div class="tab-inner">
                <MainPost postType="pinned"/>
              </div>
            </div>
          </div>
         
        </div>
      </div>
      <!-- End col-md-12 -->
    </div>
    <!-- End user-profile -->
  </div>
  <!-- End row -->
</template>


<script>

// import Vue from 'vue'

import axios from "axios";
import MainPost from "./Post/MainPost.vue";
import { useToast } from "vue-toastification";


export default {
  name: "AllSpaces",
  setup() {
    // Get toast interface
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      displayPosts: true,
      displayPinnedPost: false,
      // body: "",
      // title: "",
      post: [],
      user_spaces: [],
      selected: "",
      show: false,
      isHidden: false,
      space_name: "",
      space_type: "",
      space_member_type: "",
      shoeModal: "",
      space_privacy: "",
      filterValue:"new",
      member_joined:"",
      group_id:"",
    };
  },
  mounted() {
    this.ShowPosts();
    // this.getSpace()
      // let Script = document.createElement("script");
      // Script.setAttribute("src", "https://cdn.jsdelivr.net/npm/vue/dist/vue.js");
      // document.head.appendChild(Script);
  },
  watch: {
    $route() {
      this.isHidden = false;
      // document.title = this.space_name;
      // console.log("this.site_title",this.space_name)
    },
  },
  methods: {
    getName(value) {
      console.log(value);
      this.space_name = value.space_name;
      this.space_type = value.space_type;
      this.space_member_type = value.space_member_type;
      this.space_privacy = value.space_privacy;
      this.member_joined = value.member_joined;
      this.group_id = value.group_id
    },
    ShowPosts: function () {
      this.displayPinnedPost = false;
      this.displayPosts = true;
      var post_class = this.$refs.post.$el.classList;
      var pinned_post_class = this.$refs.pinnedPost.$el.classList;
      pinned_post_class.remove("current");
      post_class.add("current");
    },
    ShowPinnedPost: function () {
      this.displayPosts = false;
      this.displayPinnedPost = true;
      var post_class = this.$refs.post.$el.classList;
      var pinned_post_class = this.$refs.pinnedPost.$el.classList;
      pinned_post_class.add("current");
      post_class.remove("current");
    },
    
    // createPost: function () {
    //   console.log("space_id", this.selected.space_id);
    //   console.log("group_id", this.selected.group_id);

    //   var data = JSON.stringify({
    //     title: this.title,
    //     Body: this.body,
    //     is_comments_enabled: "True",
    //     is_liking_enabled: "True",
    //     space_id: this.selected.space_id,
    //     space_group_id: this.selected.group_id,
    //     notify_space_members: "False",
    //     post_type: "Post",
    //     // "space_name": "",
    //   });

    //   var config = {
    //     method: "post",
    //     mode: "no-cors",
    //     url: "atpace-community/user-posts/" + this.$store.state.id + "/",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     data: data,
    //   };

    //   axios(config)
    //     .then((response) => {
    //       console.log("Post Response", response.data);
    //       this.isHidden = false;
    //     })
    //     .catch((error) => {
    //       console.log("error", error);
    //       // this.isHidden = false;
    //     });
    // },
    // getSpace: function () {
    //   // var space_id = this.$route.params.id;
    //   this.$store.dispatch('hideModal')
    //   // this.show = true;
    //   // this.isHidden = true;
    //   var id = this.$store.state.id;
    //   axios
    //     .get("atpace-community/user-space/" + id + "/")
    //     .then((response) => {
    //       console.log("get spaces", response.data.data.user_space);
    //       this.user_spaces = response.data.data.user_space;
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // },
    // removePopup: function () {
    //   this.$store.dispatch('removemodal')
    //   this.isHidden = false;
    // },
    filterPost: function (){
      this.filterValue = this.$refs.selectedItem.value;
      // console.log("filter post",this.$refs.selectedItem.value)
    },
    joinSpace(group_id) {
      if (this.$store.state.id == null) {
        window.location.replace("/login");
      } else {
        console.log("space_group_id", group_id);
        var data = JSON.stringify({
          space_group_id: group_id,
          space_id: this.$route.params.id,
          user_type: "Member",
        });
        var config = {
          method: "post",
          mode: "no-cors",
          url: "atpace-community/user-space/" + this.$store.state.id + "/",
          headers: {
            "Content-Type": "application/json",
          },
          data: data,
        };

        axios(config)
          .then((response) => {
            console.log("Join Response", response.data);
            this.toast.info("Space Is joined");
            this.member_joined = true;
            // this.updatePage();
          })
          .catch((error) => {
            console.log("error", error);
            this.toast.error("Something Went Wrong");
          });
      }
    },
  },
  components: {
    MainPost
  },
};
</script>

<style scoped>
/* .modal {
  position: fixed;
  bottom: 23%; */
  /* bottom: 0; */
  /* right: 350px;
  width: 600px; */
  /* height:400px; */
  /* border: 2px solid #f1f1f1;
  z-index: 15;
} */


label#create_post {
  float: left;
  width: 30%;
  margin-right: 1%;
  margin-top: 9px;
}
textarea#comment,
select#space {
  border: 0px;
}
input[type="text"] {
  border: 0px;
}
#popup_close_icon {
  margin-top: -20px;
}


</style>

<!-- <style>
.modal {
 position: fixed;
 top: 50%;
 left: 50%;
 transform: translate(-50%, -50%);
 z-index: 99;
 
 width: 100%;
 max-width: 400px;
 background-color: #FFF;
 /* border-radius: 6px; */
 
 /* padding: 5px; */
 
}

.modal-container {
  max-width: 600px;
  padding: 10px;
  background-color: white;
}


</style> -->
