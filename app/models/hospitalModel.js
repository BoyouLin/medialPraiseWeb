const mongoose = require('mongoose');

const dataSchema = mongoose.Schema({
	hops_id:Number,
	hosp_name:String,
	score:Number,
	city:String,	
	address:String,
	telephone:String,
	location:Array,
	web:String,
	photoURL:String
}, {
    timestamps: true
});

module.exports = mongoose.model('miiaweb', dataSchema);
//自訂欄位是要存取資料的Schema名稱
//這裡匯出mongoose的model作為類別