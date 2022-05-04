const mongoose = require('mongoose');

const subjectSchema = mongoose.Schema({
	hops_id:{
		type:Number,
		ref:"miiaweb"
	},
	hosp_name:String,
	subject:Array
}, {
    timestamps: true
});

module.exports = mongoose.model('subject', subjectSchema);
//自訂欄位是要存取資料的Schema名稱
//這裡匯出mongoose的model作為類別

/*subjectSchema.static = {
	findSubjectWithHospital: function (cb) {
	  return this
		.find({})
		.populate('hosp_id')//注意这是联合查询的关键
		.exec(cb)
	}
  }*/