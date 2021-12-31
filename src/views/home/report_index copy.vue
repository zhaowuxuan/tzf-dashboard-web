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
  // import myjsondata from './data1.txt';
  // import {fetchList} from '@/api/productAttrCate';
  import {
    getNewestdata,
    getStockdata
  } from '@/api/report';
  export default {
    name: 'report_home',
    data() {
      return {
        allChart: {
          allData: {
            oi: [],
            oi_ccy: [],
            ts: []
          },
          priceContainer: 0,
          bubbleContainer: 0,
          cumulativeContainer: 0,
          keywordsContainer: 0
        },
      }
    },
    methods: {
      initData() {
        getStockdata("open-interest", "PEOPLE-USDT-SWAP", "SWAP").then(response => {
          this.allChart.allData.oi = response.data.oi;
          this.allChart.allData.oi_ccy = response.data.oi_ccy;
          this.allChart.allData.ts = response.data.ts;
        });
      },
      initContainer() {
        this.allChart.priceContainer = document.getElementById('pricechart-container');
        getStockdata("open-interest", "PEOPLE-USDT-SWAP", "SWAP").then(response => {
          this.allChart.allData.oi = response.data.oi;
          this.allChart.allData.oi_ccy = response.data.oi_ccy;
          this.allChart.allData.ts = response.data.ts;
        });
      },
      initMyChart(container, oi, oi_ccy, ts) {
        var that = this;
        var timeData = this.allChart.allData.ts;
        alert(0);
        alert(timeData);
        var chart = echarts.init(container);
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
            data: that.allChart.allData.ts //timeData
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
              data: that.allChart.allData.oi_ccy
            },
            {
              name: 'linear scale',
              type: 'line',
              smooth: true,
              hoverAnimation: false,
              data: that.allChart.allData.oi
            }
          ]
        };
        chart.resize({
          height: 550,
          width: "auto"
        });
        // alert(3);
        // alert(this.allChart.allData.oi);

        function addData(that) {
          getNewestdata("open-interest", "PEOPLE-USDT-SWAP", "SWAP").then(response => {
            that.allChart.allData.oi.push(response.data.oi);
            that.allChart.allData.oi_ccy.push(response.data.oi_ccy);
            that.allChart.allData.ts.push(response.data.ts);
            // var date = new Date(response.data.ts).toLocaleString();
            // alert(date);
          })
        };
        setInterval(function () {
          // addData(that);
          alert(1);
          alert(that.allChart.allData.oi);
          chart.setOption(option);
        }, 3000);
        window.addEventListener("resize", () => {
          chart.resize();
        });
      }
    },
    mounted() {
      this.initData();
      this.initContainer();
      this.initMyChart(this.allChart.priceContainer, this.allChart.allData.oi, this.allChart.allData.oi_ccy, this
        .allChart.allData.ts);
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
