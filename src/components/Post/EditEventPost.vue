<template>
<div>
  <section class="container main-content">
    <div class="login">
      <div class="row">
        <div class="col-md-8">
          <div class="page-content">
            <h2>Edit Event </h2>
            <h3 style="margin-bottom: 20px"></h3>
            <div class="form-style form-style-3">
            <form class="form-style form-style-3" id="question-submit" @submit.prevent="onSubmit">
                <div class="form-inputs clearfix">
                    <p>
                        <label for="title" class="required">Title<span>*</span></label>
                        <input type="text" class="required-item" v-model="title" id="title" aria-required="true">
                    </p>
                    <p>
                        <label for="body" class="required">Description<span>*</span></label>
                        <input type="text" class="required-item" v-model="body" id="body" aria-required="true">
                    </p>
                    <p>
                        <label for="start_time" class="required">Start Date and time<span>*</span></label>
                        <input type="datetime-local" class="required-item" id="start_time" v-model="start_time" aria-required="true">
                    </p>
                    <p>
                        <label for="end_time" class="required">End Date and time<span>*</span></label>
                        <input type="datetime-local" id="end_time" v-model="end_time">
                    </p>
                    <!-- <p>
                        <label class="required">Location<span>*</span></label>
                        <select style="width:100%;" ref="location" @change="showUrl()">
                            <option value="" >Select</option>
                            <option value="URl (Zoom, YouTube Live)" :selected="selected_location == 'URl (Zoom, YouTube Live)'">URl (Zoom, YouTube Live)</option>
                            <option value="In person" :selected="selected_location == 'In person'">In Person</option>
                        </select>
                    </p>
                    <p style="display:none;" id="showUrl">
                        <label for="url" class="required">Url<span>*</span></label>
                        <input type="text" class="required-item" v-model="url" id="url" aria-required="true">
                    </p> -->
                    <p>
                        <label class="required">Location<span>*</span></label>
                        <input type="text" id="location" v-model="location" @click="showToast()" readonly>
                    </p>
                    <p v-if="this.location == 'URl (Zoom, YouTube Live)'">
                        <label for="url" class="required">Url<span>*</span></label>
                        <input type="text" class="required-item" v-model="url" id="url" aria-required="true">
                    </p>
                    
                    <p>
                        <label class="required">Attendees<span>*</span></label>
                        <select style="width:100%;" :multiple="true" id="attendees">
                            
                            <option
                              v-bind:value="member.user_id"
                              v-for="member in space_members"
                              :key="member.id" :selected="event_attendees.includes(member.user_id)"
                            >
                              {{ member.name }}
                            </option>
                        </select>
                    </p>
                    <!-- <p>
                        <input type="checkbox" class="required-item" v-model="livestream" id="livestream" aria-required="true">
                        <label for="livestream" class="required">Add to LiveStream</label>
                    </p> -->
                    
                </div>
                <p class="form-submit" style="display: inline">
                  <input
                    :disabled='isDisabled'
                    type="submit"
                    :value=this.btnValue
                    class="button color small submit"
                    @click="editEventPost()"
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
  <br /><br />
</div>
</template>

<script>
import axios from "axios";
import { useToast } from "vue-toastification";

