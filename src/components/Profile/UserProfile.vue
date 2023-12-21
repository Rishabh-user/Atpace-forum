<template>
  <div>
    <div class="row">
      <div class="user-profile">
        <div v-if="this.is_private == true">
          <div class="col-md-12">
            <div class="page-content page-shortcode">
              <div class="box_icon">
                <div class="t_center" style="margin: 10px">
                  <h3>{{name}}'s' profile is private</h3>
                  <p>You can see public profiles only.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="col-md-12">
            <div class="page-content">
              <h2>Profile</h2>
              <div v-if="$route.params.id != $store.state.id">
                <router-link
                  :to="{ name: 'Message', params: { id: $route.params.id } }"
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
              <div class="user-profile-img">
                <img :src="this.users.user_profile_image" alt="Image" />
              </div>
              <div style="margin-left: 130px">
                <span class="profile-name"
                  >{{ this.users.first_name }} {{ this.users.last_name }}</span
                ><br />
                <span class="profile-heading" v-if="users.profile_heading">{{
                  this.users.profile_heading
                }}<br /></span
                >
                <!-- <span class="member-since mgt-5"
                  ><i class="fa fa-birthday-cake"></i> Member For</span
                ><br /> -->
                <div class="social-icons mgt-5">
                  <span v-if="(users.linkedin_profile) && (! users.is_linkedin_private)"
                    ><a :href="users.linkedin_profile" target="_blank"
                      ><i class="icon-linkedin-sign"></i></a
                    >&nbsp;&nbsp;</span
                  >
                  <!-- <span> <i class="icon-twitter-sign"></i>&nbsp;&nbsp;</span>
                <span><i class="icon-github-sign"></i>&nbsp;&nbsp;</span> -->
                  <span v-if="users.location"><i class="fa fa-map-marker"></i> Location</span>
                </div>
                <!-- <div v-if="users.email">
                  <span class="mgt-5" 
                    ><i class="fa fa-envelope"></i> {{this.users.email}}</span
                  ><br>
                </div>
                <div v-if="users.phone">
                  <span class="mgt-5" 
                    ><i class="fa fa-phone-square"></i> {{this.users.phone}}</span
                    ><br>
                </div>
                <div v-if="users.expertize" class="mgt-5">
                  <i class="fa fa-graduation-cap" aria-hidden="true"></i> Expertise-
                  <span v-for="(expertize, index) in users.expertize" :key="index">&nbsp;{{expertize}}</span>
                </div>
                <div v-if="users.position" class="mgt-5">
                  <i class="fa fa-id-card-o" aria-hidden="true"></i> Position-
                  <span>&nbsp;{{users.position}}</span>
                </div> -->
                <div class="ul_list ul_list-icon-ok about-user">
                  <ul style="font-size: 15px">
                    <li v-if="(users.email) && (! users.is_email_private)">
                      <strong>Email : </strong>
                      <span>{{ this.users.email }}</span>
                    </li>
                    <li v-if="(users.phone) && (! users.is_phone_private)">
                      <strong>Phone : </strong>
                      <span>{{ this.users.phone }}</span>
                    </li>
                    <li v-if="users.expertize" style="text-transform: capitalize;">
                      <strong>Expertise : </strong>
                      <span v-for="(expertise, index) in users.expertize" :key="index">{{ expertise }}</span>
                    </li>
                  </ul>
                </div>
                <div v-if="users.about_us" class="mgt-5">
                <strong>About : </strong>
                <span>{{users.about_us}}</span>
                </div>
              </div>
              <div class="clearfix"></div>
            </div>
            <!-- End page-content -->
          </div>
          <div class="col-md-4">
            <div class="page-content">
              <h2>Points</h2>
              <center><span class="points"> {{points}}</span></center>
            </div>
          </div>
          <div class="col-md-8">
            <div class="page-content">
              <h2>Badges</h2>
              <div class="badge-container">
                <span v-for="(badge, index) in badges" :key="index">
                  <img v-if="index < 5" class="badge" alt="" :src="badge.badge_image" />
                </span>
              </div>
            </div>
          </div>
        <!-- End col-md-12 -->
        <!-- <div class="col-md-12">
        <div class="page-content page-content-user-profile">
          <div class="user-profile-widget">
            <h2>Profile Details</h2> -->
          <ProfileDetails />
          <br />
          <br /><br />
          <!-- </div> -->
          <!-- End user-profile-widget -->
          <!-- </div> -->
          <!-- End page-content -->
          <!-- </div> -->
          <!-- End col-md-12 -->
        </div>
      <!-- End user-profile -->
      </div>
    </div>
    <!-- End row -->
    <div class="clearfix"></div>
  </div>
  <!-- End page-content -->
</template>

<script>
import axios from "axios";
import ProfileDetails from "./ProfileDetails.vue";
export default {
  name: "UserProfileDetail",
  components: {
    ProfileDetails,
  },
  data() {
    return {
      users: [],
      points: '',
      badges: '',
      is_private: false,
      name : "",
    };
  },
  watch: {
    $route() {
      // console.log("from route", this.$route.name);
      if (this.$route.name == "UserProfileDetail") {
        this.getUserProfile();
        this.getPointsBadges();
      }
    },
  },
  mounted() {
    console.log("from mounted");
    this.getUserProfile();
    document.title = "Share@Pace";
    this.getPointsBadges();
  },
  methods: {
    getUserProfile: function () {
      var id = this.$route.params.id;
      console.log("user_id_profile", id);
      axios
        .get("api/user-profile/" + id + "/")
        .then((response) => {
          console.log("user profile", response.data.data);
          this.users = response.data.data;
          if(response.data.data.private_profile & (id != this.$store.state.id)){
            this.is_private = true
            this.name = response.data.data.first_name + " " + response.data.data.last_name
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getPointsBadges: function () {
      var id = this.$route.params.id;
      console.log("user id", id);
      axios
        .get("api/user-point/" + id + "/",
        {
          headers: {
          "Content-Type": "application/json",
          //"Authorization": "Token " + this.$store.state.token,
        },
        })
        .then((response) => {
          console.log("user points", response.data);
          this.points = response.data.total_points;
          this.badges = response.data.badges;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
<style scoped>
.badge-container {
  position: relative;
  width: 100%;
}

.badge {
  width: 20%;
  display: inline-block;
  padding-left: 15px;
  padding-right: 15px;
  height: 60px;
}
.points {
  font-size: 40px;
  font-weight: bold;
  margin-top: 10px;
}
.user-profile-img img {
  width: 110px;
  height: 110px;
  overflow: hidden;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 10%;
}
.profile-name {
  font-size: 35px;
  font-weight: bold;
}
.profile-heading {
  font-size: 24px;
}
.mgt-5 {
  margin-top: 5px;
}
</style>
