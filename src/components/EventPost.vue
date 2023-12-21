<template>
  <div v-if="loading">
    <div class="loaderr"></div>
  </div>
  <div v-else>
    <div v-if="this.notLogin == true">
      <div class="col-md-12">
        <div class="page-content page-shortcode">
          <div class="box_icon">
            <div class="t_center" style="margin: 10px">
              <h3>Please login to view event!</h3>
              <p>Events will show up here.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="this.error == true">
      <div class="col-md-12">
        <div class="page-content page-shortcode">
          <div class="box_icon">
            <div class="t_center" style="margin: 10px">
              <h3>Internal Server Error</h3>
              <p>Please try again after some time.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="posts.length == 0">
      <div class="col-md-12">
        <div class="page-content page-shortcode" style="padding: 60px">
          <div class="box_icon" style="height: 40px">
            <div class="t_center" v-if="eventType == 'upcoming'">
              <h3>There are no upcoming events</h3>
              <p>Upcoming events will show up here.</p>
            </div>
            <div class="t_center" v-else style="margin: 10px">
              <h3>There are no past events</h3>
              <p>Past events will show up here.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div v-for="event in posts" :key="event.id">
        <div class="col-md-12" v-if="event.event.event_status == eventType">
          <div class="page-content" style="border-radius: 0px">
            <nav class="post_nav" style="display: block">
              <div
                class="three-dots"
                style="right: 20px !important; left: auto"
              >
                <ul>
                  <li>
                    <i class="fa fa-ellipsis-h"></i>
                    <ul>
                      <li v-if="event.space_privacy == 'Public'">
                        <router-link to="" @click="copyLink(event.id)"
                          ><i
                            class="fa-solid fa-copy"
                            style="font-size: 15px"
                          ></i>
                          Share</router-link
                        >
                      </li>
                      <li
                        v-if="(
                          ($store.state.id == event.created_by_id) |
                            (event.user_type == 'ProgramManager') |
                            (event.user_type == 'Admin') |
                            (event.user_type == 'Moderator')) &
                            (event.event.event_status == 'upcoming')
                        "
                      >
                        <router-link
                          :to="{
                            name: 'EditEventPost',
                            params: { id: event.id },
                          }"
                          ><i
                            class="fa-solid fa-edit"
                            style="font-size: 15px"
                          ></i>
                          Edit Event</router-link
                        >
                      </li>
                      <li
                        v-if="
                          ($store.state.id == event.created_by_id) |
                            (event.user_type == 'ProgramManager') |
                            (event.user_type == 'Admin') |
                            (event.user_type == 'Moderator')
                        "
                      >
                        <router-link to="" @click="deletePost(event.id)">
                          <i
                            class="fa-solid fa-trash"
                            style="font-size: 15px"
                          ></i>
                          Delete Event</router-link
                        >
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </nav>
            <div class="event-date">
              <h4 style="margin: 0px">{{ event.event.start_date }}</h4>
              <span>{{ event.event.start_month }}</span>
            </div>
            <div class="ul_list ul_list-icon-ok about-user">
              <div style="float: right">
                <div
                  class="member-profile-img"
                  v-for="member in event.event.members_joined"
                  :key="member.id"
                >
                  <img :src="member.profile_image" alt="admin" />
                </div>
                <div
                  class="member-joined-count"
                  v-if="event.event.members_joined_count > 0"
                >
                  <span style="padding: 2px 6px; color: white; line-height: 0.9"
                    >+{{ event.event.members_joined_count }}</span
                  >
                </div>
              </div>

              <ul>
                <router-link
                  :to="{ name: 'PostDetails', params: { id: event.id } }"
                  ><h3>{{ event.title }}</h3></router-link
                >
              </ul>
              <span
                ><i class="icon-calendar"></i> {{ event.event.start_time }} -
                {{ event.event.end_time }} - {{ event.created_by }}</span
              >
            </div>
          </div>
        </div>
      </div>
      <div v-if="!post_detail_page">
        <button v-if="loadMore" class="load-more-btn">
          <i class="icon-spinner"></i> Loading More
        </button>
        <button v-else class="load-more-btn" @click="loadMorePost">
          Load More
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useToast } from "vue-toastification";
import TimeAgo from "vue3-timeago";
export default {
  TimeAgo,
  name: "EventPost",
  setup() {
    // Get toast interface
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      posts: [],
      private: false,
      user_id: this.$store.state.id,
      isHidden: false,
      post_id: "",
      loading: false,
      error: false,
      last_route: localStorage.getItem("last_route"),
      page: "",
      post_detail_page: false,
      loadMore: false,
      notLogin: false,
    };
  },
  props: {
    profile_post: String,
    post_detail: String,
    eventType: String,
  },
  components: {
    // PostComment,
  },
  watch: {
    $route() {
      if (this.$route.name == "EventSpaceDetails") {
        this.updatePage();
      }
      // console.log("from route main post", this.$route.name);
    },
    eventType: function () {
      // console.log("in main post", val);
      this.updatePage();
    },
  },
  mounted() {
    this.updatePage();
    // document.title = "Community";
  },
  methods: {
    copyLink: function (post_id) {
      // console.log(post_id);
      navigator.clipboard.writeText(
        this.$store.state.frontend_base_url+"post-details/" + post_id
      );
      this.toast.info("Link Copied Successfully");
    },
    deletePost(id) {
      // bootbox.alert("Your message here…")
      if (confirm("Do you really want to delete the post?"))
        axios
          .delete("atpace-community/user-post/" + id + "/", {
            params: { user_id: this.$store.state.id },
          })
          .then((resp) => {
            console.log("response", resp.data);
            this.toast.info("Event Deleted Successfully");
            if (this.$route.name == "PostDetails") {
              this.$router.push(this.last_route);
            }
            this.updatePage();
          })
          .catch((error) => {
            console.log(error);
          });
    },
    ShowComments: function () {
      this.displayComments = true;
    },
    loadMorePost() {
      this.loadMore = true;
      // var url = "atpace-community/public-posts/";
      var url = "atpace-community/create-event-post/" + this.user_id + "/";
      this.page++;
      axios
        .get(url, {
          params: {
            space_id: this.$route.params.id,
            user_id: this.$store.state.id,
            page: this.page,
            order_by: this.eventType,
            timezone: this.$store.state.timezone
          },
        })
        .then((response) => {
          console.log("All_posts event ", response.data);
          if (response.data.message == "Content not available") {
            this.post_detail_page = true;
            this.loadMore = false;
          } else {
            for (let i = 0; i < response.data.data.public_post.length; i++) {
              this.posts.push(response.data.data.public_post[i]);
            }
            if (response.data.data.pages.total_pages == this.page) {
              this.post_detail_page = true;
            }
            this.$emit("values", {
              space_name: response.data.data.space_name,
              space_privacy: response.data.data.space_privacy,
              member_joined: response.data.data.is_joined,
              group_id: response.data.data.space_group_id,
              space_type: response.data.data.space_type,
              space_member_type: response.data.data.space_member_type,
            });
            this.error = false;

            console.log("this.post after pushing", this.posts);
            this.loadMore = false;
          }
        })
        .catch((error) => {
          console.log("space private error", error);
          this.error = true;
        })
        .finally(() => (this.loading = false));
    },

    updatePage() {
      var user_id = this.$store.state.id;
      if(! user_id){
        this.notLogin = true;
      }
      else{
        this.notLogin = false;
        this.post_detail_page = false;
        var space_id = this.$route.params.id;
        var url = "atpace-community/create-event-post/" + this.user_id + "/";
        this.loading = true;
        this.page = 1;
        axios
          .get(url, {
            params: {
              space_id: space_id,
              user_id: user_id,
              page: this.page,
              order_by: this.eventType,
              timezone: this.$store.state.timezone
            },
          })
          .then((response) => {
            console.log("All_posts event 202", response.data);
            this.$emit("values", {
              space_name: response.data.data.space_name,
              space_privacy: response.data.data.space_privacy,
              member_joined: response.data.data.is_joined,
              group_id: response.data.data.space_group_id,
              space_type: response.data.data.space_type,
              space_member_type: response.data.data.space_member_type,
            });
            if (response.data.data.space_name == null) {
              document.title = "Growatpace | Share@Pace";
            } else {
              document.title = response.data.data.space_name + " | Share@Pace";
            }
            this.error = false;

            this.posts = response.data.data.public_post;
            if(this.posts.length > 0){
              if (response.data.data.pages.total_pages == this.page) {
              this.post_detail_page = true;
            }
            }
          })
          .catch((error) => {
            console.log("space private error", error.response);
            this.error = true;
          })
          .finally(() => (this.loading = false));
      }
    }
  },
};
</script>

