const dbModel = require('../models/reviewModel.js');

// 建立和儲存醫院資料--post格式為陣列JSON
exports.create = (req, res) => {
        // 建立留言資料
        const myData = new dbModel({
            content: req.body.content || "這是空白留言測試"
        });
        // 儲存留言資料到資料庫
        // mongoose.model.prototype.save()
        myData.save()
        .then(data => {
            //存檔後回傳剛剛建立的內容
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "建立儲存留言資料的時候發生錯誤喔"
            });
        });
};

// Retrieve and return all hospital from the database.
exports.findAll = (req, res) => {
    dbModel.find()
    .then(mydata => {
        res.send(mydata);
        console.log(mydata)
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};