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
      this.sex()
    },
    methods:{
      sex(){
        var option = {
          title:{
            // text:'▍男女比例',
            left: "1%",
            top: "4%",
            textStyle:{
              fontSize:20,
              fontWeight: 400
            }
          },
        //backgroundColor: "#031845",
        color: ['#f47983','#00CAED'],
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
            orient: 'horizontal',
            icon: 'circle',
            bottom: 20,
            x: 'center',
            textStyle: {
                color: '#000'   //下放原点的字体颜色
            },
            data: ['男生', '女生']
        },
        series: [{
                name: '访问来源',
                type: 'pie',
                selectedMode: 'single',
                radius: [0, '38%'],

                label: {
                    normal: {
                        show: false,
                        position: 'inner',
                        formatter: '{d}%',
                        textStyle: {
                            color: '#fff',
                            fontWeight: 'normal',
                            fontSize: 20
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: [{
                        value: 135,
                        name: '女生'
                    },
                    {
                        value: 252,
                        name: '男生'
                    },
                ]
            },
            {
                name: '访问来源',
                type: 'pie',
                radius: ['40%', '42%'],
                label: {
                    normal: {
                        formatter: '{b|{b}}{d|{c}位}\n{hr|}\n{d|{d}%}',
                        rich: {
                            b: {
                                fontSize: 20,
                                color: '#000',//字体颜色
                                align: 'left',
                                padding: 4
                            },
                            hr: {
                                borderColor: '#12EABE',
                                width: '100%',
                                borderWidth: 2,
                                height: 0
                            },
                            d: {
                                fontSize: 20,
                                color: '#000',
                                align: 'left',
                                padding: 4
                            },
                            c: {
                                fontSize: 20,
                                color: '#000',
                                align: 'center',
                                padding: 4
                            }
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: true,
                        length: 20,
                        length2: 20,
                        lineStyle: {
                            type: 'dashed',
                            width: 2
                        }
                    }
                },
                data: [{
                        value: 135,
                        name: '女生'
                    },
                    {
                        value: 252,
                        name: '男生'
                    },

                ]
            }
        ]
    };

      //初始化echarts实例
      var myChart = echarts.init(this.$refs.ref);
  
      //使用制定的配置项和数据显示图表
      myChart.setOption(option);
      window.addEventListener("resize",function(){
        myChart.resize()
      })
          }
        }
      }
</script>

<style scoped>

</style>