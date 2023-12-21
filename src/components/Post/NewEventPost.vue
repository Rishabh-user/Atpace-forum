<template>
<div>
  <section class="container main-content">
    <div class="login">
      <div class="row">
        <div class="col-md-8">
          <div class="page-content">
            <h2>Create an Event </h2>
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
                    <!-- <p>
                        <label class="required">Host<span>*</span></label>
                        <select style="width:100%;" ref="host">
                            <option
                              v-bind:value="member.user_id"
                              v-for="member in space_members"
                              :key="member.id"
                            >
                              {{ member.name }}
                            </option>
                        </select>
                    </p> -->
                    <p>
                        <label for="start_time" class="required">Start Date and time<span>*</span></label>
                        <input type="datetime-local" class="required-item" id="start_time" v-model="start_time" aria-required="true" @blur="populateEndTime()">
                    </p>
                    <p>
                        <label for="end_time" class="required">End Date and time<span>*</span></label>
                        <input type="datetime-local" id="end_time" v-model="end_time">
                    </p>
                    <p>
                        <label class="required">Location<span>*</span></label>
                        <select style="width:100%;" ref="location" @change="showUrl()">
                            <option value="">Select</option>
                            <option value="URl (Zoom, YouTube Live)">URl (Zoom, YouTube Live)</option>
                            <option value="In person">In Person</option>
                        </select>
                    </p>
                    <p style="display:none;" id="showUrl">
                        <label for="url" class="required" >Url<span>*</span></label>
                        <input type="text" class="required-item" v-model="url" id="url" aria-required="true">
                    </p>
                    <p>
                        <label class="required">Attendees<span>*</span></label>
                        <select style="width:100%;" multiple id="attendees">
                            <option
                              v-bind:value="member.user_id"
                              v-for="member in space_members"
                              :key="member.id"
                            >
                              {{ member.name }}
                            </option>
                        </select>
                    </p>
                    <p style="display:none;" id="showLive">
                        <input type="checkbox" class="required-item" v-model="livestream" id="livestream" aria-required="true">
                        <label for="livestream" class="required">Add to LiveStream</label>
                    </p>
                    
                </div>
                <p class="form-submit" style="display: inline">
                  <input
                    :disabled='isDisabled'
                    type="submit"
                    :value=this.btnValue
                    class="button color small submit"
                    @click="createEventPost()"
                  />
                </p>
            </form>
              <!-- <form @submit.prevent="onSubmit">
                <div id="preview" v-if="cover_url">
                  <img :src="cover_url" ref="cover_image" />
                </div>
                <label for="coverImage" style="display: inline">
                  <a
                    v-if="cover_url == false"
                    style="
                      font-size: 15px;
                      padding-top: 5px;
                      padding-left: 5px;
                      cursor: pointer;
                      color: grey;
                    "
                    ><em class="fas fa-image"></em> Add cover</a
                ></label>
                <input
                  type="file"
                  name="coverImage"
                  ref="coverfile"
                  id="coverImage"
                  style="display: none"
                  @change="uploadCover"
                  accept="image/*"
                />
              </form> -->
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
  name: "NewEventPost",
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
      select_attendees:[],
      error: false,
      logged_user: this.$store.state.id,
      livestream:""
    };
  },
  setup() {
    // Get toast interface
    const toast = useToast();
    
    return { toast };
  },
  mounted() {
    var id = this.$route.params.id;
    axios
      .get("atpace-community/event-space-member/" + id)
      .then((response) => {
        console.log("get space members", response);
        // this.space_members = response.data.data.all_group_members;
        // console.log("response.user_id",response.data.data.all_group_members.length, this.$store.state.id)
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
  },
  methods: {
    addZero(i) {
      if (i < 10) {i = "0" + i}
      return i;
    },
    populateEndTime(){
        if(this.start_time){

          console.log("success", this.start_time);
          let start_obj = new Date(this.start_time)
          let end_obj = new Date(this.start_time)
          end_obj.setMinutes ( start_obj.getMinutes() + 30 );
          console.log("success", start_obj, end_obj);
          this.end_time = end_obj.getFullYear()+"-"+this.addZero(parseInt(end_obj.getMonth()+1))+"-"+this.addZero(end_obj.getDate())+"T"+this.addZero(end_obj.getHours())+":"+this.addZero(end_obj.getMinutes())
          console.log("time", this.end_time)
        }
    },
    showUrl: function(){
      console.log("heeloo")
      if(this.$refs.location.value == "URl (Zoom, YouTube Live)"){
        document.getElementById("showUrl").style.display = "block";
        document.getElementById("showLive").style.display = "block";
        console.log("document.getE", document.getElementById("showUrl"))
      }
      else{
        document.getElementById("showUrl").style.display = "none";
        document.getElementById("showLive").style.display = "none";
      }
    },
    createEventPost: function () {
      //  selected = [];
        for (let option of document.getElementById('attendees').options)
        {
            if (option.selected) {
                this.select_attendees.push(option.value);
            }
        }
      console.log("165",this.select_attendees);
      
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
      else 
      {
        let start = new Date(this.start_time);
        let current = new Date();
        console.log("statrt time", start, current )
        if(start < current){
            this.toast.error("You're not allowed to create past date events!");
            this.error = true
          }
      }
      if(this.end_time == ''){
            this.toast.error("End time is required!");
            this.error = true
      }
      if(this.end_time <= this.start_time & this.end_time & this.start_time){
            this.toast.error("End time must be greater than end time");
            this.error = true
      }
      if(this.url == ''){
        if(this.$refs.location.value == "URl (Zoom, YouTube Live)"){
          this.toast.error("Url is required!");
          this.error = true
        }
      }
      if(this.select_attendees == ''){
            this.toast.error("Attendees is required!");
            this.error = true
      }
      if(this.error == false)
      {
        this.isDisabled = true;
        this.btnValue = "Posting..."
        var data = new FormData();
        data.append("title", this.title);
        // data.append("speaker", this.$refs.host.value)
        data.append("speaker", this.$store.state.id)
        data.append("start_time", this.start_time)
        data.append("end_time", this.end_time)
        data.append("location", this.$refs.location.value)
        data.append("event_url",this.url)
        data.append("is_comments_enabled", "True");
        data.append("is_liking_enabled", "True");
        data.append("space_id", this.$route.params.id);
        data.append("notify_space_members", "False");
        data.append("post_type", "Event");
        data.append("attendees", this.select_attendees)
        data.append("Body",this.body)
        data.append("frequency","Does Not Repeat")
        data.append("timezone", this.$store.state.timezone)
        console.log("12334", this.attendees)

        if (this.cover_image) {
          data.append("cover_image", this.cover_image);
        }
        if(this.livestream){
          data.append("livestream", true);
        }

        console.log("data",data)
        var config = {
          method: "post",
          url: "atpace-community/create-event-post/" + this.$store.state.id + "/",
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
            this.toast.info("Event Created Successfully");
            this.$router.push("/event-space-link/" + this.$route.params.id);
          })
          .catch((error) => {
            console.log("error", error.response.data.message);
            if(error.response.data.message == 'Collabarate with this title already exists!'){
              this.toast.error(error.response.data.message);
            }
            else{
              this.toast.error("Something went wrong");
            }
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
