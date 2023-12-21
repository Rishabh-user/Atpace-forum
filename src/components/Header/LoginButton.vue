<template>
   
	<section class="container main-content">
		<div class="login">
			<div class="row">
				<div class="col-md-6">
					<div class="page-content">
						<h2>Login</h2>
						<div class="form-style form-style-3">
							<form action="/login" method="post" @submit.prevent="onSubmit">
								<p v-if="errors.length">
									<b>Please correct the following error(s):</b>
									<ul>
									<li v-for="error in errors" :key="error">{{ error }}</li>
									</ul>
								</p>
								<div class="form-inputs clearfix">
									<p class="login-text">
										<input type="email" placeholder="Username" v-model="username" required>
										<i class="icon-user"></i>
									</p>
									<p class="login-password">
										<input type="password" placeholder="Password" v-model="password" required>
										<i class="icon-lock"></i>
										<router-link to="/reset-password">Forgot Password</router-link>
									</p>
								</div>
								<p class="form-submit login-submit">
									<input  @click="login()" type="submit" value="Log in" class="button color small login-submit submit">
								</p>
								<div class="rememberme">
									<label><input type="checkbox" checked="checked"> Remember Me</label>
								</div>
                                <ul class="login-links" style="list-style: none;">
                                    <li><router-link to="/signup">Signup</router-link></li>
                                </ul>
							</form>
						</div>
					</div><!-- End page-content -->
				</div><!-- End col-md-6 -->
			</div><!-- End row -->
		</div><!-- End login -->
	</section>
    <!-- End container -->
	<!-- <ForgotPassword /> -->
</template>

<script>
import axios from 'axios';
// import ForgotPassword from "../ForgotPassword.vue"
import { useToast } from "vue-toastification";

export default {
    name: 'LoginButton',
	setup() {
    // Get toast interface
    const toast = useToast();
    
    return { toast };
  },
	components:{
		// ForgotPassword,
	},
     data(){
		return{
			errors: [],
			username:"",
			password:"",
		};
	},
	methods: {
		login: function () {
			this.errors = [];

			if (!this.username) {
				// this.errors.push('username is required.');
				this.toast.error("Username is required!");
			}
			if (!this.password) {
				// this.errors.push('Password is required.');
				this.toast.error("Password is required!");
			}
		if(this.username && this.password){
			var data = {
				password: this.password,
				email: this.username,
			};
			var config = {
				method: "post",
				mode: "no-cors",
				url: "api/community-login/",
				headers: {
				"Content-Type": "application/json",
				},
				data: data,
			};
			axios(config)
				.then((response) => {
					console.log("Response", response);
					console.log("Response", response.data.data.first_name);
					localStorage.setItem("token", response.data.data.token);
					localStorage.setItem("ID", response.data.data.id);
					localStorage.setItem("first name", response.data.data.first_name);
					this.$store.dispatch('loginUser', response)
				})
				.catch((error) => {
					console.log("error", error);
					this.toast.error("Invalid Email Id or Password!");
				});

				// console.log("login error",error.response.data.success, error.response.data.Error);
		
			}
		}
	},
};
</script>