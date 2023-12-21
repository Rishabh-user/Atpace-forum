<template>
  <!-- <div class="row"> -->
  <div class="user-profile">
    <div class="col-md-12">
      <div class="page-content page-content-user-profile">
        <div class="user-profile-widget">
          <h2>{{ this.group_name }}</h2>
          <div class="tabs-warp question-tab" style="margin-bottom: 0px">
            <ul class="tabs" style="list-style: none; margin-bottom: 0px">
              <li class="tab">
                <router-link
                  to=""
                  class="current"
                  @click="ShowPosts()"
                  ref="post"
                  >Posts</router-link
                >
              </li>
              <li class="tab">
                <router-link
                  to=""
                  @click="ShowSpaces()"
                  ref="space"
                  >Spaces</router-link
                >
              </li>
              <li class="tab">
                <router-link to="" class="" @click="ShowMembers()" ref="member"
                  >Members</router-link
                >
              </li>
              <li class="tab" v-show="$store.state.id">
                <router-link to="" class="" @click="ShowPinnedPost()" ref="pinnedPost"
                  >Pinned Post</router-link
                >
              </li>
            </ul>
            <div v-if="displaySpaces | displayPosts">
              <select
                name="space"
                id="space"
                ref="selectedItem"
                style="
                  width: 111px;
                  height: 42px;
                  background: white;
                  border-color: white;
                  float: right;
                "
                @change="filterPost()"
              >
                <option selected value="new">Latest</option>
                <option value="old">Oldest</option>
                <option value="alphabetical" v-if="displaySpaces">Alphabetically</option>
              </select>
            </div>
            <p class="login-text" style="float: right" v-if="displayMembers | displaySpaces">
              <i class="icon-search"></i>
              <input
                type="text"
                style="
                  border-radius: 10px;
                  background-color: white;
                  border-color: white;
                  margin-bottom: 0px;
                  width: 100px;
                "
                placeholder="Search"
                v-model="searchText"
                @input="getSearch()"
              />
            </p>
            <div v-if="displayMembers" style="">
              <input
                type="text"
                style="
                  border-radius: 5px;
                  background-color: white;
                  margin-bottom: 0px;
                  width: 100px;
                  display: inline-block;
                  margin: 8px;
                "
                placeholder="Bio..."
                v-model="searchBio"
                @input="getSearchBio()"
              />
              <input
                type="text"
                style="
                  border-radius: 5px;
                  background-color: white;
                  margin-bottom: 0px;
                  width: 100px;
                  display: inline-block;
                  margin: 8px;
                "
                placeholder="Headline..."
                v-model="searchHeadline"
                @input="getSearchHeadline()"
              />
              <input
                type="text"
                style="
                  border-radius: 5px;
                  background-color: white;
                  margin-bottom: 0px;
                  width: 100px;
                  display: inline-block;
                  margin: 8px;
                "
                placeholder="Location..."
                v-model="searchLocation"
                @input="getSearchLocation()"
              />
            </div>
          </div>
        </div>
        <!-- End user-profile-widget -->
      </div>
      <!-- End page-content -->
    </div>
    <div v-if="displayPosts" class="col-md-12">
      <div class="tab-inner-wrap">
        <div class="tab-inner">
          <MainPost
            @values="getName"
            :filterValue="filterValue"
            :searchValue="searchValue"
            post_type="group"
          />
        </div>
      </div>
    </div>
    <div v-if="displaySpaces" class="tab-inner-wrap">
      <div class="tab-inner">
        <SingleSpace
          @values="getName"
          :filterValue="filterValue"
          :searchValue="searchValue"
        />
      </div>
    </div>

    <div v-if="displayMembers" class="">
      <div class="tab-inner">
        <SingleMember
          :searchBioText="searchBioText"
          :searchLocationText="searchLocationText"
          :searchHeadlineText="searchHeadlineText"
          :searchValue="searchValue"
        />
      </div>
    </div>
    <div v-if="displayPinnedPost" class="col-md-12">
      <div class="tab-inner-wrap">
        <div class="tab-inner">
          <MainPost
            postType="pinned"
          />
        </div>
      </div>
    </div>
    <!-- End col-md-12 -->
  </div>
  <!-- End user-profile -->
  <!-- </div> -->
  <!-- End row -->
