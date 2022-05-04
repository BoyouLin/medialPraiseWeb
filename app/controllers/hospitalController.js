const dbModel = require('../models/hospitalModel.js');
const subjectModel = require('../models/subjectModel.js');

//?distance=20&lon=121.431877&lat=25.037998&city=新北市&min_score=60&max_score=70&subject=家庭醫學科
//distance幾公里內,lon經度,lat緯度,city縣市,min_score最低分,max_score最高分,subject科別
exports.query = (req, res) => {
    console.log("開始查詢");
    //let hospitalName=req.query.hospital_name || "";
    let expectedDistance = req.query.distance || "";
    let lonMy=req.query.lon || "";
    let latMy=req.query.lat || "";
    let city=req.query.city || "";
    let subject=req.query.subject || "";
    let minScore=Number(req.query.min_score) ||0;
    let maxScore=Number(req.query.max_score) ||100;
    let radlatMy=Math.PI * latMy/180;
    let result =[];

    //傳入資料陣列，回傳加入距離屬性的陣列
    const addDistance=function(mydata){
        //傳入經緯度，計算出距離
        function distance(lon, lat) {
            var radlat = Math.PI * lat/180;
            var theta = lon-lonMy;
            var radtheta = Math.PI * theta/180;
            var dist = Math.sin(radlat) * Math.sin(radlatMy) + Math.cos(radlat) * Math.cos(radlatMy) * Math.cos(radtheta);
            if (dist > 1) {dist = 1;}
            dist = Math.acos(dist);
            dist = (dist * 180/Math.PI) * 111.18957696;
            return dist;
        }

        //加入距離屬性
        let newData = mydata.map(hospital => {
            countedDistance=distance(hospital['location'][0],hospital['location'][1]);
            hospital.distanceToMe=countedDistance;
            return hospital;
        });
            return newData;
    };

    function hospitalGet(mydata){
        let newData=mydata.map(e=>{
            e=e.toJSON();
            return e
        });
        if(expectedDistance&&lonMy&&latMy){
            console.log("判斷距離");
            newData = addDistance(newData);
        }
        

        //篩選器：過濾距離和城市和評分
        result= newData.filter(hospital=>{
            let isClose=true;
            let isInCity=true;
            let isInScore=true;
            
            /*if(hospitalName){
                isInName=hospital.hosp_name.includes(hospitalName);
            }*/
            if(expectedDistance&&lonMy&&latMy){
                isClose=hospital.distanceToMe<=expectedDistance;
            }
            if(city){
                isInCity=hospital.city==city;
            }
            if(minScore<=maxScore){
                isInScore=minScore<=hospital.score && hospital.score<=maxScore;
            }
            return isClose && isInCity && isInScore;
        });
    }

    function subjectCheck(subjectData){
            console.log("科別篩選");
            subjectData=subjectData.map(e=>{
                e=e.toJSON();
                return e
            });

            result=result.filter(hospital=>{
                let isInSubject=true;
                let temp =subjectData.find(e=>{
                    return e['hosp_id']==hospital['hosp_id']
                })
                //如果該醫院沒有包含要篩選的科別，isInSubject返回false
                
                isInSubject=temp['subject'].some(e=>{
                    return e==subject
                })
                return isInSubject;
            })
            res.send(result);
    }

    async function resultCount(){
        if(subject){
            const mydata = await dbModel.find();
            hospitalGet(mydata);
            const subjectTotalData = await subjectModel.find({});
            subjectCheck(subjectTotalData);
             
        }else{
            const mydata = await dbModel.find();
            hospitalGet(mydata);
            //有判斷距離的話會依距離排序
            /*if(expectedDistance&&lonMy&&latMy){
                result.sort(function(a, b){
                    return a.distanceToMe - b.distanceToMe;
                });
            }*/
            res.send(result);
        }
    }
    resultCount();
};

