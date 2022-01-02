<template>
	<div class="home">
		<div class="wrap">
			<div class="header">
				<!-- <div class="header__menu">
          <img src="@/assets/menu.png" alt="" />
        </div> -->
				<div class="header__title">
					<h3>醫療好評網</h3>
				</div>
				<Popup
					class="searchDialog"
					:showDialog="showSearchDialog"
					:cancel="cancel"
				>
					<div class="content">
						<i class="searchIcon" @click="search"
							><img src="@/assets/search.png" alt=""
						/></i>
						<custom-select
							class="regionSelect"
							:class="[
								regionShow
									? 'regionSelect__optionShow optionShow'
									: 'regionSelect__optionHide optionHide',
							]"
							:optionShow="ROotionShow"
							:optionList="regionList"
							:selectedValue="regionValue"
							:selectedOption="regionSelected"
							:placeholder="regionPlaceholder"
						>
							<i class="icon"
								><img src="@/assets/Group 20.svg" alt=""
							/></i>
						</custom-select>
						<custom-select
							class="hospitalSelect"
							:class="[
								hospitalShow
									? 'hospitalSelect__optionShow optionShow'
									: 'hospitalSelect__optionHide optionHide',
							]"
							:optionShow="HOotionShow"
							:optionList="hospitalList"
							:selectedValue="hospitalValue"
							:selectedOption="hospitalSelected"
							:placeholder="hospitalPlaceholder"
						>
							<i class="icon"
								><img src="@/assets/Group 21.svg" alt=""
							/></i>
						</custom-select>
						<h2 class="popup_title">醫院評分搜尋</h2>
						<custom-select
							class="doctorSelect"
							:class="[
								doctorShow
									? 'doctorSelect__optionShow optionShow'
									: 'doctorSelect__optionHide optionHide',
							]"
							:optionShow="DOotionShow"
							:optionList="doctorList"
							:selectedValue="doctorValue"
							:selectedOption="doctorSelected"
							:placeholder="doctorPlaceholder"
						>
							<i class="icon"
								><img src="@/assets/Group 21.svg" alt=""
							/></i>
						</custom-select>

						<h3 class="rateText"><div class="tooltip">評分
							<span class="tooltiptext">
								評分說明：<br>Google 20倍<br>+<br>本網站評分<br>+<br>其他評分網站評分<br><br>之平均
							</span>
						</div></h3>
						<button class="rateButton"><a :href="statisticURL" target="_blank">查看評分分布圖</a></button>
						<form class="range__input">
							<input
								type="number"
								class="min"
								:value="minValue"
								@change="minCValue"
								oninput="if(value<0)value=0;if(value>100)value=100"
							/>
							<div class="line"></div>
							<input
								type="number"
								class="max"
								:value="maxValue"
								@change="maxCValue"
								oninput="if(value<0)value=0;if(value>100)value=100"
							/>
							<h4>請輸入0-100</h4>
						</form>
					</div>
				</Popup>
				<div class="header__search" @click="search__box">
					<div class="sub1">O</div>
					<div class="sub1__line"></div>
					<div class="sub2">PEN</div>
				</div>
				<a class="scroll__btn" href="#subtitle">
					<img src="@/assets/nextPage.png" alt="" />
				</a>
				<div class="header__subtitle" id="subtitle">
					<h3>醫療好評網</h3>
					<h4>
						給您的安心有保障的醫療評價資訊，
						<br />簡單明瞭、方便操作 。
					</h4>
				</div>
			</div>
		</div>
		<div class="content1">
			<div class="content1__title">
				<h3>你有這些困擾嗎?</h3>
			</div>
			<div class="content1__range range1">
				<div class="content1__box">
					<div class="content1_background">
						<img src="@/assets/Union.svg" alt="" />
					</div>
					<div class="content1__box__img">
						<img src="@/assets/thunder.png" alt="" />
					</div>
					<h3>臨時找醫院，<br />妳怕雷嗎?</h3>
				</div>
				<div class="content1__box">
					<div class="content1_background">
						<img src="@/assets/Union.svg" alt="" />
					</div>
					<div class="content1__box__img">
						<img src="@/assets/talk.png" alt="" />
					</div>
					<h3>道聽塗說是不是你<br />求醫的唯一參考?</h3>
				</div>
			</div>
			<div class="content1__range range2">
				<div class="content1__box">
					<div class="content1_background">
						<img src="@/assets/Union.svg" alt="" />
					</div>
					<div class="content1__box__img">
						<img src="@/assets/time.png" alt="" />
					</div>
					<h3>怕花太多時間尋找<br />妳心中的良醫嗎?</h3>
				</div>
				<div class="content1__box">
					<div class="content1_background">
						<img src="@/assets/Union.svg" alt="" />
					</div>
					<div class="content1__box__img">
						<img src="@/assets/layout.png" alt="" />
					</div>
					<h3>版面太雜，使用<br />起來霧煞煞嗎？</h3>
				</div>
			</div>
			<div class="content1__subbox">
				<div class="content1__subbox_background">
					<img src="@/assets/Rectangle 23.svg" alt="" />
				</div>
				<div class="content1__subbox__img">
					<img src="@/assets/trust.png" alt="" />
				</div>
				<h3>
					面對意外，<br />你需要的是快速精準的醫療資訊，<br />
					而不是片面之詞的傳言，<br />讓我們為你找到值得信賴的醫療機構。
				</h3>
			</div>
		</div>
		<div class="content2">
			<img
				class="content2__background"
				src="@/assets/solutionNew.svg"
				alt=""
			/>
			<h2>不用擔心，<br />我們就是你的避雷針。</h2>
			<div class="content2__box box1">
				<img src="@/assets/Rectangle 28.svg" alt="" />
				<h3>找醫生</h3>
			</div>
			<div class="content2__box box2">
				<img src="@/assets/Rectangle 28.svg" alt="" />
				<h3>找科別</h3>
			</div>
			<div class="content2__box box3">
				<img src="@/assets/Rectangle 28.svg" alt="" />
				<h3>找醫療機構</h3>
			</div>
			<div class="content2__box box4">
				<img src="@/assets/Rectangle 28.svg" alt="" />
				<h3>找疾病</h3>
			</div>
		</div>
		<div class="content3">
			<div class="content3__boxflex">
				<div class="content3__box box1">
					<div class="title">各種方式搜尋醫療機構</div>
					<div class="sub">
						<h3>
							依照科別和疾病搜尋，<br />選擇最適合您的醫療機構。
						</h3>
					</div>
				</div>
				<div class="content3__box box2">
					<div class="title">民眾評分機制</div>
					<div class="sub">
						<h3>
							以連續性評分數據，精準性提高，<br />讓你輕鬆找到最適合的良醫。
						</h3>
					</div>
				</div>
				<div class="content3__box box3">
					<div class="title">評論機制，雙向溝通</div>
					<div class="sub">
						<h3>
							透過民眾留言方式，<br />醫師幫助您解決心中的困惑。
						</h3>
					</div>
				</div>
				<div class="content3__box box4">
					<div class="title">統整醫療院所數據</div>
					<div class="sub">
						<h3>
							數據呈現他們的用心良苦，<br />用醫療資訊技術讓你從專業看見醫院的效率。
						</h3>
					</div>
				</div>
				<div class="content3__box box5">
					<div class="title">版面經過設計思考</div>
					<div class="sub">
						<h3>
							有設計邏輯的介面讓你全方位，<br />快速，精準的選擇。
						</h3>
					</div>
				</div>
			</div>
			<div class="content3__decoration">
				<div class="content3__title">
					<h3>服務項目</h3>
				</div>
			</div>
			<div class="content3__subbox">
				<div class="content3__subbox__img top">
					<img src="@/assets/upperQuotation.svg" alt="" />
				</div>
				<h3 class="one">
					醫療好評網提供您一目瞭然的資訊呈現，採用獨家搜尋引擎，
				</h3>
				<h3 class="two">
					結合Big Data的跨時代科技，助你精準找到最佳良醫。
				</h3>
				<div class="content3__subbox__img bottom">
					<img src="@/assets/lowerQuotation.svg" alt="" />
				</div>
			</div>
		</div>
		<div class="content4">
			<div class="content4__header">
				<img src="@/assets/chatIcon.svg" alt="" />
				<h3>來自各地的支持</h3>
			</div>
			<div class="content4__main">
				<div class="message__area">
					<div
						class="message"
						v-for="message in messages"
						:key="message.id"
					>
						<img src="@/assets/chatUnion.svg" alt="" />
						<h3>{{ message.content }}</h3>
					</div>
				</div>
			</div>
			<div class="content4__input">
				<input
					type="text"
					placeholder="留言區"
					v-model="messageInput"
					maxlength="80"
				/>
				<button @click="sendMessage">發&emsp;送</button>
			</div>
		</div>
		<div class="footer">
			<div class="sub1">
				<h3>網站地圖</h3>
				<ul>
					<li>
						粉絲專頁<span>
							&nbsp; &nbsp; &nbsp;醫療好評網@Facebook</span
						>
					</li>
					<li>
						客服專線<span>
							&nbsp; &nbsp; &nbsp;(02) &nbsp;2905-2000</span
						>
					</li>
					<li>工作團隊</li>
				</ul>
			</div>
			<div class="sub2">
				<div class="sub2__flex">
					<h3 class="copy">©&thinsp; 2021&thinsp; 醫療好評網</h3>
					<h3 class="private">隱私政策</h3>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Popup from "@/components/Popup/index.vue";
