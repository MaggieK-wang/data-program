<template>
  <div class="page">
    我是新冠
  </div>
</template>

<script>
import {getList } from "@/api";
export default {
data(){
  return{

  }
},
  mounted(){
  // async getList(){
     const res=await getList()
     console.warn(res);
  // }
}
}
</script>

<style>

</style>