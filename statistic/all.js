let url = new URL(location.href);
let params = url.searchParams;
//取得參數
/*let parmeters="";
for(let i=location.href.indexOf("?");i<location.href.length;i++){
  parmeters+=location.href[i];
}*/

axios.get('https://miianodeprogram.azurewebsites.net/hospital/c3_data/?'+params)
.then(function (response) {
  scoreArray=response.data;
  console.log(response.data);
  for (let i = 0; i < scoreArray.length; i++) {
    charData.data.columns[i][1]=scoreArray[i];
    document.querySelectorAll(".content h3")[i].innerHTML=charData.data.columns[i][0]+"："+scoreArray[i]+" 間";
  }
  c3.generate(charData);
});

let temptTitle=((params.get('city') || "")+(params.get('subject') || "")) || "全臺";
document.querySelector("header h1").innerHTML=temptTitle+"的醫院評分分佈";
let charData={
  bindto: '#chart', // HTML 元素綁定
  data: {
    columns: [
      ["0-20分", 3],
      ["21-40分", 0],
      ["41-60分",1],
      ["61-80分",1],
      ["81-100分",1],
    ], // 資料存放
    type:"donut",
    colors:{
      "0-20分":"#FF0000",
      "21-40分":"#FF8800",
      "41-60分":"#EEEE00",
      "61-80分":"#BBFF00",
      "81-100分":"#00FF00",
    }
  },
  donut: {
      title: temptTitle
  }
}
