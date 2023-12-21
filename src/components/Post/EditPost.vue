<template>
  <section class="container main-content">
    <div class="login">
      <div class="row">
        <div class="col-md-8">
          <div class="page-content">
            <h2>Edit Post / {{ this.space_name }}</h2>
            <div class="form-style form-style-3">
              <form @submit.prevent="onSubmit">
                <div id="preview" v-if="cover_url">
                  <img :src="cover_url" ref="cover_image" />
                </div>
                <br />
                <label for="coverImage" style="display: inline">
                  <a
                    style="
                      font-size: 15px;
                      padding-top: 5px;
                      padding-left: 5px;
                      cursor: pointer;
                      color: grey;
                    "
                    ><em class="fas fa-image"></em> Edit cover</a
                  ></label
                >
                <!-- <label for="removeCoverImage" style="display: inline" v-if="cover_image">
                  <a
                    style="
                      margin-left: 30px;
                      font-size: 15px;
                      padding-top: 5px;
                      padding-left: 5px;
                      cursor: pointer;
                      color: grey;
                    "
                    @click="removeCover"
                    ><em class="fas fa-image"></em> Remove cover</a
                  ></label
                > -->
                <br />
                <input
                  type="file"
                  name="coverImage"
                  ref="coverfile"
                  id="coverImage"
                  style="display: none"
                  @change="uploadCover"
                  accept="image/*"
                />
                <br />
                <input type="text" placeholder="Title" v-model="title" />
                <br />
                <quill-editor
                  class="editor"
                  v-model:value="body"
                  :options="state.editorOption"
                  :disabled="state.disabled"
                  @blur="onEditorBlur($event)"
                  @focus="onEditorFocus($event)"
                  @ready="onEditorReady($event)"
                  @change="onEditorChange($event)"
                />

                <p class="form-submit">
                  <input
                    type="submit"
                    value="Post"
                    class="button color small submit"
                    @click="editPost()"
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
</template>

<script>
import axios from "axios";
import { useToast } from "vue-toastification";
import { reactive } from "vue";

export default {
  name: "NewPost",
  setup() {
    // Get toast interface
    const toast = useToast();
    // return { toast };

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
              "link",
              { header: 1 },
              { header: 2 },
              { list: "bullet" },
              { list: "ordered" },
            ],
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
      // this.body = text
      // return { html, text }
    };

    // setTimeout(() => {
    //   state.disabled = false
    // }, 2000)

    return {
      state,
      onEditorBlur,
      onEditorFocus,
      onEditorReady,
      onEditorChange,
      toast,
    };
  },
  data() {
    return {
      body: "",
      title: "",
      space_name: "",
      space_id: "",
      group_id: "",
      cover_image: "",
      cover_url: "",
      cover_changed: "false",
    };
  },
  mounted() {
    // var user_id = this.$store.state.id;
    var post_id = this.$route.params.id;
    // console.log(user_id,post_id,"postdetail")
    axios
      .get("atpace-community/user-post/" + post_id, {
        params: { user_id: this.$store.state.id, timezone: this.$store.state.timezone },
      })
      .then((response) => {
        console.log("Post_detail", response.data.data.user_post[0]);
        this.space_name = response.data.data.user_post[0].space_name;
        this.cover_image = response.data.data.user_post[0].cover_image;
        this.cover_url = response.data.data.user_post[0].cover_image;
        this.title = response.data.data.user_post[0].title;
        this.body = response.data.data.user_post[0].description;
        this.space_id = response.data.data.user_post[0].space_id;
        this.group_id = response.data.data.user_post[0].space_group_id;
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  },
  methods: {
    uploadCover(event) {
      if (event.target.files[0]["size"] > 999999) {
        this.toast.error("File size too big add upto 1 MB file size only");
      } else {
        this.cover_changed = "True";
        this.cover_url = URL.createObjectURL(event.target.files[0]);
        this.cover_image = event.target.files[0];
      }
    },

    removeCover() {
      this.cover_url = "";
      this.cover_image = "";
    },

    editPost: function () {
      console.log("space_id", this.space_id);
      console.log("group_id", this.group_id);
      console.log("cover_id", this.cover_image);

      var data = new FormData();
      data.append("title", this.title);
      data.append("Body", this.body);
      data.append("is_comments_enabled", "True");
      data.append("is_liking_enabled", "True");
      data.append("space_id", this.space_id);
      data.append("space_group_id", this.group_id);
      data.append("notify_space_members", "False");
      data.append("post_type", "Post");
      data.append("timezone", this.$store.state.timezone)

      if (this.cover_changed == "True") {
        data.append("cover_image", this.cover_image);
      } else {
        data.append("cover_image", "");
      }

      // console.log("data", data)

      var config = {
        method: "put",
        mode: "no-cors",
        url:
          "atpace-community/user-post/" +
          this.$route.params.id +
          "/?user_id=" +
          this.$store.state.id,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios(config)
        .then((response) => {
          console.log("Post Response", response.data);
          this.toast.info("Post Edited Successfully");
          this.$router.push("/space-link/" + this.space_id);
        })
        .catch((error) => {
          console.log("error", error.response.data);
          if (error.response.data.title == "This field may not be blank.") {
            this.toast.error("Title is required!");
          } else if (
            error.response.data.Body == "This field may not be blank."
          ) {
            this.toast.error("Content is required!");
          } else {
            this.toast.error("Something went wrong");
          }
        });
    },
  },
};
</script>

<style scoped>
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
.editor {
  min-height: 150px;
}
</style>
