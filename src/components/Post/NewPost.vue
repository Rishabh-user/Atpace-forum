<template>
<div>
  <section class="container main-content">
    <div class="login">
      <div class="row">
        <div class="col-md-8">
          <div class="page-content">
            <h2>
              <label id="create_post" for="space">Create Post /</label>
              <select name="space" id="space" ref="selectedItem" style="width:auto">
                <option
                  v-bind:value="[space.id, space.space_group_id]"
                  v-for="space in user_spaces"
                  :key="space.id"
                  :selected="space.id == this.$route.params.id"
                >
                  {{ space.name }}
                </option>
              </select>
            </h2>
            <h3 style="margin-bottom: 20px"></h3>
            <div class="form-style form-style-3">
              <form @submit.prevent="onSubmit">
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
                <input type="text" placeholder="Title" v-model="title" style="
                      font-size: 15px;
                      font-weight: bold;
                    "/>
                <!-- <b>{{ msg }}</b> -->
                <quill-editor
                  class="editor"
                  v-model:value="body"
                  :options="state.editorOption"
                  :disabled="state.disabled"
                  @blur="onEditorBlur($event)"
                  @focus="onEditorFocus($event)"
                  @ready="onEditorReady($event)"
                  @change="onEditorChange($event)"
                  v-on:keyup.enter="onEnter"
                />
                <br />
                <div
                  id="preview"
                  v-for="attachment in attachments"
                  :key="attachment.id"
                >
                  <!-- <h2>{{attachment}}</h2> -->
                  <img :src="attachment" ref="image" />
                  <br />
                </div>

                <div id="preview" v-for="video in attach_video" :key="video.id">
                  <video width="320" height="240" controls>
                    <source :src="video" type="video/mp4" />
                  </video>
                  <br />
                </div>
                <!-- <div > -->

                <div
                  class="page-content page-shortcode removeFile"
                  v-for="file in files"
                  :key="file.name"
                >
                  <i
                    class="fa fa-times hideRemove"
                    aria-hidden="true"
                    @click="removeFile()"
                  ></i>
                  <div class="box_icon" style="height:40px;">
                    <span class="icon_i" style="display: inline"
                      ><span icon_align="left">
                        <i
                          v-if="file.is_pdf == 'pdf'"
                          class="far fa-file-pdf"
                        ></i>
                        <i v-else class="fa-solid fa-file"></i> </span
                    ></span>
                    <div class="box_text">
                      <h3>{{ file.name }}</h3>
                      <p>{{ file.size }}</p>
                    </div>
                  </div>
                  <!-- </div> -->
                </div>

                <br />
                <label for="profileImage" style="display: inline">
                  <a
                    style="
                      font-size: 18px;
                      padding-top: 10px;
                      padding-left: 30px;
                      cursor: pointer;
                    "
                    ><em class="fa fa-paperclip"></em></a
                ></label><br>
                <b>Kindly do not attach file of more than 1 MB.</b>
                <input
                  accept="image/*, video/mp4, application/*"
                  type="file"
                  name="profileImage"
                  ref="file"
                  id="profileImage"
                  style="display: none"
                  @change="uploadFile"
                  multiple="multiple"
                />
                <p class="form-submit" style="display: inline">
                  <input
                    :disabled='isDisabled'
                    type="submit"
                    :value=this.btnValue
                    class="button color small submit"
                    @click="createPost()"
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
import { reactive } from "vue";
// import fs from "fs";
// var fs = require('fs');
// import { getLinkPreview } from "link-preview-js";
// var getTitleAtUrl = require('get-title-at-url');

