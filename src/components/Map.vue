<template>
  <div class="com-container">
    <div class="com-echarts" ref="ref">
      {{ province }}
    </div>
  </div>
</template>

<script>
import all from "@/assets/js/all.js";
export default {
  name: "",
  data() {
    return {
      echartInstance: null,
      // path:'ws://localhost:9998',
      path: "ws://vip.jzab.xyz/ws/",
      allData: null, //从服务器获取的所有数据
      ws: null,
      province: "石家庄",
      socketMsg: "",
      mychart: null,
			chinaGeoCoordMap: '',
      lockReconnect: false,//是否真正建立连接
      timeout: 10*1000,//30秒一次心跳
      timeoutObj: null,//心跳心跳倒计时
      serverTimeoutObj: null,//心跳倒计时
      timeoutnum: null,//断开 重连倒计时
    };
  },
  mounted() {
    //初始化echarts实例
    this.mychart = echarts.init(this.$refs.ref);
    this.initChart();
    window.addEventListener("resize", this.screenAdapter);
  },
  created() {
    this.connect();
  },
  destoryed() {
    this.onclose();
    window.removeEventListener("resize", this.screenAdapter);
  },
  methods: {
    screenAdapter() {
      this.mychart.resize();
    },
    connect() {
      this.ws = new WebSocket(this.path);
      this.ws.onopen = this.onopen;
      this.ws.onmessage = this.onmessage;
      this.ws.onerror = this.onerror;
      this.ws.onclose = this.onclose;
    },

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
                that.connect();
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
            var self = this;
            self.timeoutObj && clearTimeout(self.timeoutObj);
            self.serverTimeoutObj && clearTimeout(self.serverTimeoutObj);
            self.timeoutObj = setTimeout(function(){
                //这里发送一个心跳，后端收到后，返回一个心跳消息，
                if (self.ws.readyState == 1) {//如果连接正常
                    // self.ws.send("连接成功");
                }else{//否则重连
                    self.reconnect();
                }
                self.serverTimeoutObj = setTimeout(function() {
                    //超时关闭
                    console.log('超时map');
                    // self.ws.close();
                    self.reconnect();
                }, self.timeout);

            }, self.timeout)
        },

    onopen() {
      console.log("连接成功");
      this.start();
    },
    onerror() {
      console.log("连接失败");
      this.reconnect();
    },
    onmessage(e) {
      this.reset();
      console.log(e.data);
      // if (e.data == "连接成功") return;
      this.socketMsg = e.data;
      let tem = this.socketMsg.replace(/\//g, "");
      tem = JSON.parse(tem);
      console.log(tem);
      this.province = tem.province;
      this.updateEcharts();
    },
    onclose() {
      console.log("关闭连接");
      this.reconnect();
    },
    initChart() {
      this.chinaGeoCoordMap = {
        黑龙江省: [127.9688, 45.368],
        内蒙古自治区: [110.3467, 41.4899],
        吉林省: [125.8154, 44.2584],
        北京市: [116.4551, 40.2539],
        辽宁省: [123.1238, 42.1216],
        石家庄: [114.4995, 38.1006],
        河北省: [114.4995, 38.1006],
        天津市: [117.4219, 39.4189],
        山西省: [112.3352, 37.9413],
        陕西省: [109.1162, 34.2004],
        甘肃省: [103.5901, 36.3043],
        宁夏回族自治区: [106.3586, 38.1775],
        青海省: [101.4038, 36.8207],
        新疆维吾尔自治区: [87.9236, 43.5883],
        西藏自治区: [91.11, 29.97],
        四川省: [103.9526, 30.7617],
        重庆市: [108.384366, 30.439702],
        山东省: [117.1582, 36.8701],
        河南: [113.4668, 34.6234],
        江苏省: [118.8062, 31.9208],
        安徽省: [117.29, 32.0581],
        湖北省: [114.3896, 30.6628],
        浙江省: [119.5313, 29.8773],
        福建省: [119.4543, 25.9222],
        江西省: [116.0046, 28.6633],
        湖南省: [113.0823, 28.2568],
        贵州省: [106.6992, 26.7682],
        云南省: [102.9199, 25.4663],
        广东省: [113.12244, 23.009505],
        广西壮族自治区: [108.479, 23.1152],
        海南省: [110.3893, 19.8516],
        上海市: [121.4648, 31.2891],
        河南省: [113.4668, 34.6234],
        台湾省: [],
        香港特别行政区: [],
        澳门特别行政区: [],
      };
      
      var option = {
        title: {
          // text: "▍地图",
          left: "1%",
          top: "2%",
          textStyle: {
            fontSize: 20,
            fontWeight: 400,
          },
        },
        tooltip: {
          trigger: "item",
          backgroundColor: "rgba(166, 200, 76, 0.82)",
					textStyle:{
						color:"#000"
					},
          borderColor: "#FFFFCC",
          showDelay: 0,
          hideDelay: 0,
          enterable: true,
          transitionDuration: 0,
          extraCssText: "z-index:100",
          formatter: function (params, ticket, callback) {
            //根据业务自己拓展要显示的内容
            var res = "";
            var name = params.name;
            var value = params.value[params.seriesIndex + 1];
            res =
              "<span style='color:#fff;'>" +
              name +
              "</span><br/>数据：" +
              value;
            //return res;
          },
        },
        //backgroundColor:"#052D5E", //背景色
        visualMap: {
          //图例值控制
          min: 0,
          max: 1,
          calculable: true,
          show: false,
          color: ["#f44336", "#fc9700", "#ffde00", "#ffde00", "#FF6F00"],
          textStyle: {
            color: "#fff",
          },
        },
        geo: {
          map: "china",
          zoom: 1.2,
          label: {
            emphasis: {
              show: false,
            },
          },
          roam: true, //是否允许缩放
          itemStyle: {
            normal: {
              color: "#D0FFFC", //地图背景色
              borderColor: "#000000", //省市边界线00fcff 516a89
              borderWidth: .5,
            },
            emphasis: {
              color: "rgba(244, 103, 13, .5)", //悬浮背景
            },
          },
        },
        // series: series
      };

      //使用制定的配置项和数据显示图表
      this.mychart.setOption(option);
      
    },
    updateEcharts() {
			var chinaDatas = [
        [
          {
            name: this.province,
            value: 0,
          },
        ],
      ];
			var _this = this
      var convertData = function (data) {
				// console.log("data",data)
        var res = [];
        for (var i = 0; i < data.length; i++) {
          var dataItem = data[i];
          var fromCoord = _this.chinaGeoCoordMap[dataItem[0].name];
          var toCoord = [114.4995, 38.1006]; //调整中心点
          if (fromCoord && toCoord) {
            res.push([
              {
                coord: fromCoord,
                value: dataItem[0].value,
              },
              {
                coord: toCoord,
              },
            ]);
          }
        }
				// console.log(res)
        return res;
      };

      var series = [];
      [["石家庄", chinaDatas]].forEach(function (item, i) {
        series.push(
          {
            type: "lines",
            zlevel: 2,
            effect: {
              show: true,
							color:'#F04439',
              period: 4, //箭头指向速度，值越小速度越快
              trailLength: 0.02, //特效尾迹长度[0,1]值越大，尾迹越长重
              symbol: "arrow", //箭头图标
              symbolSize: 5, //图标大小
            },
            lineStyle: {
              //normal: {
              width: 1, //尾迹线条宽度
              opaprovince: 1, //尾迹线条透明度
              curveness: 0.3, //尾迹线条曲直度
              //}
            },
            data: convertData(item[1]),
          },
          {
            type: "effectScatter",
            coordinateSystem: "geo",
            zlevel: 2,
            rippleEffect: {
              //涟漪特效
              period: 4, //动画时间，值越小速度越快
              brushType: "stroke", //波纹绘制方式 stroke, fill
              scale: 4, //波纹圆环最大限制，值越大波纹越大
							color:"#000"
            },
            label: {
              normal: {
                show: true,
                position: "right", //显示位置
                offset: [5, 0], //偏移设置
                formatter: function (params) {
                  //圆环显示文字
                  return params.data.name;
                },
                fontSize: 15,
              },
              emphasis: {
                show: true,
              },
            },
            symbol: "circle",
            symbolSize: function (val) {
              return 5 + val[2] * 5; //圆环大小
            },
            itemStyle: {
              normal: {
                show: false,
                color: "#f00",
              },
            },
            data: item[1].map(function (dataItem) {
              return {
                name: dataItem[0].name,
                value: _this.chinaGeoCoordMap[dataItem[0].name].concat([
                  dataItem[0].value,
                ]),
              };
            }),
          },
          // console.log(item[1][0]),
          //被攻击点
          {
            type: "scatter",
            coordinateSystem: "geo",
            zlevel: 2,
            rippleEffect: {
              period: 4,
              brushType: "stroke",
              scale: 4,
            },
            label: {
              normal: {
                //石家庄三个字的改变
                show: true,
                position: "right",
                offset: [-2, 5],
                color: "#0f0",
                formatter: "{b}",
                textStyle: {
                  color: "#F04539",
                  fontSize: 10,
                },
              },
              emphasis: {
                show: true,
                color: "#f60",
              },
            },
            symbol: "pin",
            symbolSize:30,
            data: [
              {
                name: item[0],
                value: _this.chinaGeoCoordMap[item[0]].concat([10]),
              },
            ],
          }
        );
      });
      this.mychart.setOption({ series });
    },
  },
};
</script>

<style scoped>
* {
  color: black;
}
</style>