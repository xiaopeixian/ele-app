<template>
  <div class="add-address">
    <div>
      <Header :isLeft="true" :title="title"></Header>
      <!-- 添加地址 -->
      <div class="info-view">
        <div class="info-form">
          <FormBlock v-model="addressInfo.name" title="联系人" placeholder="姓名" :sexes="sexes" @checkSex="checkSex" :sex="this.addressInfo.sex"></FormBlock>
          <FormBlock v-model="addressInfo.phone" title="电话" placeholder="手机号码"></FormBlock>
          <FormBlock @clickForm="searchAddress" v-model="addressInfo.address" title="地址" placeholder="小区/写字楼/学校等" icon="angle-right"></FormBlock>
          <FormBlock v-model="addressInfo.bottom" textarea="textarea" title="门牌号" placeholder="10号楼5层501室222" icon="edit"></FormBlock>
          <div class="formblock">
            <span>标签</span>
            <TabTag :tags="tags" @checkTag="checkTag" :selectTag="this.addressInfo.tag"></TabTag>
          </div>
        </div>
        <div class="form-button-wrap">
          <button @click="handleSave" class="form-button">确定</button>
        </div>
      </div>
      <AddressSearch @closeSearch="closeSearch" :addressInfo="addressInfo" :showSearch="showSearch"></AddressSearch>
    </div>
  </div>
</template>

<script>
import Header from '../../components/Header.vue'
import FormBlock from '../../components/Orders/FormBlock.vue'
import TabTag from '../../components/Orders/TabTag.vue'
import AddressSearch from '../../components/Orders/AddressSearch.vue'
import { Toast } from 'mint-ui';
export default {
  name:"AddAddress",
  data(){
    return{
      title:"",
      sexes:["先生","女士"],
      tags:["家","学校","公司"],
      addressInfo:{},
      showSearch: false,
    }
  },
  beforeRouteEnter(to,from,next){
    next(vm =>{
      vm.title = to.params.title;
      vm.addressInfo = to.params.addressInfo;
    })
  },
  methods:{
    checkTag(item){
      this.addressInfo.tag = item;
    },
    checkSex(item){
      this.addressInfo.sex = item;
    },
    searchAddress(){
      this.showSearch = true;
    },
    closeSearch(){
      this.showSearch = false;
    },
    // 存储
    handleSave(){
      if (!this.addressInfo.name) {
        this.showMsg('联系人');
        return;
      };
      if (!this.addressInfo.phone) {
        this.showMsg('联系电话');
        return;
      };
      if (!this.addressInfo.bottom) {
        this.showMsg('收货地址');
        return;
      };
      // 存储数据
      if (this.title == "添加地址") {
        this.addAddress()
      }else{
        this.editAddress()
      }
      
    },
    showMsg(msg){
      Toast({
        message: `请输入${msg}`,
        position: 'bottom',
        duration: 2000
      });
    },
    addAddress() {
      this.$axios
        .post(
          `/api/user/add_address/${localStorage.ele_login}`,
          this.addressInfo
        )
        .then(res => {
          this.$router.push("myAddress");
        })
        .catch(err => console.log(err));
    },
    editAddress(){
      this.$axios.post(`/api/user/edit_address/${localStorage.ele_login}/${this.addressInfo._id}`,this.addressInfo)
      .then(res => {
        this.$router.push('/myAddress')
      })
    }
  },
  components:{
    Header,
    FormBlock,
    TabTag,
    AddressSearch
  }
}
</script>

<style scoped>
.add-address{
  width: 100%;
  margin-top: 45px;
  box-sizing: border-box;
  overflow: hidden;
}
.info-form{
  background: #fff;
}
.formblock{
  display: flex;
  align-items: center;
  padding-left: 4vw;
  border-bottom: 1px solid #ddd;
}
.formblock>span{
  width: 20vw;
  font-size: 0.95rem;
  font-weight: 700;
  color: #333;
}
/* 确定按钮 */
.form-button-wrap {
  padding: 5.333333vw 4vw;
  display: flex;
}
.form-button-wrap .form-button {
  background: #00d762;
  text-align: center;
  border-radius: 0.533333vw;
  flex: 1;
  font-size: 1.1rem;
  line-height: 5.066667vw;
  color: #fff;
  padding: 3.333333vw 0;
  border: none;
  font-weight: 500;
}
</style>