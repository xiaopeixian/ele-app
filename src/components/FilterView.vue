<template>
  <div :class="{'open':isSort || isScreen}" @click.self="hideView">
    <!-- 导航 -->
    <div v-if="filterData" class="filter_wrap">
      <aside class="filter">
        <div 
          class="filter-nav"
          v-for="(item,index) in filterData.navTab"
          :key="index"
          :class="{'filter-bold':currentFilter == index}"
          @click="filterSort(index)"
        >
          <span>{{item.name}}</span>
          <!-- icon图标，用es6语法拼接 -->
          <i v-if="item.icon" :class="'fa fa-' + item.icon" ></i>
        </div>
      </aside>
    </div>
    <!-- 排序 -->
    <section class="filter-extend" v-if="isSort">
      <ul>
        <li v-for="(item,index) in filterData.sortBy" :key="index" @click="selectSort(item,index)">
           <span :class="{'selectName':currentSort == index}">
               {{item.name}}
           </span> 
           <i class="fa fa-check" v-show="currentSort == index"></i>
        </li>
      </ul>
    </section>
    <!-- 筛选 -->
    <section class="filter-extend" v-if="isScreen">
      <div class="filter-sort">
        <div v-for="(screen,index) in filterData.screenBy" :key="index" class="morefilter">
          <p class="title">{{screen.title}}</p>
          <ul>
            <li v-for="(item,i) in screen.data" :key="i" :class="{'selected':item.select}" @click="selectScreen(item,screen)">
              <img v-if="item.icon" :src="item.icon" alt>
              <span>{{item.name}}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="morefilter-btn">
        <span @click="clearFilter" :class="{'edit': edit}" class="morefilter-clear">清空</span>
        <span @click="filterOk" class="morefilter-ok">确定</span>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name:"FilterView",
  data(){
    return{
      currentFilter:0,
      isSort:false,
      currentSort:0,
      isScreen:false,
    }
  },
  computed:{
    edit(){
      let edit = false;
      this.filterData.screenBy.forEach(screen =>{
        screen.data.forEach(item =>{
          if (item.select) {
            edit = true;
          }
        });
      });
      return edit;
    }
  },
  // 父组件向子组件传值
  props:{
    filterData:Object
  },
  methods:{
    filterSort(index){
      this.currentFilter = index;
      switch (index) {
        case 0:
          this.isSort = true;
          // 子组件向父组件传值
          this.$emit('searchFixed',true)
          break;
        case 1:
          this.$emit("update",{ condition : this.filterData.navTab[1].condition });
          this.hideView();
          break;
        case 2:
          this.$emit("update",{ condition : this.filterData.navTab[2].condition });
          this.hideView();
          break;
        case 3:
          this.isScreen = true;
          this.isSort = false;
          this.$emit('searchFixed',true)
          break;
        default:
          this.hideView();
          break;
      }
    },
    // 关闭蒙版
    hideView(){
      this.isSort = false;
      this.isScreen = false;
      this.$emit('searchFixed',false)
    },
    selectSort(item,index){
      this.currentSort = index;
      this.filterData.navTab[0].name = this.filterData.sortBy[index].name;
      this.hideView();
      // 更新数据
      this.$emit("update",{ condition : item.code })
    },
    // 单选和多选
    selectScreen(item,screen){
      if (screen.id !== "MPI") {
        // console.log(screen);
        // 单选
        screen.data.forEach(ele => {
          ele.select = false;
        });
      };
      item.select = !item.select
    },
    // 清空按钮
    clearFilter(){
      this.filterData.screenBy.forEach(screen =>{
        screen.data.forEach(item =>{
          item.select = false;
        });
      });
    },
    // 确定按钮
    filterOk(){
      let screenData = {
        MPI:"",
        offer:"",
        per:""
      };
      let mpiStr = "";
      this.filterData.screenBy.forEach(screen =>{
        screen.data.forEach((item,index)=>{
          if (item.select) {
            if (screen.id !== "MPI") {
              // 单选
              screenData[screen.id] = item.code;
            }else{
              // 多选
              mpiStr += item.code + ",";
              screenData[screen.id] = mpiStr
            }
          }
        });
      })
      this.$emit("update",{condition:screenData})
      this.hideView()
    }
  }
}
</script>

