<template>
  <div v-if="shopInfo" class="goods">

    <!-- 商家推荐 -->
    <div class="recommend" v-for="(recommend,index) in shopInfo.recommend" :key="index">
      <p class="recommend-name">{{recommend.name}}</p>
      <div class="recommend-wrap">
        <ul>
          <li v-for="(item,index) in recommend.items" :key="index">
            <img :src="item.image_path" alt="">
            <div class="recommend-food">
              <p class="recommend-food-name">{{item.name}}</p>
              <p class="recommend-food-zm">月售{{item.month_sales}} 好评率{{item.satisfy_rate}}</p>
            </div>
            <div class="recommend-food-price">
              <p>¥{{item.activity.fixed_price}}</p>
              <CartControll :food = "item"/>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- 商品分类 -->
    <div class="menuview">

      <!-- 左侧分类列表 -->
      <div class="menu-wrapper" ref="menuScroll">
        <ul> 
          <li
            :class="{'current':currentIndex === index}"  
            @click="selectMenu(index,$event)"
            v-for="(menu,index) in shopInfo.menu" 
            :key="index" 
          >
            <img v-if="menu.icon_url" :src="menu.icon_url">
            <span>{{menu.name}}</span>
          </li>
        </ul>
      </div>

      <!-- 右侧商品内容 -->
      <div class="foods-wrapper" ref="foodScroll">
        <ul>
          <li class="food-list-hook" v-for="(menu,index) in shopInfo.menu" :key="index" >
            <!-- 分类标题 -->
            <div class="category-title">
              <strong>{{menu.name}}</strong>
              <span>{{menu.description}}</span>
            </div>
            <!-- 商品列表 -->
            <div
              class="fooddetails"
              v-for="(item,i) in menu.foods"
              :key="i"
              @click="handleFood(item)"
            >
              <!-- 左 -->
              <img :src="item.image_path" alt="">
              <!-- 右 -->
              <section class="fooddetails-info">
                <h4>{{item.name}}</h4>
                <p class="fooddetails-des">{{item.description}}</p>
                <p class="fooddetails-sales">
                  月售{{item.month_sales}}份 好评率{{item.satisfy_rate}}
                </p>
                <div class="fooddetails-price">
                  <span class="price">¥{{item.activity.fixed_price}}</span>
                  <CartControll :food="item"/>
                </div>
              </section>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- 购物车 -->
    <ShopCart :shopInfo = "shopInfo"/>

    <!-- 商品详情 -->
    <Food @close="showFood=false" :isShow="showFood" :food = "selectedFood"/>

  </div>
</template>

<script>
import BScroll from 'better-scroll'
import CartControll from '../../components/shops/CartControll.vue'
import ShopCart from './ShopCart.vue'
import Food from './Food.vue'
import { log } from 'util';
export default {
  name:"Goods",
  data(){
    return{
      shopInfo:null,
      menuScroll: {}, // 左侧滚动对象
      foodScroll: {}, // 右侧滚动对象
      scrollY:0, //右侧列表滑动的y轴坐标
      listHeight:[], //所有分类头部位置
      clickEvent:false,
      selectedFood:null,
      showFood:false,
    }
  },
  created(){
    this.$axios("/api/profile/batch_shop")
    .then(res=>{
      // 在数据里面添加count属性
      res.data.recommend.forEach(recommend => {
        recommend.items.forEach(item =>{
          item.count = 0
        })
      });

      res.data.menu.forEach(menu => {
        menu.foods.forEach(food => {
        food.count = 0;
        });
      });

      // console.log(res.data);
      this.shopInfo = res.data;
      console.log(this.shopInfo);
      this.$nextTick(() => {
        // 此时DOM已更新 左右两边滚动
        this.initScroll();
        // 计算12个区的高度
        this.calculateHeight()
      })
    })
  },
  computed: {
    // 右侧联动左侧 根据右侧滚动的位置，确定对应的索引下标
    currentIndex () {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i];
        let height2 = this.listHeight[i + 1];
        // 判断是否在两个高度之间
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i;
        }
      }
      return 0;
    }
  },
  methods:{
    initScroll(){
      //左边滚动
      this.menuScroll = new BScroll(this.$refs.menuScroll,{
        click:true
      });
      //右边滚动
      this.foodScroll = new BScroll(this.$refs.foodScroll,{
        //在滚动中触发scroll 事件
        probeType:3,
        click:true
      });
      this.foodScroll.on('scroll', pos => { 
        // 实时获取位置
        this.scrollY = Math.abs(Math.round(pos.y));
    　});
    },
    // 点击左侧按钮联动右侧
    selectMenu(index,event){
      this.clickEvent = true;
      if (!event._constructed) {
        return
      }else{
        let foodlist = this.$refs.foodScroll.getElementsByClassName('food-list-hook');
        let el = foodlist[index]
        // 滚动到对应元素的位置
        this.foodScroll.scrollToElement(el,250)
      }
    },
    // 获得每个区间的高度
    calculateHeight(){
      let foodlist = this.$refs.foodScroll.getElementsByClassName('food-list-hook');
      // 每个区的高度添加到数组中
      let height = 0;
      this.listHeight.push(height);
      for(let i=0;i<foodlist.length-1;i++) {
        let item = foodlist[i];
        height += item.clientHeight; 
        this.listHeight.push(height);
        // console.log(this.listHeight,'listheight')
      }
    },
    handleFood(item){
      this.selectedFood = item;
      this.showFood = true
    }
  },
  components:{
    CartControll,
    ShopCart,
    Food,
  }
}
</script>

