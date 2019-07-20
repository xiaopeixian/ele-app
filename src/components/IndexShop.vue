<template>
  <section class="index-container">
    <div class ="index-shopInfo">
      <!-- 左侧图片 -->
      <div class="log_container">
        <img :src="restaurant.image_path" alt>
      </div>
      <!-- 右侧内容 -->
      <div class="index_main">
        <!-- 第一行 品牌 -->
        <div class="index_shopname">
          <i v-if="restaurant.is_premium">品牌</i>
          <span> {{ restaurant.name }} </span>
        </div>
        <!-- 第二行 星级 -->
        <div>
          <div class="Rating-gray">
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
          </div>
          <span>{{ restaurant.rating }}</span>
          <span>  月售{{ restaurant.recent_order_num }}单</span>
          <div v-if="restaurant.delivery_mode" class="delivery">
            <span class="icon-hollow">
              {{restaurant.delivery_mode.text}}
            </span>
          </div>
        </div>
        <!-- 第三行 配送 -->
        <div class="index-moneylimit">
          <div>
             <span>￥{{restaurant.float_minimum_order_amount}}起送 </span>
             | 
             <span>配送费￥{{ restaurant.float_delivery_fee}}</span>
          </div>
          <div class="index-distancewrap">
             <span> 1km </span>
             |
             <span>{{ restaurant.order_lead_time }}分钟</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name:"IndexShop",
  props:{
    restaurant:Object
  }
}
</script>

<style scoped>
.index-container{
  padding:10px 0;
  background: #fff;
  border-bottom:1px solid rgba(220, 220, 220, 0.377);
}
.index-shopInfo{
  padding: 0 11px;
  display: flex;
  align-items:center;
}
.log_container{
  /* float: left; */
  margin-right: 10px;
}
.log_container img{
  width:67px;
  border: 1px solid rgba(197, 197, 197, 0.274)
}
.index_main{
  line-height: 26px;
  font-size: 12px;
  color: rgb(119, 119, 119);
  width:100%;
}
.index_shopname{
  font-weight: 600;
  font-size: 14.4px;
  color:#333;
}
.index_shopname i{
  font-size: 12px;
  background: yellow;
}
.delivery{
  float: right;
}
.icon-hollow{
  background: rgba(13, 107, 230, 0.726);
  color:#fff;
}
.index-moneylimit{
  display: flex;
  justify-content:space-between
}
.Rating-gray{
  display: inline-flex;
}
</style>
