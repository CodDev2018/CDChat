<template>
  <div class="chat h-100 pt-5">
    <div v-if="this.channel" class="d-flex flex-column h-100">
      <h1 class="p-2 h3 bg-info text-warning">#{{this.channel.name}}</h1>
      <div class="messages overflow-auto mb-auto" id="container-msg">
        <p v-if="!messages" class="text-muted p-2">Nenhuma messagem nesse chat...</p>
        <div v-else class="p-1">
          <b-button
            block
            class="mb-2"
            variant="light"
            @click="loadMessages"
            v-show="showPreviousMessages"
          >Mensagens anteriores</b-button>
          <b-alert
            show
            v-for="message in messages"
            v-bind:key="message.id"
            :class="'message col-md-7 col-sm-10 col-12 ' + (message.user.email === userEmail ? 'offset-md-5 offset-sm-2' : '')"
            :variant="(message.user.email === userEmail ? 'info' : 'secondary')"
          >
            <h5 class="alert-heading">
              {{message.user.name}}
              <small class="float-right">{{message.dateTime}}</small>
              <hr class="mb-0">
            </h5>
            <p class="message-text">{{message.message}}</p>
          </b-alert>
        </div>
      </div>
      <div class="form flex-shrink-1 p-1">
        <form @submit.prevent="onSubmit" inline>
          <div class="container-fluid">
            <div class="row">
              <b-form-textarea
                id="textarea"
                class="col-10 col-md-11"
                v-model="newMessage"
                placeholder="Escreva sua mensagem..."
                rows="1"
                max-rows="2"
                no-resize
                v-on:keyup.enter="onEnter"
              ></b-form-textarea>
              <b-button type="submit" variant="info" class="col-2 col-md-1">
                <i class="fa fa-comment fa-2x text-warning"></i>
              </b-button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div v-else class="d-flex flex-column h-100 text-muted">
      <h1>Carregando...</h1>
    </div>
  </div>
</template>

<script>
import ResourceLoader from "../utils/ResourceLoader";
import moment from "moment";
import io from "socket.io-client";

export default {
  data() {
    return {
      name: "",
      channel: null,
      messages: null,
      newMessage: "",
      userEmail: "",
      page: 0,
      showPreviousMessages: false,
      socket: null
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.name = to.params.name;
      vm.init();
    });
  },
  beforeRouteUpdate(to, from, next) {
    this.name = to.params.name;
    this.init();
    next();
  },
  methods: {
    async init() {
      this.messages = null;
      this.page = 0;
      const myChannelsPath = "/channels/" + this.name;
      let channelResponse = await ResourceLoader.getProtectedResouce(
        myChannelsPath
      );
      this.channel = channelResponse.data;
      this.loadMessages();

      if (!this.socket) {
        this.socket = io.connect("http://127.0.0.1:3030/");
        this.socket.on("channel " + this.name, msg => {
          this.addMessage(msg, true);
        });
      }

      this.userEmail = JSON.parse(sessionStorage.getItem("user")).user.email;
    },
    scrollMessageUp() {
      setTimeout(() => {
        let container = document.getElementById("container-msg");
        container.scrollTop = 0;
      }, 200);
    },
    scrollMessageDown() {
      setTimeout(() => {
        let container = document.getElementById("container-msg");
        container.scrollTop = container.scrollHeight;
      }, 200);
    },
    addMessage(msg, insertAtTheEnd) {
      msg.dateTime = moment(msg.dateTime).format("DD/MM/YYYY HH:mm:ss");
      if (!this.messages) {
        this.messages = [];
      }
      if (insertAtTheEnd) {
        this.messages.push(msg);
        this.scrollMessageDown();
      } else {
        this.messages.unshift(msg);
        this.scrollMessageUp();
      }
    },
    async loadMessages() {
      const myMessagesPath = "/channels/" + this.name + "/history/" + this.page;
      let historyResponse = await ResourceLoader.getProtectedResouce(
        myMessagesPath
      );
      let msgs = historyResponse.data;
      this.showPreviousMessages = msgs.length >= 20;
      msgs.forEach(msg => this.addMessage(msg, this.page == 0));
      this.page++;
    },
    async onSubmit() {
      try {
        if (this.newMessage.trim().length < 1) return;
        let response = await ResourceLoader.getProtectedResouce(
          "/channels/" + this.name,
          "POST",
          {
            message: this.newMessage
          }
        );
        this.newMessage = "";
      } catch (err) {
        console.error(err);
      }
    },
    onEnter(event) {
      if (!event.shiftKey) {
        this.onSubmit();
      }
    }
  }
};
</script>

<style>
textarea,
button[type="submit"] {
  border: none !important;
}
textarea {
  border-top-right-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
}
button[type="submit"] {
  border-top-left-radius: 0 !important;
  border-bottom-left-radius: 0 !important;
}
.form {
  border: 1px solid #343a40;
  background: #343a40;
  margin-bottom: 44px;
}
.alert.message {
  padding: 5px 10px;
  font-size: 0.9em;
}

.alert.message h5 {
  font-size: 1.1em;
  line-height: 0.5;
  margin-top: 5px;
}

.alert.message p {
  margin: 0;
}

.alert.message hr {
  margin-top: 8px;
}

#container-msg {
  min-height: 100px;
}

.message-text {
  white-space: pre
}
</style>
