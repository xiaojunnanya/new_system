<!--
 * @Author: 肖俊男
 * @Date: 2022-09-16 10:47:13
 * @LastEditTime: 2022-09-16 21:48:04
 * @LastEditors: 肖俊男
 * @Description: 
 * @FilePath: \new_system-wyn\src\components\ReportTest.vue
 * 鲸落
-->
 <!-- <template>
    <div class="com-container">
      <div class="com-chart" ref="seller_ref">

       有人报道时 -->
        <!-- <div class="reporting-wrap">
          <div class="reporting">
           头像、姓名、地点
            <img :src="stuData[0].openid" alt="" class="stuPic"> 
            <div class="info-wrap">
              <div class="info">{{ stuData.name }}</div>
              <div class="info">{{ this.stuData[0].province + this.stuData[0].city}}</div>
            </div>
        </div>
        </div> -->

        <!-- 没有人报道时 -->
        <!-- <div class="reported" v-show="!this.reporting">
            报到人数等
          <div class="reported-wrap" >
            <div class="Rstudent">已报到人数：{{num}} &nbsp;&nbsp;&nbsp; 拟报到人数：385</div>
            <div class="stu-info" v-for="(value, index) in stuData" :key="index">
              <p>
                {{ value.name }}  {{ value.sex }}  {{ value.province + value.city }}
              </p>
            </div>
          </div>
        </div>
      </div>
   </div>
  </template> -->
  <template>
    <div>
      <div style="color:red">啊对对对{{this.stuData.name}}ddd</div>
    </div>
  </template>
  
  <script>
  
  export default {
    name: 'Report',
    data () {
      return {
        stuData:{},
        testStr: {"name":"电话手表", "sex":"男","province":"河北","city":"石家庄"},
        name:'',
        photo:'',
      }
    },
    mounted() {
      this.setData()
    },
    created(){
      this.web()
    },
    destroyed() {

    },
    methods: {
        web(){
            var web = new WebSocket('ws://vip.jzab.xyz:8003/ws/')
            web.onmessage = function(e){
                console.log(e);
                console.log(e.data);
                var data = JSON.parse(e.data)
                localStorage.setItem("data",e.data)
                // this.stuData = data
                // this.name = data.name
                // console.log(this.stuData.name); 
            }
        },
        setData(){
          var data = JSON.parse(localStorage.getItem("data"));
          console.log(data);
          if(data){
            this.stuData = data
            // this.$router.go(0)
          }
        }
    },
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
    margin-bottom: 4px;
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