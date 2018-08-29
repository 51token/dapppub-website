<template>
  <el-menu
    class="header"
    default-active="1"
    mode="horizontal"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b">
    <div class="header-left">
      <el-menu-item index="1">Tokens</el-menu-item>
      <el-menu-item index="2">Trade</el-menu-item>
      <el-menu-item index="3">Admin</el-menu-item>
    </div>
    <el-submenu>
      <template slot="title">{{this.account.name || 'Login'}}</template>
      <el-menu-item 
        index="2-1"
        v-if="!this.account.name">Login with Scatter</el-menu-item>
      <el-menu-item 
        index="2-2"
        v-if="this.account.name">Login out</el-menu-item>
    </el-submenu>
  </el-menu> 
</template>

<script>
  import network from '@/utils/network';

  export default {
    methods: {
      login() {
        scatter.getIdentity({
          accounts: [network]
        }).then(() => {
          const account = scatter.identity.accounts.find(account => account.blockchain === 'eos');
          if (!account) return;
          this.$store.commit('UPDATE_ACCOUNT', account);
        }).catch(e => {
          this.$message.warning(e.message);
        });
      }
    },

    computed: {
      account() {
        return this.$store.state.account;
      }
    }
  };
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
}

.header::before {
  display: none;
}

.header-left {
  flex: 1;
  display: flex;
  align-items: center;
}

.login-link {
  text-decoration: none;
  color: #fff;
}

.login-link:hover {
  opacity: .5;
}

.username {
  color: #fff;
}
</style>