import CustomSelect from "@/components/Select/index.vue";
import { mapState, mapActions } from "vuex";

export default {
	data() {
		return {
			showSearchDialog: false,
			regionShow: false,
			hospitalShow: false,
			doctorShow: false,
			regionValue: "",
			hospitalValue: "",
			doctorValue: "",
			minValue: 0,
			maxValue: 100,
			statisticURL: "https://boyoulin.github.io/medialPraiseWeb/statistic/?city=&subject=&",
			// selectedValue: "",
			regionList: [
				"全區",
				"臺北市",
				"新北市",
				"基隆市",
				"桃園市",
				"新竹市",
				"新竹縣",
				"苗栗縣",
				"臺中市",
				"彰化縣",
				"南投縣",
				"雲林縣",
				"嘉義縣",
				"嘉義市",
				"臺南市",
				"高雄市",
				"屏東縣",
				"宜蘭縣",
				"花蓮縣",
				"臺東縣",
				"澎湖縣",
				"連江縣",
				"金門縣",
			],
			hospitalList: [
				"選擇醫院",
				"全區",
				"臺北市",
				"新北市",
				"基隆市",
				"桃園市",
				"新竹市",
				"新竹縣",
				"苗栗縣",
				"臺中市",
				"彰化縣",
				"南投縣",
				"雲林縣",
				"嘉義縣",
				"嘉義市",
				"臺南市",
				"高雄市",
				"屏東縣",
				"宜蘭縣",
				"花蓮縣",
				"臺東縣",
				"澎湖縣",
				"連江縣",
				"金門縣",
			],
			doctorList: [
				"選擇科別",
				"家庭醫學科",
				"內科",
				"外科",
				"兒科",
				"婦產科",
				"骨科",
				"神經科",
				"神經外科",
				"泌尿科",
				"耳鼻喉科",
				"眼科",
				"皮膚科",
				"精神科",
				"復健科",
				"麻醉科",
				"放射診斷科",
				"放射腫瘤科",
				"解剖病理科",
				"臨床病理科",
				"核子醫學科",
				"急診醫學科",
				"整形外科",
				"職業醫學科",
				"西醫一般科",
				"齒顎矯正科",
				"牙醫一般科",
				"口腔病理科",
				"口腔顎面外科",
				"兒童牙科",
				"中醫一般科"
			],
			regionPlaceholder: "全區",
			hospitalPlaceholder: "選擇醫院",
			doctorPlaceholder: "選擇科別",
			parmData: "",
			messageInput: "",

		};
	},
	components: {
		Popup,
		CustomSelect,
	},
	mounted() {
		this.messagesInit();
		//this.passLocation();
	},
	computed: {
		...mapState(["messages"]),
	},
	methods: {
		...mapActions([
			"searchAll",
			"searchRegion",
			"searchHospital",
			"searchDoctor",
			"searchRate",
			"searchRegion_Hospital",
			"searchRegion_Doctor",
			"searchRegion_Doctor_Rate",
			"searchRegion_Rate",
			"searchRegion_Hosptial_Doctor_Rate",
			"messagesInit",
			"messageSend",
			"passLocation",
			"query"
		]),
		search__box() {
			this.showSearchDialog = true;
		},
		cancel() {
			this.showSearchDialog = false;
			this.regionShow = false;
			this.hospitalShow = false;
			this.doctorShow = false;
		},
		// search(event) {
		// 	this.searchType(event.target.value);
		// 	this.$router.push("/search");
		// 	this.showSearchDialog = false;
		// },
		regionSelected(value) {
			if (value === "全區") {
				this.regionPlaceholder = "全區";
				this.regionValue = "";
				this.statisticURL=this.statisticURL.replace(/(city=.*&s)/,"city=&s");
			} else {
				this.regionPlaceholder = "";
				this.regionValue = value;
				this.statisticURL=this.statisticURL.replace(/(city=.*&s)/,"city="+value+"&s");
			}
			// this.regionValue = value;
			// this.regionPlaceholder = ""
			this.regionShow = false;
			// this.selectedValue = value;
			// this.regionShow = false;
			// this.placeholderTxt = "";
			// if (value === "科別") {
			// 	this.parmData = "doctor";
			// } else {
			// 	this.parmData = "hospital";
			// }

			// this.searchType(this.parmData);
			// this.$router.push("/search");
			// this.showSearchDialog = false;
		},
		hospitalSelected(value) {
			if (value === "選擇醫院") {
				this.hospitalPlaceholder = "選擇醫院";
				this.hospitalValue = null;
			} else {
				this.hospitalPlaceholder = "";
				this.hospitalValue = value;
			}
			this.hospitalShow = false;
		},
		doctorSelected(value) {
			if (value === "選擇科別") {
				this.doctorPlaceholder = "選擇科別";
				this.doctorValue = null;
				this.statisticURL=this.statisticURL.replace(/subject=.*&/,"subject=&");
			} else {
				this.doctorPlaceholder = "";
				this.doctorValue = value;
				this.statisticURL=this.statisticURL.replace(/subject=.*&/,"subject="+value+"&");
			}
			this.doctorShow = false;
		},
		ROotionShow() {
			this.regionShow = this.regionShow ? false : true;
			this.hospitalShow = false;
			this.doctorShow = false;
		},
		HOotionShow() {
			this.hospitalShow = this.hospitalShow ? false : true;
			this.regionShow = false;
			this.doctorShow = false;
		},
		DOotionShow() {
			this.doctorShow = this.doctorShow ? false : true;
			this.regionShow = false;
			this.hospitalShow = false;
		},
		sendMessage(e) {
			e.preventDefault();
			this.messageSend(this.messageInput);
			this.messageInput = "";
		},
		
		search() {
			this.query({
				"regionValue":this.regionValue,
				"hospitalValue":this.hospitalValue,
				"doctorValue":this.doctorValue,
				"minValue":this.minValue,
				"maxValue":this.maxValue});
				this.$router.push('/result')
				// this.$router.push('/search')
		},

		minCValue(){
			this.minValue = event.target.value
		},
		maxCValue(){
			this.maxValue = event.target.value
		},
		toStatistics() {
			this.$router.push('/Statistics')
		}
	},
};
</script>

<style type="text/css" src="@/assets/style.css"></style>
