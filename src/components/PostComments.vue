<template>
<div v-if="is_display == 'True'">
  <div v-if="loading">
    <div class="loaderr"></div>
  </div>
  <div v-else>
   <div id="commentlist" class="page-content" v-if="comments.length == 0 & user_comment_page">
    
        <h3 align="center">No Comments</h3>
    </div>
    
    <div  id="commentlist" class="page-content" v-if="comments.length != 0">
        <div class="boxedtitle page-title"><h2>Comments</h2></div>
        <ol
        class="commentlist clearfix"
        v-for="comment in comments"
        :key="comment.id"
        >
        <li class="comment">
            <div class="comment-body comment-body-answered clearfix">
            <div class="user-profile-img">
                <img alt="" :src="comment.user_profile_image" />
            </div>
            <div class="comment-text">
                <div class="author clearfix">
                <div class="comment-author">
                    <router-link
                    :to="{
                        name: 'UserProfileDetail',
                        params: { id: comment.created_by_id },
                    }"
                    >{{ comment.created_by }}</router-link
                    >
                </div>
                <div class="comment-meta">
                    <div class="date">
                    <i class="icon-time"></i>{{ comment.created_at }}
                    </div>
                </div>
                </div>
                <nav class="post_nav" style="display: block" v-if="comment.created_by_id == $store.state.id">
                    <div class="three-dots" style="right: 20px !important; left: auto">
                    <ul>
                        <li>
                        <i class="fa fa-ellipsis-h"></i>
                        <ul>
                            <li v-if="comment.created_by_id == $store.state.id">
                            <router-link to="" @click="deleteComment(comment.post_id, comment.id)"
                                ><i
                                class="fa-solid fa-trash"
                                style="font-size: 15px"
                                ></i>
                                 Delete Comment</router-link
                            >
                            </li>    
                            
                        </ul>
                        </li>
                    </ul>
                    </div>
                </nav>
                <div class="text">
                <p v-html="comment.description"></p>
                </div>
                <span
                class="question-answered question-answered-done"
                @click="commentLike(comment.id, 'like_' + comment.id)"
                v-if="comment.is_user_like == false"
                ><i
                    class="fa-regular fa-thumbs-up"
                    :ref="'like_' + comment.id"
                ></i>
                <span :ref="'like_count' + comment.id" v-show="comment.likes_count > 0">{{ comment.likes_count }}</span>
                Like</span
                >

                <span
                class="question-answered question-answered-done"
                @click="commentLike(comment.id, 'like_' + comment.id)"
                v-if="comment.is_user_like == true"
                ><i
                    class="fa-solid fa-thumbs-up"
                    :ref="'like_' + comment.id"
                ></i>
                <span :ref="'like_count' + comment.id">{{ comment.likes_count }}</span>
                Like</span
                >

                <!-- <div class="question-answered question-answered-done"><i class="icon-reply"></i>Reply</div> -->
            </div>
            </div>
            <ul
            class="children"
            v-for="reply in comment.replys"
            :key="reply.id"
            >
            <li class="comment">
                <div class="comment-body clearfix">
                <div class="avatar">
                    <img alt="" :src="reply.user_profile_image" />
                </div>
                <div class="comment-text">
                    <div class="author clearfix">
                    <div class="comment-author">
                        <a href="#">{{ reply.created_by }}</a>
                    </div>
                    <div class="comment-meta">
                        <div class="date">
                        <i class="icon-time"></i>{{ reply.created_at }}
                        </div>
                    </div>
                    </div>
                    <div class="text">
                    <p>{{ reply.description }}</p>
                    </div>
                </div>
                </div>
            </li>
            </ul>
            <!-- End children -->
            <!-- <div id="respond" class="comment-respond page-content clearfix">
                        <form action="" method="post" id="commentform" class="comment-form" @submit.prevent="onSubmit">
                            <div id="respond-textarea">
                                <p>
                                    <textarea id="comment" name="comment" aria-required="true" cols="" rows="2" placeholder="Your Reply"></textarea>
                                </p>
                            </div>
                            <p class="form-submit">
                                <input name="submit" @click="newcomment()" type="submit" id="submit" value="Post your comment" class="button small color">
                            </p>
                        </form>
                    </div>	   -->
        </li>
        </ol>
        <!-- End commentlist -->
    </div>
    
          <div
            v-if="$store.state.id != null & !user_comment_page"
            id="respond"
            class="comment-respond page-content clearfix"
          >
            <div class="boxedtitle page-title"><h2>New Comment</h2></div>
            <form
              action=""
              method="post"
              id="commentform"
              class="comment-form"
              @submit.prevent="onSubmit"
            >
              <div id="respond-textarea">
                <p>
                  <textarea
                    id="comment"
                    name="comment"
                    aria-required="true"
                    cols=""
                    rows="3"
                    v-model="body"
                    placeholder="Your Comment"
                  ></textarea>
                </p>
              </div>
              <p class="form-submit">
                <input
                  name="submit"
                  @click="newcomment()"
                  type="submit"
                  id="submit"
                  value="Post"
                  class="button small color"
                />
              </p>
            </form>
          </div>
      </div>
  </div>
</template>

