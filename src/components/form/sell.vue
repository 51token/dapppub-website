<template>
  <el-form 
    class="form">
    <el-form-item>
      <el-input 
        type="number"
        placeholder="25"
        v-model="token">
        <template slot="append">PUB</template>
      </el-input>
    </el-form-item> 
    <el-form-item>
      <el-button 
        :disabled="!account.name || !token"
        type="danger" 
        @click="sell">Sell Now</el-button>
      <el-alert
        v-if="!account.name"
        class="login-tip"
        title="Login to trade"
        type="info"
        :closable="false"
        show-icon /> 
    </el-form-item>
  </el-form>
</template>

<script>
  import Eos from 'eosjs';
  import network from '@/utils/network';

  export default {
    data() {
      return {
        token: ''
      };
    },
    computed: {
      account() {
        return this.$store.state.account;
      } 
    },
    methods: {
      sell() {
        const eos = scatter.eos(network, Eos, {});
        const options = {
          authorization: `${this.account.name}@${this.account.authority}`,
          broadcast: true,
          sign :true
        };
        eos.contract('tokendapppub', options).then(contract => {
          contract.sell({
            from: this.account.name, 
            quantity: Number(this.token).toFixed(4) + ' PUB'
          }, options).then(() => {
            this.$notify.success({ message: 'Token exchange success' });
          }).catch(e => {
            this.$notify.error({ title: 'Failure', message: e.message || JSON.parse(e).error.what });
          });
        });
      }
    }
  };
</script>

<style scoped>
  .login-tip {
    margin-top: 15px;
  }
</style>

