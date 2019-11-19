<template>
  <div class="form-block">
    <div class="form-title">
      <label>{{title}}</label>
    </div>
    <div class="form-content">
      <div class="form-area-wrap"> 
        <input v-if="!textarea" :type="type" :name="title" :placeholder="placeholder">
        <textarea v-else maxlength="100" :type="type" rows="2" :placeholder="placeholder"></textarea>
        <i class="icon" :v-if="icon" :class="'fa fa-'+icon"></i>
      </div>
      <div v-if="sexes" class="tag">
        <TabTag :tags="sexes" @checkTag="checkSex" :selectTag="sex"></TabTag>
      </div>
    </div>

  </div>
</template>

<script>
import TabTag from './TabTag.vue'
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
    sexes: Array,
    sex: String
  },
  methods:{
    checkSex(item){
      this.$emit('checkSex',item)
    }
  },
  components:{
    TabTag
  }
}
</script>

<style scoped>
.form-block{
  box-sizing: border-box;
  background: #fff;
  display: flex;
  flex-direction: row;
  margin-left: 4vw;
  border-bottom: 1px solid #ddd;
}
.form-title{
  display: flex;
  align-items: center;
}
.form-block label{
  font-size: 0.95rem;
  font-weight: 700;
  color: #333;
  width: 20vw;
}
.form-content{
  flex: 1;
}
.form-area-wrap{
  display: flex;
  align-items: center;
  justify-content: space-between;
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
.icon{
  padding-right: 4vw;
}
.tag{
  border-top: 1px solid #ddd;
}
</style>  