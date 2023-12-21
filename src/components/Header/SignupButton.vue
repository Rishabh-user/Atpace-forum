<template>
  
  <section class="container main-content">
    <div class="login">
      <div class="row">
        <div class="col-md-6">
          <div class="page-content">
            <h2>Signup</h2>
            <div class="form-style form-style-3">
              <form action="/signup" method="post" @submit.prevent="onSubmit">
                <p v-if="errors.length">
                <!-- <b>Please correct the following error(s):</b> -->
                <ul>
                  <span v-if="unsuccess">Something went wrong, Please try again</span>
                  <span v-if="success">Registration Successfull</span>
                  <li v-for="error in errors" :key="error">
                    <!-- <span v-else-if="error.username">{{error.username}}</span> -->
                    <!-- <span v-else>{{error}}</span> -->
                    {{error}}
                  </li>
                </ul>
              </p>
                    <div class="form-inputs clearfix">

              <!-- <vue-tel-input v-model="value"></vue-tel-input> -->
              <p>
                        <label class="required">First Name<span>*</span></label>
                        <input type="text" v-model="first_name" />
              </p>
              <p>
                <label class="required">Last Name<span>*</span></label>
                <input type="text" v-model="last_name"/>
              </p>
              <p>
                <label class="required">Username<span>*</span></label>
                <input type="text" v-model="username"/>
              </p>
              <p>
                <label class="required">E-Mail<span>*</span></label>
                <input type="email" v-model="email"/>
              </p>
              <p>
                    <label class="required">Phone<span>*</span></label>
                    <input type="text" v-model="phone"/>
                    <!-- <vue-country-code
                        @onSelect="onSelect"
                        :preferredCountries="['vn', 'us', 'gb']">
                    </vue-country-code> -->
                  </p>
					<p>
						<label class="required">Password<span>*</span></label>
						<input type="password" v-model="password" />
					</p>
					<p>
                    <label class="required"
                      >Confirm Password<span>*</span></label
                    >
                    <input type="password" v-model="con_password" />
                  </p>
                </div>
                <p class="form-submit login-submit">
                  <input
                    type="submit"
                    @click="signup()"
                    value="Signup"
                    class="button color small login-submit submit"
                  />
                </p>
                <div class="rememberme">
                  <label
                    ><input type="checkbox" checked="checked" /> Remember
                    Me</label
                  >
                </div>
                <ul class="login-links" style="list-style: none;">
                  <li><router-link to="/login">Login</router-link></li>
                </ul>
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
// import { VueTelInput } from 'vue-tel-input';

export default {
  name: "UserSignup",
  components: {
    //   VueTelInput,
    },
  data(){
	return{
		errors: [],
		first_name:"",
		last_name:"",
		username:"",
		email:"",
		phone:"",
		password:"",
		con_password:"",
    unsuccess:false,
    success:false

	};
  },
  methods: {
    signup: function () {
		// if (this.name && this.age) {
    //     return true;
		// }

		this.errors = [];

		if (!this.first_name) {
			this.errors.push('First Name is required.');
		}
		if (!this.last_name) {
			this.errors.push('Last Name is required.');
		}
		if (!this.username) {
			this.errors.push('username is required.');
		}
		if (!this.email) {
			this.errors.push('Email is required.');
		}
		if (!this.phone) {
			this.errors.push('Phone is required.');
		}
		if (!this.password) {
			this.errors.push('Password is required.');
		}
		if (!this.con_password) {
			this.errors.push('Confirm Password is required.');
		}
		if (this.password != this.con_password) {
			this.errors.push('Password and confirm password does not match.');
		}
      var data = JSON.stringify({
        phone: this.phone,
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        username: this.username,
        password: this.password,
      });
      
      var config = {
        method: "post",
        mode: "no-cors",
        url: "api/signup/",
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          host_name: "Forum"
        },
        data: data,
      };
      axios(config)
        .then(response => {
          console.log("Response",response.data.success);
          if(response.data.success == true){
            console.log("successfull");
            this.success = true;
          }
        })
        .catch(error => {
          console.log("signup error",error.response.data.success, "shru",error.response.data.messgage.phone);
          this.errors.push(error.response.data.messgage.username);
          this.errors.push(error.response.data.messgage.phone);
          if(!error.response.data.messgage.username & !error.response.data.messgage.phone & error.response.data.success == false){
            this.unsuccess = true;
          }
        });
    },
  },
};
</script>
<style src="vue-tel-input/dist/vue-tel-input.css"></style>
