<template>
  <div class="home">
    <div class="header">
      <!-- 点击跳转到编辑地址 -->
      <!-- <div class="address_map" @click="$router.push('/address')"> -->
      <div class="address_map" @click="$router.push({name:'address',params:{city:city}})">
        <i class="fa fa-map-marker"></i>
        <span>{{address}}</span>
        <i class="fa fa-sort-desc"></i>
      </div>
    </div>
    <!-- 搜索框 -->
    <div class="search_wrap" :class="{'fixedView':showFilter}">
      <div class="shop_search">
        <i class=" fa fa-search"></i>
        搜索商家 商家名称
      </div>
    </div>
    <div id="container">
      <!-- 轮播图 -->
      <mt-swipe :auto="4000" class="swipe">
         <mt-swipe-item v-for="(img,index) of swipeImgs" :key='index'>
           <!-- 标签中使用：绑定数值 -->
           <img :src="img" alt>
         </mt-swipe-item>
      </mt-swipe>
      <!-- 分类 -->
      <mt-swipe :auto="0" class="entries">
        <mt-swipe-item v-for="(entry,i) of entries" :key="i" class="entry_wrap">
          <div class="foodentry" v-for="(item,index) of entry" :key="index">
            <div class="img_wrap">
              <img :src="item.image" alt>
            </div>
            <span>{{item.name}}</span>
          </div>
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <!-- 推荐商家 --> 
    <div class="shoplist-title">推荐商家</div>
    <!-- 导航 -->
    <FilterView :filterData="filterData" @searchFixed='showFilterView' @update='update'/>
    <!-- 商家信息 -->
    <div style="height: calc(100% - 95px);
  overflow: auto;">
    <IndexShop v-for="(item,index) in restaurants" :key = 'index' :restaurant = 'item.restaurant'/>
      
    </div>
  </div>
</template>

<script>
import { Swipe, SwipeItem } from 'mint-ui';
import FilterView from '../components/FilterView.vue'
import IndexShop from '../components/IndexShop.vue'
export default {
  name:"home",
  data(){
    return{
      swipeImgs:[],
      entries:[],
      filterData:null,
      showFilter:false,
      page:1,
      size:5,
      restaurants:[]
    }
  },
  computed:{
    address(){
      return this.$store.getters.address
    },
    city(){
      return (
        this.$store.getters.location.addressComponent.city ||
        this.$store.getters.location.addressComponent.province
      )
    }
  },
  created(){
    // 获取图片数据
    this.getData()
  },
  methods:{
    getData(){
      // 默认get请求
      this.$axios("/api/profile/shopping").then(
        res=>{
          // console.log(res.data);
          this.swipeImgs = res.data.swipeImgs
          this.entries = res.data.entries
        }
      ),
      this.$axios("/api/profile/filter").then(
        res=>{
          // console.log(res.data);
          this.filterData = res.data
        }
      ),
      // 拉取商家信息
      // 需要使用下拉刷新，所以用post
      this.$axios.post(`/api/profile/restaurants/1/5`).then(res=>{
          console.log(res.data);
          this.restaurants = res.data;
        }
      )
    },
    showFilterView(isShow){
        // console.log(isShow);
        this.showFilter = isShow
    },
    update(condition){
      console.log(condition);
    }
  },
  // 注册组件
  components:{
    FilterView,
    IndexShop
  }
}
</script>


<style>
.home {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
}
.header,
.search_wrap {
  background-color: #009eef;
  padding:10px 16px;
}
.header .address_map {
  color: #fff;
  font-weight: bold;
}
.address_map i {
  margin: 0 3px;
  font-size: 18px;
}
.address_map span {
  display: inline-block;
  width: 80%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.search_wrap .shop_search {
  /* margin-top: 10px; */
  background-color: #fff;
  padding: 10px 0;
  border-radius: 4px;
  text-align: center;
  color: #aaa;
}
/* 搜索框 */
.search_wrap{
  /* 粘性定位 相对定位与固定定位的结合 */
  position: sticky;
  top:0px;
  /* 显示的优先级参数 */
  z-index: 999;
  box-sizing: border-box;
}
/* 轮播图 */
.swipe{
  height:100px
}
.swipe img{
  width:100%;
  height:100px;
}
/* 分类 */
.entries {
  background: #fff;
  height: 47.2vw;
  text-align: center;
  overflow: hidden;
}
.foodentry {
  width: 20%;
  float: left;
  position: relative;
  margin-top: 2.933333vw;
}
.foodentry .img_wrap {
  position: relative;
  display: inline-block;
  width: 12vw;
  height: 12vw;
}
.img_wrap img {
  width: 100%;
  height: 100%;
}
.foodentry span {
  display: block;
  color: #666;
  font-size: 0.32rem;
}
/* 推荐商家 */
.shoplist-title {
  display: flex;
  align-items: flex;
  justify-content: center;
  height: 9.6vw;
  line-height: 9.6vw;
  font-size: 16px;
  color: #333;
  background: #fff;
}
.shoplist-title:after,
.shoplist-title:before {
  display: block;
  content: "一";
  width: 5.333333vw;
  height: 0.266667vw;
  color: #999;
}
.fixedView{
  position: fixed;
  top:0px;
  width:100%;
  z-index: 999;
}
</style>
