<template>
  <!-- <div class="row"> -->
  <div class="chat">
    <!-- <div class="col-md-12"> -->
    <div class="col-md-3">
      <div class="widget widget_highest_points" style="border-radius: 20px">
        <h3 class="widget_title">Messages</h3>
        <div style="height: 463px; overflow: scroll">
          <ul v-for="member in members" :key="member.id">
            <li v-if="member.user1_id == $store.state.id">
              <div
                class="author-img"
                style="
                  width: 50px;
                  height: 50px;
                  margin-bottom: 15px;
                  border: none;
                  margin-left: 15px;
                "
              >
                <a href="#"><img :src="member.user2_avatar" alt="assets/" /></a>
              </div>
              <h6>
                <router-link
                  :to="{ name: 'Message', params: { id: member.user2_id } }"
                  >{{ member.user2_full_name }}</router-link
                >
              </h6>
              <!-- <span class="comment">12 Points</span> -->
            </li>
            <li v-else>
              <div
                class="author-img"
                style="
                  width: 50px;
                  height: 50px;
                  margin-bottom: 15px;
                  border: none;
                  margin-left: 15px;
                "
              >
                <a href="#"><img :src="member.user1_avatar" alt="" /></a>
              </div>
              <h6>
                <router-link
                  :to="{ name: 'Message', params: { id: member.user1_id } }"
                  >{{ member.user1_full_name }}</router-link
                >
              </h6>
              <!-- <span class="comment">12 Points</span> -->
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="col-md-9">
      <div class="page-content" style="" v-if="name != ''">
        <div class="boxedtitle page-title" style="">
          <h2>{{ name }}</h2>
        </div>
        <div style="height: 350px; overflow: scroll" id="chat-msg-box">
          <ul v-for="chat in chats" :key="chat.id">
            <li
              class="chat-li"
              style=""
              v-if="chat.sender_id == $route.params.id"
            >
              <div class="chat-div" style="">
                <div class="user-profile-img" style="">
                  <img
                    width="40"
                    height="40"
                    alt="Image"
                    :src="chat.sender_avatar"
                  />
                </div>
                <div class="comment-text">
                  <div class="author">
                    <div class="comment-author">
                      <a href="#">{{ chat.sender_name }}</a>
                    </div>

                    <div class="comment-meta">
                      <div class="date" style="font-size: 13px">
                        <i class="icon-time"></i> {{ chat.time_stamp }} ago
                      </div>
                    </div>
                  </div>
                  <div class="text left-div-msg" style="">
                    <p style="" class="left-msg-p">{{ chat.message }}</p>
                  </div>
                </div>
              </div>
            </li>
            <li class="chat-li" style="" v-else>
              <div class="" style="">
                <div class="user-profile-img float-right" style="">
                  <img
                    width="40"
                    height="40"
                    alt="Image"
                    :src="chat.sender_avatar"
                  />
                </div>
                <div class="comment-text">
                  <div class="author">
                    <div class="comment-author">
                      <a href="#" style="">{{ chat.sender_name }}</a>
                    </div>
                    <div class="comment-meta">
                      <div class="date" style="font-size: 13px">
                        <i class="icon-time"></i> {{ chat.time_stamp }} ago
                      </div>
                    </div>
                  </div>
                  <div class="text right-div-msg" style="">
                    <p style="" class="right-msg-p">
                      {{ chat.message }}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <ul id="">
            <li class="chat-li" id="chat-box"></li>
          </ul>
        </div>

        <div style="" class="row">
          <div class="col-md-11">
            <input
              id="chat-message-input"
              type="text"
              name="message"
              placeholder="Type Message ..."
              class="form-control"
              v-model="msg"
              style="width: 100%; margin-top: 30px"
              @keyup.enter="sendMessage()"
            />
          </div>
          <div class="col-md-1">
            <span class="input-group-btn">
              <button
                id="chat-message-submit"
                type="button"
                style="
                  float: right;
                  padding: 7px 15px;
                  background: #735cdf;
                  border-radius: 8px;
                  margin-top: 30px;
                "
                @click="sendMessage()"
                class="button small blue-button custom-button signup"
              >
                Send
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
    <!-- </div> -->
  </div>
  <!-- </div> -->
