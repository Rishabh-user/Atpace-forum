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
                  i_color="#735cdf"
                  i_hover="#735cdf"
                  class="icon-folder-open-alt color_default"
                  style="font-size: 25px; color: #735cdf"
                ></i>
                </span
              ></span>
             
                {{ this.space_name }}
   
              <div v-if="(space_member_type == 'Admin' | space_member_type == 'Moderator') & member_joined == true">
                <router-link :to="{ name: 'NewEventPost', params: { id: $route.params.id } }"
                    style="float: right; padding: 7px 15px; background: #735cdf"
                    class="button small blue-button custom-button signup"
                    >New Event</router-link>
              </div>
              <div v-else-if="member_joined == true">
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
            </h2>
          </div>
          <ul class="tabs" style="margin-bottom:10px;">
            <li class="tab" style="list-style: none;">
              <router-link to="" @click="ShowUpcomingEvent()" class="current" ref="upcoming"
                >Upcoming</router-link
              >
            </li>
            <li class="tab" style="list-style: none;">
              <router-link to="" @click="ShowPastEvent()" class="" ref="past"
                >Past</router-link
              >
            </li>
            <li class="tab" style="list-style: none;">
              <router-link to="" @click="ShowMembers()" class="" ref="member"
                >Members</router-link
              >
            </li>
          </ul>
          <div v-if="displayMembers" style="">
              <input
                type="text"
                style="
                  border-radius: 5px;
                  margin-bottom: 0px;
                  background-color: #edeff2;
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
                  margin-bottom: 0px;
                  background-color: #edeff2;
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
                  margin-bottom: 0px;
                  background-color: #edeff2;
                  width: 100px;
                  display: inline-block;
                  margin: 8px;
                "
                placeholder="Location..."
                v-model="searchLocation"
                @input="getSearchLocation()"
              />
            </div>
          <br /><br />
          <div v-if="displayUpcomingEvent" class="tab-inner-warp">
            <div class="tab-inner">
              <EventPost @values="getName" eventType="upcoming"/>
            </div>
          </div>
          <div v-if="displayPastEvent" class="tab-inner-warp">
            <div class="tab-inner">
              <EventPost @values="getName" eventType="past"/>
            </div>
          </div>
          <div v-if="displayMembers" class="">
            <div class="tab-inner">
              <SingleMember
                :searchBioText="searchBioText"
                :searchLocationText="searchLocationText"
                :searchHeadlineText="searchHeadlineText"
                :searchValue="searchValue"
                is_group="No"
              />
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

import EventPost from "./EventPost.vue";
import { useToast } from "vue-toastification";
import SingleMember from "./SingleMember.vue";
import axios from "axios";


export default {
  name: "EventSpaceDetails",
  setup() {
    // Get toast interface
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      displayMembers: false,
      displayUpcomingEvent: true,
      displayPastEvent: false,
      isHidden: false,
      space_name: "",
      member_joined: "",
      space_type: "",
      space_member_type: "",
      group_id:"",
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
  mounted() {

  },
  watch: {
    $route() {
      this.isHidden = false;
    },
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
    getName(value) {
      console.log(value);
      this.space_name = value.space_name;
      this.space_type = value.space_type;
      this.space_member_type = value.space_member_type;
      this.space_privacy = value.space_privacy;
      this.member_joined = value.member_joined;
      this.group_id = value.group_id
    },

    ShowUpcomingEvent: function () {
      this.displayMembers = false;
      this.displayUpcomingEvent = true;
      this.displayPastEvent = false;
      var upcoming_class = this.$refs.upcoming.$el.classList;
      var member_class = this.$refs.member.$el.classList;
      var past_class = this.$refs.past.$el.classList;
      upcoming_class.add("current");
      member_class.remove("current");
      past_class.remove("current");
    },
    ShowPastEvent: function () {
      this.displayMembers = false;
      this.displayUpcomingEvent = false;
      this.displayPastEvent = true;
      var upcoming_class = this.$refs.upcoming.$el.classList;
      var member_class = this.$refs.member.$el.classList;
      var past_class = this.$refs.past.$el.classList;
      upcoming_class.remove("current");
      member_class.remove("current");
      past_class.add("current");
    },
    ShowMembers: function () {
      this.displayMembers = true;
      this.displayUpcomingEvent = false;
      this.displayPastEvent = false;
      var upcoming_class = this.$refs.upcoming.$el.classList;
      var member_class = this.$refs.member.$el.classList;
      var past_class = this.$refs.past.$el.classList;
      upcoming_class.remove("current");
      member_class.add("current");
      past_class.remove("current");
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
    EventPost,
    SingleMember,
  },
};
</script>

<style scoped>

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

<style>
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


</style>