export default {
  name: "EditEventPost",
  components: {},
  data() {
    return {
      title: "",
      body:"",
      cover_url: false,
      cover_image:"",
      isDisabled: false,
      btnValue: "Post",
      space_members: [],
      end_time: "",
      url: "",
      start_time: "",
      attendees: "",
      event_attendees: [],
      location: "",
      selected_location: "",
      space_id:"",
      space_group_id:"",
      select_attendees:[],
      error: false
    };
  },
  setup() {
    // Get toast interface
    const toast = useToast();
    
    return { toast };
  },
  mounted() {
    // getting space members
    let route = localStorage.getItem("last_route");
    route = route.split("/")
    console.log("last rount", route[2])
    axios
      .get("atpace-community/event-space-member/" + route[2])
      .then((response) => {
        console.log("get space members", response);
        for (let i=0; i<response.data.data.all_group_members.length; i++){
          console.log("response.user_id",response.data.data.all_group_members[i].user_id, this.$store.state.id)
          if(response.data.data.all_group_members[i].user_id != this.$store.state.id){
            this.space_members.push(response.data.data.all_group_members[i])
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });

    // loading post data to event form
    var post_id = this.$route.params.id;
    // console.log(user_id,post_id,"postdetail")
    axios
      .get("atpace-community/user-post/" + post_id, {
        params: { user_id: this.$store.state.id, timezone: this.$store.state.timezone },
      })
      .then((response) => {
        // console.log("Event Post_detail", response.data.data.user_post[0], response.data.data.user_post[0].event.complete_start_time);
        this.title = response.data.data.user_post[0].title;
        this.body = response.data.data.user_post[0].description;
        this.space_id = response.data.data.user_post[0].space_id;
        // this.space_group_id = response.data.data.user_post[0].space_group_id;
        let sdate = response.data.data.user_post[0].event.complete_start_time.split("T")
        this.start_time = sdate[0]+"T"+response.data.data.user_post[0].event.start_time
        this.start_time = this.start_time.split(" ")[0]
        console.log("start_time", this.start_time.split(" ")[0])
        let edate = response.data.data.user_post[0].event.complete_end_time.split("T")
        this.end_time = edate[0]+"T"+response.data.data.user_post[0].event.end_time
        this.end_time = this.end_time.split(" ")[0]
        console.log("this.ed_tine", this.end_time, response.data.data.user_post[0].event.complete_start_time, )
        this.url = response.data.data.user_post[0].event.event_url
        // this.selected_location = response.data.data.user_post[0].event.location
        this.location = response.data.data.user_post[0].event.location
        // if(this.selected_location == 'URl (Zoom, YouTube Live)'){
        //   document.getElementById("showUrl").style.display = "block";
        // }
        // console.log("event attendees", response.data.data.user_post[0].event.attendees.length, this.selected_location)
        for (let i=0; i < response.data.data.user_post[0].event.attendees.length; i++){
            this.event_attendees.push(response.data.data.user_post[0].event.attendees[i].id)
        }
        console.log("this.event_attendees", this.event_attendees, response.data.data.user_post[0].event.attendees)

      })
      .catch((error) => {
        console.log(error.response.data.message);
      });

  },
  methods: {

  showToast: function(){
      console.log("heddeloo")
      this.toast.info("Location can not be edited!");
    },

   showUrl: function(){
      console.log("heeloo")
      if(this.$refs.location.value == "URl (Zoom, YouTube Live)"){
        document.getElementById("showUrl").style.display = "block";
      }
      else{
        document.getElementById("showUrl").style.display = "none";
      }
    },
    editEventPost: function () {
        // console.log("attendees", this.$refs.location.value, this.$refs.attendees.value)
        // let selected = [];
        for (let option of document.getElementById('attendees').options)
        {
            if (option.selected) {
                this.select_attendees.push(option.value);
            }
        }
        console.log("162",this.select_attendees);
      if(this.title == ''){
            this.toast.error("Title is required!");
            this.error = true
      }
      if(this.body == ''){
            this.toast.error("Description is required!");
            this.error = true
      }
      if(this.start_time == ''){
            this.toast.error("Start time is required!");
            this.error = true
      }
      if(this.end_time == ''){
            this.toast.error("End time is required!");
            this.error = true
      }
      if(this.end_time <= this.start_time){
            this.toast.error("Start time must be less than end time");
            this.error = true
      }
      if(this.url == ''){
            // if(this.$refs.location.value == "URl (Zoom, YouTube Live)"){
            //   this.toast.error("Url is required!");
            //   this.error = true
            // }
            if(this.location == "URl (Zoom, YouTube Live)"){
              this.toast.error("Url is required!");
              this.error = true
            }
      }
      if(this.select_attendees == ''){
            this.toast.error("Attendees is required!");
            this.error = true
      }
      if(this.error == false){
        this.isDisabled = true;
        this.btnValue = "Posting..."
        var data = new FormData();
        data.append("title", this.title);
        // data.append("speaker", this.$refs.host.value)
        data.append("speaker", this.$store.state.id)
        data.append("start_time", this.start_time)
        data.append("end_time", this.end_time)
        data.append("location", this.location)
        data.append("event_url",this.url)
        data.append("is_comments_enabled", "True");
        data.append("is_liking_enabled", "True");
        data.append("space_id", this.space_id);
        data.append("notify_space_members", "False");
        data.append("post_type", "Event");
        data.append("attendees", this.select_attendees)
        data.append("Body",this.body)
        data.append("frequency","Does Not Repeat")
        data.append("timezone", this.$store.state.timezone)
        if (this.cover_image) {
          data.append("cover_image", this.cover_image);
        }

        // console.log("data",data)
        var config = {
          method: "put",
          url: "atpace-community/update-event-post/" + this.$store.state.id + "/" + this.$route.params.id + "/",
          headers: {
            "Content-Type": "multipart/form-data",
            "Accept": "application/json",
          },
          data: data,
        };
        console.log("config", config)
        axios(config)
          .then((response) => {
            console.log("Event Post Response", response.data);
            this.toast.info("Event Edited Successfully");
            this.$router.push("/event-space-link/" + this.space_id);
          })
          .catch((error) => {
            
            console.log("error", error);
            this.toast.error("Something went wrong");
            this.isDisabled = false;
            this.btnValue = "Post"
          });
        
      }
      this.error = false
    },
    
    uploadCover(event) {

      if(event.target.files[0]["size"] > 999999){
        this.toast.error("File size too big add upto 1 MB file size only");
      }
      else{
        this.cover_url = URL.createObjectURL(event.target.files[0]);
        this.cover_image = event.target.files[0];
      }

    },

  },
};
</script>

<style scoped>

input:disabled{
        background-color: darkgrey;
        color: #fff;
        cursor: not-allowed;
    }

</style>