<style scoped>
.three-dots {
  float: right;
  font-size: 12px;
  /* background-color: #2f3239; */
  padding: 4px 50px;
  position: relative;
  /* top: -20px; */
  right: 40px;
  height: 23px;
  line-height: 15px;
}

.three-dots i {
  color: black;
  font-size: 20px;
}

.three-dots :hover {
  color: #735cdf;
}

.three-dots ul li ul li :hover {
  background: #735cdf;
  color: white;
}
.three-dots ul li {
  list-style: none;
}
@media screen and (min-width: 480px) {
  .attach-img-size {
    max-width: 400px;
    max-height: 400px;
  }
  .pdf-size {
    margin-bottom: 10px;
    width: 600px;
  }
  .question-desc p img {
    max-width: 400px;
    max-height: 400px;
  }
  .load-more-btn {
    width: 960px;
    color: white;
    background-color: #735cdf;
    padding: 5px;
    font-size: 15px;
    font-weight: bold;
    border-radius: 13px;
  }
}
@media screen and (max-width: 480px) {
  .attach-img-size {
    max-width: 280px;
    max-height: 280px;
  }
  .pdf-size {
    margin-bottom: 10px;
    width: 300px;
  }
  .load-more-btn {
    width: 360px;
    color: white;
    background-color: #735cdf;
    padding: 5px;
    font-size: 15px;
    font-weight: bold;
    border-radius: 13px;
  }
}

