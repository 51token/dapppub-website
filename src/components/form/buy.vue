<template>
  <el-form 
    class="form">
    <el-form-item>
      <el-input 
        type="number"
        placeholder="0.025"
        v-model="eos">
        <template slot="append">EOS</template>
      </el-input>
    </el-form-item> 
    <el-form-item>
      <el-button 
        :disabled="!account.name || !eos"
        type="primary" 
        @click="buy">Buy Now</el-button>
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
        eos: ''
      };
    },
    computed: {
      account() {
        return this.$store.state.account;
      } 
    },
    methods: {
      buy() {
        const eos = scatter.eos(eosnet, Eos, {});
        eos.transfer({
          from: this.account.name,
          to: 'tokendapppub', 
          quantity: Number(this.eos).toFixed(4) + ' EOS', 
          memo: 'PUB'
        }, {
          authorization: `${this.account.name}@${this.account.authority}`,
          broadcast: true,
          sign :true
        }).then(() => {
          this.$notify.success('Token exchange success');
        }).catch(e => {
          this.$notify.error(e.message);
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

