<template>
  <section class="container main-content">
    <div class="row">
      <div class="col-md-9">
        <div class="page-content">
          <div class="boxedtitle page-title"><h2>Edit Profile</h2></div>

          <div class="form-style form-style-4" id="question-submit">
            <form @submit.prevent="onSubmit">
              <div class="form-style">
                <div class="user-profile-img">
                  <img
                    :src="this.users.user_profile_image"
                    alt="admin"
                    ref="user_image"
                  />
                </div>
                <p class="user-profile-p"></p>
                <label>Profile Picture</label>
                <div class="fileinputs">
                  <input type="file" class="file" @change="updateImage" />
                  <div class="fakefile">
                    <button type="button" class="button small margin_0">
                      Select file
                    </button>
                    <span><i class="icon-arrow-up"></i>Browse</span>
                  </div>
                </div>
              </div>
              <div class="form-inputs clearfix">
                <p>
                  <label>First Name</label>
                  <input type="text" v-model="users.first_name" />
                </p>
                <p>
                  <label>Last Name</label>
                  <input type="text" v-model="users.last_name" />
                </p>
                <p>
                  <label>Username</label>
                  <input type="text" v-model="users.username" readonly />
                </p>
                <p>
                  <label class="required">E-Mail</label>
                  <input type="email" v-model="users.email" readonly />
                </p>
                <p>
                  <label class="required">Phone</label>
                  <input type="text" v-model="users.phone" readonly />
                </p>
                <p>
                  <label class="required" for="gender">Gender</label>
                  <select
                    id="gender"
                    name="gender"
                    style="width: 100%"
                    v-model="users.gender"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </p>
                <p>
                  <label>Age</label>
                  <input
                    type="number"
                    v-model="users.age"
                    min="0"
                    max="150"
                    maxlength="3"
                    oninput="validity.valid||(value='');"
                  />
                </p>
                <p>
                  <label>Current Status</label>
                  <input type="text" v-model="users.current_status" />
                </p>
                <p>
                  <label>Linkedin</label>
                  <input type="url" v-model="users.linkedin_profile" />
                </p>
                <p>
                  <label>Headline</label>
                  <input type="text" v-model="users.profile_heading" />
                </p>
              </div>
              <div class="clearfix"></div>
              <p>
                <label>About Yourself</label>
                <textarea
                  cols="58"
                  rows="8"
                  v-model="users.about_us"
                ></textarea>
              </p>
              <div>
                <label class="switch">
                  <input type="checkbox" id="email_private"
                  name="email_private"
                  v-model="users.is_email_private">
                  <span class="slider round"></span>
                </label>
                <span class="switch-label"><b>Keep email private</b></span>
              </div>
              <div>
                <label class="switch">
                  <input type="checkbox" id="phone_private"
                  name="phone_private"
                  v-model="users.is_phone_private">
                  <span class="slider round"></span>
                </label>
                <span class="switch-label"><b>Keep phone private</b></span>
              </div>
              <div>
                <label class="switch">
                  <input type="checkbox" id="linkedin_private"
                  name="linkedin_private"
                  v-model="users.is_linkedin_private">
                  <span class="slider round"></span>
                </label>
                <span class="switch-label"><b>Keep linkedin private</b></span>
              </div>
              <div>
                <label class="switch">
                  <input type="checkbox" id="private"
                  name="private"
                  v-model="users.private_profile">
                  <span class="slider round"></span>
                </label>
                <span class="switch-label"><b>Keep your profile private</b></span>
              </div>
              <p class="form-submit">
                <input
                  type="submit"
                  value="Update"
                  class="button color small login-submit submit"
                  @click="updateUser"
                />
              </p>
            </form>
          </div>
        </div>
        <!-- End page-content -->
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
var FormData = require("form-data");

export default {
  name: "EditProfile",
  setup() {
    // Get toast interface
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      users: [],
      image: "",
    };
  },
  mounted() {
    document.title = "Profile | Share@Pace";
    var id = this.$store.state.id;
    console.log("user_id", id);
    axios
      .get("api/user-profile/" + id + "/")
      .then((response) => {
        console.log("edit profile user data", response.data.data);
        this.users = response.data.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    ageCheck: function () {
      console.log("key is pressed");
    },
    updateUser: function () {
      var data = JSON.stringify({
        profile_heading: this.users.profile_heading,
        about_us: this.users.about_us,
        first_name: this.users.first_name,
        last_name: this.users.last_name,
        gender: this.users.gender,
        age: this.users.age,
        current_status: this.users.current_status,
        linkedin_profile: this.users.linkedin_profile,
        private_profile: this.users.private_profile,
        is_linkedin_private: this.users.is_linkedin_private,
        is_email_private: this.users.is_email_private,
        is_phone_private: this.users.is_phone_private,

      });
      console.log("json object", data);
      var config = {
        method: "put",
        mode: "no-cors",
        url: "api/user-profile/" + this.$store.state.id + "/",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      axios(config)
        .then((response) => {
          console.log("update profile Response", response.data);
          this.toast.info("Profile Edited Successfully");
        })
        .catch((error) => {
          console.log("edit profile error", error.response);
          this.toast.error("Something Went Wrong");
        });
    },
    updateImage(event) {
      var image_ref = this.$refs.user_image;
      console.log("image_ref", image_ref);
      console.log("image", event.target.files[0]);
      this.image = event.target.files[0];
      var data = new FormData();
      data.append("user_id", this.$store.state.id);
      data.append("avatar", this.image, this.image.name);
      var config = {
        method: "post",
        url: "api/avatar-update/",
        headers: {
          Authorization: "Token " + this.$store.state.token,
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          console.log(event.target.files[0].name);
          if (response.data.message == "Avatar uploaded successfully") {
            image_ref.src =
              "https://atpace-storage.s3.amazonaws.com/user_avtar/" +
              event.target.files[0].name;
          }
          // this.toast.info("Avator Uploaded Successfully");
        })
        .catch(function (error) {
          console.log(error);
          // this.toast.error("Something Went Wrong");
        });
    },
  },
};
</script>
<style scoped>
.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
  top: 9px;
  right: 9px;
}

.switch input { 
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 20px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #735cdf;
}

input:focus + .slider {
  box-shadow: 0 0 1px #735cdf;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>