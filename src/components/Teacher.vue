<!--
 * @Description: 
 * @Author: 王毅楠
 * @Date: 2021-09-08 10:04:44
 * @LastEditors: 王毅楠
 * @LastEditTime: 2021-09-08 10:41:53
-->
<template>
  <div class="com-container">
    <div class="com-echarts" ref='ref'>
      <!-- 导员介绍 -->
      <div class="one">
        <img src="../assets/images/t2.png" alt="">
        <div class="msg">
          <span>姓名：张丽娜</span>
          <span>联系电话：13784355896</span>
          <img src="../assets/images/qr1.png" alt="">
        </div>
      </div>
      <div class="two">
        <img src="../assets/images/t1.png" alt="">
        <div class="msg">
          <span>姓名：温晋杰</span>
          <span>联系电话：18203221506</span>
          <img src="../assets/images/qr2.png" alt="">
        </div>
      </div> 
    </div> 
  </div>
</template>

<script>
  export default{
    name:"Teacher",
    data(){
      return{

      }
    },
  }
</script>

<style scoped>
div{
  color: black;
}
.one,.two{
  /* border: 1px solid red; */
  height: 200px;
  width: 47%;
  display: inline-block;
  position: relative;
  left: 50%;
  top: 50%;
  border-radius: 20px;
  transform: translate(-100%,-50%);
  /* box-shadow: 0px 0px 5px rgb(0 0 0 / 25%); */
}
.one{
  margin-left: -5px;
}
.two{
  margin-left: 10px;
}
img{
  height: 100%;
}
.msg,img{
  display: inline-block;
  border-radius: 15px;
}
.msg{
  height: 100%;
  text-align: left;
  vertical-align: top;
  font-size: 18px;
  padding-top: 10px;
  padding-left: 15px;
}
.msg img {
  width: 150px;
  height: 150px;
}
.msg span{
  display: block;
  font-family: Microsoft YaHei;
  padding: 10px 0px;
  width: 100%;
}
.com-echarts {
  margin-top: 10px; 
}
</style>