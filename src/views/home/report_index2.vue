<template>
  <div>

    <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-success">
      <!-- Card stats -->
      <b-row>
        <b-col xl="3" md="6">
          <stats-card title="Total traffic" type="gradient-red" sub-title="350,897" icon="ni ni-active-40" class="mb-4">

            <template slot="footer">
              <span class="text-success mr-2">3.48%</span>
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>
        </b-col>
        <b-col xl="3" md="6">
          <stats-card title="Total traffic" type="gradient-orange" sub-title="2,356" icon="ni ni-chart-pie-35"
            class="mb-4">

            <template slot="footer">
              <span class="text-success mr-2">12.18%</span>
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>
        </b-col>
        <b-col xl="3" md="6">
          <stats-card title="Sales" type="gradient-green" sub-title="924" icon="ni ni-money-coins" class="mb-4">

            <template slot="footer">
              <span class="text-danger mr-2">5.72%</span>
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>

        </b-col>
        <b-col xl="3" md="6">
          <stats-card title="Performance" type="gradient-info" sub-title="49,65%" icon="ni ni-chart-bar-32"
            class="mb-4">

            <template slot="footer">
              <span class="text-success mr-2">54.8%</span>
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>
        </b-col>
      </b-row>
    </base-header>

    <!--Charts-->
    <b-container fluid class="mt--7">
      <b-row >
        <b-col xl="8" class="mb-5 mb-xl-0">
          <card type="default" header-classes="bg-transparent">
            <b-row align-v="center" slot="header">
              <b-col>
                <h6 class="text-light text-uppercase ls-1 mb-1">Overview</h6>
                <h5 class="h3 text-white mb-0">Sales value</h5>
              </b-col>
              <b-col>
                <b-nav class="nav-pills justify-content-end">
                  <b-nav-item class="mr-2 mr-md-0" :active="bigLineChart.activeIndex === 0" link-classes="py-2 px-3"
                    @click.prevent="initBigChart(0)">
                    <span class="d-none d-md-block">币</span>
                    <span class="d-md-none">币</span>
                  </b-nav-item>
                  <b-nav-item link-classes="py-2 px-3" :active="bigLineChart.activeIndex === 1"
                    @click.prevent="initBigChart(1)">
                    <span class="d-none d-md-block">张</span>
                    <span class="d-md-none">张</span>
                  </b-nav-item>
                </b-nav>
              </b-col>
            </b-row>
            <div id="pricechart-container">
            </div>
          </card>
        </b-col>

        <b-col xl="4" class="mb-5 mb-xl-0">
          <card header-classes="bg-transparent">
            <b-row align-v="center" slot="header">
              <b-col>
                <h6 class="text-uppercase text-muted ls-1 mb-1">Performance</h6>
                <h5 class="h3 mb-0">Total orders</h5>
              </b-col>
            </b-row>

            <bar-chart :height="350" ref="barChart" :chart-data="redBarChart.chartData">
            </bar-chart>
          </card>
        </b-col>
      </b-row>
      <!-- End charts-->

      <!--Tables-->
      <b-row class="mt-5">
        <b-col xl="8" class="mb-5 mb-xl-0">
          <page-visits-table></page-visits-table>
        </b-col>
        <b-col xl="4" class="mb-5 mb-xl-0">
          <social-traffic-table></social-traffic-table>
        </b-col>
      </b-row>
      <!--End tables-->
    </b-container>

  </div>
</template>
<script>
  // Datas
  import myjsondata from './data1.txt';
  // Charts
  // import * as chartConfigs from '@/components/Charts/config';
  // import LineChart from '@/components/Charts/LineChart';
  // import BarChart from '@/components/Charts/BarChart';

  // Components
  import BaseProgress from '@/components/BaseProgress';
  import StatsCard from '@/components/Cards/StatsCard';

  // Tables
  // import SocialTrafficTable from '../Dashboard/SocialTrafficTable';
  // import PageVisitsTable from '../Dashboard/PageVisitsTable';

  // Data
  // import {getNewestdata} from '@/api/report'

  export default {
    components: {
      // LineChart,
      // BarChart,
      BaseProgress,
      StatsCard
      // PageVisitsTable,
      // SocialTrafficTable
    },
    data() {
      return {
        allChart: {
          allData:[],
          priceContainer:0,
          bubbleContainer:0,
          cumulativeContainer:0,
          keywordsContainer:0
        },
        bigLineChart: {
          allData: [
            [0, 20, 10, 30, 15, 40, 20, 60, 60],
            [0, 20, 5, 25, 10, 30, 15, 40, 40]
          ],
          activeIndex: 0,
          chartData: {
            datasets: [{
              label: 'Performance',
              data: [0, 20, 10, 30, 15, 40, 20, 60, 60],
            }],
            labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          },
          // extraOptions: chartConfigs.blueChartOptions,
        },
        redBarChart: {
          chartData: {
            labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
              label: 'Sales',
              data: [25, 20, 30, 22, 17, 29]
            }]
          },
          // extraOptions: chartConfigs.blueChartOptions
        }
      };
    },
    methods: {
      initData(){
        this.allChart.allData = JSON.parse(data);
      },
      initContainer(){
        this.allChart.priceContainer = document.getElementById('pricechart-container');
      },
      initMyChart(container,data,index){
        var timeData = this.allChart.allData.ts;
        
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
            top: 280,
            data: ['linear scale', 'log scale'],
          },
          dataZoom: [{
            show: true,
            realtime: true,
            start: 99,
            end: 100
          }],
          grid: [{
              left: '10%',
              top: '5%',
              width: '78%',
              height: '68%'
            }
          ],
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
        chart.resize({
          height : 350,
          width : "auto"
        });
        function addData(that){
          // var reslist = getNewestdata("open-interest","PEOPLE-USDT-SWAP","SWAP");
          // alert(reslist);
          // this.allChart.allData.data.push(reslist);
          // $.ajax({
          //   url:"",
          //   type:'port',
          //   async:true,
          //   dataType:'json',
          //   success:function(result){
          //     this.allChart.allData.data.push(result);
          //   }
          // })
          // alert(ts.allChart.allData.data);
        }
        var that = this;
        setInterval(function() {
            // alert(that);
            addData(that);
            var reslist = getNewestdata("open-interest","PEOPLE-USDT-SWAP","SWAP");
            alert(reslist);
            for(let i = 1;i<2;i++){
              // alert(that.allChart.allData.oi);
              that.allChart.allData.oi.push(that.allChart.allData.oi[that.allChart.allData.oi.length-1]*1.05);
              that.allChart.allData.oi_ccy.push(that.allChart.allData.oi_ccy[that.allChart.allData.oi_ccy.length-1]*1.05);
              that.allChart.allData.ts.push(1640766114254 + i);
            }
            // alert(that.allChart.allData.data);
            chart.setOption(option);
          }, 3000);
        window.addEventListener("resize", () => { chart.resize();});
      }
    },
    mounted() {
      this.initData();
      this.initContainer();
      this.initMyChart(this.allChart.priceContainer,this.allChart.allData.oi,0);
    }
  };

</script>
<style>
  .el-table .cell {
    padding-left: 0px;
    padding-right: 0px;
  }

</style>
