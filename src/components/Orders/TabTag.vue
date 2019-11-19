<template>
  <div class="TabTag">
    <span class="tag" v-for="(tag,index) in tags" :key="index" @click="$emit('checkTag',tag)" :class="{checked:selectTag == tag}">
      {{tag}}
    </span>
  </div>
</template>

<script>
export default {
  name:"TabTag",
  props:{
    tags: Array,
    selectTag : String
  }
}
</script>

<style scoped>
.TabTag{
  background: #fff;
  box-sizing: border-box;
  color: #666;
}
span{
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 2.33vw 2.33vw 2.33vw 0;
  padding: 1.5vw 0;
  width: 18vw;
  border-radius: 0.7;
  border: 1px solid #ddd;
}
.checked{
  background: rgba(0, 132, 255, 0.082);
  color:rgba(0, 140, 255, 0.753)
}
</style>