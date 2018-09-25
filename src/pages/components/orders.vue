<template>
  <section class="orders" v-bind:class="{ mobileOrder: isWM }">
    <header v-bind:class="{ mobileHeader: isWM }">Orders</header>
    <el-table class="table" border stripe :data="orders">
      <!-- 电脑端 -->
      <el-table-column v-if="!isWM" prop="is_buy_type" label="Type" width="100">
        <template slot-scope="scope">
          <el-tag :type="scope.row.is_buy_type ? 'success' : 'danger'" disable-transitions>{{scope.row.is_buy_type ? 'buy' : 'sell'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column v-if="!isWM" prop="account_name" label="Account" />
      <el-table-column v-if="!isWM" prop="money" label="EOS" :formatter="eosFormatter" />
      <el-table-column v-if="!isWM" prop="amount" label="Amount"  />
      <el-table-column v-if="!isWM" prop="price" label="price" :formatter="priceFormatter" />
      <el-table-column v-if="!isWM" prop="time" label="Time" :formatter="dateFormatter" />
      <el-table-column v-if="!isWM" label="Action">
        <template slot-scope="scope">
          <a class="order-trxlink" target="_blank" :href="`//eospark.com/MainNet/tx/${scope.row.trx_id}`">detail</a>
        </template>
      </el-table-column>
      <!-- 手机端 -->
      <el-table-column v-if="isWM" prop="account_name" label="Account" :formatter="nameFormatter"/>
      <el-table-column v-if="isWM" prop="amount" label="Amount"/>
      <el-table-column v-if="isWM" prop="price" label="price" :formatter="numberFormatter" />
      <el-table-column v-if="isWM" prop="time" label="Time" :formatter="dateFormatter" />
    </el-table>
    <footer class="order-footer" v-bind:class="{ mobileFooter: isWM }">
      <font-awesome-icon  @click="prevPage" :class="{ 'disabled': offset === 1 }"  icon="chevron-left" />
      <font-awesome-icon  @click="nextPage" :class="{ 'disabled': orders.length < limit }" icon="chevron-right" />
    </footer>
  </section>
</template>

<script>
import fetch from '@/utils/api';

export default {
  mounted() {
    this.fetchOrders();
    this.aa();
  },

  data() {
    return {
      isWM: false,
      orders: [],
      offset: 1,
      keyword: '',
      filter: 0,
      limit: 10
    };
  },

  computed: {
    account() {
      return this.$store.state.account;
    },

    token() {
      return this.$store.state.token;
    }
  },

  watch: {
    token() {
      this.fetchOrders();
    }
  },

  methods: {
    search() {
      this.$route.query.token = this.keyword;
      this.$store.commit('UPDATE_TOKEN', this.keyword);
    },

    fetchOrders() {
      let uri = `token/deals?symbol=${this.token.toUpperCase()}&start=${(this.offset - 1) * this.limit}&limit=${this.limit}`;
      if (this.accountName) uri += `&account_name=${this.keyword}`; 
      if (this.filter) uri += `&eos_limit=${this.filter}`;
      fetch(uri).then(({ deals }) => {
        this.orders = deals;
      });
    },

    dateFormatter({ time }) {
      const date = new Date(time);
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();
      return `${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    },

    eosFormatter({ money }) {
      return money.toFixed(4) + ' EOS';
    },

    priceFormatter({ price }) {
      return price ? price.toFixed(8) + ` EOS / ${this.token.toUpperCase()}` : '-';
    },

    numberFormatter({ price }){
      return price ? price.toFixed(6) : '-';
    },

    prevPage() {
      if (this.offset === 1) return;
      this.offset -= 1;
      this.fetchOrders();
    },

    nextPage() {
      if (this.orders.length < this.limit) return;
      this.offset += 1;
      this.fetchOrders();
    },

    nameFormatter({ account_name }){
      return account_name.replace(/(\w{3})\w{6}(\w{3})/, '$1****$2');;
    },

    aa(){
      // 判断是否为手机端
      var sUserAgent = navigator.userAgent.toLowerCase();
      var bIsIphone = sUserAgent.match(/iphone os/i) ? 'iphone os': "";
      var bIsWM = sUserAgent.match(/windows mobile/i) ? 'windows mobile': "";
      var bIsAndroid = sUserAgent.match(/android/i) ? 'android': "";
      if( bIsIphone || bIsWM || bIsAndroid ){
        this.isWM = true;
      }else{
        console.log(22)
        this.isWM = false;
      }
    }
  },
};
</script>

<style scoped>
.orders {
  flex: 1;
  background-color: #fff;
  box-shadow: rgba(114, 115, 119, 0.05) 0px 4px 14px;
  border: 1px solid #DBE1E8;
  padding: 24px 32px 16px;
  border-radius: 6px;
  min-width: 0;
}

.mobileOrder{
  padding:  10px;
}

.orders > header {
  font-weight: 600;
  color: rgb(80, 92, 108);
  margin-bottom: 30px;
  line-height: 1.5;
}

 .mobileHeader{
  margin-top: 10px;
}

.table {
  margin-bottom: 15px;
  width: 100%;
}

.table >>> th {
  text-align: left;
  background-color: #FDFDFE;
  border-top: 1px solid #E6ECF3;
  border-bottom: 1px solid #E6ECF3;
}

.table >>> td,
.table >>> th {
  padding: 8px 0;
  text-align: center;
}

.table >>> td {
  border-bottom: 1px solid #E6ECF3;
  font-size: 12px;
  font-weight: 300;
}

.table >>> tbody tr:hover {
  background-color: #f5f5f5;
  cursor: pointer
}

.order-trxlink {
  color: #0067c8;
}

.order-trxlink:hover {
  opacity: .8; 
}

.el-tag--success {
  color: #67c23a;  
}

.el-tag--danger {
  color: #f56c6c;
}

.order-footer {
  margin-top: 30px;
}
.mobileFooter {
  margin-bottom: 20px;
  margin-top: 20px;
  padding-left: 10px;
}

.order-footer svg:first-child {
  margin-right: 15px; 
}

.order-footer svg {
  cursor: pointer;
}

.order-footer svg.disabled {
  cursor: not-allowed;
}

.order-footer svg.disabled > path {
  fill: #c0c4cc;
}

.order-footer svg > path {
  fill: #303133;
}

.order-footer svg:hover > path {
  fill: #5F90D3;  
}

.order-footer svg.disabled:hover > path {
  fill: #c0c4cc;  
}
</style>
