<template>
  <div class="shop" v-if="shopInfo">

    <nav class="header-nav">
      <!-- 背景和商家图片 -->
      <div class="nav_bg">
        <img :src="shopInfo.rst.scheme">
      </div>
      <div class="nav_back">
        <i @click="$router.push('/home')" class="fa fa-chevron-left"></i>
      </div>
      <div class="shop_image">
        <img :src="shopInfo.rst.image_path">
      </div>
    </nav>
      <!-- 商家信息 -->
      <div class="index-rst">
        <div class="rst-name" >
          <span @click="showInfoModel=true"> {{shopInfo.rst.name}} </span>
          <i class="fa fa-caret-right"></i>
        </div>
        <!-- 弹窗信息 --> 
        <InfoModel @close="showInfoModel=false" :showInfoModel="showInfoModel" :rst="shopInfo.rst"></InfoModel>
        
        <!-- 评分月售 -->
        <div class="rst-order">
          <span>评分{{shopInfo.rst.rating}}</span>
          <span>月售{{shopInfo.rst.recent_order_num}}单</span>
          <span>蜂鸟专送约{{shopInfo.rst.order_lead_time}}分钟</span>
        </div>

        <!-- 优惠信息 -->
        <Activity :activities="shopInfo.rst.activities"></Activity>
        <!-- 公告 -->
        <div class="rst-promotion">
          <p>公告: {{shopInfo.rst.promotion_info}}</p>
        </div>
      </div>

      <!-- 导航栏 -->
      <NavBar/>
      <router-view></router-view>
    
  </div>
</template>

<script>
import InfoModel from '../../components/shops/InfoModel'
import Activity from '../../components/shops/Activity'
import NavBar from '../../components/shops/NavBar'
import { log } from 'util';
export default {
  name:"Shop",
  data(){
    return{
      shopInfo:null,
      showInfoModel:false,
    }
  },
  created(){
    this.getData()
  },
  methods:{
    getData(){
      this.$axios("/api/profile/batch_shop").then(res =>{
        // console.log(res.data);
        this.shopInfo = res.data;
      })
    },
  },
  components:{
    InfoModel,
    Activity,
    NavBar,
  }
}
</script>

<style scoped>
.shop{
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
}
.header-nav{
  position: relative;
}
.nav_bg img{
  width:100%;
  height: 26.666667vw;
}
/* 蒙版 */
.nav_back{
  position: absolute;
  top: 0;
  width: 100%;
  height: 26.666667vw;
  background: rgba(0, 0, 0,0.5);
}
.nav_back i{
  color: #fff;
  font-size: 1.3rem;
  margin-left: 1.333333vw;
  margin-top: 1.333333vw;
}
/* 调整图片的位置 */
.shop_image {
  position: absolute;
  top: 0;
  left: 50%;
  margin-left: -10vw;
  margin-top: 11vw;
}
/* 调整图片的大小 */
.shop_image img {
  width: 20vw;
  height: 20vw;
  border-radius: 0.8vw;
}
.index-rst{
  padding: 8vw 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background:#fff;
  box-shadow: inset 0 -0.666667vw 0.666667vw hsla;
}
.index-rst .rst-name{
  flex:1;
  width: 72vw;
  font-size: 1.3rem;
  font-weight: 700;
  white-space: nowrap;
  padding-right: 2.666667vw;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1.6vw 0;
}
.rst-name span{
  text-overflow: ellipsis;
  overflow: hidden;
  text-align: left;
}
.index-rst .rst-order{
  white-space: nowrap;
  height: 3.2vw;
  margin-top: 1.733333vw;
  color: #666;
  text-align: center;
  font-size: 0.6rem;
}
.rst-order span{
  margin: 0 3px;
}
.index-rst .rst-promotion {
  width: 80vw;
  font-size: 0.6rem;
  color: #999;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 2.266667vw auto 2.666667vw;
  padding: 0;
  white-space: nowrap;
}
</style>
