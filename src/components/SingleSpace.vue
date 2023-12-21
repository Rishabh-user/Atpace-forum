<template>
  <div v-if="loading">
    <div class="loaderr"></div>
  </div>
  <div v-else>
    <div v-if="spaces == '' ">
    <div class="col-md-12">
        <div class="page-content page-shortcode" style="height:100px;">
          <div class="box_icon"> 
            <div class="t_center" style="">
              <h3>No Space</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-3" v-for="space in spaces" :key="space.id">
      <div class="page-content page-shortcode">
        <div class="box_icon">
          <span class="t_center icon_i"
            ><span icon_size="60"
              ><i
                v-if="space.privacy == 'Public'"
                i_color="#735cdf"
                i_hover="#735cdf"
                class="icon-folder-open-alt color_default"
                style="font-size: 30px; color: #735cdf"
              ></i>
              <i
                v-else
                i_color="#735cdf"
                i_hover="#735cdf"
                class="icon-lock color_default"
                style="font-size: 30px; color: #735cdf"
              ></i></span
          ></span>
          <div class="t_center">
            <h3 style="margin: 5px">{{ space.space_name }}</h3>
            <span style="font-family: 'Poppins', sans-serif !important"
              >{{ space.space_member_count }} Member(s)</span
            >
            <div v-if="space.is_joined == true">
              <button
                class="button small lime-default-button"
                style="color: black"
                @click="leaveSpace(space.id)"
              >
                Leave Space
              </button>
            </div>
            <div v-else>
              <button
                class="button small lime-default-button"
                style="color: white; background-color: #735cdf"
                v-if="space.privacy == 'Public'"
                @click="joinSpace(space.id)"
              >
                Join Space
              </button>
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
  name: "SingleSpace",
  setup() {
    // Get toast interface
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      spaces: [],
      loading: false,
    };
  },
  props: {
    filterValue: String,
    searchValue: String,
  },
  watch: {
    $route() {
      console.log("space details", this.$route.name);
      if (this.$route.name == "AllSpaces") {
        this.updatePage();
      }
    },
    filterValue: function () {
      // console.log("in main post", val);
      this.updatePage();
    },
    searchValue: function () {
      console.log("space search", this.searchValue);
      this.updatePage();
    },
  },
  mounted() {
    this.updatePage();
  },
  methods: {
    updatePage() {
      this.loading = true;
      axios
        .get("atpace-community/space-group-details/" + this.$route.params.id, {
          params: {
            user_id: this.$store.state.id,
            search: this.searchValue,
            order_by: this.filterValue,
          },
        })
        .then((response) => {
          if (response.data.message == "Content not available") {
            this.spaces = "";
          } else {
            console.log("space-group-details ", response.data);
            document.title =
              response.data.data.space_group_name + " | Share@Pace";
            this.spaces = response.data.data.space_group_data;
            this.$emit("values", {
              group_name: response.data.data.space_group_name,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => (this.loading = false));
    },
    joinSpace(space_id) {
      if (this.$store.state.id == null) {
        window.location.replace("/login");
      } else {
        console.log("space_id", space_id);
        var data = JSON.stringify({
          space_group_id: this.$route.params.id,
          space_id: space_id,
          user_type: "Member",
        });
        var config = {
          method: "post",
          mode: "no-cors",
          url: "atpace-community/user-space/" + this.$store.state.id + "/",
          headers: {
            "Content-Type": "application/json",
          },
          data: data,
        };

        axios(config)
          .then((response) => {
            console.log("Join Response", response.data);
            this.toast.info("Space Is joined");
            this.updatePage();
          })
          .catch((error) => {
            console.log("error", error);
            this.toast.error("Something Went Wrong");
          });
      }
    },
    leaveSpace(space_id) {
      console.log("space_id", space_id);

      axios
        .delete(
          "atpace-community/space-user/" +
            this.$store.state.id +
            "/" +
            space_id +
            "/"
        )
        .then((response) => {
          console.log("Leave Response", response.data);
          this.toast.info("Leave Space Successfully");
          this.updatePage();
        })
        .catch((error) => {
          console.log("error", error);
          this.toast.error("Something Went Wrong");
        });
    },
  },
};
</script>
