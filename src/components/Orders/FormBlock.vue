<template>
  <div class="form-block">
    <div class="form-content">
      <label>{{title}}</label>
      <div class="form-area-wrap">  
        <input v-if="!textarea" :type="type" :name="title" :placeholder="placeholder">
        <textarea v-else maxlength="100" :type="type" rows="2" :placeholder="placeholder"></textarea>
        <TabTag :tags="sex"></TabTag>
      </div>
      <i :v-if="icon" :class="'fa fa-'+icon"></i>
    </div>
  </div>
</template>

<script>
import TabTag from "./TabTag.vue";
export default {
  name:"FormBlock",
  props:{
    type:{
      type: String,
      default: "text",
    },
    textarea: String,
    title: String,
    placeholder: String,
    type: String,
    icon: String,
    sex: Array,
  },
  components:{
    TabTag,
  }
}
</script>

<style scoped>
.form-block{
  box-sizing: border-box;
  background: #fff;
}
.form-content{
  display: flex;
  align-items: center;
  margin-left: 4vw;
  border-bottom: 1px solid #ddd;
}
.form-content label{
  
  font-size: 0.95rem;
  font-weight: 700;
  color: #333;
  width: 20vw;
}
.form-area-wrap{
  /* display: flex; */
  align-items: center;
}
.form-area-wrap input{
  padding:4vw 0 4vw;
  font-size: 0.8rem;
  border: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  /* 去掉input聚焦边框 */
  outline: none;
}
.form-area-wrap textarea{
  padding:4vw 0 4vw;
  font-size: 0.8rem;
  border: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  /* 去掉input聚焦边框 */
  outline: none;
  resize:none;
}
.form-content i{
  flex: 1;
  position: absolute;
  right: 4vw;
}
</style>  