<style scoped>
.goods {
  position: relative;
  height: calc(100% - 10.666667vw);
}

.recommend {
  padding-top: 4.266667vw;
  background-color: #fff;
}
.recommend-name {
  padding-left: 4.266667vw;
  color: #333;
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 2.666667vw;
}
.recommend-wrap {
  overflow-x: scroll;
  display: flex;
  width: 100%;
}
.recommend-wrap ul {
  display: flex;
  padding-left: 4.266667vw;
}
.recommend-wrap ul li {
  flex: none;
  width: 32vw;
  margin-right: 2.666667vw;
}
.recommend-wrap li img {
  display: block;
  width: 32vw;
  height: 32vw;
  border-top-left-radius: 0.8vw;
  border-top-right-radius: 0.8vw;
  max-width: 100%;
}
.recommend-food .recommend-food-name {
  color: #333;
  font-size: 0.8rem;
  margin: 1.866667vw 0 1.233333vw;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.recommend-food .recommend-food-zm {
  color: #999;
  font-size: 0.6rem;
  margin-bottom: 1.866667vw;
  min-height: 1em;
}
.recommend-food-price {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 0.266667vw;
}
.recommend-food-price p {
  font-size: 1rem;
  color: #ff5339;
}

::-webkit-scrollbar {
  width: 0 !important;
}

.menuview {
  box-sizing: border-box;
  height: 100%;
  padding-bottom: 10.8vw;
  background-color: #fff;
  display: flex;
}
.menu-wrapper {
  overflow-y: hidden;
  /* height: 100%; */
  height: calc(100% - 12.8vw);
  background-color: #f8f8f8;
  padding-bottom: 10.666667vw;
  width: 20.533333vw;
}
.menu-wrapper li {
  padding: 4.666667vw 2vw;
  font-size: 0.6rem;
  color: #666;
  line-height: 1.2;
}
.menu-wrapper li img {
  max-width: 100%;
  width: 3.466667vw;
  height: 3.466667vw;
  vertical-align: top;
  margin-right: 0.8vw;
}

.foods-wrapper {
  overflow-y: hidden;
  /* height: 100%; */
  height: calc(100% - 12.8vw);
  width: 79.466667vw;
  padding-bottom: 10.666667vw;
}
.category-title {
  margin-left: 2.666667vw;
  padding: 2vw 8vw 2vw 0;
  display: flex;
  align-items: center;
  overflow: hidden;
}
.category-title strong {
  margin-right: 1.333333vw;
  font-weight: 700;
  font-size: 0.8rem;
  color: #666;
  flex: none;
}
.category-title span {
  flex: 1;
  color: #999;
  font-size: 0.6rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.fooddetails {
  min-height: 30.666667vw;
  padding: 2.666667vw 0 2.666667vw 2.666667vw;
  margin-bottom: 0.133333vw;
  display: flex;
}
.fooddetails img {
  width: 25.333333vw;
  height: 25.333333vw;
  flex: none;
  margin-right: 2.666667vw;
  border-radius: 0.533333vw;
}
.fooddetails-info {
  flex: 1;
  padding-bottom: 6.666667vw;
  padding-right: 4vw;
}
.fooddetails-info h4 {
  padding-right: 4vw;
  font-weight: 700;
  overflow: hidden;
  font-size: 1rem;
  white-space: nowrap;
  width: 40vw;
  text-overflow: ellipsis;
  color: #333;
}
.fooddetails-des {
  margin: 1.333333vw 0;
  font-size: 0.6rem;
  color: #999;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 42.666667vw;
}
.fooddetails-sales {
  margin: 1.733333vw 0 !important;
  color: #999;
  font-size: 0.6rem;
  line-height: 1;
  min-height: 1em;
}
.fooddetails-price {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 3.733333vw;
}
.fooddetails-price .price {
  font-size: 1rem;
  line-height: 4.266667vw;
  color: #ff5339;
  padding-bottom: 0.933333vw;
  display: flex;
  align-items: baseline;
}

.menu-wrapper .current {
  background-color: #fff !important;
  color: #333 !important;
}
</style>