.question-inner p ul li {
  list-style: circle;
  list-style-type: circle;
  list-style-position: outside;
}
</style>

<style scoped>
.post_nav ul > li ul {
  border-radius: 10px;
  left: -50px;
  z-index: 1015;
}

.post_nav {
  float: right;
}
.post_nav > ul li {
  float: left;
  line-height: 1;
  position: relative;
  height: 100%;
  font-size: 14px;
  font-weight: bold;
  margin-top: 25px;
  margin-right: 5px;
}
.post_nav > ul li:last-child {
  margin-right: 0;
}
.post_nav > ul > li > a {
  display: block;
  position: relative;
  float: left;
  padding: 0 9px;
  line-height: 36px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
}
.post_nav li:hover ul {
  display: block;
  top: 0;
  background-color: #fff;
  -moz-box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
}
.post_nav > ul > li:hover > ul {
  top: 36px;
}
.post_nav li ul li ul {
  position: absolute;
  left: 201px;
  margin-top: -1px;
}
.post_nav ul > li > ul > li {
  float: none;
  border: none;
  margin: 0;
}
.post_nav ul > li ul {
  display: none;
  position: absolute;
  left: 0;
  top: 100%;
  z-index: 993;
  width: 200px;
}
.post_nav li ul li a {
  height: inherit;
  float: inherit;
  text-align: left;
  line-height: 35px;
  display: block;
  margin: 0 !important;
  padding: 0 15px;
  z-index: 993;
  color: #2f3239;
  font-size: 13px;
  font-weight: normal;
}
.post_nav li > ul,
.post_nav li > ul li > ul,
.post_nav li ul li ul {
  display: none;
  overflow: hidden;
}
.post_nav ul > li ul li {
  position: relative;
  float: none;
  line-height: 35px;
  height: 35px;
}
.menu-nav-arrow {
  margin-left: 5px;
}
.post_nav ul > li ul li .menu-nav-arrow {
  float: right;
}

@media only screen and (min-width: 452px) and (max-width: 767px) {
  .question-author {
    top: 89px;
  }
  #post_title {
    max-width: 400px;
    word-wrap: break-word;
  }
}

.question-desc a {
  color: blue;
}
.question-desc ul li {
  margin-left: 5px;
}
</style>
