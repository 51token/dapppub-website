<template>
  <div>
    <token-info /> 
    <token-chart /> 
    <div class="bottom-container">
      <el-row style="width: 100%;flex-wrap: wrap;" type="flex" justify="space-between">
        <el-col style="margin-top: 15px;" :xs="24" :sm="22" :md="6" :lg="6" :xl="6">
          <token-about />
        </el-col>
        <el-col style="margin-top: 15px;"  :xs="24" :sm="22" :md="16" :lg="16" :xl="16">
          <token-orders />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    document.addEventListener('scatterLoaded', () => {
      if (!scatter.identity) return;
      const account = scatter.identity.accounts.find(account => account.blockchain === 'eos');
      if (!account) return;
      this.$store.commit('UPDATE_ACCOUNT', account);
    });
  },

  components: {
    tokenInfo: require('./components/token-info').default,
    tokenChart: require('./components/token-chart').default,
    tokenOrders: require('./components/orders').default,
    tokenAbout: require('./components/token-about').default,
    tradeForm: require('@/components/trade').default
  }
}
</script>

<style scoped>
  .token-container {
    display: flex;
    margin-bottom: 30px;
  }

  .token-trending {
    flex: 2;
    margin-right: 30px;
  }

  .token-trade {
    flex: 1;
  }

  .search-container {
    display: flex;
  }

  .search-container > .el-input {
    width: 30%;
    min-width: 200px;
    margin-right: 15px;
  }

  .heading {
    font-weight: 300;
    margin-bottom: 15px;
  }

  .token-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .token-filter {
    display: flex; 
    align-items: center;
    margin-bottom: 15px;
  }

  .token-filter > p {
    margin-right: 15px;
  }

  .order-footer {
    text-align: center;
    margin-top: 15px;
  }

  .order-filter {
    display: flex; 
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;
  }

  .order-filter__user,
  .order-filter__amount {
    display: flex;
    align-items: center;
  }

  .order-filter__title {
    margin-right: 15px;
    color: #909194;
    font-weight: 300;
  }

  .username-input {
    margin-right: 15px;
  }

</style>

