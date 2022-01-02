import axios from 'axios'
import rc from '@/assets/rateChart.json'
import router from '@/router'


export const rateChartGet = ({commit}) => {
  commit('RATE__CHART__INIT', rc)
}

export const top_Ten = async ({commit}) => {
  const baseURL = 'https://miianodeprogram.azurewebsites.net:443/hospital/top10Hospital'
  const result = await axios.get(baseURL)
  commit('TOP__TEN__INIT', result.data)
}

export const get_hospital_Name = ({commit},data) => {
  console.log(data);
  commit('GET_HOSPITAL_NAME',data)
}


export const messagesInit = async ({commit}) => {
    const baseURL = 'https://miianodeprogram.azurewebsites.net:443/allReviews'
    const result = await axios.get(baseURL) 
    commit('MESSAGES__INIT', result.data)
}

export const messageSend = async ({commit}, data) => {
    console.log(data);
    const baseURL = 'https://miianodeprogram.azurewebsites.net:443/Review'
    const result = await axios.post(baseURL, {content: data})
    commit('MESSAGE__RELOAD', result.data)
}

export const query = async ({ commit },data) => {
  const getLocation = function(){
    return new Promise(function(resolve, reject) {
      if (navigator.geolocation){
        let options = {enableHighAccuracy : true, maximumAge : 10000, timeout :10000};
        navigator.geolocation.getCurrentPosition(
          (pos)=>{
            let mylocation =[pos.coords.longitude,pos.coords.latitude];
            console.log(`使用者經緯度：${pos.coords.longitude},${pos.coords.latitude}`);
            resolve(mylocation);
          },
          (err)=>{console.log(err);reject(err)},
          options);
      }else{
        console.log('目前不支援定位功能');
      }
    });
  };

    let mylocation=[];
    try{
    mylocation = await getLocation();
    }catch(error){//Promise是error時
    mylocation=["",""];
    console.log("你要開啟定位喔");
    }
    let distance = data['distance'] || "";//目前預設不判斷公里
    let city=data['regionValue'] || "";
    let subject =data['doctorValue'] || "";
    let min_score=Number(data['minValue']) || 0;
    let max_score=Number(data['maxValue']) || 100;
    const baseURL = 'https://miianodeprogram.azurewebsites.net:443/hospital/query'
    let newURL = baseURL+
    '?distance='+distance+'&lon='+mylocation[0]+'&lat='+mylocation[1]+
    '&city='+city+
    '&min_score='+min_score+'&max_score='+max_score+
    '&subject='+subject;
    console.log(newURL);
    const result = await axios.get(newURL)
    // console.log(result.data);
    commit('SEARCH__RESULT', result.data)
    router.push('/result')
}

export const resultQuery = async ({ commit },data) => {
  // window.location.reload()
  const getLocation = function(){
    return new Promise(function(resolve, reject) {
      if (navigator.geolocation){
        let options = {enableHighAccuracy : true, maximumAge : 10000, timeout :10000};
        navigator.geolocation.getCurrentPosition(
          (pos)=>{
            let mylocation =[pos.coords.longitude,pos.coords.latitude];
            console.log(`使用者經緯度：${pos.coords.longitude},${pos.coords.latitude}`);
            resolve(mylocation);
          },
          (err)=>{console.log(err);reject(err)},
          options);
      }else{
        console.log('目前不支援定位功能');
      }
    });
  };

    let mylocation=[];
    try{
    mylocation = await getLocation();
    }catch(error){//Promise是error時
    mylocation=["",""];
    console.log("你要開啟定位喔");
    }
    let distance = data['distance'] || "";//目前預設不判斷公里
    let city=data['regionValue'] || "";
    let min_score=Number(data['minValue']) || 0;
    let max_score=Number(data['maxValue']) || 100;
    const baseURL = 'https://miianodeprogram.azurewebsites.net:443/hospital/query'
    let newURL = baseURL+
    '?distance='+distance+'&lon='+mylocation[0]+'&lat='+mylocation[1]+
    '&city='+city+
    '&min_score='+min_score+'&max_score='+max_score;
    console.log(newURL);

    const result = await axios.get(newURL)
    console.log(result.data);
    commit('SEARCH__RESULT', result.data)

}