//圖表API，回傳每20分為間距的醫院數
exports.c3Data = (req, res) => {
    let city=req.query.city || "";
    let subject=req.query.subject || "";
    let result =[];
    let resultNumber=[0,0,0,0,0];

    function countResult(){
        result.forEach(hospital=>{
            if(hospital.score>80){
                resultNumber[4]+=1;
            }else if(hospital.score>60){
                resultNumber[3]+=1;
            }else if(hospital.score>40){
                resultNumber[2]+=1;
            }else if(hospital.score>20){
                resultNumber[1]+=1;
            }else{
                resultNumber[0]+=1;
            }
        })
        console.log("圖表評分："+resultNumber);
    }

    function hospitalGet(mydata){
        let newData=mydata.map(e=>{
            e=e.toJSON();
            return e
        });

        //篩選器：過濾城市
        result= newData.filter(hospital=>{
            let isInCity=true;
            if(city){
                isInCity=hospital.city==city;
            }
            return isInCity;
        });
    }

    function subjectCheck(subjectData){
            subjectData=subjectData.map(e=>{
                e=e.toJSON();
                return e
            });

            result=result.filter(hospital=>{
                let isInSubject=true;
                let temp =subjectData.find(e=>{
                    return e['hosp_id']==hospital['hosp_id']
                })
                //如果該醫院沒有包含要篩選的科別，isInSubject返回false
                
                isInSubject=temp['subject'].some(e=>{
                    return e==subject
                })
                return isInSubject;
            })
            countResult();
            res.send(resultNumber);
    }

    async function resultCount(){
        if(subject){
            const mydata = await dbModel.find();
            hospitalGet(mydata);
            const subjectTotalData = await subjectModel.find({});
            subjectCheck(subjectTotalData);
             
        }else{
            const mydata = await dbModel.find();
            hospitalGet(mydata);
            countResult();
            res.send(resultNumber);
        }
    }
    resultCount();
}


// 建立和儲存醫院資料--post格式為陣列JSON
exports.create = (req, res) => {
    //let ResponseData=new Array(5);
    let ResponseData="";
    for(let i=0;i<req.body.length;i++){
        // 驗證請求(Validate request)
        /*if(!req.body[0].hospital) {
            return res.status(400).send({
                message: "hospital欄位不可以為空"
            });
        }*/

        // 建立醫院資料
        const myData = new dbModel({
            hosp_name: req.body[i].hosp_name,
            review_times: req.body[i].review_times,
            score: req.body[i].score,
            city: req.body[i].city,
            address: req.body[i].address || "沒有地址耶哈哈",
            telephone: req.body[i].telephone || "沒有電話耶哈哈",
            location: req.body[i].location
        });
    
        // 儲存醫院資料到資料庫
        // mongoose.model.prototype.save()
        myData.save()
        .then(data => {
            //存檔後回傳剛剛建立的內容
            //ResponseData[i]=data;
            ResponseData=req.body[i].hosp_name;
        }).catch(err => {
            res.status(500).send({
                message: err.message || "建立儲存醫院資料的時候發生錯誤喔"
            });
        });
    }
    res.send(ResponseData);
};

// Retrieve and return all hospital from the database.
exports.findAll = (req, res) => {
    dbModel.find()
    .then(mydata => {
        res.send(mydata);
        //console.log(mydata)
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

exports.top10Hospital = (req, res) => {
    dbModel.find({},{_id:0,hosp_id:1,hosp_name:1,web:1,photoURL:1}).limit(10)
    .then(mydata => {
        res.send(mydata);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while find top10Hospital."
        });
    });
};

/*exports.find10CaseEachPage = (req, res) => {
    var skipNumber = req.params.page*10;
    dbModel.find().limit(10).skip(skipNumber)
    .then(mydata => {
        res.send(mydata);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while find10CaseEachPage."
        });
    });
};*/

/*exports.findHospitalWithCity = (req, res) => {
    dbModel.find({city: {$eq: req.params.city}})
    .then(mydata => {
        res.send(mydata);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};*/

exports.tsetFunction = (req, res) => {
    subjectModel.find({})
    .then(mydata => {
        res.send(mydata);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

exports.protect = (req, res) => {
    console.log(req.body.password);
    if(req.body.password=="123"){
        console.log("Y")
        res.send(true);
    }else{
        console.log("N");
        res.send(false);
    }
};

// Find a single note with a noteId
/*exports.findOne = (req, res) => {
    dbModel.findById(req.params.noteId)
    .then(myData => {
        if(!myData) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });            
        }
        res.send(myData);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + req.params.noteId
        });
    });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    // Find note and update it with the request body
    dbModel.findByIdAndUpdate(req.params.noteId, {
        title: req.body.title || "Untitled Note",
        content: req.body.content
    }, {new: true})
    .then(myData => {
        if(!myData) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        res.send(myData);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.noteId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    dbModel.findByIdAndRemove(req.params.noteId)//對照route那裡的:noteId參數,不須加?
    .then(myData => {
        if(!myData) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        res.send({message: "Note deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.noteId
        });
    });
};*/
