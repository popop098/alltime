const mongoose = require('mongoose')

const UnkAllSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        title:{
            type: String,
            required : [true,'제목을 추가해주세요.'],
            unique:true,
            trim:true,
            maxlength:[40,'40글자이하로 입력하세요.']
        },
        description:{
            type:String,
            required:true,
            maxlength:[1000,'1000글자이하로 입력하세요.']
        },
        time:{
            type:String,
            required:true
        },
        view:{
            type:Number,
            required:true
        },
        like:{
            type:Number,
            required:true
        }
    }
)

module.exports = mongoose.models.UnkAll || mongoose.model('unkalls',UnkAllSchema);
