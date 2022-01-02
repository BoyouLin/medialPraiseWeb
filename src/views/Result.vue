<template>
  <div class="result">
    <div class="result__header">
      <button></button>
      <input type="text" />
      <h3 @click="tohome">醫療好評網</h3>
    </div>
    <div class="result__topTenList">
      <div
        class="box"
        v-for="(item,index) in SEARCH__RESULT__INIT.slice(topTenStart, topTenStart + 5)"
        :key="item.index"
      >
        <img :src="item.photoURL" alt="" />
        <h2>{{ index+topTenStart+1 }}</h2>
        <div class="box__text">
          <h3>{{ item.hosp_name }}</h3>
        </div>
      </div>
      <img src="@/assets/leftButton.png" id="leftMove" @click="TopPrev" />
      <img src="@/assets/rightButton.png" id="rightMove" @click="TopNext" />
    </div>
    <div class="result__flex">
      <div class="filter__flex">
        <div class="filter__num">結果數:{{ resultNumber }}</div>
        <div
          class="filter__distance__box"
          :class="[isCheckRadio ? 'radio__check' : 'radio']"
        >
          <div class="switch" @click="checkRadio"></div>
          <input
            type="number"
            class="distance__input"
            @change="distanceC"
            oninput="if(value<0)value=0"
          />
          <div class="filter__distance">
            距離<br /><br />
            <span>&emsp; &emsp; &emsp; &emsp; 公里數</span>
          </div>
        </div>
        <div class="filter__area">選擇地區</div>
        <ul class="filter__select">
          <li v-for="(county, index) in countys" :key="county.index">
            <a
              class="filter__county"
              :class="{ active: county.isActive }"
              @click="search(county, index)"
              >{{ county.name }}</a
            >
          </li>
        </ul>
        <div class="filter_score">
          評分範圍<br />
          <span>0-100</span>
          <form class="range__input">
            <input
              type="text"
              class="min"
              :value="minValue"
              @change="minCValue"
              oninput="if(value<0)value=0;if(value>100)value=100"
            />
            <div class="line"></div>
            <input
              type="text"
              class="max"
              :value="maxValue"
              @change="maxCValue"
              oninput="if(value<0)value=0;if(value>100)value=100"
            />
          </form>
        </div>
      </div>
      <div class="result__hospital">
        <div class="pagination">
          <div v-if="resultNumber === 0" class="noResult">查無此資料</div>
          <div
          v-else
            class="content__box"     
            v-for="item of SEARCH__RESULT__INIT.slice(
              pageStart,
              pageStart + initCountOfPage
            )"
            :key="item.index"
            @click="getHospital(item)"
          >
            <div class="info__top">
              <img src="@/assets/Rectangle 52.svg" alt="" />
            </div>
            <div class="info__content">
              <img :src="item.photoURL" />
              <div class="info__text">
                <h2>{{ item.hosp_name }}</h2>
                <h3>地址</h3>
                <h4>{{ item.address }}</h4>
                <h3>電話</h3>
                <h4>{{ item.telephone }}</h4>
              </div>
              <div class="info__detail">
                <a :href="item.web" target="_blank">詳細資訊</a>
              </div>
              <div class="info__score">
                <div class="rate__number">
                  {{ item.score[0] }}
                </div>
                <doughnut-chart
                  class="doughnut-chart"
                  :data="item.score"
                  :name="item.score[0]"
                />
              </div>
            </div>
          </div>
          <ul class="controller">
            <li class="leftBtn" @click="prev">
              <img src="@/assets/leftButton.png" alt="" />
            </li>
            <i class="Cpage">{{ initCurrentPage }}</i>
            <i class="Symbol">/</i>
            <i class="Tpage">{{ totalPages }}</i>
            <li class="rightBtn" @click="next">
              <img src="@/assets/rightButton.png" alt="" />
            </li>
          </ul>
        </div>
        <!-- <Pagination
					:initItems="SEARCH__RESULT__INIT"
					:initCountOfPage="initCountOfPage"
					:initCurrentPage="initCurrentPage"
					:pageStart="pageStart"
					:totalPages="totalPages"
					:prev="prev"
					:next="next"
				/> -->
      </div>
      <div class="googleMap" v-if="mapHospName === ''">
        <iframe
          frameborder="0"
          width="480"
          height="488"
          src="https://www.google.com/maps?q=輔仁大學附設醫院&amp;hl=zh-TW&amp;z=15&amp;t=&amp;output=embed"
        ></iframe>
      </div>
      <div class="googleMap" v-else>
        <iframe
          frameborder="0"
          width="480"
          height="488"
          :src="mapIframe"
        ></iframe>
      </div>
    </div>
  </div>
</template>

