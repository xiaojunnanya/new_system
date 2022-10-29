<template>
  <div class="com-container">
    <!-- <button @click="this.addStuInfo">change</button> -->
    <div class="com-chart" ref="seller_ref">
      <!-- 有人报道时 -->
      <div class="reporting-wrap">
        <div class="reporting">
          <img :src=" 'https://vip.jzab.xyz/' + this.stuData[0].photo" alt="" class="stuPic">
          <div class="info-wrap">
            <!-- _this.stuData.slice(-1)[0] 表示取出stuData里的最后一个元素 -->
            <div class="info">{{ this.stuData[0].name }}</div>
            <div class="info">{{ this.stuData[0].province + this.stuData[0].city}}</div>
          </div>
      </div>
      </div>
      <!-- 没有人报道时 -->
      <div class="reported" v-show="!this.reporting">
        <div class="reported-wrap" >
          <div class="Rstudent">已报到人数：{{num}} &nbsp;&nbsp;&nbsp; 拟报到人数：387</div>

          <div class="stu-info" v-for="(value, index) in stuData" :key="index">
            <p>
              {{ value.name }}  {{ value.sex }}  {{ value.province + value.city }}
            </p>
          </div>
        </div>
      </div>
    </div>
 </div>
</template>

<script>
import { json } from 'body-parser'


