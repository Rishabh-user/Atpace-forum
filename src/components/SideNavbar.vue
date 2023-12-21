<template>
<div>
  <span v-if="showNav == false"
    class="nav-icon"
    style="
    "
    @click="openNav()"
    >&#9776;</span
  >

  <div id="mySidenav" class="sidenav" v-if="showNav">
    <a href="" class="closebtn" @click="closeNav()">&times;</a>
    <router-link :to="{ name: 'MainPost' }">
      <div
        style="margin-bottom: 30px !important"
        class="widget widget_stats"
        v-bind:class="{ active: $route.path == '/' }"
      >
        <h3 @click="closeNav()"><i class="fa-solid fa-house"></i> Home</h3>
      </div>
    </router-link>
    <div class="" v-for="group in groups" :key="group.id">
      <h3 class="widget_title" @click="closeNav()">
      
        <router-link :to="{ name: 'AllSpaces', params: { id: group.id } }">{{
          group.name
        }}</router-link>
      </h3>
      <div class="ul_list ul_list-icon-ok">
        <ul @click="closeNav()">
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
  <!-- <br /> -->
  <!-- <br /> -->
  <!-- <br /> -->
</div>
</template>

<script>
import axios from "axios";

export default {
  name: "SideNavbar",
  data() {
    return {
      showNav: "",
      groups: [],
      // hideNav: false,
    };
  },
  mounted() {
    // var id = this.$store.state.id;
  },
  methods: {
    openNav: function () {
      console.log("side navbar");
      this.showNav = true;
      axios
      .get("atpace-community/all-groups/", {
          params: {
            user_id: this.$store.state.id,
          },
        })
      .then((response) => {
        console.log("All_groups sidenavbar", response.data.data.group_spaces);
        this.groups = response.data.data.group_spaces;
      })
      .catch((error) => {
        console.log(error);
      });
    },

    closeNav: function () {
      this.showNav = false;
    },
  },
};
</script>

<style scoped>
.nav-icon {
    font-size: 30px;
    cursor: pointer;
    position: absolute;
    top: 78px;
    left: 31px;
    z-index: 9999;
}

.sidenav {
  height: 100%;
  width: 350px;
  position: fixed;
  z-index: 999;
  top: 10px;
  left: 0;
  background-color: white;
  overflow-x: hidden;
  transition: 0.5s;
  padding-top: 60px;
}

.sidenav a {
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 25px;
  color: #818181;
  display: block;
  transition: 0.3s;
}

.sidenav a:hover {
  color: #6316df;
}

.sidenav .closebtn {
  position: absolute;
  top: 0;
  right: 25px;
  font-size: 36px;
  margin-left: 50px;
}

@media screen and (max-height: 450px) {
  .sidenav {
    padding-top: 15px;
  }
  .sidenav a {
    font-size: 18px;
  }
}

@media (min-width: 600px) {
 .nav-icon {
  display: none !important;
 }
}

</style>

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
  border-radius: 10px;
}

.widget H3 {
  margin: 0;
}
.widget_stats li i {
  background-color: #fff;
  color: #000;
}
.widget.widget_stats li {
  background-color: #fff;
}
.widget h3.widget_title {
  padding: 10px 0 10px;
}
</style>