export default {
  name: "NewPost",
  components: {},
  data() {
    return {
      user_spaces: [],
      body: "",
      title: "",
      post: [],
      select_space: "",
      space_name: "",
      selected_space: "",
      image: [],
      attachments: [],
      url: null,
      // embedSrc: "",
      attach_file: [],
      cover_url: false,
      cover_image:"",
      file_name: "",
      file_size: "",
      file_type: "",
      is_pdf: "",
      pdf_size: "",
      files: [],
      videos: [],
      attach_video: [],
      video_url: "",
      msg: "",
      isDisabled: false,
      btnValue: "Post",
    };
  },

  setup() {
    // Get toast interface
    const toast = useToast();

    const state = reactive({
      content: "",
      _content: "",
      editorOption: {
        placeholder: "Write Something....",
        modules: {
          // other moudle options here
          // otherMoudle: {}
          toolbar: [
            [
              "bold",
              "italic",
              "strike",
              { header: 1 },
              { header: 2 },
              { list: "bullet" },
              { list: "ordered" },
            ],
            ["link", "image", "video"],
          ],
        },
        // more options
      },
      disabled: false,
    });

    const onEditorBlur = (quill) => {
      console.log("editor blur!", quill);
    };
    const onEditorFocus = (quill) => {
      console.log("editor focus!", quill);
    };
    const onEditorReady = (quill) => {
      console.log("editor ready!", quill);
    };
    const onEditorChange = ({ quill, html, text }) => {
      console.log("editor change!", quill, html, text);
      state._content = html;
    };

    return {
      state,
      onEditorBlur,
      onEditorFocus,
      onEditorReady,
      onEditorChange,
      toast,
    };
  },

  mounted() {
    var id = this.$store.state.id;
    axios
      .get("atpace-community/user-space/" + id + "/")
      .then((response) => {
        console.log("get spaces", response.data.data.user_space);
        this.user_spaces = response.data.data.user_space;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    createPost: function () {
      if(this.title == ''){
            this.toast.error("Title is required!");
      }
      if(this.body == ''){
            this.toast.error("Content is required!");
      }
      else{
        this.isDisabled = true;
        this.btnValue = "Posting..."

        this.selected_space = this.$refs.selectedItem.value;
        console.log("attachments", this.attach_file);

        var data = new FormData();
        data.append("title", this.title);
        data.append("Body", this.body);
        data.append("is_comments_enabled", "True");
        data.append("is_liking_enabled", "True");
        data.append("space_id", this.selected_space.split(",")[0]);
        data.append("space_group_id", this.selected_space.split(",")[1]);
        data.append("notify_space_members", "False");
        data.append("post_type", "Post");
        data.append("timezone", this.$store.state.timezone)
        // data.append('image_upload', fs.createReadStream('/Users/apple/Downloads/file_example_MP4_480_1_5MG.mp4'));

        if (this.image[0]) {
          console.log("attachments line 193", this.image);
          for (let i = 0; i < this.image.length; i++) {
            data.append("image_upload", this.image[i]);
          }
        }

        if (this.attach_file[0]) {
          console.log("attachments line 206", this.attach_file);
          for (let i = 0; i < this.attach_file.length; i++) {
            data.append("file_upload", this.attach_file[i]);
          }
        }

        if (this.videos[0]) {
          console.log("attachments line 284", this.videos);
          for (let i = 0; i < this.videos.length; i++) {
            data.append("file_upload", this.videos[i]);
          }
        }

        if (this.cover_image) {
          data.append("cover_image", this.cover_image);
        }

        console.log("data",data)
        // for (var pair of data.entries()) {
        //     console.log(pair[0]+ ', ' + pair[1]);
        // }

        var config = {
          method: "post",
          // mode: "no-cors",
          url: "atpace-community/user-posts/" + this.$store.state.id + "/",
          headers: {
            "Content-Type": "multipart/form-data",
            // "Access-Control-Allow-Origin": "*",
            "Accept": "application/json",
            // "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          },
          // maxContentLength: Infinity,
          // maxBodyLength: Infinity,
          data: data,
        };
        console.log("config", config)
        axios(config)
          .then((response) => {
            console.log("Post Response", response.data);
            this.toast.info("Post Created Successfully");
            this.$router.push("/space-link/" + this.selected_space.split(",")[0]);
          })
          .catch((error) => {
            console.log("error", error);
            this.toast.error("Something went wrong");
          });
      }
    },
    uploadFile(event) {
      console.log("type", event.target.files[0]["size"]);
      if(event.target.files[0]["size"] > 999999){
        this.toast.error("File size too big add upto 1 MB file size only");
      }
      else{
        this.file_type = event.target.files[0]["type"];
        this.file_type = this.file_type.split("/");
        if (this.file_type[0] == "image") {
          this.url = URL.createObjectURL(event.target.files[0]);
          this.attachments.push(this.url);
          this.image.push(event.target.files[0]);
        }
        if (this.file_type[0] == "application") {
          this.file_name = event.target.files[0].name;
          this.file_size = event.target.files[0].size;
          if (this.file_type[1] == "pdf") {
            this.is_pdf = "pdf";
          } else {
            this.is_pdf = "other";
          }
          var sizes = ["Bytes", "KB", "MB", "GB", "TB"];
          if (this.file_size == 0) {
            this.pdf_size = "n/a";
          }

          var i = parseInt(Math.floor(Math.log(this.file_size) / Math.log(1024)));
          console.log("i", i);

          if (i == 0) {
            this.pdf_size = this.file_size + " " + sizes[i];
          } else {
            this.pdf_size =
              (this.file_size / Math.pow(1024, i)).toFixed(1) + " " + sizes[i];
          }

          console.log("name", this.file_name);
          console.log("size", this.pdf_size);
          console.log("pdf", this.is_pdf);

          var data = {
            name: this.file_name,
            size: this.pdf_size,
            pdf: this.is_pdf,
          };

          this.files.push(data);
          console.log("data", this.files);

          // this.embedSrc = URL.createObjectURL(event.target.files[0]);
          // console.log("file_data",event.target.files[0])
          this.attach_file.push(event.target.files[0]);
        }
        if (this.file_type[0] == "video") {
          console.log("video", event.target.files[0]);
          this.video_url = URL.createObjectURL(event.target.files[0]);
          this.attach_video.push(this.video_url);
          this.videos.push(event.target.files[0]);
        }
    }
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
    onEnter: function () {
      this.msg = "on enter event";
      // const urlMetadata = require('url-metadata')
      // urlMetadata('http://bit.ly/2ePIrDy').then(
      //   function (metadata) { // success handler
      //     console.log(metadata)
      //   },
      //   function (error) { // failure handler
      //     console.log(error)
      //   })
      // var url = "https://www.npmjs.com/package/link-preview-js";
      // axios(url, (response) => {
      //   getPreviewFromContent(response).then((data) => console.debug(data));
      // });

      // const linkPreviewGenerator = require("link-preview-generator");

      // const previewData = linkPreviewGenerator(
      //   "https://www.youtube.com/watch?v=8mqqY2Ji7_g"
      // ).then((data) =>
      // console.log(data)

      // )
      // console.log(previewData)

      // var Meta = require('html-metadata-parser');

      // console.log(Meta.parser('https://www.youtube.com/shorts/J8CwlpEwHoA'))

      // Meta.parser('https://www.youtube.com/shorts/J8CwlpEwHoA', function (err, result) {

      //     console.log("result",result);
      //     console.log("err",err)
      // })

      // getLinkPreview("https://www.npmjs.com/package/link-preview-js").then((data) =>
      //   console.debug(data)
      // );

      // (async () => {

      //     var result = await Meta.parser('https://www.youtube.com/shorts/J8CwlpEwHoA');

      //     console.log(JSON.stringify(result, null, 3));

      // })();

      //  getLinkPreview("https://www.npmjs.com/package/link-preview-js", {
      //     imagesPropertyType: "og", // fetches only open-graph images
      //     // headers: {
      //     //   // "user-agent": "googlebot" // fetches with googlebot crawler user agent
      //     //   // "Accept-Language": "fr-CA", // fetches site for French language
      //     //   // ...other optional HTTP request headers
      //     // },
      //     timeout: 1000
      //   }).then(data => console.log(data));

      // getPreviewFromContent(response).then((data) => console.debug(data));

      // var url = "https://www.npmjs.com/package/link-preview-js";
      //   getTitleAtUrl(url, function(title){
      //     console.log(title);
      //   });
    },
  },
};
</script>

<style scoped>
input:disabled{
        /* border: 1px solid #999999; */
        background-color: darkgrey;
        color: #fff;
        /* padding: 10px; */
        cursor: not-allowed;
    }

label#create_post {
  float: left;
  width: 20%;
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

select#space {
  background: white;
}
select#space option {
  line-height: 1;
}

input,
textarea {
  background: white;
}
label#create_post {
  width: 30% !important;
}
.editor {
  min-height: 150px;
}

#preview {
  display: inline-block;
  margin: 5px;
  /* justify-content: center; */
  /* align-items: center; */
}

#preview img {
  max-width: 100%;
  max-height: 500px;
}
.hideRemove {
  display: none;
  float: right;
}
/* .removeFile:hover {
  border: 1px solid blue;
  border-radius: 25px;
}

.removeFile:hover .hideRemove {
  display: block;
} */
</style>
