<script>
  import DoughnutChart from "@/components/DoughnutChart/index.vue";
// import { mapActions } from 'vuex';

export default {
	props: ["initItems", "initCountOfPage", "initCurrentPage"],
    components: {
      DoughnutChart,
    },
	computed: {		// 計算照片頁數
		pageStart: function () {
			return (this.initCurrentPage - 1) * this.initCountOfPage;
		},
		totalPages: function () {
			return Math.ceil(this.initItems.length / this.initCountOfPage);
		},
	},
	methods: {
		// ...mapActions(['get_hospital_Name']),
		prev() {
			this.initCurrentPage === 1
				? (this.initCurrentPage = 1)
				: (this.initCurrentPage -= 1);
		},
		next() {
			this.initCurrentPage === this.totalPages
				? (this.initCurrentPage = this.totalPages)
				: (this.initCurrentPage += 1);
		},
		// getHospital(item){
		// 	this.get_hospital_Name(item.hosp_name)
		// }
	},
};
</script>
<template src="./template.html"></template>
<style src="./style.css"></style>
