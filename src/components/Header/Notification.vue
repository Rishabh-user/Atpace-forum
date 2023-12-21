<template>
  <section class="container main-content">
    <div class="login">
      <div class="row">
        <div class="col-md-9">
          <div class="page-content">
            <h2>Notifications</h2>
            <div v-if="loading">
              <div class="loaderr"></div>
            </div>
            <div v-else>
              <div class="form-style form-style-3">
                <ul
                  v-for="notification in notifications"
                  :key="notification.id"
                  id="notification"
                >
                  <router-link
                    :to="{
                      name: 'PostDetails',
                      params: { id: notification.post_id },
                    }"
                  >
                    <li style="font-size: 1.3em; list-style: none">
                      <div class="user-profile-img" style="width: 45px">
                        <img
                          style="width: 45px; height: 45px"
                          :src="notification.user_profile_image"
                          alt="admin"
                        />
                      </div>
                      <strong>{{ notification.action_by_user }}</strong>
                      <span
                        v-if="notification.notification_types == 'PostLike'"
                      >
                        has liked your post
                      </span>
                      <span
                        v-else-if="
                          notification.notification_types == 'CommentLike'
                        "
                      >
                        has liked your comment in post
                      </span>
                      <span
                        v-else-if="notification.notification_types == 'Post'"
                      >
                        has created new post
                      </span>
                      <span
                        v-else-if="notification.notification_types == 'Comment'"
                      >
                        posted a comment on your post
                      </span>
                      <span
                        v-else-if="notification.notification_types == 'Replies'"
                      >
                        has replied to your comment in post
                      </span>
                      <strong> {{ notification.verb }}</strong>
                      <p style="margin-left: 60px">
                        {{ notification.created_at }}
                      </p>
                    </li>
                  </router-link>
                </ul>
                <div v-if="load_more_data">
                  <button v-if="loadMore" class="load-more-btn">
                    <i class="icon-spinner"></i> Loading More
                  </button>
                  <button v-else class="load-more-btn" @click="loadMorePost">
                    Load More
                  </button>
                </div>
                <div v-if="no_data">
                  <h3 class="t_center">No Notifications</h3>
                </div>
              </div>
            </div>
          </div>
          <!-- End page-content -->
        </div>
        <!-- End col-md-6 -->
      </div>
      <!-- End row -->
    </div>
    <!-- End login -->
  </section>
</template>

<script>
import axios from "axios";

export default {
  name: "GetNotification",
  data() {
    return {
      notifications: [],
      loadMore: false,
      page_no: 1,
      load_more_data: false,
      no_data: false,
      loading: false,
    };
  },
  mounted() {
    this.getNotifications();
    document.title = "Notifications | Share@Pace";
  },
  methods: {
    loadMorePost() {
      console.log("112", this.page_no);
      this.page_no++;
      console.log("114", this.page_no);
      this.loadMore = true;
      axios
        .get("atpace-community/notificaton/" + this.$store.state.id + "/", {
          params: { page: this.page_no, timezone: this.$store.state.timezone },
        })
        .then((response) => {
          console.log("All_notification 119", response.data);
          if (response.data.message == "Content not available") {
            this.load_more_data = false;
            this.loadMore = false;
          } else {
            for (
              let i = 0;
              i < response.data.data.notification_list.length;
              i++
            ) {
              this.notifications.push(response.data.data.notification_list[i]);
            }
            this.loadMore = false;
          }
          if (response.data.data.pages.next_page == this.page_no) {
            this.load_more_data = false;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getNotifications() {
      this.loading = true;
      axios
        .get("atpace-community/notificaton/" + this.$store.state.id + "/", {
          params: { page: this.page_no },
        })
        .then((response) => {
          console.log(
            "All_notification 146 ",
            this.page_no,
            response.data.data.notification_list.length,
            response
          );
          if (response.data.data.notification_list.length > 0) {
            this.load_more_data = true;
            this.notifications = response.data.data.notification_list;
          } else {
            this.no_data = true;
          }
          if (response.data.data.pages.next_page == this.page_no) {
            this.load_more_data = false;
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => (this.loading = false));
    },
  },
};
</script>

<style scoped>
@media screen and (min-width: 480px) {
  .load-more-btn {
    width: 920px;
    color: white;
    background-color: #735cdf;
    padding: 5px;
    font-size: 15px;
    font-weight: bold;
    border-radius: 13px;
  }
}
@media screen and (max-width: 480px) {
  .load-more-btn {
    width: 290px;
    color: white;
    background-color: #735cdf;
    padding: 5px;
    font-size: 15px;
    font-weight: bold;
    border-radius: 13px;
  }
}
</style>
