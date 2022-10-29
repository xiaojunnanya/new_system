<template>
  <div class="com-container">
    <div class="com-echarts" ref='ref'></div>
  </div>
</template>

<script>
  export default{
    name:'Province',
    data(){
      return{

      }
    },
    mounted(){
      this.count()
    },
    methods:{
      count(){
        var option = {
            title: {
                // text: "▍各省份人数分布",
                left: "1%",
                top: "2%",
                textStyle: {
                    fontSize: 20,
                    fontWeight: 400,
                },
            },
            grid: {
                left: '5%',
                right: '5%',
                bottom: '5%',
                top: '10%',
                containLabel: true
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'none'
                },
                formatter: function(params) {
                    return params[0].name + '<br/>' +
                        "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:rgba(36,207,233,0.9)'></span>" +
                        params[0].seriesName + ' : ' + Number((params[0].value).toFixed(2)).toLocaleString() + ' 人<br/>'
                }
            },
            backgroundColor: '#fff',
            xAxis: {
                show: false,
                type: 'value'
            },
            yAxis: [{
                type: 'category',
                inverse: true,
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#000',//文字颜色
                        fontSize:'10'//文字字体大小
                    },
                },
                splitLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                data: ['安徽', '福建', '甘肃', '广东', '广西', '贵州', '湖南','河南','黑龙江','湖北','海南',
                '吉林','江苏','江西','辽宁','内蒙古','山西','宁夏','青海','山东','山西','陕西','四川','新疆','云南','重庆'],
            }, {
                type: 'category',
                inverse: true,
                axisTick: 'none',
                axisLine: 'none',
                show: true,
                axisLabel: {
                    textStyle: {
                        color: 'rgba(0,0,0,.7)',//数字颜色
                        fontSize: '10'
                    },
                    formatter: function(value) {
                        if (value >= 10000) {
                            return value.toLocaleString() + '人';
                        } else {
                            return value.toLocaleString();
                        }
                    },
                },
                data: [6,3,2,4,7,4,14,7,8,9,5,8,6,10,4,3,7,2,3,4,7,7,3,7,6,4],
            }],
            series: [{
                    name: '人数',
                    type: 'bar',
                    zlevel: 1,
                    itemStyle: {
                        normal: {
                            barBorderRadius: 30,
                            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                offset: 0,
                                color: '#A0F9FF'
                            }, {
                                offset: 1,
                                color: '#A097FF'
                            }]),
                        },
                    },
                    barWidth: 14,
                    data: [6,3,2,4,7,4,14,7,8,9,5,8,6,10,4,3,7,2,3,4,7,7,3,7,6,4],
                },
            ]
        };



var myChart = echarts.init(this.$refs.ref);
  
  //使用制定的配置项和数据显示图表
  myChart.setOption(option);
  window.addEventListener("resize",function(){
    myChart.resize()
  })

      }
    },
  }
</script>

<style scoped>
.com-echarts{
    height: 105%;
}
</style>