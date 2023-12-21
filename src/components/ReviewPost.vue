<template>
  <section class="container main-content">
    <div class="row">
      <div class="col-md-9">
        <div v-for="post in posts" :key="post.id">
          <article
            class="question question-type-normal"
            v-if="post.posted_on == 'Post' && ( post.member_type == 'Admin' || post.member_type == 'Moderator' || post.post_by_id == $store.state.id)"
            style="margin-right: 50px"
          >
            <h2>{{ post.post_title }}</h2>
            <div
              class="question-report"
              @click="ApproveRejectContent(false, post.id)"
              v-if="(post.member_type == 'Admin' || post.member_type == 'Moderator') && (post.post_by_id != $store.state.id)"
            >
              Reject
            </div>
            <div
              class="question-type-main"
              @click="ApproveRejectContent(true, post.id)"
              v-if="(post.member_type == 'Admin' || post.member_type == 'Moderator') && (post.post_by_id != $store.state.id)"
            >
              Accept
            </div>
            <a
              style="position: absolute"
              href=""
              original-title="ahmed"
              class="user-profile-img tooltip-n"
              ><img alt="" :src="post.post_by_image"
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
                  params: { id: post.post_by_id },
                }"
              >
                &nbsp;&nbsp;{{ post.post_by_name }}
              </router-link>
              <p style="font-size: 12px; margin: 0" class="date">
                &nbsp;&nbsp;<i class="icon-time"></i>&nbsp;&nbsp;{{
                  post.created_at
                }}
              </p>
            </h3>
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
              <p v-if="post.inappropriate_content"><b>Inappropriate Content:</b>{{post.inappropriate_content}}</p>
            </div>
          </article>
        </div>
      </div>
      <!-- End main -->
    </div>
    <!-- End row -->
  </section>
  <!-- End container -->
</template>
<script>
import axios from "axios";
import { useToast } from "vue-toastification";

export default {
  name: "ReviewPost",
  setup() {
    // Get toast interface
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      posts: "",
    };
  },
  mounted() {
    this.updatePage();
  },
  methods: {
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
      var url = "atpace-community/review-content-api/";
      axios
        .get(url + this.$store.state.id, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Token " + this.$store.state.token,
          },
          params: {
            timezone: this.$store.state.timezone
          }
        })
        .then((response) => {
          console.log("All Review Post ", response.data);
          this.posts = response.data.data.review_data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    ApproveRejectContent(post_on_community, review_content_id) {
      var data = JSON.stringify({
        post_on_community: post_on_community,
        review_content_id: review_content_id,
      });
      var config = {
        method: "post",
        mode: "no-cors",
        url:
          "atpace-community/approve-reject-content-api/" +
          this.$store.state.id +
          "/",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + this.$store.state.token,
        },
        data: data,
      };
      axios(config)
        .then((response) => {
          console.log("Update Review Post ", response.data);
          if (
            response.data.message == "Content Approved" &&
            response.data.post_on_community == true
          ) {
            this.toast.info("Content Approved Successfully!");
          } else if (
            response.data.message == "Content Rejected" &&
            response.data.post_on_community == false
          ) {
            this.toast.info("Content Removed Successfully!");
          } else {
            this.toast.error("Something Went Wrong!");
          }
          this.updatePage();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
