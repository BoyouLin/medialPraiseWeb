<script>
import { Doughnut } from 'vue-chartjs'
export default {
  extends: Doughnut,
  props: ['name', 'data'],
  mounted() {
    this.renderDonughtChart()
  },
  computed: {
    chartData: function () {
      return this.data
    },
  },
  methods: {
    renderDonughtChart: function () {
      this.renderChart(
        {
          // labels: ["Remaining", "Used"],
          datasets: [
            {
              borderWidth: 0,
              label: this.name,
              backgroundColor: ['#00D1B2', '#fffff'],
              data: this.data,
            },
          ],
        },
        {
          legend: {
            display: true,
            labels: {
              fontColor: '#F1F6F9',
              fontSize: 14,
            },
          },
          cutoutPercentage: 80,
          responsive: true,
          maintainAspectRatio: false,
        }
      )
    },
  },
  watch: {
    data: function() {
      this.renderDonughtChart().destroy()   // 當資料有做變更時，會去destroy(銷毀)畫布
      this.renderLineChart()  // destroy後重新render去更新資料
    }
  }
}

// import { Doughnut } from "vue-chartjs";

// export default {
//   extends: Doughnut,
//   props: ["name", "data"],

//   mounted() {
//     this.renderChart(
//       {
//         // labels: ["Remaining", "Used"],
//         datasets: [
//           {
//             borderWidth: 0,
//             label: this.name,
//             backgroundColor: ["#00D1B2", "#fffff"],
//             data: this.data,
//           },
//         ],
//       },
//       {
//         legend: {
//           display: true,
//           labels: {
//             fontColor: "#F1F6F9",
//             fontSize: 14,
//           },
//         },
//         cutoutPercentage: 80,
//         responsive: true,
//         maintainAspectRatio: false,
//       }
//     );
//   },
// };
</script>
