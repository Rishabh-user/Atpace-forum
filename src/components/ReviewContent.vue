<template>
    <div class="user-profile">
        <div class="col-md-12">
        <div class="page-content page-content-user-profile">
            <div class="user-profile-widget">
            <h2>Content In Review</h2>
            <div class="tabs-warp question-tab" style="margin-bottom: 0px">
                <ul class="tabs" style="list-style: none; margin-bottom: 0px">
                  <li class="tab">
                      <router-link
                      to=""
                      @click="ShowReviewPost()"
                      ref="post"
                      >Post</router-link
                      >
                  </li>
                  <li class="tab">
                      <router-link
                      to=""
                      @click="ShowReviewComment()"
                      ref="comment"
                      >Comment</router-link
                      >
                  </li>
                </ul>
            </div>
            </div>
            <!-- End user-profile-widget -->
        </div>
        <!-- End page-content -->
        </div>
        <div class="col-md-12">
          <div v-if="displayReviewPost" class="tab-inner-wrap">
              <div class="tab-inner">
              <ReviewPost
              />
              </div>
          </div>
        <div v-if="displayReviewComment" class="tab-inner-wrap">
          <div class="tab-inner">
              <ReviewComment
              />
          </div>
        </div>
        </div>
      
</div>
</template>
<script>
import ReviewPost from "./ReviewPost.vue";
import ReviewComment from "./ReviewComment.vue";
export default {
  name: "ReviewContent",
  data() {
    return {
      displayReviewPost: true,
      displayReviewComment: false,
    };
  },
  mounted() {
    this.ShowReviewPost();
  },
  methods: {
    ShowReviewPost: function () {
      this.displayReviewPost = true;
      this.displayReviewComment = false;
      var post_class = this.$refs.post.$el.classList;
      var comment_class = this.$refs.comment.$el.classList;
      comment_class.remove("current");
      post_class.add("current");
    },
    ShowReviewComment: function () {
      this.displayReviewPost = false;
      this.displayReviewComment = true;
      var post_class = this.$refs.post.$el.classList;
      var comment_class = this.$refs.comment.$el.classList;
      post_class.remove("current");
      comment_class.add("current");
    },
  },
  components: {
      ReviewPost,
      ReviewComment
  },
};
</script>

<style scoped>

.row {
  margin-left: 0px;
  margin-right: 150px;
}

</style>