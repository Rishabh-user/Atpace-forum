<template>
  <div>
    {{jsonData}}
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "AndroidDeeplink",
  data() {
    return {
      jsonData: "",
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      axios({
        method:'get',
        url:'assetlinks.json',
        baseURL: '/',
      })
      .then(response => {
          this.jsonData = response.data
      })
      .catch(error => {
          console.log(error);
      });
    },
  },
  components: {},
};
</script>
