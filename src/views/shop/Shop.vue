<template>
  <div class="shop" v-if="shopInfo">
    <div class="head-nav">
      <div class="nav_bg">
        <div class="pic_bg"></div>
        <img :src="shopInfo.rst.scheme">
      </div>
      <div class="nav_back">
        <i @click="$router.push('/home')" class="fa fa-chevron-left"></i>
      </div>
      <div class="shop_image">
        <img :src="shopInfo.rst.image_path">
      </div>
      <div class="shop_info">
        <div class="shop_name">
          <h1> {{shopInfo.rst.name}} </h1>
          <i class="fa fa-caret-right"></i>
        </div>
        <div class="rate">
          <div> 评分{{shopInfo.rst.rating}} </div>
          <div class="sale"> 月售{{shopInfo.rst.recent_order_num}}单 </div>
          <div v-if="shopInfo.rst.delivery_mode">
            <span>
              {{shopInfo.rst.delivery_mode.text}}约{{shopInfo.rst.order_lead_time}}分钟 
            </span>
          </div>
        </div>
        <div class="shop_disc">
          <div>
            <span>满减</span>
            <span></span>
          </div>
          <div class="sale"></div>
        </div>
        <div>

        </div>
      </div>
    </div>
    <div class="tabbar">

    </div>
    <div class="container">

    </div>
  </div>
</template>

<script>
export default {
  name:"Shop",
  data(){
    return{
      shopInfo:null
    }
  },
  created(){
    this.getData()
  },
  methods:{
    getData(){
      this.$axios("/api/profile/batch_shop").then(res =>{
        console.log(res.data);
        this.shopInfo = res.data;
      })
    }
  }
}
</script>

<style scoped>
.nav_bg{
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
}
.header-nav {
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
  margin-left: 1.333333vw;
  margin-top: 1.333333vw;
  color:white;
  font-size: 21px;
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
.shop_info{
  background:#fff;
  padding:38px 35px 20px 30px;
}
.shop_name{
  display: flex;
  padding:0 20px;
  font-weight: 800;
}
.shop_name h1{
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 21px;
}
.shop_name i{
  font-size: 22px;
}
.rate{
  display: flex;
  font-size: 10px;
  margin: 14px 0 10px 60px;
  color:#666666;
}
.sale{
  margin:0px 6px;
}
</style>
