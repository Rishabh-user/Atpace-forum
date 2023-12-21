<template>
<div class="left-sidebar"> 
  <router-link :to="{ name: 'MainPost' }">
    <div style="margin-bottom: 30px !important; margin-top: 10px;"
    class="widget widget_stats"
    v-bind:class="{ active: $route.path == '/' }"
  >
    <h3><i class="fa-solid fa-house"></i> Home</h3>
  </div>
  </router-link>
  <div class="" v-for="group in groups" :key="group.id">
    <h3 class="widget_title tooltip" data-hover="All Post">
      <router-link :to="{ name: 'AllSpaces', params: { id: group.id } }">
      <img class="group-img" src="/assets/images/community3.png">
      {{
        group.name
      }}</router-link>
      <span class="tooltiptext">All Post</span>
    </h3>
    <div class="ul_list ul_list-icon-ok">
      <ul>
        <span v-for="space in group.spaces" :key="space.id">
          <router-link v-if="space.space_type == 'Event'" :to="{ name: 'EventSpaceDetails', params: { id: space.id } }">
            <li id="space_details"  style="font-size: 18px; padding: 10px;" v-bind:class="{ active: $route.path == '/event-space-link/'+space.id }">
              <i class="icon-calendar"></i>
              {{ space.title }}
            </li>
          </router-link>
          <router-link v-else :to="{ name: 'SpaceDetails', params: { id: space.id } }">
            <li id="space_details"  style="font-size: 18px; padding: 10px;" v-bind:class="{ active: $route.path == '/space-link/'+space.id }">
              <i
                v-if="space.privacy == 'Public'"
                class="fa fa-hashtag "
              ></i>
              <i v-else class="fa fa-lock"></i>
              {{ space.title }}
            </li>
          </router-link>
        </span>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
import axios from "axios";

export default {
  name: "LeftSidebar",
  data() {
    return {
      groups: [],
      // site_title: "Community",
    };
  },
  mounted() {
    // document.title = this.site_title;
    // var id = this.$store.state.id;
    axios
      .get("atpace-community/all-groups/", {
          params: {
            user_id: this.$store.state.id,
          },
        })
      .then((response) => {
        console.log("All_groups ", response.data.data);
        this.groups = response.data.data.group_spaces;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style scoped>
.widget {
  border-radius: 10px;
  padding: 13px;
}

.widget.widget_stats.active {
  background-color: #735cdf;
  color: white;
}

li.active {
  background-color: #735cdf;

  border: 1px solid #dedede;
  color: #fff;
  box-shadow: 0 0 5px #dedede;
  border-radius: 10px ;
}


.widget H3 {
  margin: 0;
}
.widget_stats li i {
  background-color: #fff;
  color: #000;
}
.widget.widget_stats li{
  background-color: #fff;
}
.widget h3.widget_title {
    
    padding: 10px 0 10px;
   
}
@media (max-width: 600px) {
 .left-sidebar {
  display: none !important;
 }
}
</style>
