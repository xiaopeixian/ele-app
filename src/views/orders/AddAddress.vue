<template>
  <div class="add-address">
    <Header :isLeft="true" :title="title"></Header>
    <div class="info-view">
      <FormBlock :sex="sex" title="联系人" placeholder="姓名"></FormBlock>
      <FormBlock title="电话" placeholder="手机号码"></FormBlock>
      <FormBlock title="地址" placeholder="小区/写字楼/学校等" icon="angle-right"></FormBlock>
      <FormBlock textarea="textarea" title="门牌号" placeholder="10号楼5层501室222" icon="edit"></FormBlock>
      <div class="formblock">
        <span>标签</span>
        <TabTag :tags="tags"></TabTag>
      </div>

      <div class="confirm-address">
        <button>确定</button>
      </div>
    </div>

  </div>
</template>

<script>
import Header from '../../components/Header.vue'
import FormBlock from '../../components/Orders/FormBlock.vue'
import TabTag from '../../components/Orders/TabTag.vue'
export default {
  name:"AddAddress",
  data(){
    return{
      title:"添加地址",
      sex:["先生","女士"],
      tags:["家","学校","公司"],
    }
  },
  components:{
    Header,
    FormBlock,
    TabTag,
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
.formblock{
  display: flex;
  background: #fff;
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
</style>