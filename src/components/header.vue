<template>
  <header class="header">
    <el-row style="width: 100%;" align="middle" type="flex" justify="space-between">
      <el-col :offset="1" :xs="8" :sm="4" :md="4" :lg="3" :xl="3">
        <!-- <p class="logo-text">token</p> -->
        <el-dropdown @command="handleCommand">
          <p class="el-dropdown-link logo-text">
            Token<i class="el-icon-arrow-down el-icon--right"></i>
          </p>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="PUB">PUB</el-dropdown-item>
            <el-dropdown-item command="TPT">TPT</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
      <el-col :xs="10" :sm="4" :md="4" :lg="5" :xl="4" class="display-flex">
          <font-awesome-icon class="icon-search" @click="showSearch = true" icon="search-dollar" />
          <div class="header-account" v-if="account.name">
            <p>{{account.name}}</p> 
            <font-awesome-icon @click="logout" icon="sign-out-alt" />
          </div>
          <div class="login-link" @click="login" v-else>Login</div>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="showSearch">
      <input 
        v-model="keyword"
        @keydown.13="search"
        placeholder="Enter token name, ie: keyword"
        class="search-input" />
    </el-dialog>
  </header>
</template>

<script>
  import network from '@/utils/network';
  import Logo from '@/assets/logo.png';
  import api from '@/utils/eos';

  const url = new URL(location.href);

  export default {
    data() {
      return {
        Logo,
        keyword: "",
        showSearch: false
      }
    },

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
      },

      logout() {
        scatter.forgetIdentity().then(() => {
          this.$message.success('User logout success');
          this.$store.commit('UPDATE_ACCOUNT', {});
        }); 
      },

      search() {
        const { keyword } = this;
        if (!keyword) return;
        this.checkToken(keyword).then(result => {
          if (!result) {
            this.$message.error(`Token: ${keyword.toUpperCase()} not exists`);
          } else {
            this.$router.push({ query: { token: keyword.toUpperCase() } });
            this.$store.commit('UPDATE_TOKEN', keyword);
            this.showSearch = false;
          }
        });
      },

      checkToken(token) {
        return api.getTableRows({
          json: true,
          code: 'tokendapppub',
          scope: token.toUpperCase(), 
          table: 'games'
        }).then(({ rows }) => {
          return rows.length;
        });
      },

      handleCommand(command) {
        this.checkToken(command).then(result => {
          if (!result) {
            this.$message.error(`Token: ${command.toUpperCase()} not exists`);
          } else {
            this.$router.push({ query: { token: command.toUpperCase() } });
            this.$store.commit('UPDATE_TOKEN', command);
          }
        });
      }
    },

    computed: {
      account() {
        return this.$store.state.account;
      }
    },

    watch: {
      $route(to, from) {
        if (to.query.token === from.query.token) return;
        this.$store.commit('UPDATE_TOKEN', to.query.token);
      }
    }
  };
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #2968C9;
  height: 70px; 
  box-shadow: rgba(114, 115, 119, 0.05) 0px 4px 14px;
  color: #fff;
}

.el-dropdown-link {
  cursor: pointer;
  outline: none;
}

.logo-text {
  font-weight: 600;
  font-size: 1.4em;
  letter-spacing: 1px;
  color: #fff;
}

.header-account {
  display: flex;
  align-items: center;
  justify-content: space-around;
}


.header-account > svg {
  margin-left: 8px;
  cursor: pointer;
}

.login-link:hover {
  cursor: pointer; 
  text-shadow: 0 0 5px #fff;
}

.icon-search {
  cursor: pointer;
  transition: transform ease 400ms; 
}

.icon-search:hover {
  transform: scale(2);
}

.search-input {
  outline: none;
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  font-size: 1.5em;
  font-style: italic;
  border: none;
}
.display-flex{
  display: flex;
  align-items: center;
  justify-content: space-evenly
}
</style>

