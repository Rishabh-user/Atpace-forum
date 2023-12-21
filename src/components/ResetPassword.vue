<template>
<div>
<div v-if="get_otp">
    <section class="container main-content">
        <div class="login">
        <div class="row">
            <div class="col-md-6">
            <div class="page-content">
                <h2>Get OTP</h2>
                <div class="form-style form-style-3">
                <form @submit.prevent="onSubmit"> 
                    <div class="form-inputs clearfix">
                        <p>
                            <label class="required">E-Mail<span>*</span></label>
                            <input type="email" v-model="email" required/>
                        </p>
                    </div>
                    <p class="form-submit login-submit">
                    <input
                        type="submit"
                        @click="getOtp()"
                        value="Get OTP"
                        class="button color small login-submit submit"
                    />
                    </p>
                    <ul class="login-links" style="list-style: none;">
                        <li><router-link to="/login"><b>Login</b></router-link></li>
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
</div>
<div v-if="verify_otp">
    <section class="container main-content">
        <div class="login">
        <div class="row">
            <div class="col-md-6">
            <div class="page-content">
                <h2>Verify OTP</h2>
                <div class="form-style form-style-3">
                <form @submit.prevent="onSubmit"> 
                    <div class="form-inputs clearfix">
                        <p>
                            <label class="required">OTP<span>*</span></label>
                            <input type="text" v-model="otp" required/>
                        </p>
                    </div>
                    <p class="form-submit login-submit">
                    <input
                        type="submit"
                        @click="verifyOtp()"
                        value="Verify OTP"
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
</div>
<div v-if="set_password">
    <section class="container main-content">
        <div class="login">
        <div class="row">
            <div class="col-md-6">
            <div class="page-content">
                <h2>Set Password</h2>
                <div class="form-style form-style-3">
                <form @submit.prevent="onSubmit"> 
                    <div class="form-inputs clearfix">
                        <p>
                            <label class="required">New Password<span>*</span></label>
                            <input type="password" v-model="password" required/>
                        </p>
                        <p>
                            <label class="required">Confirm Password<span>*</span></label>
                            <input type="password" v-model="con_password" required/>
                        </p>
                    </div>
                    <p class="form-submit login-submit">
                    <input
                        type="submit"
                        @click="setPassword()"
                        value="Set Password"
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
</div>
<br><br><br><br><br><br>
</div>
</template>

<script>
import axios from "axios";
import { useToast } from "vue-toastification";
export default {
    name: "ResetPassword",
    setup() {
      // Get toast interface
      const toast = useToast();
      return { toast }
    },
     data(){
        return{
            email:"",
            otp:"",
            password:"",
            con_password:"",
            user_id: "",
            get_otp:true,
            verify_otp:false,
            set_password:false
        };
    },
    methods:{
        getOtp: function () {
            if(this.email == ""){
                this.toast.error("Email is required!");
            }
            else{
                var data = JSON.stringify({
                    email: this.email,
                });
                var config = {
                    method: "post",
                    mode: "no-cors",
                    url: "api/reset-password/",
                    headers: {
                    "Content-Type": "application/json",
                    },
                    data: data,
                };
                axios(config)
                    .then(response => {
                    console.log("Response",response.data);
                    if(response.data.success == true){
                        this.get_otp = false;
                        this.verify_otp = true;
                        console.log("88");
                        this.toast.info("OTP has been successfully sent to your mail!");
                    } else{
                        this.toast.error("Something Went Wrong!");
                    }
                    })
                    .catch(error => {
                    console.log("error",error.response);
                    this.toast.error(error.response.data.message);
                    });
            }
        },
        verifyOtp: function () {
            if(this.otp == ""){
                this.toast.error("OTP is required!");
            }
            else{
                var data = JSON.stringify({
                    email:this.email,
                    otp: this.otp,
                });
                var config = {
                    method: "post",
                    mode: "no-cors",
                    url: "api/verify-otp/",
                    headers: {
                    "Content-Type": "application/json",
                    },
                    data: data,
                };
                axios(config)
                    .then(response => {
                    console.log("Response",response.data);
                    if(response.data.success == true){
                        this.verify_otp = false;
                        this.set_password = true;
                        this.user_id = response.data.data.id;
                        console.log("818", response.data.data.id);
                        this.toast.info(response.data.message);
                    } else{
                        this.toast.error("Something Went Wrong!");
                    }
                    })
                    .catch(error => {
                        console.log("error",error.response);
                        this.toast.error("Invalid OTP!");
                    });
            }
        },
        setPassword: function () {
            if(this.password == ""){
                this.toast.error("New Password is required!");
            }
            if(this.con_password == ""){
                this.toast.error("Confirm Password is required!");
            }
            else if(this.password.length < 8){
                this.toast.error("Password must have atleast 8 characters!");
            }
            else if(this.password != this.con_password){
                this.toast.error("New Password and Confirm Password should match!");
            }
            else{
                var data = JSON.stringify({
                    new_password: this.password,
                    confirm_password: this.con_password,
                    user_id: this.user_id
                });
                console.log("user_id", this.user_id)
                var config = {
                    method: "post",
                    mode: "no-cors",
                    url: "api/set-password/",
                    headers: {
                    "Content-Type": "application/json",
                    },
                    data: data,
                };
                axios(config)
                    .then(response => {
                    console.log("Response",response.data);
                    if(response.data.success == true){
                        window.location.replace("/login")
                        console.log("828");
                        this.toast.info(response.data.message);
                    } else{
                        this.toast.error("Something Went Wrong!");
                    }
                    })
                    .catch(error => {
                        console.log("error",error.response);
                        this.toast.error(error.response.data.message);
                    });
            }
        },
    },
};
</script>
