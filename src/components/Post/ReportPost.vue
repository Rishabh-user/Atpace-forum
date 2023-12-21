<template>
<div>
  <section class="container main-content">
		<div class="login">
			<div class="row">
				<div class="col-md-8">
					<div class="page-content">
						<h2>Report Post</h2>
            <h3 style="margin-bottom: 20px">
                <label id="create_post" for="space">Reason to report </label>
                <select name="space" id="space" v-model="selected">
                  <option v-bind:value="{ type: type }" v-for="type in report_types" :key="type.id">
                    {{ type }}
                  </option>
                </select>
              </h3>
						<div class="form-style form-style-3">
              <form @submit.prevent="onSubmit">
                <textarea id="comment" name="comment" aria-required="true" cols="" rows="6" v-model="report_reason" placeholder="Write something..." ></textarea>
                <p class="form-submit">
                  <input type="submit" value="Post" class="button color small submit" @click="reportPost()">
                </p>
              </form>
						</div>
					</div><!-- End page-content -->
				</div><!-- End col-md-6 -->
			</div><!-- End row -->
		</div><!-- End login -->
	</section>
  <br><br>
</div>
</template>

<script>
import axios from "axios";
import { useToast } from "vue-toastification";

export default {
  name: "ReportPost",
  setup() {
    // Get toast interface
    const toast = useToast();
    return { toast };
  },
   data() {
    return {
      report_types : [],
      report_reason : "",
      body: "",
      title: "",
      post: [],
      selected: "",
      post_id:"",   
   }
   },
    mounted(){
    
      var id = this.$store.state.id;
      axios
        .get("atpace-community/report-type/" +id)
        .then(response => {
          console.log("get report type",response.data.data.post_report_data);
          this.report_types = response.data.data.post_report_data;
          
        })
        .catch(error => {
          console.log(error);
        });
    },
    methods:{
      reportPost: function () {
        
        var data = JSON.stringify({
            "post_id": this.$route.params.id,
            "comment": this.report_reason,
            "report_type": this.selected.type
        });
        console.log(data)
        var config = {
          method: "post",
          mode: "no-cors",
          url: "atpace-community/report-post/"+this.$store.state.id+"/",
          headers: {
          "Content-Type": "application/json",
          },
          data: data,
        };
            
        axios(config)
            .then(response => {
            console.log("Post Response",response.data);
            this.toast.info("Post has reported successfully");
            })
            .catch(error => {
            console.log("error",error);
            });
      },
    }
};
</script>

<style scoped>
label#create_post {
  float: left;
  width: 23%;
  margin-right: 1%;
  margin-top: 0px;
}
textarea#comment,
select#space {
  border: 0px;
}
input[type="text"] {
  border: 0px;
}
</style>
