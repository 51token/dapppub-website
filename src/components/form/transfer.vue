<template>
  <el-form 
    class="form">
    <el-form-item>
      <el-input 
        readonly
        disabled
        v-model="account.name" />
    </el-form-item> 
    <el-form-item>
      <el-input 
        placeholder="Enter accept user account"
        v-model="to" />
    </el-form-item>
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
        :disabled="!account.name || !to || !token"
        type="success" 
        @click="transfer">Transfer</el-button>
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
        token: '',
        to: ''
      };
    },
    computed: {
      account() {
        return this.$store.state.account;
      } 
    },
    methods: {
      transfer() {
        const eos = scatter.eos(network, Eos, {});
        const options = {
          authorization: `${this.account.name}@${this.account.authority}`,
          broadcast: true,
          sign :true
        };
        eos.contract('tokendapppub', options).then(contract => {
          contract.transfer({
            from: this.account.name, 
            to: this.to,
            quantity: Number(this.token).toFixed(4) + ' PUB',
            memo: 'PUB'
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

