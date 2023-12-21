<template>
<div v-if="loading">
  <div class="loaderr"></div>
</div>
<div v-else>
  <div v-if="user_spaces.length == 0">
    <div id="dropcaps" class="row">
      <div class="col-md-12">
        <div class="page-content page-shortcode">
          <div class="boxedtitle page-title t_center"><h2>No Spaces</h2></div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
  <div class="col-md-3" v-for="space in user_spaces" :key="space.id">
    <div class="page-content page-shortcode">
      <div class="box_icon">
        <span class="t_center icon_i"
          ><span icon_size="60"
            ><i v-if="space.privacy == 'Public'"
              i_color="#735cdf"
              i_hover="#735cdf"
              class="icon-folder-open-alt color_default"
              style="font-size: 30px; color: #735cdf"
            ></i>
            <i v-else
              i_color="#735cdf"
              i_hover="#735cdf"
              class="icon-lock color_default"
              style="font-size: 30px; color: #735cdf"
            ></i></span
        ></span>
        <div class="t_center">
          <h3 style="margin:5px;">{{ space.name }}</h3>
          <span>{{ space.space_member.length }} Member(s)</span><br>
          <button v-if="profile_user_id == logged_user_id" class="button small lime-default-button" style="color:black;" @click="leaveSpace(space.id)">Leave Space</button>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
</template>

<script>
import axios from "axios";
import { useToast } from "vue-toastification";

export default {
  name: "UserSpaces",
  setup() {
    // Get toast interface
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
        user_spaces : [],
        profile_user_id : "",
        logged_user_id : "",
        loading: false,
    };
  },
  mounted() {
    this.getUserSpaces()
  },
   watch: {
      $route() {
        this.getUserSpaces()
      },
    },
  methods : {
    leaveSpace(space_id){
       console.log("space_id",space_id)
        axios
            .delete("atpace-community/space-user/"+this.$store.state.id+"/"+space_id+"/")
            .then(response => {
            console.log("Leave Response",response.data);
            this.toast.info("Space Leaved Successfully");
            this.getUserSpaces()
            })
            .catch(error => {
            console.log("error",error);
            });
     },
     getUserSpaces(){
        this.loading = true
        this.profile_user_id = this.$route.params.id
        this.logged_user_id = this.$store.state.id
        var id = this.$route.params.id;
        axios
          .get("atpace-community/user-space/" + id +"/", {
            params: {
              timezone: this.$store.state.timezone
            }
          })
          .then(response => {
            console.log(response.data.data.user_space);
            this.user_spaces = response.data.data.user_space;
          })
          .catch(error => {
            console.log(error);
          })
          .finally(() => (this.loading = false));
     }
  }
};
</script>
