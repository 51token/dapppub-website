<template>
  <header class="header">
    <el-row style="width: 100%;" align="middle" type="flex" justify="space-between">
      <el-col :offset="2" :xs="16" :sm="10" :md="10" :lg="10" :xl="10">
        <ul class="header_ul">
          <li class="header_li" @click="navigateTo('trade')">
            <font-awesome-icon icon="wallet" />
            <span class="header_span">Token</span>
          </li>
          <li class="header_li" @click="navigateTo('publish')">
            <font-awesome-icon icon="dollar-sign" />
            <span class="header_span">Publish</span>
          </li>
        </ul>
      </el-col>
      <el-col :xs="8" :sm="8" :md="8" :lg="4" :xl="3">
         <!-- <el-tooltip effect="dark"  content="Comming Soon"  placement="top-start">  -->
           <button v-clipboard:copy="InviteLink" v-clipboard:success="onCopy" v-clipboard:error="onError"  class="btn-invite">Invite friends</button>
          <!-- </el-tooltip> -->
      </el-col>
    </el-row>

   
  </header>  
</template>

<script>



export default {
  methods: {
    navigateTo(route) {
      const { name } = this.$route;
      if (name === route) return;
      const { token } = this.$route.query;
      this.$router.push({ name: route, query: { token } });
    },
    onCopy(e){
      this.$message.success('复制成功');
    },
    // 复制失败
    onError(e){
      this.$message.error('复制失败');
    },
  },
  computed: {
    account() {
      return this.$store.state.account;
    },

    token() {
      return this.$store.state.token;
    },

    referrer_account(){
      return this.$store.state.referrer_account;
    },

    InviteLink(){
      if(window.location.href.indexOf("#") == -1){
        return window.location.href +"#"+ this.$store.state.referrer_account;
      }else{
        return window.location.href; 
      }
    }
  }
};
</script>

<style scoped>
  .header {
    background-color: #fff; 
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 54px;
  }

  .header_ul {
    width: 100%;
    display: flex;
    align-items: center;
  }

  .header_li {
    min-width: 100px;
    cursor: pointer;
    color: #8699B6;
    line-height: 54px;
    font-weight: 500;
    padding: 0 5px;
  }

  .header_li:hover {
    border-bottom: 1px solid #2968C9;
  }

  .header_span {
    margin-left: 5px;
  }

  .btn-invite {
    cursor: pointer;
    background-image: url('../assets/btn-invite-bg.svg');
    font-weight: 600;
    border: 1px solid rgb(0, 170, 109);
    background-color: rgb(0, 197, 127);
    border-radius: 4px;
    color: #fff;
    padding: 5px;
    font-size: .9em;
    transition: opacity ease 200ms;
  }

  .btn-invite:hover {
    opacity: .9;
  }
</style>

