<template>
    <div class="login-panel">
      <section class="container">
        <div class="row">
          <div class="col-md-6">
            <div class="page-content">
              <h2>Login</h2>
              <div class="form-style form-style-3">
                <form>
                  <div class="form-inputs clearfix">
                    <p class="login-text">
                      <input
                        type="text"
                        value="Username"
                        onfocus="if (this.value == 'Username') {this.value = '';}"
                        onblur="if (this.value == '') {this.value = 'Username';}"
                      />
                      <i class="icon-user"></i>
                    </p>
                    <p class="login-password">
                      <input
                        type="password"
                        value="Password"
                        onfocus="if (this.value == 'Password') {this.value = '';}"
                        onblur="if (this.value == '') {this.value = 'Password';}"
                      />
                      <i class="icon-lock"></i>
                      <a href="#">Forget</a>
                    </p>
                  </div>
                  <p class="form-submit login-submit">
                    <input
                      type="submit"
                      value="Log in"
                      class="button color small login-submit submit"
                    />
                  </p>
                  <div class="rememberme">
                    <label
                      ><input type="checkbox" checked="checked" /> Remember
                      Me</label
                    >
                  </div>
                </form>
              </div>
            </div>
            <!-- End page-content -->
          </div>
          <!-- End col-md-6 -->
          <div class="col-md-6">
            <div class="page-content Register">
              <h2>Register Now</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
                adipiscing gravdio, sit amet suscipit risus ultrices eu. Fusce
                viverra neque at purus laoreet consequa. Vivamus vulputate
                posuere nisl quis consequat.
              </p>
              <a class="button color small signup">Create an account</a>
            </div>
            <!-- End page-content -->
          </div>
          <!-- End col-md-6 -->
        </div>
      </section>
    </div>
    <div class="panel-pop" id="signup">
      <h2>Register Now<i class="icon-remove"></i></h2>
      <div class="form-style form-style-3">
        <form>
          <div class="form-inputs clearfix">
            <p>
              <label class="required">Username<span>*</span></label>
              <input type="text" />
            </p>
            <p>
              <label class="required">E-Mail<span>*</span></label>
              <input type="email" />
            </p>
            <p>
              <label class="required">Password<span>*</span></label>
              <input type="password" value="" />
            </p>
            <p>
              <label class="required">Confirm Password<span>*</span></label>
              <input type="password" value="" />
            </p>
          </div>
          <p class="form-submit">
            <input
              type="submit"
              value="Signup"
              class="button color small submit"
            />
          </p>
        </form>
      </div>
    </div>
    <ForgotPassword />
</template>

<script>
import ForgotPassword from "./ForgotPassword.vue"
export default {
    name: 'TopLogin',
    components:{
        ForgotPassword,
    }
}
</script>