</template>

<script>
import SingleSpace from "./SingleSpace.vue";
import SingleMember from "./SingleMember.vue";
import MainPost from "./Post/MainPost.vue";
export default {
  name: "AllSpaces",
  data() {
    return {
      displaySpaces: false,
      displayMembers: false,
      displayPosts: true,
      displayPinnedPost: false,
      group_name: "",
      filterValue: "new",
      searchValue: "",
      searchBio: "",
      searchLocation: "",
      searchHeadline: "",
      searchBioText: "",
      searchHeadlineText: "",
      searchLocationText: "",
      searchText: "",
    };
  },
  methods: {
    getSearchBio: function () {
      // console.log("Biovalue", this.searchBio);
      this.searchBioText = this.searchBio;
    },
    getSearchLocation: function () {
      // console.log("value", this.searchLocation)
      this.searchLocationText = this.searchLocation;
    },
    getSearchHeadline: function () {
      // console.log("value", this.searchHeadline)
      this.searchHeadlineText = this.searchHeadline;
    },
    getSearch: function () {
      // console.log("value", this.searchText)
      this.searchValue = this.searchText;
    },
    filterPost: function () {
      this.filterValue = this.$refs.selectedItem.value;
      // console.log("filter post",this.$refs.selectedItem.value)
    },
    getName(value) {
      // console.log(value);
      this.group_name = value.group_name;
    },
    ShowSpaces: function () {
      this.displayMembers = false;
      this.displaySpaces = true;
      this.displayPosts = false;
      this.displayPinnedPost = false;
      console.log(this.$refs.space.$el.classList);
      var space_class = this.$refs.space.$el.classList;
      var member_class = this.$refs.member.$el.classList;
      var post_class = this.$refs.post.$el.classList;
      var pinned_post_class = this.$refs.pinnedPost.$el.classList;
      pinned_post_class.remove("current");
      space_class.add("current");
      member_class.remove("current");
      post_class.remove("current");
    },
    ShowMembers: function () {
      this.displaySpaces = false;
      this.displayMembers = true;
      this.displayPosts = false;
      this.displayPinnedPost = false;
      console.log(this.$refs.member.$el.classList);
      var member_class = this.$refs.member.$el.classList;
      var space_class = this.$refs.space.$el.classList;
      var post_class = this.$refs.post.$el.classList;
      var pinned_post_class = this.$refs.pinnedPost.$el.classList;
      pinned_post_class.remove("current");
      space_class.remove("current");
      member_class.add("current");
      post_class.remove("current");
    },
    ShowPosts: function () {
      this.displayMembers = false;
      this.displaySpaces = false;
      this.displayPosts = true;
      this.displayPinnedPost = false;
      console.log(this.$refs.space.$el.classList);
      var space_class = this.$refs.space.$el.classList;
      var member_class = this.$refs.member.$el.classList;
      var post_class = this.$refs.post.$el.classList;
      var pinned_post_class = this.$refs.pinnedPost.$el.classList;
      pinned_post_class.remove("current");
      space_class.remove("current");
      member_class.remove("current");
      post_class.add("current");
    },
    ShowPinnedPost: function () {
      this.displayMembers = false;
      this.displaySpaces = false;
      this.displayPosts = false;
      this.displayPinnedPost = true;
      console.log(this.$refs.space.$el.classList);
      var space_class = this.$refs.space.$el.classList;
      var member_class = this.$refs.member.$el.classList;
      var post_class = this.$refs.post.$el.classList;
      var pinned_post_class = this.$refs.pinnedPost.$el.classList;
      pinned_post_class.add("current");
      space_class.remove("current");
      member_class.remove("current");
      post_class.remove("current");
    },
  },
  components: {
    SingleSpace,
    SingleMember,
    MainPost,
  },
};
</script>

<style scoped>
.space-detail {
  position: relative;
  /* left:20%; */
  right: 40%;
  z-index: 999;
}
.row {
  margin-left: 0px;
  margin-right: 150px;
}

</style>
