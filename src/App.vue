<template>
  <main id="app">
    <token-header />    
    <div class="container">
      <trade-form /> 
    </div>
  </main>
</template>

<script>
import Eos from 'eosjs';

export default {
  created() {
    document.addEventListener('scatterLoaded', () => {
      if (!scatter.identity) return;
      const account = scatter.identity.accounts.find(account => account.blockchain === 'eos');
      if (!account) return;
      this.$store.commit('UPDATE_ACCOUNT', account);
    });
  },

  data() {
    return {
      currentTab: 'buy', 
      isTest: true
    };
  },
  
  components: {
    tokenHeader: require('@/components/header').default,
    tradeForm: require('@/components/trade').default
  }
}
</script>

<style scoped>
  #app {
    height: 100%;
    background-color: #F5F5F5;
  }

  .container {
    padding: 30px;
  }

  .trade-container {
    margin-bottom: 30px;
  }
</style>

