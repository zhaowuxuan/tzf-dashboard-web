<template>
  <div class="app-container">
    <el-row :gutter="10">
      <el-col :xs="4" :sm="8" :md="16" :lg="24" :xl="24">
        <el-card title="Total traffic" type="gradient-red" sub-title="350,897" icon="ni ni-active-40" class="mb-4">
          <div id="pricechart-container" class="grid-content bg-purple"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import myjsondata from './data1.txt';
  // import {fetchList} from '@/api/productAttrCate';
  import {getNewestdata,getStockdata} from '@/api/report';
  export default {
    name: 'report_home',
    data() {
      return {
        allChart: {
          allData: [],
          priceContainer: 0,
          bubbleContainer: 0,
          cumulativeContainer: 0,
          keywordsContainer: 0
        },
      }
    },
    methods: {
      async initData() {
        // var tmp = JSON.parse(data).ts.map(Date);
        // // alert(JSON.parse(data).ts.map(Date));
        // // alert(type(JSON.parse(data)));
        // this.allChart.allData = JSON.parse(data);
        // this.allChart.allData.ts = tmp;
        await getStockdata("open-interest", "PEOPLE-USDT-SWAP", "SWAP").then(response => {
            this.allChart.allData = response.data;
            // that.allChart.allData.oi.push(response.data.oi);
            // that.allChart.allData.oi_ccy.push(response.data.oi_ccy);
            // that.allChart.allData.ts.push(response.data.ts);
            // var date = new Date(response.data.ts).toLocaleString();
          });
          // alert("initData "+this.allChart.allData.oi);
      },
      initContainer() {
        // alert("initContainer "+this.allChart.allData.oi);
        this.allChart.priceContainer = document.getElementById('pricechart-container');
      },
      initMyChart(container, data, index) {
        // alert(timeData);
        var chart = echarts.init(container);
        // alert(chart);
        var option = {
          axisPointer: {
            link: {
              xAxisIndex: 'all'
            }
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              animation: false
            }
          },
          legend: {
            right: 100,
            top: 40,
            data: ['linear scale', 'log scale'],
          },
          dataZoom: [{
            show: true,
            realtime: true,
            start: 0,
            end: 100
          }],
          grid: [{
            left: '10%',
            top: '15%',
            width: '78%',
            height: '68%'
          }],
          xAxis: [{
            type: 'category',
            boundaryGap: false,
            axisLine: {
              onZero: true
            },
            data: this.allChart.allData.ts //timeData
          }],
          yAxis: [{
              name: 'BTC Price (USD)',
              type: 'value'
            },
            {
              type: 'value'
            }
          ],
          series: [{
              yAxisIndex: 1,
              name: 'log scale',
              type: 'line',
              hoverAnimation: false,
              smooth: true,
              data: this.allChart.allData.oi_ccy
            },
            {
              name: 'linear scale',
              type: 'line',
              smooth: true,
              hoverAnimation: false,
              data: this.allChart.allData.oi
            }
          ]
        };
        chart.setOption(option);
        chart.resize({
          height: 550,
          width: "auto"
        });
        function addData(that) {
          getNewestdata("open-interest", "PEOPLE-USDT-SWAP", "SWAP").then(response => {
            that.allChart.allData.oi.push(response.data.oi);
            that.allChart.allData.oi_ccy.push(response.data.oi_ccy);
            that.allChart.allData.ts.push(response.data.ts);
            // var date = new Date(response.data.ts).toLocaleString();
            // alert(date);
          })
        };
        var that = this;
        setInterval(function () {
          addData(that);
          chart.setOption(option);
        }, 5000);
        window.addEventListener("resize", () => {
          chart.resize();
        });
      },
      async initAll(){
        await this.initData();
        await this.initContainer();
        await this.initMyChart(this.allChart.priceContainer, this.allChart.allData.oi, 0);
      }
    },
    mounted() {
      this.initAll();
      // this.initContainer();
      // this.initMyChart(this.allChart.priceContainer, this.allChart.allData.oi, 0);
    }
  }

</script>

<style scoped>
  .el-col {
    border-radius: 4px;
  }

  .bg-purple-dark {
    background: #99a9bf;
  }

  .bg-purple {
    background: #d3dce6;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

</style>