</template>
<style>
.author-img img {
  width: 50px;
  height: 45px;
}
.chat-li {
  list-style: none;
}
.chat-div {
  padding: 0px;
}
.left-div-msg {
  border: 1px;
  background-color: #735cdf;
  border-radius: 10px;
  width: 90%;
  margin-left: 75px;
}
.left-msg-p {
  padding: 6px;
  color: white;
}
.float-right {
  float: right;
}
/* .float-rightt {
  margin-left:710px;
} */
.right-div-msg {
  border: 1px;
  background-color: #d2d6de;
  border-radius: 10px;
  width: 90%;
  /* margin-top: 48px; */
}
.right-msg-p {
  padding: 6px;
  color: black;
}
/* #chat-msg-box{
  display: flex;
  flex-direction: column-reverse;
} */
</style>
<script>
import axios from "axios";
export default {
  name: "chatMessage",
  components: {},
  data() {
    return {
      chats: "",
      room: "",
      connection: null,
      msg: "",
      name: "",
      members: "",
      socket_server: "",
    };
  },
  watch: {
    $route() {
      if (this.connection != null) {
        this.connection.close();
        // var message = document.getElementsByClassName('comment-texta');
        // console.log("message", message)
        // message.remove();
        document
          .querySelectorAll(".comment-texta")
          .forEach((el) => el.remove());
      }
      console.log("route has changed");
      if (
        (this.$route.name == "Message") |
        (this.$route.name == "ChatMessage")
      ) {
        this.getChat();
        // console.log("this.connection", this.connection)
      }
    },
  },
  mounted() {
    this.getChat();
    this.getRooms();
  },
  methods: {
    getRooms: function () {
      if (this.$store.state.id == null) {
        window.location.replace("/login");
      } else {
        axios
          .get("atpace-community/user-room", {
            params: {
              user: this.$store.state.id,
            },
          })
          .then((response) => {
            // console.log("response", response);
            this.members = response.data.data.rooms;
          })
          .catch((error) => {
            console.log(error.response);
          });
      }
    },
    getChat: function () {
      if (this.$store.state.id == null) {
        window.location.replace("/login");
      } else if (this.$route.name == "ChatMessage") {
        // console.log("route chat");
        this.name == "";
      } else {
        console.log("route chat 262");
        axios
          .get("atpace-community/user-chat", {
            params: {
              user1: this.$store.state.id,
              user2: this.$route.params.id,
              timezone: this.$store.state.timezone
            },
          })
          .then((response) => {
            // console.log("response", response.data.data);
            this.chats = response.data.data.chats;
            this.room = response.data.data.room;
            this.name = response.data.data.name;
          })
          .catch((error) => {
            console.log(error.response);
          })
          .finally(() => {
            this.connectSocket();
            let chat_msg_box = document.getElementById("chat-msg-box");
            chat_msg_box.scrollTop = chat_msg_box.scrollHeight
          });
      }
    },
    sendMessage: function () {
      // console.log(this.connection);
      // console.log("msg", this.msg);
      if (this.msg != "") {
        this.connection.send(this.msg);
        this.msg = "";
      }
    },
    connectSocket: function () {
      console.log(
        "Starting connection to WebSocket Server",
        window.location.host
      );
      var protocol = window.location.protocol;
      if (protocol == "http:") {
        this.socket_server = "ws";
      } else {
        this.socket_server = "wss";
      }

      let socketUrl =
        this.socket_server +
        "://" +
        this.$store.state.backend_base_url +
        "/ws/chat/" +
        this.$store.state.id +
        "/" +
        this.room +
        "/";

      // console.log("socketURL", socketUrl);
      this.connection = new WebSocket(socketUrl);

      this.connection.onmessage = function (event) {
        var currentdate = new Date().toLocaleString();
        console.log("on message", event);
        let parsedMessage = JSON.parse(event.data);

        // console.log("parsed url", event.target.url);

        let chatUrl = event.target.url;
        chatUrl = chatUrl.split("/");
        // console.log(chatUrl[5]);
        let logged_user = chatUrl[5];

        if (logged_user != parsedMessage.sender_user_id) {
          const chat_box = document.getElementById("chat-box");
          const left_div = document.createElement("div");
          left_div.classList.add("chat-div");
          const comment_text = document.createElement("div");
          comment_text.classList.add("comment-texta");
          const author = document.createElement("div");
          author.classList.add("author");
          const comment_author = document.createElement("div");
          comment_author.classList.add("comment-author");
          var a_ele = document.createElement("a");
          a_ele = parsedMessage.sender_user;
          const comment_meta = document.createElement("div");
          comment_meta.classList.add("comment-meta");
          const date = document.createElement("div");
          date.classList.add("date");
          var icon_ele = document.createElement("i");
          icon_ele.classList.add("icon-time");
          const text = document.createElement("div");
          text.classList.add("text", "left-div-msg");
          var p_ele = document.createElement("p");
          p_ele.classList.add("left-msg-p");
          p_ele.innerText = parsedMessage.message;
          text.appendChild(p_ele);
          comment_author.append(a_ele);
          // time_span.textContent = currentdate;
          date.append(icon_ele);
          date.append(currentdate);
          comment_meta.append(date);
          author.append(comment_author);
          author.append(comment_meta);

          comment_text.append(author);
          comment_text.append(text);
          left_div.append(comment_text);
          chat_box.append(left_div);
        }
        if (logged_user == parsedMessage.sender_user_id) {
          const chat_box = document.getElementById("chat-box");
          const left_div = document.createElement("div");
          // left_div.classList.add("chat-div");
          const comment_text = document.createElement("div");
          comment_text.classList.add("comment-texta");
          const author = document.createElement("div");
          author.classList.add("author");
          // chat_span.textContent = from_user;
          const comment_author = document.createElement("div");
          comment_author.classList.add("comment-author");
          var a_elem = document.createElement("a");
          // a_elem.classList.add("float-right");
          a_elem.innerText = parsedMessage.sender_user;
          const comment_meta = document.createElement("div");
          comment_meta.classList.add("comment-meta");
          const date = document.createElement("div");
          date.classList.add("date");
          var icon_elem = document.createElement("i");
          icon_elem.classList.add("icon-time");
          const text = document.createElement("div");
          text.classList.add("text", "right-div-msg");
          var p_elem = document.createElement("p");
          p_elem.classList.add("right-msg-p");
          p_elem.innerText = parsedMessage.message;
          text.appendChild(p_elem);
          comment_author.append(a_elem);
          // time_span.textContent = currentdate;
          date.append(icon_elem);
          date.append(" " + currentdate);
          comment_meta.append(date);
          author.append(comment_author);
          author.append(comment_meta);

          comment_text.append(author);
          comment_text.append(text);
          left_div.append(comment_text);
          chat_box.append(left_div);
        }
        let chat_msg_box = document.getElementById("chat-msg-box");
        function scrollBottom(element) {
          element.scroll({ top: element.scrollHeight, behavior: "smooth" });
        }
        scrollBottom(chat_msg_box);
      };

      this.connection.onopen = function (event) {
        // console.log(event);
        console.log(
          "Successfully connected to the echo websocket server...",
          event
        );
      };
    },
  },
  created: function () {},
};
</script>
