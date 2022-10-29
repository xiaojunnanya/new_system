<template>
  <div class="screen-container">
    <header class="screen-header">
      <div>
        <img src="../assets/images/logo (1).png" alt="" class="one">
        <!-- <img src="../assets/images/logo (1).png" alt="" class="one"><span class="border"></span><img src="../assets/images/xgkx.png" alt="" class="two"> -->
      </div>
      <span class="logo">
        <!-- <img src="../assets/images/logo (1).png" alt=""> -->
      </span>
      <span class="title">2022级新生报到</span>
      <div class="title-right">
        <span class="datetime">{{daytime}}</span>
      </div>
    </header>
    <div class="screen-body">
      <section class="screen-left">
        <div id="left-top">
          <!-- 各省份人数分布 -->
          <span class="itemTitle"><span>▍</span>各省份人数分布</span>
          <province></province>
        </div>
        <div id="left-bottom">
          <!-- 男女比例 -->
          <span class="itemTitle"><span>▍</span>男女比例</span>
          <sex></sex>
        </div>
      </section>
      <section class="screen-middle">
        <div id="middle-top">
          <!-- 地图 -->
          <span class="itemTitle"><span>▍</span>地图</span>
          <mmap></mmap>
          <div class="resize">
            <img src="../assets/images/report.jpg" alt="">
          </div>
        </div>
        <!-- <div id="middle-bottom">
          导员介绍
          <span class="itemTitle"><span>▍</span>导员介绍</span>
          <teacher></teacher>
        </div> -->
      </section>
      <section class="screen-right">
        <div id="right-top">
          <!-- 学生信息 -->
          <!-- <span class="itemTitle"><span>▍</span>各省份人数分布</span> -->
          <report></report>
          <!-- <reporttest></reporttest> -->
        </div>
        <div id="right-bottom">
          <!-- 信息工程学院介绍 -->
          <span class="itemTitle"><span>▍</span>关于信息工程学院</span>
          <hgu></hgu>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import mmap from '@/components/Map'
import province from '@/components/Province'
import sex from '@/components/Sex'
import hgu from '@/components/Hgu'
import teacher from '@/components/Teacher'
import report from '@/components/Report'
import reporttest from '@/components/ReportTest'

export default {
  components:{
    mmap,
    province,
    sex,
    hgu,
    teacher,
    report,
    reporttest
  },
  data () {
    return {
      daytime:''
    }
  },
  created(){
    this.currentTime()
  },
  beforeDestroy() {
    if (this.Time) {
      clearInterval(this.Time); // 在Vue实例销毁前，清除时间定时器
    }
  },
  methods:{
    Time(){
        var d = new Date();
        var year = d.getFullYear();
        var month = d.getMonth();
        month = month + 1 > 12 ? 1 : month + 1;
        month =  month > 9 ? month : "0" +month.toString();
        var day = d.getDate();
        var hour = d.getHours();
        hour = hour > 9 ? hour : "0" + hour.toString();
        var minute = d.getMinutes();
        minute = minute > 9 ? minute : "0" + minute.toString();
        var second = d.getSeconds();
        second = second > 9 ? second : "0" + second.toString();
        var daytime = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
        this.daytime = daytime;
    },
    currentTime() {
      setInterval(this.Time, 1000);
    },
  }
}
</script>
<style scoped>
.screen-header .one{
  /* width: 245px; */
  width: 12%;
}
.screen-header .two{
  width: 7%;
  /* width: 145px; */
}
.border{
  border: 2px solid black;
  background-color: black;
  /* width: 120px; */
  padding: 5px 0px;
  /* width: 100px; */
  position:relative;
  top: -23px;
  margin-right:8px ;
}
span{
  color: black;
}
header{
  background-image: url("../../public/static/img/header_border_light.png");
  background-repeat: no-repeat;
  background-position:center 0;
  background-size: 100%;
  height: 75px;
  overflow: hidden;
}
video{
  position: fixed;
  right:0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  z-index: -9999;
}
.screen-container {
  width: 100%;
  height: 100%;
  padding: 0 20px;
  /* background-color: #DCF8F6; */
  /* background-image: url(../assets/images/4.gif); */
  background-position: 0% 100%;
  background-size: cover;
  color: #fff;
  box-sizing: border-box;
}
.screen-header {
  width: 100%;
  height: 64px;
  font-size: 20px;
  position: relative;
}
.screen-container> div>img{
  width: 100%;
}
.title {
  position: absolute;
  left: 50%;
  top: 50%;
  font-size: 40px;
  letter-spacing: 5px;
  transform: translate(-50%, -50%);
}
.title-right {
  align-items: center;
  position:absolute;
  right: 0px;
  top: 70%;
  transform: translateY(-80%);
}
.qiehuan {
  width: 28px;
  height: 21px;
  cursor: pointer;
}
.datetime {
  font-size: 24px;
  margin-left: 10px;
  color: rgba(0,0,0,.6);
}
.logo {
  position: absolute;
  left: 0px;
  top: 50%;
  transform: translateY(-80%);
}
.logo>img {
    height: 35px;
    width: 128px;
}
.screen-body {
  width: 100%;
  height: 100%;
  display: flex;
  margin-top: 10px;
}
.screen-middle {
  height: 100%;
  width: 41.5%;
  margin-left: 1.6%;
  margin-right: 1.6%;
}
#middle-bottom {
  margin-top: 25px;
  width: 100%;
  height: 28%;
  position: relative;
  /* border:1px solid red; */
  background-color: rgba(255, 255, 255, 0.7);
  box-shadow: 8px 8px 20px rgba(0, 0, 0, .25);
  border-radius: 20px;
}
.screen-right {
  height: 100%;
  width: 27.6%;
}
#right-bottom {
  height: 38.2%;
  margin-top: 25px;
  position: relative;
  /* border:1px solid red; */
  background-color: rgba(255, 255, 255, 0.7);
  box-shadow: 8px 8px 20px rgba(0, 0, 0, .25);
  border-radius: 20px;
  padding: 5px 15px;
}
#middle-top {
  width: 100%;
  height: 91%;
  position: relative;
  /* border:1px solid red; */
  background-color: rgba(255, 255, 255, .1);
  box-shadow: 8px 8px 20px rgba(0, 0, 0, .25);
  border-radius: 20px;
}
#right-top {
  height: 49.2%;
  position: relative;
  /* border:1px solid red; */
  background-color: rgba(255, 255, 255, 0.7);
  box-shadow: 8px 8px 20px rgba(0, 0, 0, .25);
  border-radius: 20px;
}
.screen-left {
  height: 100%;
  width: 27.6%;
}
#left-bottom {
  height: 31.5%;
  margin-top: 25px;
  position: relative;
  /* border:1px solid red; */
  background-color: rgba(255, 255, 255, 0.7);
  box-shadow: 8px 8px 20px rgba(0, 0, 0, .25);
  border-radius: 20px;
  /* opacity: 0.5; */
}
#left-top {
  height: 57%;
  position: relative;
  /* border:1px solid red; */
  background-color: rgba(255, 255, 255, 0.7);
  box-shadow: 8px 8px 20px rgba(0, 0, 0, .25);
  border-radius: 20px;
}
.resize {
  position: absolute;
  bottom: 0;
  cursor: pointer;
  width: 22%;
  z-index: -100;
}
.resize img{
  width: 100%;
}
.itemTitle{
  position: absolute;
  z-index: 10;
  left: 15px;
  top: 15px;
  font-size: 20px;
  color: rgba(0, 0, 0, .75);
}
.itemTitle > span {
  color: #ED6D00;
}
</style>
