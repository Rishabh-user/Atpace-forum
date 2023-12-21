<template>
<div>
  <div v-if="members == ''">
    <div class="col-md-12">
      <div class="page-content page-shortcode" style="height: 100px">
        <div class="box_icon">
          <div class="t_center" style="">
            <h3>No Member</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-for="member in members" :key="member.id">
    <div class="col-md-12">
      <div class="page-content">
        <div class="user-profile-img">
          <img
            width="60"
            height="60"
            :src="member.usre_profile_image"
            alt="admin"
          />
        </div>
        <div class="ul_list ul_list-icon-ok about-user">
          <div v-if="member.user_id != $store.state.id">
            <router-link
              :to="{ name: 'Message', params: { id: member.user_id } }"
              style="
                float: right;
                padding: 7px 15px;
                background: #735cdf;
                border-radius: 8px;
              "
              class="button small blue-button custom-button signup"
              ><i class="icon-envelope"></i>Message</router-link
            >
          </div>
          <ul>
            <li id="member_name">
              <router-link
                :to="{
                  name: 'UserProfileDetail',
                  params: { id: member.user_id },
                }"
                ><h3 style="text-transform: capitalize">
                  {{ member.name }}
                </h3></router-link
              >
            </li>
            <li style="text-transform: capitalize">{{ member.heading }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from "axios";

export default {
  name: "SingleMember",
  data() {
    return {
      members: [],
    };
  },
  props: {
    searchBioText: String,
    searchLocationText: String,
    searchHeadlineText: String,
    searchValue: String,
    is_group: String
  },
  watch: {
    $route() {
      this.updatePage();
    },
    searchBioText: function () {
      console.log("search by bio", this.searchBioText);
      this.updatePage();
    },
    searchLocationText: function () {
      console.log("search by location", this.searchLocationText);
      this.updatePage();
    },
    searchHeadlineText: function () {
      console.log("search by headline", this.searchHeadlineText);
      this.updatePage();
    },
    searchValue: function () {
      console.log("search ", this.searchValue);
      this.updatePage();
    },
  },
  mounted() {
    this.updatePage();
  },
  methods: {
    updatePage() {
      console.log("group_id", this.$route.params.id);
      if(this.is_group == 'No'){
        var url = "atpace-community/event-space-member/"
      }
      else{
        url = "atpace-community/space-group-member/"
      }
      axios
        .get(url + this.$route.params.id, {
          params: {
            bio: this.searchBioText,
            heading: this.searchHeadlineText,
            location: this.searchLocationText,
            search: this.searchValue,
          },
        })
        .then((response) => {
          console.log("All_members ", response.data);
          if (response.data.message == "Content not available") {
            this.members = "";
          } else {
            this.members = response.data.data.all_group_members;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
#member-name {
  font-size: 40px;
  padding: 0px;
}
</style>
