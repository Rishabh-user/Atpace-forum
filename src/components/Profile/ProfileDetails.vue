<template>
      <div class="col-md-12">
        <div class=" page-content-user-profile">
          <div class="user-profile-widget">
            <h2>Profile Details</h2>
            <div class="tabs-warp question-tab">
              <ul class="tabs" style="list-style: none;">
                  <li class="tab">
                    <router-link to="" id="posts" @click="ShowPosts()" ref="post" class="current">Posts</router-link>
                  </li>
                  <li class="tab">
                    <router-link to=""  id="comments"  @click="ShowComments()" ref="comment" class="">Comments</router-link>
                  </li>
                  <li class="tab">
                      <router-link to="" id="space" @click="ShowSpaces()" ref="space" class="">Spaces</router-link>
                  </li>
                  <li class="tab" v-if="$store.state.id ==  $route.params.id">
                      <router-link to="" id="saved" @click="ShowSaved()" ref="saved" class="">Saved Post</router-link>
                  </li>
                  <li class="tab" v-if="$store.state.id ==  $route.params.id">
                      <router-link to="" id="pinned" @click="ShowPinned()" ref="pinned" class="">Pinned Post</router-link>
                  </li>
              </ul>
              <div v-if="displayPosts" class="tab-inner-warp">
                <div class="tab-inner">
                  <MainPost profile_post="user"/>
                </div>
              </div>
              <div v-if="displayComments" class="tab-inner-warp">
                <div class="tab-inner">
                  <PostComments :is_display = "this.is_display"/>
                </div>
              </div>
              <div v-if="displaySpaces" class="tab-inner-warp">
                <div class="tab-inner">
                  <UserSpaces />
                </div>
              </div>
              <div v-if="displaySaved" class="tab-inner-warp">
                <div class="tab-inner">
                  <MainPost profile_post="saved"/>
                </div>
              </div>
              <div v-if="displayPinned" class="tab-inner-warp">
                <div class="tab-inner">
                  <MainPost profile_post="pinned"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
 
   
</template>



<script>
// import { memberExpression } from "@babel/types";
import MainPost from "../Post/MainPost.vue";
import PostComments from "../PostComments.vue";
import UserSpaces from "./UserSpaces.vue";
export default {
    name: "ProfileDetails",
    components: { 
      MainPost,
      PostComments, 
      UserSpaces 
    },
    data() {
        return {
            displayPosts: true,
            displaySpaces: false,
            displayComments: false,
            displaySaved: false,
            displayPinned: false,
            is_display:"True",
        }
    },
    methods: {
        ShowPosts: function () {
            this.displayPosts = true;
            this.displayComments = false;
            this.displaySpaces = false;
            this.displaySaved = false;
            this.displayPinned = false;
            console.log("showPost")
            var space_class = this.$refs.space.$el.classList;
            var post_class = this.$refs.post.$el.classList;
            var comment_class = this.$refs.comment.$el.classList;
            post_class.add("current")
            space_class.remove("current")
            comment_class.remove("current")
            var saved_class = this.$refs.saved.$el.classList;
            saved_class.remove("current")
            var pinned_class = this.$refs.pinned.$el.classList;
            pinned_class.remove("current")
        },
        ShowComments: function () {
            this.displaySpaces = false;
            this.displayComments = true;
            this.displayPosts = false;
            this.displaySaved = false;
            this.displayPinned = false;
            console.log("showComments")
            var space_class = this.$refs.space.$el.classList;
            var post_class = this.$refs.post.$el.classList;
            var comment_class = this.$refs.comment.$el.classList;
            comment_class.add("current")
            space_class.remove("current")
            post_class.remove("current")
            var saved_class = this.$refs.saved.$el.classList;
            saved_class.remove("current")
            var pinned_class = this.$refs.pinned.$el.classList;
            pinned_class.remove("current")
        },
        ShowSpaces: function () {
            this.displaySpaces = true;
            this.displayComments = false;
            this.displayPosts = false;
            this.displaySaved = false;
            this.displayPinned = false;
            console.log("ShowSpaces")
            var space_class = this.$refs.space.$el.classList;
            var post_class = this.$refs.post.$el.classList;
            var comment_class = this.$refs.comment.$el.classList;
            space_class.add("current")
            post_class.remove("current")
            comment_class.remove("current")
            var saved_class = this.$refs.saved.$el.classList;
            saved_class.remove("current")
            var pinned_class = this.$refs.pinned.$el.classList;
            pinned_class.remove("current")
            
        },
        ShowSaved: function () {
            this.displaySpaces = false;
            this.displayComments = false;
            this.displayPosts = false;
            this.displaySaved = true;
            this.displayPinned = false;
            console.log(this.$refs.space.$el.classList)
            var space_class = this.$refs.space.$el.classList;
            var post_class = this.$refs.post.$el.classList;
            var comment_class = this.$refs.comment.$el.classList;
            var saved_class = this.$refs.saved.$el.classList;
            space_class.remove("current")
            post_class.remove("current")
            comment_class.remove("current")
            saved_class.add("current")
            var pinned_class = this.$refs.pinned.$el.classList;
            pinned_class.remove("current")
            
        },
        ShowPinned: function () {
            this.displaySpaces = false;
            this.displayComments = false;
            this.displayPosts = false;
            this.displaySaved = false;
            this.displayPinned = true;
            console.log(this.$refs.space.$el.classList)
            var space_class = this.$refs.space.$el.classList;
            var post_class = this.$refs.post.$el.classList;
            var comment_class = this.$refs.comment.$el.classList;
            var saved_class = this.$refs.saved.$el.classList;
            space_class.remove("current")
            post_class.remove("current")
            comment_class.remove("current")
            saved_class.remove("current")
            var pinned_class = this.$refs.pinned.$el.classList;
            pinned_class.add("current")
            
        },
    },
};
</script>