<script>
import axios from "axios";
import { useToast } from "vue-toastification";


export default {
  name: "PostComments",
  components: {

  },
  setup() {
    // Get toast interface
    const toast = useToast();
    return { toast };
  },
  props: {
    is_display: String,
  },
  data() {
    return {
      comments: [],
      post_id: "",
      body: "",
      span_like_count: "",
      span_like: "",
      is_like_zero: "",
      comment_like_count: "",
      loading: false,
      user_comment_page: true,
    };
  },
  mounted() {
    this.getComments();
  },
  watch: {
    $route() {
      this.getComments();
    },
  },

  methods: {
    newcomment: function () {
      var data = JSON.stringify({
        post_id: this.$route.params.id,
        body: this.body,
        timezone: this.$store.state.timezone
        // "parent_id": "4f851699-0939-4364-bbc4-b249510b18cb"
      });
      var config = {
        method: "post",
        mode: "no-cors",
        url: "atpace-community/user-comments/" + this.$store.state.id + "/",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios(config)
        .then((response) => {
          console.log("Comment Response", response.data);
          this.body = "";
          this.getComments();
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
    
    getComments: function () {
        if (this.$route.name == "PostDetails") {
            this.user_comment_page = false;
            var user_id = this.$store.state.id;
            var post_id = this.$route.params.id;
            console.log(user_id, post_id, "postdetail");
            axios
                .get("atpace-community/user-post/" + post_id + "/", {
                params: { 
                  user_id: this.$store.state.id,
                  timezone: this.$store.state.timezone
                },
                })
                .then((response) => {
                console.log("Post_detail comments", response.data.data.user_post[0].comments);
                this.comments = response.data.data.user_post[0].comments;
                this.post_id = response.data.data.user_post.id;
                })
                .catch((error) => {
                console.log(error.response.data.message);
                });
        }
        if(this.$route.name =="UserProfileDetail"){
            this.loading = true;
            this.user_comment_page = true;
            var id = this.$route.params.id;
            console.log("user_id_post", id, this.$route.name);
            axios
                .get("atpace-community/user-all-comment/"+id+"/", {
                  params: {
                    timezone: this.$store.state.timezone
                  }
                })
                .then((response) => {
                    console.log("All_comments of user", response.data.data.user_all_comments);
                    this.comments = response.data.data.user_all_comments;
                    console.log(this.comments)
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => (this.loading = false));
        }
    },
    
    commentLike: function (id) {
      if (this.$store.state.id == null) {
        window.location.replace("/login");
      } else {
        var like_el_id = "like_" + id;
        var like_count_el_id = "like_count" + id;
        // console.log(this.$refs[like_count_el_id][0].innerText);
        var text = this.$refs[like_el_id][0];
        // console.log("post_id", text.classList.value);
        var data = JSON.stringify({
          comment_id: id,
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
            console.log("Like Response", response.data.data.user_like);
            if (response.data.data.user_like.is_like == true) {
              text.classList.value = "fa-solid fa-thumbs-up";
              this.span_like_count = this.$refs[like_count_el_id][0].innerText;
              console.log("line 240", this.span_like_count);
              // console.log("line 241", this.span_like);
              if(this.span_like_count){
                // console.log("if")
                this.$refs[like_count_el_id][0].style.display = "inline";
                this.$refs[like_count_el_id][0].innerText =  parseInt(this.span_like_count) + 1;
              }
              else if(this.span_like == 0) {
                // console.log("true like");
                this.$refs[like_count_el_id][0].style.display = "inline";
                this.$refs[like_count_el_id][0].innerText = 1;
              } 
              else {
                // console.log("else")
                // this.span_like = parseInt(this.span_like);
                this.$refs[like_count_el_id][0].innerText = 1;
              }
              
            }
            if (response.data.data.user_like.is_like == false) {
              text.classList.value = "fa-regular fa-thumbs-up";
              this.span_like_count = this.$refs[like_count_el_id][0].innerText;
              this.span_like = parseInt(this.span_like_count);
              console.log("line 248", this.span_like);
              if (this.span_like == 1) {
                this.$refs[like_count_el_id][0].innerText = null;
              } else {
                this.$refs[like_count_el_id][0].innerText = this.span_like - 1;
              }
            }
          })
          .catch((error) => {
            console.log("error", error);
          });
      }
    },
    postComment() {
      if (this.$store.state.id == null) {
        window.location.replace("/login");
      }
    },
    deleteComment(post_id, comment_id) {
        if (confirm("Do you want to delete the comment?"))
        axios
          .delete("atpace-community/user-comment/" + this.$store.state.id + "/" + post_id, {
            params: { comment_id: comment_id },
          })
          .then((resp) => {
            console.log("response", resp.data);
            this.toast.info("Comment Deleted Successfully");
            this.getComments();
          })
          .catch((error) => {
            console.log(error);
          });
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
  position: absolute;
  top: 20px;
  right: 40px;
  height: 23px;
  line-height: 15px;
}

.three-dots i {
  color: black;
  font-size: 15px;
}

.three-dots :hover {
  color: #735cdf;
}

.three-dots ul li ul li :hover {
  background: #735cdf;
  color: white;
}

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
</style>