export default {
  name: 'Report',
  data () {
    return {
      reporting: false,
      mysocket: null,
      lockReconnect: false,//是否真正建立连接
      timeout: 10*1000,//30秒一次心跳
      timeoutObj: null,//心跳心跳倒计时
      serverTimeoutObj: null,//心跳倒计时
      timeoutnum: null,//断开 重连倒计时
      num:1,
      rank:'',
      stuData:[
      //  {name:'zhang', sex:'男', province:'河北',city:'石家庄'}
      ],
      testStr: 'Student{"name":"电话手表", "sex":"男","province":"河北","city":"石家庄"}'
    }
  },
  created() {
    this.initwebsocket()
    // this.msgParse(this.testStr)
    this.mysocket.onmessage = this.onMessage
    // this.repeatData()
    if(localStorage.getItem('stuData')) {
      let divCount = JSON.parse(localStorage.getItem('stuData'))
      this.stuData = divCount
    }
    if(localStorage.getItem('adminNum')) {
      if(localStorage.getItem('adminNum'))
        this.adminNum = localStorage.getItem('adminNum')
    }
    else {
      this.adminNum = 0
      localStorage.setItem('adminNum', 0)
    }
    this.rstudent()
    
  },
  destroyed() {
    localStorage.setItem('stuData', JSON.stringify(this.stuData))
  },
  methods: {
    rstudent(){
      if(!localStorage.getItem('stuData'))
        return
      var num = localStorage.getItem('stuData')
      // alert(num);
      num = JSON.parse(num).length
      this.num = num - this.adminNum
      // console.log(num);
    },


    // 初始化websocket
    initwebsocket() {
      // if(!localStorage.getItem('stuData'))
      //   localStorage.setItem('stuData', null)
      this.mysocket = new WebSocket('ws://vip.jzab.xyz/ws/')
      this.start()
    },
    onMessage(e){
      this.reset()
      // this.getReportedNum()
      // if(e.data!="连接成功")
      // {
      //   if(localStorage.getItem('stuData'))
      //     if(this.repeatData(e.data))
      //       return
      //   this.msgParse(e.data)
      // }
      console.log(JSON.parse(e.data));
      var data = JSON.parse(e.data)
      if(data.msg != '回复'){
        this.msgParse(e.data)
        this.num = data.rank
        console.log(data.rank);
        console.log(e.data.rank);
      }
      
      // this.rstudent()
    },
    // 处理websocket信息
    msgParse(e){
      var tem = JSON.parse(e)
      // console.log(tem);
      this.stuData.unshift(tem)
      // this.rstudent()
    },
    // 判断重复数据，判断条件有待改进
    repeatData(tem) {
      var tem = JSON.parse(tem)
      let divCount = JSON.parse(localStorage.getItem('stuData'))
      for(var i = 0 ; i <divCount.length; i++){
        if (tem.idcard == divCount[i].idcard) {
          // console.log('有这个数据了');
          return true
        }
      }
      return false
    },
    // getReportedNum() {
    //   this.$axios.get("checked").then(
    //     res => {
    //       console.log(res.data)
    //       this.num = res.data - this.adminNum
    //     }
    //   )
    // },

    reconnect() {//重新连接
            var that = this;
            if(that.lockReconnect) {
                return;
            };
            that.lockReconnect = true;
            //没连接上会一直重连，设置延迟避免请求过多
            that.timeoutnum && clearTimeout(that.timeoutnum);
            that.timeoutnum = setTimeout(function () {
                //新连接
                that.initwebsocket();
                that.lockReconnect = false;
            },5000);
        },
    reset(){//重置心跳
        var that = this;
        //清除时间
        clearTimeout(that.timeoutObj);
        clearTimeout(that.serverTimeoutObj);
        //重启心跳
        that.start();
    },
    start(){//开启心跳
            // this.$router.go(0)
            var self = this;
            self.timeoutObj && clearTimeout(self.timeoutObj);
            self.serverTimeoutObj && clearTimeout(self.serverTimeoutObj);
            self.timeoutObj = setTimeout(function(){
                //这里发送一个心跳，后端收到后，返回一个心跳消息，
                if (self.mysocket.readyState == 1) {//如果连接正常
                    self.mysocket.send("连接成功");
                }else{//否则重连
                    self.reconnect();
                }
                self.serverTimeoutObj = setTimeout(function() {
                    //超时关闭
                    console.log('超时reporteeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
                    location.reload();
                    self.reconnect();
                }, self.timeout);

            }, self.timeout)
        },
  },
  watch: {
    stuData: {
      handler() {
          localStorage.setItem('stuData', JSON.stringify(this.stuData))
          document.getElementsByClassName("reporting-wrap")[0].classList.add("active")
          var timer = null
          if (timer) {
            clearTimeout(timer)
          }
          timer = setTimeout(() => {
            document.getElementsByClassName("reporting-wrap")[0].classList.remove("active")
          },8000)
          this.rstudent()
      },
      deep:true
    }
  }
 }
</script>

<style scoped>
p {
  margin: 0;
}
.com-container::-webkit-scrollbar{   /*滚动条基本样式，高度*/
	width: 7px;
}
.com-container{
  border-radius: 20px;
  overflow-y: scroll;
  overflow-x: hidden;
  /* background-color: rgb(255, 255, 255); */
}
.com-container::-webkit-scrollbar-thumb {/*滚动条上层颜色*/
  border-radius: 5px;
  /* -webkit-box-shadow: inset 0 0 5px rgba(231, 224, 224, 0.2); */
  background: rgba(233, 208, 208, 0.2);
}
.com-container::-webkit-scrollbar-thumb:hover {/*滚动条上层颜色*/
  border-radius: 5px;
  /* -webkit-box-shadow: inset 0 0 5px rgba(231, 224, 224, 0.2); */
  background: rgb(129, 125, 125);
}
.com-chart {
  position: relative;
  height: 100%;
}
.reporting{
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
}
.reported{
  width: 100%;
  height: 90%;
  position: relative;
  display: flex;
  align-items: center;
  overflow:hidden;
  flex-direction: column;
}
.reporting-wrap {
  width: 100%;
  height: 100%;
  position: absolute;
  left: -110%;
  transition: 1.2s;
  background: #FFF;
  box-shadow: 8px 0px 20px rgba(0, 0, 0, .25);
  z-index: 10;
  /* 加上动画 */
  /* animation: move 1.7s; */
  /* animation-timing-function:cubic-bezier(0.42,0,0.58,1) */
}
.reporting-wrap.active{
  transition: 1.7s;
  left: 0%;
}
@keyframes move {
  from{
    left: -500px;
  }
  to{
    left: 0px;
  }
}

.stuPic {
  /* width: 60%; */
  margin-bottom: 10px;
  height: 76%;
}
.info-wrap {
  width: 60%;
  padding: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  /* background-color: rgba(0, 0, 0, 0.473); */
  border-radius: 20px;
  text-align: center;
  font-size: 25px;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, .25);
  height: 15%;
  color: #000;
}
.info {
  /* margin-bottom: 0px; */
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.info:nth-child(4) {
  margin-bottom: 0px;
}

.reported-wrap {
  width: 90%;
  /* border: 1px solid red; */
  height: 100%;
  margin: 10px auto 0 auto;
}

/* 字体设置 */
.stu-info {
  padding: 5px;
  padding-left: 10px;
  text-align: center;
  /* background-color: #11F9F4; */
  margin-bottom: 15px;
  border-radius: 5px;
  box-shadow: 3px 3px 8px rgba(0, 0, 0, .1) inset;
}
.stu-info > p {
  font-size: 20px;
  line-height: 26px;
  color: #000;
  word-spacing: 20px;
}
.Rstudent{
  text-align: right;
  margin-bottom: 10px;
  color: rgb(59, 59, 59);
  font-size: 16px;
}
</style>