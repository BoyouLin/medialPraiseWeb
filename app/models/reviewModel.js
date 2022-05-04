const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
	content:String
}, {
    timestamps: true
});

module.exports = mongoose.model('review', reviewSchema);
//自訂欄位是要存取資料的Schema名稱
//這裡匯出mongoose的model作為類別