<template>
  <div class="TabTag">
    <span class="tag" v-for="(tag,index) in tags" :key="index">
      {{tag}}
    </span>
  </div>
</template>

<script>
export default {
  name:"TabTag",
  props:{
    tags: Array,
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
</style>