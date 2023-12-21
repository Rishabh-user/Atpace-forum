<template>
  <header id="header" class="header_light">
    <section class="container clearfix" style="">
      <div class="col-md-3">
        <div class="logo">
          <router-link to="/"
            ><img alt="" src="/assets/images/logo.png"
          /></router-link>
        </div>
      </div>
      <div class="col-md-5" style="margin-top: 25px">
        <div class="form-style form-style-3">
          <form class="navbar-form navbar-left">
            <div class="form-inputs clearfix">
              <p class="login-text">
                <input
                  type="text"
                  style="
                    border-radius: 10px;
                    background-color: #edf2f7;
                    border-color: #edf2f7;
                  "
                  placeholder="Search"
                  v-model="searchText"
                  @input="getSearch()"
                />
                <i class="icon-search"></i>
              </p>
              <!-- <div v-if="loading">
                    <div class="loaderr"></div>
                  </div>
                  <div v-else> -->
              <div v-if="isSearchText == 'data'">
                <div v-if="loading">
                  <div class="loaderr"></div>
                </div>
                <div v-else>
                  <div v-if="results.length != 0">
                    <ul id="myUL">
                      <div v-for="result in results" :key="result.id">
                        <div v-if="result.type == 'user'">
                          <router-link
                            :to="{
                              name: 'UserProfileDetail',
                              params: { id: result.id },
                            }"
                          >
                            <li>
                              {{ result.name }}<kbd>{{ result.type }}</kbd>
                            </li>
                          </router-link>
                        </div>
                        <div v-else>
                          <router-link
                            :to="{
                              name: 'PostDetails',
                              params: { id: result.id },
                            }"
                          >
                            <li>{{ result.name }}<kbd>Post</kbd></li>
                          </router-link>
                        </div>
                      </div>
                    </ul>
                  </div>
                  <div v-else>
                    <ul id="myUL">
                      <li><p>No data found</p></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="col-md-4">
        <nav class="navigation" style="margin-right:80px;">
          <ul>
            <li id="bell" v-if="$store.state.id">
              <router-link to="/get-notification"
                ><i class="icon-bell"></i
              ></router-link>
              <span
                class="label our_background_color"
                style="
                  position: absolute;
                  top: 9px;
                  right: 7px;
                  text-align: center;
                  font-size: 9px;
                  padding: 2px 3px;
                  line-height: 0.9;
                  background: #735cdf;
                "
                >{{ this.noti_count }}</span
              >
            </li>
            <li id="bell" v-if="$store.state.id">
              <router-link to="/message"
                ><i class="icon-comments-alt"></i
              ></router-link>
            </li>
            <li v-if="!$store.state.id">
              <router-link to="/login">Login</router-link>
            </li>
            <li v-if="!$store.state.id">
              <router-link to="/signup">Signup</router-link>
            </li>
            <li v-if="$store.state.id">
              <a>{{ $store.state.FirstName }} </a>
              <ul>
                <li>
                  <router-link
                    :to="{
                      name: 'UserProfileDetail',
                      params: { id: $store.state.id },
                    }"
                    >My Profile</router-link
                  >
                </li>
                <li>
                  <router-link
                    :to="{
                      name: 'EditProfileDetail',
                      params: { id: $store.state.id },
                    }"
                    >Edit Profile</router-link
                  >
                </li>
                <li>
                  <router-link to="/review-content"
                    >Content In Review</router-link
                  >
                </li>
                <li>
                  <router-link
                    :to="{
                      name: 'ChangePassword',
                      params: { id: $store.state.id },
                    }"
                    >Change Password</router-link
                  >
                </li>
                <li>
                  <router-link to="/logout">Logout</router-link>
                </li>
              </ul>
            </li>
            <li>
              <!-- <div id="google_translate_element" class="google-translate-div">
            </div> -->
            </li>
          </ul>
        </nav>
      </div>
    </section>
    <!-- End container -->
  </header>
</template>

<script>
import axios from "axios";
// import SideNavbar from "./SideNavbar.vue";

export default {
  name: "NavigationBar",
  components: {
    // NewPost,
    // SideNavbar
  },
  data() {
    return {
      // user:null
      searchText: "",
      results: [],
      isSearchText: "no data",
      noti_count: "",
      loading: false,
    };
  },
  watch: {
    $route() {
      this.isSearchText = "no data";
      // if ((this.$route.name != "NewPost") & (this.$route.name != "EditPost")) {
        // console.log("route changed");
        // this.getNotificationCount();
      // }
    },
  },
  mounted() {
    // console.log("mounted")
    this.getNotificationCount();
  },
  methods: {
    getNotificationCount() {
      // console.log("method calling")
      if (this.$store.state.id) {
        axios
          .get(
            "atpace-community/notificaton-count/" + this.$store.state.id + "/"
          )
          .then((response) => {
            // console.log("Notification Count ", response.data.data.notification_count);
            this.noti_count = response.data.data.notification_count;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    getSearch: function () {
      this.loading = true;
      // console.log("search", this.searchText);
      if (this.searchText == "") {
        this.isSearchText = "no data";
      } else {
        axios
          .get("atpace-community/search-content/", {
            params: { search: this.searchText, user_id: this.$store.state.id },
          })
          .then((response) => {
            console.log(
              "search response ",
              response.data.data.user_search_data
            );
            this.results = response.data.data.user_search_data;

            // console.log("success",this.success)
          })
          .catch((error) => {
            console.log(error);
            // this.success = false
          })
          .finally(() => (this.loading = false));
        this.isSearchText = "data";
      }
    },
  },
};
</script>
<style scoped>
#myUL {
  /* Remove default list styling */
  box-shadow: 0 0 0 1px rgba(136, 152, 170, 0.1),
    0 15px 35px 0 rgba(49, 49, 93, 0.1), 0 5px 15px 0 rgba(0, 0, 0, 0.08);
  list-style-type: none;
  padding: 10px;
  margin: 0;
  z-index: 99999;
  background: #ffffff;
  position: absolute;
  width: 95%;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  max-height: 400px;
  overflow-y: scroll;
  overflow-x: hidden;
}

#myUL li {
  /* border: 1px solid #ddd; */
  margin-top: -1px; /* Prevent double borders */
  background-color: #ffffff; /* Grey background color */
  padding: 10px; /* Add some padding */
  text-decoration: none; /* Remove default text underline */
  font-size: 14px; /* Increase the font-size */
  color: black; /* Add a black text color */
  display: block; /* Make it into a block element to fill the whole list */
}
#myUL li a {
  color: black;
  padding: 8px;
}

#myUL li button {
  display: block;
  float: right;
}

#myUL li:hover {
  background-color: #735cdf;
  color: white;
  /* margin: 7px; */
  border-radius: 8px;
}
#myUL li:hover a {
  color: white;
}

#myUL li:last-child {
}
#header {
  /* position: sticky; */
  top: 0;
  height: auto;
  /* background-color: red; */
  color: #fff;
}

#bell {
  /* margin-top:15px; */
  /* position:relative; */
  /* top:37px; */
  /* padding-top: 40px; */
  /* display:inline; */
  /* padding-left:100px; */
  font-size: 1.3em;
}
</style>