<script>
// import Pagination from '@/components/Pagination/index.vue'
import DoughnutChart from '@/components/DoughnutChart/index.vue'
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
  components: {
    // Pagination,
    DoughnutChart,
  },
  data() {
    return {
      isCheckRadio: false,
      isCounty: false,
      isActive: '全部',
      initCountOfPage: 3,
      initCurrentPage: 1,
      topTenCurrent: 1,
      // resultNumber: 0,
      countys: [
        {
          id: 1,
          name: '全區',
          isActive: true,
        },
        {
          id: 2,
          name: '臺北市',
          isActive: false,
        },
        {
          id: 3,
          name: '新北市',
          isActive: false,
        },
        {
          id: 4,
          name: '基隆市',
          isActive: false,
        },
        {
          id: 5,
          name: '桃園市',
          isActive: false,
        },
        {
          id: 6,
          name: '新竹市',
          isActive: false,
        },
        {
          id: 7,
          name: '新竹縣',
          isActive: false,
        },
        {
          id: 8,
          name: '苗栗縣',
          isActive: false,
        },
        {
          id: 9,
          name: '臺中市',
          isActive: false,
        },
        {
          id: 10,
          name: '彰化縣',
          isActive: false,
        },
        {
          id: 11,
          name: '南投縣',
          isActive: false,
        },
        {
          id: 12,
          name: '雲林縣',
          isActive: false,
        },
        {
          id: 13,
          name: '嘉義縣',
          isActive: false,
        },
        {
          id: 14,
          name: '嘉義市',
          isActive: false,
        },
        {
          id: 15,
          name: '臺南市',
          isActive: false,
        },
        {
          id: 16,
          name: '高雄市',
          isActive: false,
        },
        {
          id: 17,
          name: '屏東縣',
          isActive: false,
        },
        {
          id: 18,
          name: '宜蘭縣',
          isActive: false,
        },
        {
          id: 19,
          name: '花蓮縣',
          isActive: false,
        },
        {
          id: 20,
          name: '臺東縣',
          isActive: false,
        },
        {
          id: 21,
          name: '澎湖縣',
          isActive: false,
        },
        {
          id: 22,
          name: '連江縣',
          isActive: false,
        },
        {
          id: 23,
          name: '金門縣',
          isActive: false,
        },
      ],
      minValue: 0,
      maxValue: 100,

    }
  },
  created: {

  },
  mounted() {
    // this.rateChartGet()
    // this.items = this.rc__init()
    // this.resultNumber = this.SEARCH__RESULT__INIT.length
    this.top_Ten()
  },
  computed: {
    ...mapState(['topTen', 'mapHospName', 'searchResult']),
    ...mapGetters(['SEARCH__RESULT__INIT', 'TOP__TEN__INIT']),
    topTenStart: function () {
      return (this.topTenCurrent - 1) * 5
    },
    computedBackground: function () {
      return this.Background
    },
    mapIframe: function () {
      return (
        'https://www.google.com/maps/embed/v1/place?key=AIzaSyC_YMzsryURlXkdJbftqqkDR0_M-zTX6AU&q=' +
        this.mapHospName
      )
    },
    pageStart: function () {
      return (this.initCurrentPage - 1) * this.initCountOfPage
    },
    totalPages: function () {
      return Math.ceil(this.SEARCH__RESULT__INIT.length / this.initCountOfPage)
    },
    resultNumber: function () {
      return this.SEARCH__RESULT__INIT.length
    },
  },
  methods: {
    ...mapActions([
      'searchRegion',
      'searchAll',
      'searchRegion_Rate',
      'searchDistance',
      'rateChartGet',
      'query',
      'resultQuery',
      'top_Ten',
      'get_hospital_Name',
    ]),
    TopPrev() {
      this.topTenCurrent === 1
        ? (this.topTenCurrent = 1)
        : (this.topTenCurrent -= 1)
        
    },
    TopNext() {
      this.topTenCurrent === 1 && this.resultNumber>5
      ? (this.topTenCurrent +=1)
      : (this.topTenCurrent == 1)
    },
    checkRadio() {
      this.isCheckRadio = this.isCheckRadio ? false : true
    },
    countySelect(county, index) {
      for (var i = 0; i < this.countys.length; i++) {
        // 地區側邊欄點選後變色
        this.countys[i].isActive = false
        this.countys[index].isActive = true
      }
      if (
        county.name === '全區' &&
        this.minValue === 0 &&
        this.maxValue === 100
      ) {
        console.log('ALL')
        this.searchAll()
      } else if (this.minValue === 0 && this.maxValue === 100) {
        this.searchRegion(county.name)
        console.log('搜尋指定區域無特定評分')
      } else {
        const zipData = [county.name, this.minValue, this.maxValue]
        this.searchRegion_Rate(zipData)
        console.log('搜尋指定區域特定評分')
      }
    },
    minCValue() {
      this.minValue = event.target.value
    },
    maxCValue() {
      this.maxValue = event.target.value
    },
    distanceC() {
      // console.log(event.target.value);
      this.query({
        distance: event.target.value,
      })
      // this.searchDistance(event.target.value)
    },
    search(county, index) {
      console.log(county)
      for (var i = 0; i < this.countys.length; i++) {
        this.countys[i].isActive = false
        this.countys[index].isActive = true
      }
      // this.SEARCH__RESULT__INIT = ''
      this.initCurrentPage = 1
      this.topTenCurrent=1
      this.totalPages = 1
      // console.log(this.SEARCH__RESULT__INIT)
      // window.location.reload()
      this.resultQuery({
        regionValue: county.name == '全區' ? '' : county.name,
        hospitalValue: this.hospitalValue,
        doctorValue: this.doctorValue,
        minValue: this.minValue,
        maxValue: this.maxValue,
      })
      this.chartData = JSON.parse(JSON.stringify(this.SEARCH__RESULT__INIT)) // 深度拷貝資料
    },
    prev() {
      if (this.initCurrentPage === 1) {
        this.$forceUpdate   // 強制更新
        this.initCurrentPage = 1
      } else {
        this.$forceUpdate
        this.initCurrentPage -= 1
      }
    },
    async next() {
      if (this.initCurrentPage === this.totalPages) {
        this.$forceUpdate
        this.initCurrentPage = this.totalPages
      } else {
        this.$forceUpdate
        this.initCurrentPage += 1
      }
    },
    getHospital(item) {
      this.get_hospital_Name(item.hosp_name)
    },
    tohome() {
      this.$router.push('/')
    },
  },
}
</script>
<style src="@/assets/searchstyle.css"></style>
