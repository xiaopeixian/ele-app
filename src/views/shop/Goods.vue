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
          v-for="(menu,index) in shopInfo.menu" 
          :key="index" 
          @click="selectMenu(index,$event)"
          >
            <img v-if="menu.icon_url" :src="menu.icon_url">
            <span>{{menu.name}}</span>
          </li>
        </ul>
      </div>

      <!-- 右侧 -->
      <div class="shoplist-wrap" ref="shoplistWrap">
        <ul ref="itemList">
          <li class="shop-hook" v-for="(menu,index) in shopInfo.menu" :key="index" >
            <div>
              <span class="shoplist-name">{{menu.name}}</span>
              <span v-show="menu.description">{{menu.description}}</span>
            </div>
            <div class="shoplist-info" v-for="(item,i) in menu.foods" :key="i">
              <img :src="item.image_path" alt="">
              <div class="goods-info">
                <p>{{item.name}}</p>
                <span class="goods-description">{{item.description}}</span>
                <div>
                  <span>月售{{item.month_sales}}份</span>
                  <span>好评率{{item.satisfy_rate}}</span>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>

    </div>

  </div>
</template>

<script>
import BScroll from 'better-scroll'
import CartControll from '../../components/shops/CartControll.vue'
import { log } from 'util';
export default {
  name:"Goods",
  data(){
    return{
      shopInfo:[],
      current:Number,
      scrollY:0, //右侧列表滑动的y轴坐标
      listHeight:[], //所有分类头部位置
      clickEvent:false,
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
      // console.log(res.data);
      this.shopInfo = res.data;
      // console.log(this.shopInfo);
      this.$nextTick(() => {
      //左右两边滚动
        this._initBScroll();
        //右边列表高度
        this._initRightHeight()
      })
    })
  },
  computed: {
    // 右侧联动左侧
    currentIndex () {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i];
        let height2 = this.listHeight[i + 1];
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i;
        }
      }
      return 0;
    },
  },
  methods:{
    _initBScroll(){
      //左边滚动
      this.leftBscroll = new BScroll(this.$refs.menuScroll,{
        click:true
      });
      //右边滚动
      this.rightBscroll = new BScroll(this.$refs.shoplistWrap,{
        //在滚动中触发scroll 事件
        probeType:3
      });
      this.rightBscroll.on('scroll', (pos) => { 
        // 实时获取位置
        this.scrollY = Math.abs(Math.round(pos.y));
    　});
    },
    // 获得每个区间的高度
    _initRightHeight(){
      let right = this.$refs.itemList.getElementsByClassName('shop-hook');
      let height = 0;
      this.listHeight.push(height);
      for(let i=0;i<right.length;i++) {
        let item = right[i];
        height += item.clientHeight; 
        this.listHeight.push(height);
        // console.log(this.listHeight,'listheight')
      }
    },
    // 点击左侧按钮联动右侧
    selectMenu(index,event){
      this.clickEvent = true;
      if (!event._constructed) {
        return
      }else{
        let right = this.$refs.itemList.getElementsByClassName('shop-hook');
        let el = right[index]
        this.rightBscroll.scrollToElement(el,300)
      }
    }
  },
  components:{
    CartControll
  }
}
</script>

<style scoped>
.goods{
  position: relative;
  height: calc(100% - 10.666667vw);
}
.recommend{
  padding-top: 4.266667vw;
  background: #fff; 
}
.recommend-name{
  padding-left: 4.266667vw;
  font-size: 1rem;
  color: #333;
  font-weight: 700;
  margin-bottom: 2.666667vw;
}
.recommend-wrap {
  overflow-x: scroll;
  display: flex;
  width: 100%;
}
.recommend-wrap ul{
  display: flex;
  padding-left: 4.266667vw;
}
.recommend-wrap ul li{
  flex: none;
  width: 32vw;
  margin-right: 2.666667vw;
} 
.recommend-wrap li img{
  display: block;
  width: 32vw;
  height: 32vw;
  border-top-left-radius: 0.8vw;
  border-top-right-radius: 0.8vw;
  max-width: 100%;
}
.recommend-food .recommend-food-name{
  font-size: 0.8rem;
  color:#333;
  margin: 1.866667vw 0 1.233333vw;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.recommend-food .recommend-food-zm{
  font-size: 0.6rem;
  color:#999;
  margin-bottom: 1.866667vw;
  min-height: 1em;
}
.recommend-food-price{
  display: flex;
  align-items:center;
  justify-content: space-between;
  padding-right: 0.266667vw;
}
.recommend-food-price p{
  color: #ff5339;
  font-size: 1rem;
}
::-webkit-scrollbar{
  width:0!important;
}

/* 商家列表 */
.menuview{
  width: 100%;
  height: 540px;
  overflow: hidden;
  position: relative;
  display: flex;
  background: #fff;
}
/* 左侧 */
.menu-wrapper{
  width:21.67vw;
  background: rgba(236, 236, 236, 0.308);
  font-size: 0.67rem;
  color:rgb(105, 105, 105);
  box-sizing: border-box;
}
.menu-wrapper li{
  padding:0 1.67vw 0 2vw; 
  display: flex;
  height: 13vw;
  align-items: center;
  line-height: 4vw;
}
.current{
  background: #fff!important;
  color:rgb(70, 70, 70)!important;
}
.menu-wrapper li img{
  width:3.53vw;
  margin-right: 0.8vw;
}
/* 右侧 */
.shoplist-wrap{
  flex:1;
  width:100%;
  overflow: hidden;
}
.shoplist-wrap li{
  margin: 2vw 4vw 0 2vw;
}
.shoplist-name{
  color:rgb(122, 121, 121)!important;
  font-size: 0.8rem!important;
  font-weight: 700;
}
.shoplist-wrap span{
  color:#999;
  font-size: 0.67rem;
}
.shoplist-info{
  display: flex;
  margin: 4vw 0 6vw 0;
}
.shoplist-info img{
  width:26vw;
  height:26vw;
}
.goods-description{
  display: block;
  width: 43vw;
  color: red!important;
  overflow:hidden;
  text-overflow:ellipsis!important;
  white-space:nowrap;
}
</style>

