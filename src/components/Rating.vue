<template>
   <div class="Rating-gray">
     <i v-for="(item,index) in itemClasses" :key="index" class="fa" :class="item"></i>
   </div>
</template>

<script>
// 星星长度
const LENGTH = 5;
// 星星对应的class
// 全星
const CLS_ON = "fa-star"; 
// 半星
const CLS_HALF = "fa-star-half-empty";
// 空星
const CLS_OF = "fa-star-o";

export default {
  name:"Rating",
  props:{
    rating:Number
  },
  computed:{
    itemClasses(){
      let result = [];
      // 如 4.8 对分数进行处理, 向下取0.5的倍数  score = 4.5
      let score = Math.floor(this.rating*2)/2;
      // 用来判断哪种星星的标准 integer = 4   hasDecimal = true
      let integer = Math.floor(score);
      let hasDecimal = score % 1 !== 0;
      // 全星
      for (let i = 0; i < integer; i++) {
        result.push(CLS_ON);
      };
      // 半星
      if(hasDecimal) {
        result.push(CLS_HALF);
      };
      // 补上空星
      while(result.length < LENGTH) {
        result.push(CLS_OF);
      };
      return result;
    }
  }
}
</script>

<style scoped>
.Rating-gray {
  margin-right: 1.066667vw;
  color: #ffbe00;
  display: inline-block;
}
</style>
