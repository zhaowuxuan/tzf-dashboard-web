<template> 
  <div class="app-container">
    <div id="chart-container" class="chart-container">

    </div>
    <span>aaaaaaaaaa
    </span>
  </div>
</template>
<script>
  import {
    fetchList,
    createAdmin,
    updateAdmin,
    updateStatus,
    deleteAdmin,
    getRoleByAdmin,
    allocRole
  } from '@/api/role';
  import {
    fetchAllCode
  } from '@/api/share';
  import {
    formatDate
  } from '@/utils/date';
  export default {
    name: 'share',
    data() {
      return {
        listQuery: Object.assign({}, defaultListQuery),
        list: null,
        total: null,
        listLoading: false,
        dialogVisible: false,
        admin: Object.assign({}, defaultAdmin),
        isEdit: false,
        allocDialogVisible: false,
        allocRoleIds: [],
        allRoleList: [],
        allocAdminId: null
      }
    },
    mounted() {
      this.myCharts();
    },
    created() {
      this.getList();
      this.getAllRoleList();
    },
    methods: {
      handleResetSearch() {
        this.listQuery = Object.assign({}, defaultListQuery);
      },
      myCharts() {
        var myChart = echarts.init(document.getElementById("chart-container"), null, {
          width: 600,
          height: 400
        });
        var option = {
          legend: {},
          tooltip: {},
          dataset: {
            // 提供一份数据。
            source: [
              ['product', '2015', '2016', '2017'],
              ['Matcha Latte', 43.3, 85.8, 93.7],
              ['Milk Tea', 83.1, 73.4, 55.1],
              ['Cheese Cocoa', 86.4, 65.2, 82.5],
              ['Walnut Brownie', 72.4, 53.9, 39.1]
            ]
          },
          // 声明一个 X 轴，类目轴（category）。默认情况下，类目轴对应到 dataset 第一列。
          xAxis: {
            type: 'category'
          },
          // 声明一个 Y 轴，数值轴。
          yAxis: {},
          // 声明多个 bar 系列，默认情况下，每个系列会自动对应到 dataset 的每一列。
          series: [{
            type: 'bar'
          }, {
            type: 'bar'
          }, {
            type: 'bar'
          }]
        };

        myChart.setOption(option);
      }
    }
  }

</script>
<style></style>