<style scoped>
.filter_wrap {
  background: #fff;
  position: sticky;
  top: 54px;
  z-index: 10;
}
.filter {
  position: relative;
  border-bottom: 1px solid #ddd;
  line-height: 10.4vw;
  z-index: 101;
  height: 10.666667vw;
  display: flex;
  justify-content: space-around;
}
.filter-nav {
  flex: 1;
  text-align: center;
  color: #666;
  font-size: 0.8333rem;
}
.filter-nav i {
  width: 1.6vw;
  height: 0.8vw;
  margin-left: 1.333333vw;
  margin-bottom: 0.533333vw;
  fill: #333;
  /* 增强页面渲染性能 */
  will-change: transform;
}
.filter-bold{
  /* 字体加粗 */
  font-weight:600; 
  color: #333
}
/* 蒙版 */
.open{
  position:fixed;
  top:0;
  left:0;
  width: 100%;
  height: 100%;
  background-color:rgba(0, 0, 0, 0.5);
  transition: all 0.3s ease-in-out;
  z-index: 3;
}
/* 排序 */
.filter-extend {
  background-color: #fff;
  color: #333;
  padding-top: 2.133333vw;
  position: absolute;
  width: 100%;
  z-index: 4;
  left: 0;
  top: 24.533333vw;
}
.filter-extend li {
  position: relative;
  padding-left: 5.333333vw;
  line-height: 10.666667vw;
  overflow: hidden;
}
.fa-check {
  float: right;
  color: #009eef;
  margin-right: 3.733333vw;
  line-height: 10.666667vw;
}

.selectName {
  color: #009eef;
}
/* 筛选 */
.filter-sort{
  background: #fff;
  padding: 0 2.666667vw;
  line-height: normal;
}
.morefilter{
  margin: 2.666667vw 0;
  /* 隐藏溢出，清除浮动 */
  overflow: hidden;
}
.morefilter .title{
  margin-bottom: 2vw;
  color:#666;
  font-size: 0.5rem;
}
.morefilter ul{
  display: flex;
  flex-direction: row;
  /* 允许换行 */
  flex-wrap: wrap;
  font-size: 0.8rem;
}
.morefilter li{
  box-sizing: border-box;
  width:30%;
  /* width:25%; */
  height: 9.333333vw;
  line-height: 9.333333vw;
  margin: 0.8vw 1%;
  background: #fafafa;
}
.morefilter li img{
  width: 3.466667vw;
  height: 3.466667vw;
  vertical-align:middle;
  margin-right: 0.8vw;
}
.morefilter li span{
  margin-left: 2%;
  vertical-align:middle;
}
.morefilter-btn{
  display: flex;
  justify-content: space-around;
  /* flex子项在flex容器的当前行的侧轴（纵轴）方向上的对齐方式,居中 */
  align-items: center;
  background-color: #fafafa;
  box-shadow: 0 -0.266667vw 0.533333vw 0 #ededed;
  line-height: 11.466667vw;
  box-sizing: border-box;
}
.morefilter-btn span{
  font-size: 0.826667rem;
  text-align: center;
  text-decoration: none;
  /* 让所有弹性盒模型对象的子元素都有相同的长度，忽略它们内部的内容 */
  flex: 1;
}
.morefilter-clear{
  color: #ddd;
  background: #fff;
}
.morefilter-ok{
  color: #fff;
  background: #00d762;
  border: 0.133333vw solid #00d762;
}
.selected{
  color: #009eef !important;
  background-color:#EDF5FF !important;
}
.edit{
  color: #333 !important;
}
</style>
