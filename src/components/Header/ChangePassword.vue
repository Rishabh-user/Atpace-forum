<template>
  
  <section class="container main-content">
    <div class="login">
      <div class="row">
        <div class="col-md-6">
          <div class="page-content">
            <h2>Change Password</h2>
            <div class="form-style form-style-3">
              <form @submit.prevent="onSubmit">
                
                <div class="form-inputs clearfix">
                     <p>
						<label class="required">Old Password<span>*</span></label>
						<input type="password" v-model="old_password" />
					</p>
					<p>
						<label class="required">Password<span>*</span></label>
						<input type="password" v-model="password" />
					</p>
					<p>
                        <label class="required">Confirm Password<span>*</span></label>
                        <input type="password" v-model="con_password" />
                    </p>
                </div>
                <p class="form-submit login-submit">
                  <input
                    type="submit"
                    @click="changePassword()"
                    value="Submit"
                    class="button color small login-submit submit"
                  />
                </p>
              </form>
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
import { useToast } from "vue-toastification";
export default {
  name: "ChangePassword",
  components: {
    },
    setup() {
    // Get toast interface
    const toast = useToast();
    return { toast };
  },
  data(){
	return{
		old_password:"",
		password:"",
		con_password:"",
	};
  },
  mounted() {
    document.title = "Share@Pace"
  },
  methods: {
    changePassword: function () {

        if (!this.old_password) {
			this.toast.error("Old Password is required!");
		}
        if (!this.password) {
			this.toast.error("Password is required!");
		}
		if (!this.con_password) {
			this.toast.error("Confirm Password is required!");

		}
    //     if (this.password != this.con_password) {
		// 	this.toast.error(" Password and Confirm Password does not match!");

		// }

      var data = JSON.stringify({
        "user_id": this.$store.state.id,
        "password": this.old_password,
        "new_password": this.password,
        "confirm_password": this.con_password
      });
      var config = {
        method: "post",
        mode: "no-cors",
        url: "api/change-password/",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      axios(config)
        .then(response => {
          console.log("Response",response.data);
          this.toast.info(response.data.message);
        //   this.$router.push("/")
         
        })
        .catch(error => {
          console.log("change pass error",error.response);
          this.toast.error("Something went wrong!");
        });
    },
  },
};
</script>

