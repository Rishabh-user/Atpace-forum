<template>
  <section class="container main-content">
		<div class="login">
			<div class="row">
				<div class="col-md-8">
          <div style="margin-bottom:25px; font-size: 15px;">
            <router-link :to="last_route">
              <i class="icon-reply" aria-hidden="true"></i> Back to Space
            </router-link>
          </div> 
					<div class="page-content">
						<embed :src="this.url" width="100%" height="500px">
					</div><!-- End page-content -->
				</div><!-- End col-md-6 -->
			</div><!-- End row -->
		</div><!-- End login -->
	</section>
  <br><br>
  
</template>

<script>
import { useToast } from "vue-toastification";

export default {
  name: "AttachmentDetail",
  setup() {
    // Get toast interface
    const toast = useToast();
    return { toast };
  },
   data() {
    return {
         url: "https://atpace-storage.s3.amazonaws.com/atpace_community/files/"+this.$route.params.name,
         last_route: localStorage.getItem("last_route"),
   }
   },
    mounted(){
    console.log(this.url)
        
    },
    methods:{

      
    }
};
</script>


