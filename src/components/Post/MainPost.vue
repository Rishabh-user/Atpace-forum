<template>
  <div v-if="loading">
    <div class="loaderr"></div>
  </div>
  <div v-else>
    <div v-if="this.private == true">
      <div class="col-md-12">
        <div class="page-content page-shortcode">
          <div class="box_icon">
            <span class="t_center icon_i"
              ><span icon_size="60">
                <i
                  class="fa-solid fa-lock fa-3x"
                  style="margin-bottom: 25px"
                ></i>
              </span>
            </span>
            <div class="t_center" style="margin: 10px">
              <h3>This is a member only area - interested to join see below</h3>
              <p>Join the space to see post</p>
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
              <p>Please try again after some time</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="posts.length == 0">
      <div class="col-md-12">
        <div class="page-content page-shortcode">
          <div class="box_icon" style="height: 40px">
            <div class="t_center">
              <h3>No Post</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div v-for="post in posts" :key="post.id">
        <article class="question question-type-normal">
          <div v-if="post.cover_image" style="margin-bottom: 15px">
            <img :src="post.cover_image" style="max-width: 100%" />
          </div>

          <nav
            class="post_nav"
            style="display: block"
          >
            <div class="three-dots" style="right: 20px !important; left: auto">
              <ul>
                <li>
                  <i class="fa fa-ellipsis-h"></i>
                  <ul>
                    <li v-if="post.space_privacy == 'Public'">
                      <router-link to="" @click="copyLink(post.id)"
                        ><i
                          class="fa-solid fa-copy"
                          style="font-size: 15px"
                        ></i>
                        Share</router-link
                      >
                    </li>
                    <li
                      v-if="
                        (($store.state.id == post.created_by_id) |
                          (post.user_type == 'ProgramManager') |
                          (post.user_type == 'Admin') |
                          (post.user_type == 'Moderator')) & 
                          (post.post_type != 'Event')
                      "
                    >
                      <router-link
                        :to="{ name: 'EditPost', params: { id: post.id } }"
                        ><i
                          class="fa-solid fa-edit"
                          style="font-size: 15px"
                        ></i>
                        Edit Post</router-link
                      >
                    </li>
                    <li
                      v-if="
                        ($store.state.id == post.created_by_id) |
                          (post.user_type == 'ProgramManager') |
                          (post.user_type == 'Admin') |
                          (post.user_type == 'Moderator')
                      "
                    >
                      <router-link to="" @click="deletePost(post.id)">
                        <i
                          class="fa-solid fa-trash"
                          style="font-size: 15px"
                        ></i>
                        Delete Post</router-link
                      >
                    </li>
                    <div v-if="$store.state.id">
                      <li v-if="$store.state.id != post.created_by_id">
                        <router-link
                          :to="{ name: 'ReportPost', params: { id: post.id } }"
                        >
                          <i
                            class="fa-solid fa-flag"
                            style="font-size: 15px"
                          ></i>
                          Report Post</router-link
                        >
                      </li>
                      <li v-if="$store.state.id != post.created_by_id">
                        <router-link
                          to=""
                          v-if="post.is_user_saved"
                          @click="savePost(post.id)"
                        >
                          <i
                            :ref="'save_icon' + post.id"
                            class="fa-solid fa-bookmark"
                            style="font-size: 15px"
                          ></i>
                          <span :ref="'save_' + post.id">
                            Saved</span
                          ></router-link
                        >
                        <router-link to="" v-else @click="savePost(post.id)"
                          ><i
                            :ref="'save_icon' + post.id"
                            class="fa-regular fa-bookmark"
                            style="font-size: 15px"
                          ></i
                          ><span :ref="'save_' + post.id">
                            Save Post</span
                          ></router-link
                        >
                      </li>
                      <li v-if="($store.state.id) && ($route.params.id)">
                      <!-- <li v-if="($store.state.id)"> -->
                        <router-link to="" @click="pinToTop(post.id)"
                          ><i
                            :ref="'pin_icon' + post.id"
                            class="icon-pushpin"
                            style="font-size: 15px"
                          ></i
                          >&nbsp;<span :ref="'pin_' + post.id" v-if="post.is_pinned">Unpin Post</span
                          >
                          <span :ref="'pin_' + post.id" v-else>
                            Pin To Top</span
                          ></router-link
                        >
                      </li>
                    </div>
                  </ul>
                </li>
              </ul>
            </div>
          </nav>
          <div style="margin-bottom: 20px" v-if="post.post_type == 'Event'">
            <span
              v-if="post.event.event_status == 'past'"
              class="event-end-date"
            >
              <span>ended {{ post.event.ago_time }} ago </span>
              <!-- <span v-else>starting in  {{post.event.ago_time}}</span> -->
            </span>
          </div>
          <h2 style="margin-left: 0 px">
            <router-link
              :to="{ name: 'PostDetails', params: { id: post.id } }"
              >{{ post.title }}</router-link
            >
          </h2>

          <a
            style="position: absolute"
            href=""
            original-title="ahmed"
            class="user-profile-img tooltip-n"
            ><img alt="" :src="post.user_profile_image"
          /></a>

          <h3
            style="
              font-size: 18px;
              margin: 10px 0 30px 60px;
              padding-top: 10px;
              padding-left: 3px;
              text-transform: capitalize;
            "
          >
            <router-link
              :to="{
                name: 'UserProfileDetail',
                params: { id: post.created_by_id },
              }"
            >
              &nbsp;&nbsp;{{ post.created_by }}
            </router-link>
            <p style="font-size: 12px; margin: 0" class="date">
              &nbsp;&nbsp;<i class="icon-time"></i>&nbsp;&nbsp;{{
                post.created_at
              }}
            </p>
          </h3>
          <div style="margin-bottom: 20px" v-if="post.post_type == 'Event'">
            <span><b>Location - </b>{{ post.event.location }} </span><br>
            <span v-if="post.event.location != 'In person'"><b>Joining Url - </b><a v-bind:href="post.event.event_url" target="_blank">{{ post.event.event_url }} </a></span>
            <!-- <div><b>Attendees - </b>
              <div class="member-profile-img" v-for="member in post.event.members_joined" :key="member.id">
                  <img
                    :src="member.profile_image"
                    alt="admin"
                  />
                </div>
                <div class="member-joined-count" v-if="post.event.members_joined_count > 0">
                <span style="
                  padding: 2px 6px;
                  color: white;
                  line-height: 0.9;
                ">+{{ post.event.members_joined_count }}</span>
                </div>
              </div> -->
          </div>

          <div class="question-inner">
            <div v-if="post.description.length <= 500">
              <p
                style="font-size: 15px; color: #343634"
                v-html="post.description"
                class="question-desc"
              ></p>
            </div>
            <div v-else>
              <p
                :ref="'showless_' + post.id"
                style="font-size: 15px; color: #343634"
                v-html="post.description.substr(0, 500) + '.....'"
                class="question-desc"
              ></p>
              <p
                :ref="'showmore_' + post.id"
                style="font-size: 15px; color: #343634; display: none"
                v-html="post.description"
                class="question-desc"
              ></p>
              <label
                @click="showMore(post.id)"
                class="btn btn-primary"
                :ref="'showmorebtn_' + post.id"
                ><strong>See more</strong></label
              >
              <label
                @click="showLess(post.id)"
                style="display: none"
                class="btn btn-primary"
                :ref="'showlessbtn_' + post.id"
                ><strong>See less</strong></label
              >
            </div>
            <div class="line"></div>
            <div class="question-desc" v-if="post.attachments.length > 0">
              <div v-for="attachment in post.attachments" :key="attachment.id">
                <img
                  style="margin-bottom: 10px"
                  class="attach-img-size"
                  v-if="attachment.image"
                  :src="attachment.image"
                  ref="image"
                />
                <div v-if="attachment.file">
                  <div
                    v-if="attachment.file.split('.')[4] == 'mp4'"
                    style="margin-bottom: 10px"
                  >
                    <video width="320" height="240" controls>
                      <source :src="attachment.file" type="video/mp4" />
                    </video>
                  </div>
                  <div v-else class="page-content page-shortcode pdf-size">
                    <router-link
                      :to="{
                        name: 'AttachmentDetail',
                        params: { name: attachment.file.split('/')[5] },
                      }"
                    >
                      <div class="box_icon" style="height: 40px">
                        <span class="icon_i" style="display: inline"
                          ><span icon_align="left">
                            <!-- <i class="far fa-file-pdf"></i> -->
                            <i class="fa-solid fa-file"></i> </span
                        ></span>
                        <div class="box_text">
                          <h3>{{ attachment.file.split("/")[5] }}</h3>
                        </div>
                      </div>
                    </router-link>
                  </div>
                </div>
              </div>
              <div class="line"></div>
            </div>

            <span
              class="question-category span-like"
              style=""
              @click="postLike(post.id, 'like_' + post.id)"
              v-if="post.is_user_like == false"
            >
              <i class="fa-regular fa-thumbs-up" :ref="'like_' + post.id"></i>
              <span
                :ref="'like_count_' + post.id"
                v-show="post.likes_count > 0"
                >{{ post.likes_count }}</span
              >
              Like
            </span>

            <span
              class="question-category span-like"
              @click="postLike(post.id, 'like_' + post.id)"
              v-if="post.is_user_like == true"
            >
              <i class="fa-solid fa-thumbs-up" :ref="'like_' + post.id"></i>
              <span
                :ref="'like_count_' + post.id"
                v-show="post.likes_count > 0"
                >{{ post.likes_count }}</span
              >
              Like
            </span>
            <span class="question-comment span-like">
              <i class="icon-comment"></i
              ><span v-show="post.total_comments > 0">{{
                post.total_comments
              }}</span
              >&nbsp;
              <router-link
                v-if="$store.state.id == null"
                to="/login"
                style="float: revert; font-size: 15px"
              >
                Comment</router-link
              >
              <router-link
                v-else
                :to="{ name: 'PostDetails', params: { id: post.id } }"
                style="float: revert; font-size: 15px"
              >
                Comment</router-link
              >
            </span>
            <div class="clearfix"></div>
          </div>
        </article>
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
  name: "MainPost",
  setup() {
    // Get toast interface
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      posts: [],
      private: false,
      displayComments: false,
      post_like: "",
      is_like: "",
      user_id: this.$store.state.id,
      like_post_id: "",
      text: "Like",
      isHidden: false,
      report_types: [],
      report_reason: "",
      post_id: "",
      span_like_count: "",
      span_like: "",
      is_like_zero: "",
      text_save: "",
      filter: "new",
      loading: false,
      error: false,
      last_route: localStorage.getItem("last_route"),
      page: "",
      loadMore: false,
      post_detail_page: false,
      headers :""
    };
  },
  props: {
    profile_post: String,
    post_detail: String,
    filterValue: String,
    postType: String,
  },
  components: {
    // PostComment,
  },
  watch: {
    $route() {
      if (this.$route.name == "SpaceDetails" | "AllSpaces") {
        this.updatePage();
      }
      // console.log("from route main post", this.$route.name);
    },
    filterValue: function () {
      // console.log("in main post", val);
      this.updatePage();
    },
  },
  mounted() {
    // document.icon = '../../assets/favicon.png';
    this.updatePage();
    // document.title = "Community";
  },
  methods: {
    ShowComments: function () {
      this.displayComments = true;
    },
    loadMorePost() {
      this.filter = this.filterValue;
      if (this.$route.name == "AllSpaces") {
        this.loadMore = true;
        var url = "atpace-community/public-posts/";
        this.page++;
        if(this.postType == "pinned"){
          url = "atpace-community/pinned-post/"+this.$store.state.id+"/",
          this.headers=  {
              "Content-Type": "application/json",
              "Authorization": "Token " + this.$store.state.token,
            }
        }
        else{
            url = "atpace-community/public-posts/";
            this.headers= {
              "Content-Type": "application/json",
            }
        }
        var config = {
            method: "get",
            mode: "no-cors",
            url: url,
            headers: this.headers,
            params: {
              group_id: this.$route.params.id,
              user_id: this.$store.state.id,
              order_by: this.filterValue,
              page: this.page,
              timezone: this.$store.state.timezone
            },
          };
        console.log("group paost 12233", this.$route.params.id,this.$store.state.id, this.filterValue, this.page)
        axios(config)
          .then((response) => {
            console.log("All group posts event ", response.data);
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
                //group_name: response.data.data.group_name,
                //group_privacy: response.data.data.group_privacy,
                member_joined: response.data.data.is_joined,
                group_id: response.data.data.space_group_id,
              });
              this.error = false;
              // if (
              //   (response.data.data.group_privacy == "Private") &
              //   (response.data.data.is_joined == false)
              // ) {
              //   this.private = true;
              // } else {
              //   this.private = false;
              // }

              console.log("this.post after pushing", this.posts);
              this.loadMore = false;
            }
          })
          .catch((error) => {
            console.log("group private error", error);
            this.error = true;
          })
          .finally(() => (this.loading = false));
      }else if (this.$route.name == "UserProfileDetail") {
        if (this.profile_post == "user") {
          console.log("inside user post");
          this.loadMore = true;
          this.page++;
          axios
            .get("atpace-community/user-posts/" + this.$route.params.id + "/", {
              params: { page: this.page, timezone: this.$store.state.timezone },
            })
            .then((response) => {
              // console.log("All_user_posts inside load more", response.data.data.All_Posts);
              if (response.data.message == "Content not available") {
                this.post_detail_page = true;
                this.loadMore = false;
              } else {
                for (let i = 0; i < response.data.data.All_Posts.length; i++) {
                  this.posts.push(response.data.data.All_Posts[i]);
                }
                console.log("All_user_posts after loading more", this.posts);
                this.loadMore = false;
              }
              if (response.data.data.pages.total_pages == this.page) {
                this.post_detail_page = true;
              }
            })
            .catch((error) => {
              console.log(error);
            })
            .finally(() => (this.loading = false));
        } else if (this.profile_post == "saved") {
          this.loadMore = true;
          this.page++;
          axios
            .get(
              "atpace-community/user-saved-post/" + this.$route.params.id + "/",
              {
                params: { page: this.page },
              }
            )
            .then((response) => {
              console.log("All_user_saved_posts ", response.data);
              if (response.data.message == "Content not available") {
                this.post_detail_page = true;
                this.loadMore = false;
              } else {
                for (
                  let i = 0;
                  i < response.data.data.saved_post_data.length;
                  i++
                ) {
                  this.posts.push(response.data.data.saved_post_data[i]);
                }
                this.loadMore = false;
              }
              if (response.data.data.pages.total_pages == this.page) {
                this.post_detail_page = true;
              }
            })
            .catch((error) => {
              console.log(error);
            })
            .finally(() => (this.loading = false));
        }
      } else {
        this.loadMore = true;
        url = "atpace-community/public-posts/";
        this.page++;
        if(this.postType == "pinned"){
          url = "atpace-community/pinned-post/"+this.$store.state.id+"/",
          this.headers=  {
              "Content-Type": "application/json",
              "Authorization": "Token " + this.$store.state.token,
            }
        }
        else{
            url = "atpace-community/public-posts/";
            this.headers= {
              "Content-Type": "application/json",
            }
        }
        config = {
            method: "get",
            mode: "no-cors",
            url: url,
            headers: this.headers,
            params: {
              space_id: this.$route.params.id,
              user_id: this.$store.state.id,
              order_by: this.filterValue,
              page: this.page,
              timezone: this.$store.state.timezone
            },
          };
        axios(config)
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
              });
              this.error = false;
              if (
                (response.data.data.space_privacy == "Private") &
                (response.data.data.is_joined == false)
              ) {
                this.private = true;
              } else {
                this.private = false;
              }

              console.log("this.post after pushing", this.posts);
              this.loadMore = false;
            }
          })
          .catch((error) => {
            console.log("space private error", error);
            this.error = true;
          })
          .finally(() => (this.loading = false));
      }
    },
    showMore(id) {
      // console.log("showMore")
      var showmore_el_id = "showmore_" + id;
      this.$refs[showmore_el_id][0].style.display = "block";
      var showless_el_id = "showless_" + id;
      this.$refs[showless_el_id][0].style.display = "none";
      var showmorebtn_el_id = "showmorebtn_" + id;
      this.$refs[showmorebtn_el_id][0].style.display = "none";
      var showlessbtn_el_id = "showlessbtn_" + id;
      this.$refs[showlessbtn_el_id][0].style.display = "block";
    },
    showLess(id) {
      // console.log("showless")
      var showmore_el_id = "showmore_" + id;
      this.$refs[showmore_el_id][0].style.display = "none";
      var showless_el_id = "showless_" + id;
      this.$refs[showless_el_id][0].style.display = "block";
      var showmorebtn_el_id = "showmorebtn_" + id;
      this.$refs[showmorebtn_el_id][0].style.display = "block";
      var showlessbtn_el_id = "showlessbtn_" + id;
      this.$refs[showlessbtn_el_id][0].style.display = "none";
    },
    updatePage() {
      console.log("post_user timezome", this.$store.state.timezone);
      this.post_detail_page = false;
      this.filter = this.filterValue;
      var user_id = this.$store.state.id;
      console.log("user_id", user_id);
      // var space_id = this.$route.params.id;
      var url = "atpace-community/public-posts/";
      if (this.$route.name == "UserProfileDetail") {
        if (this.profile_post == "user") {
          this.loading = true;
          this.page = 1;
          // console.log("post_user calling");
          axios
            .get("atpace-community/user-posts/" + this.$route.params.id + "/", {
              params: { page: this.page, timezone: this.$store.state.timezone },
            })
            .then((response) => {
              console.log("All_user_posts ", response.data.data.All_Posts);
              this.posts = response.data.data.All_Posts;
              if (response.data.data.pages.total_pages == this.page) {
                this.post_detail_page = true;
              }
            })
            .catch((error) => {
              console.log("post error", error);
            })
            .finally(() => (this.loading = false));
        } else if (this.profile_post == "saved") {
          this.loading = true;
          this.page = 1;
          axios
            .get(
              "atpace-community/user-saved-post/" + this.$route.params.id + "/",
              {
                params: { page: this.page },
              }
            )
            .then((response) => {
              console.log(
                "All_user_saved_posts ",
                response.data.data.saved_post_data
              );
              this.posts = response.data.data.saved_post_data;
              if (response.data.data.pages.total_pages == this.page) {
                this.post_detail_page = true;
              }
            })
            .catch((error) => {
              console.log(error);
            })
            .finally(() => (this.loading = false));
        } else if (this.profile_post == "pinned") {
          this.loading = true;
          this.page = 1;
          axios
            .get(
              "atpace-community/pinned-post/"+this.$store.state.id+"/",
              {
                params: { 
                  page: this.page,
                  user_id: this.$store.state.id,
                  timezone: this.$store.state.timezone
                },
                headers:{
                  "Content-Type": "application/json",
                  "Authorization": "Token " + this.$store.state.token,
                }
              }
            )
            .then((response) => {
              console.log(
                "All_user_pinned post ",
                response.data
              );
              this.posts = response.data.data.public_post;
              if (response.data.data.pages.total_pages == this.page) {
                this.post_detail_page = true;
              }
            })
            .catch((error) => {
              console.log(error);
            })
            .finally(() => (this.loading = false));
        }
      } else if (this.$route.name == "PostDetails") {
        this.post_detail_page = true;
        this.loading = true;
        // var user_id = this.$store.state.id;
        var post_id = this.$route.params.id;
        axios
          .get("atpace-community/user-post/" + post_id + "/", {
            params: { user_id: this.$store.state.id, timezone: this.$store.state.timezone },
          })
          .then((response) => {
            console.log("Post_detail_page 625", response.data.data.user_post);
            this.posts = response.data.data.user_post;
            this.post_id = response.data.data.user_post.id;
            this.$emit("values", {
              space_name: response.data.data.user_post[0].space_name,
              is_display: "True",
            });
          })
          .catch((error) => {
            console.log(error.response.data.message);
          })
          .finally(() => (this.loading = false));
      } else if (this.$route.name == "AllSpaces"){
        this.loading = true;
        this.page = 1;
        if(this.postType == "pinned"){
          url = "atpace-community/pinned-post/"+this.$store.state.id+"/",
          this.headers=  {
              "Content-Type": "application/json",
              "Authorization": "Token " + this.$store.state.token,
            }
        }
        else{
            url = "atpace-community/public-posts/";
            this.headers= {
              "Content-Type": "application/json",
            }
        }
        var config = {
            method: "get",
            mode: "no-cors",
            url: url,
            headers: this.headers,
            params: {
              group_id: this.$route.params.id,
              user_id: this.$store.state.id,
              order_by: this.filterValue,
              page: this.page,
              timezone: this.$store.state.timezone
            },
          };
        axios(config)
          .then((response) => {
            console.log("All group posts event 6", response.data.data);
            this.$emit("values", {
              group_name: response.data.data.space_group_name,
              group_id: response.data.data.space_group_id,
            });
            if (response.data.data.group_name == null) {
              document.title = "Growatpace | Share@Pace";
            } else {
              document.title = response.data.data.group_name + " | Share@Pace";
            }
            this.error = false;
            this.posts = response.data.data.public_post;
            if (response.data.data.pages.total_pages == this.page) {
              this.post_detail_page = true;
            }
          })
          .catch((error) => {
            console.log("error", error);
          })
          .finally(() => (this.loading = false));
      } else {
        this.loading = true;
        this.page = 1;
        if(this.postType == "pinned"){
          url = "atpace-community/pinned-post/"+this.$store.state.id+"/",
          this.headers=  {
              "Content-Type": "application/json",
              "Authorization": "Token " + this.$store.state.token,
            }
        }
        else{
            url = "atpace-community/public-posts/";
            this.headers= {
              "Content-Type": "application/json",
            }
        }
        config = {
            method: "get",
            mode: "no-cors",
            url: url,
            headers: this.headers,
            params: {
              space_id: this.$route.params.id,
              user_id: this.$store.state.id,
              order_by: this.filterValue,
              page: this.page,
              timezone: this.$store.state.timezone
            },
          };
        axios(config)
          .then((response) => {
            console.log("All_posts event 61ee6", response.data.data);
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
            if (
              (response.data.data.space_privacy == "Private") &
              (response.data.data.is_joined == false)
            ) {
              // console.log("lock test")
              this.private = true;
            } else {
              this.private = false;
            }
            this.posts = response.data.data.public_post;
            if (response.data.data.pages.total_pages == this.page) {
              this.post_detail_page = true;
            }
          })
          .catch((error) => {
            console.log("space private error", error);
            this.error = true;
          })
          .finally(() => (this.loading = false));
      }
    },
    postLike: function (id) {
      if (this.$store.state.id == null) {
        window.location.replace("/login");
      } else {
        var like_el_id = "like_" + id;
        // console.log(this.$refs[like_el_id][0]);
        var text = this.$refs[like_el_id][0];
        // console.log("post_id", text.classList.value);
        var like_count_el_id = "like_count_" + id;
        // console.log("like_count_id",this.$refs)
        // console.log("like_count_id",this.$refs[like_count_el_id][0].innerText)
        // var span_like_count = this.$refs[like_count_el_id][0].innerText
        // var span_like = parseInt(span_like_count)
        // console.log(span_like + 1)
        // like_count.innerHTMl = "helli"
        var data = JSON.stringify({
          post_id: id,
        });
        var config = {
          method: "post",
          mode: "no-cors",
          url:
            "atpace-community/likes-post-comment/" + this.$store.state.id + "/",
          headers: {
            "Content-Type": "application/json",
          },
          data: data,
        };
        axios(config)
          .then((response) => {
            // console.log("Like Response", response.data.data.user_like);
            if (response.data.data.user_like.is_like == true) {
              text.classList.value = "fa-solid fa-thumbs-up";
              this.span_like_count = this.$refs[like_count_el_id][0].innerText;
              // console.log("line 240", this.span_like_count);
              // console.log("line 241", this.span_like);
              if (this.span_like_count) {
                this.$refs[like_count_el_id][0].style.display = "inline";
                this.$refs[like_count_el_id][0].innerText =
                  parseInt(this.span_like_count) + 1;
              } else if (this.span_like == 0) {
                // console.log("true like");
                this.$refs[like_count_el_id][0].style.display = "inline";
                this.$refs[like_count_el_id][0].innerText = 1;
              } else {
                // this.span_like = parseInt(this.span_like_count);
                this.$refs[like_count_el_id][0].innerText = 1;
              }
            }
            if (response.data.data.user_like.is_like == false) {
              text.classList.value = "fa-regular fa-thumbs-up";
              this.span_like_count = this.$refs[like_count_el_id][0].innerText;
              // console.log("like count", this.span_like_count);
              this.span_like = parseInt(this.span_like_count);
              // console.log("line 248", this.span_like);
              if (this.span_like == 1) {
                this.$refs[like_count_el_id][0].innerText = null;
              } else {
                this.$refs[like_count_el_id][0].innerText = this.span_like - 1;
              }
            }

            // this.text = "Remove like"
          })
          .catch((error) => {
            console.log("error", error);
          });
      }
    },
    postComment(post_id) {
      if (this.$store.state.id == null) {
        window.location.replace("/login");
      } else {
        // console.log("post_id", post_id);
        window.location.replace("/post-details/" + post_id);
      }
    },
    getReportType: function (post_id) {
      this.post_id = post_id;
      // console.log("post_id", this.post_id)
      this.isHidden = true;
      var id = this.$store.state.id;
      axios
        .get("atpace-community/report-type/" + id)
        .then((response) => {
          // console.log("get report type", response.data.data.space_group_data);
          this.report_types = response.data.data.space_group_data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    removePopup: function () {
      this.isHidden = false;
    },
    reportPost: function () {
      var data = JSON.stringify({
        post_id: this.post_id,
        comment: this.report_reason,
        report_type: this.selected.type,
      });
      var config = {
        method: "post",
        mode: "no-cors",
        url: "atpace-community/report-post/" + this.$store.state.id + "/",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios(config)
        .then((response) => {
          console.log("Post Response", response.data);
          this.isHidden = false;
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
    copyLink: function (post_id) {
      // console.log(post_id);
      navigator.clipboard.writeText(
        window.location.host + "/post-details/" + post_id
      );
      this.toast.info("Link Copied Successfully");
    },
    savePost: function (post_id) {
      var save_el_id = "save_" + post_id;
      var save_icon_el_id = "save_icon" + post_id;
      var data = JSON.stringify({
        post_id: post_id,
      });
      var config = {
        method: "post",
        mode: "no-cors",
        url: "atpace-community/user-saved-post/" + this.$store.state.id + "/",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios(config)
        .then((response) => {
          console.log(
            "Save Response",
            response.data.data.saved_post_data.is_saved
          );
          // var text = this.$refs[save_icon_el_id][0]
          // console.log(text.classList.value)
          if (response.data.data.saved_post_data.is_saved == true) {
            this.$refs[save_el_id][0].innerText = " Saved";
            this.$refs[save_icon_el_id][0].classList.remove("fa-regular");
            this.$refs[save_icon_el_id][0].classList.add("fa-solid");

            this.toast.info("Post Saved Successfully");
          } else {
            this.$refs[save_el_id][0].innerText = " Save Post";
            this.$refs[save_icon_el_id][0].classList.add("fa-regular");
            this.$refs[save_icon_el_id][0].classList.remove("fa-solid");

            this.toast.info("Post Removed Successfully");
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
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
            this.toast.info("Post Deleted Successfully");
            if (this.$route.name == "PostDetails") {
              this.$router.push(this.last_route);
            }
            this.updatePage();
          })
          .catch((error) => {
            console.log(error);
          });
    },
    pinToTop: function (post_id) {
      console.log("pin to top")
      var pin_el_id = "pin_" + post_id;
      if(this.$refs[pin_el_id][0].innerText == "Unpin Post"){
        var is_pinned = false
      }
      else{
        is_pinned = true
      }
      console.log("pinned post", this.$refs[pin_el_id][0].innerText, is_pinned)

      var data = JSON.stringify({
        post_id: post_id,
        is_pinned: is_pinned
      });
      data = JSON.parse(data)
      if(this.$route.name == "AllSpaces"){
        data.group_id = this.$route.params.id
      }
      if(this.$route.name == "SpaceDetails"){
        data.space_id = this.$route.params.id
      }
      var config = {
        method: "post",
        mode: "no-cors",
        url: "atpace-community/pinned-post/" + this.$store.state.id + "/",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Token " + this.$store.state.token,
        },
        data: data,
      };

      axios(config)
        .then((response) => {
          console.log(
            "Pin Response",
            response.data
          );
          // var text = this.$refs[save_icon_el_id][0]
          // console.log(text.classList.value)
          if (response.data.is_pinned == true) {
            this.$refs[pin_el_id][0].innerText = "Unpin Post";
            this.toast.info("Post Pinned Successfully");
          } else {
            this.$refs[pin_el_id][0].innerText = "Pin To Top";
            this.toast.info("Post Unpinned Successfully");
          }
          if(this.postType == "pinned"){
            console.log("post_type", this.postType)
            this.updatePage();
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
  },
};
</script>

<style scoped>
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

.modal {
  position: fixed;
  bottom: 23%;
  right: 350px;
  width: 600px;
  /* height:400px; */
  border: 2px solid #f1f1f1;
  z-index: 15;
}
.modal-container {
  max-width: 600px;
  padding: 10px;
  background-color: white;
}

.span-like {
  /* display: inline-block; */
  /* width: 30px; */
  /* height: 10px; */
  /* text-align: center; */
  /* background: yellow; */
  /* border: 1px solid red; */
  font-size: 15px;
}

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
