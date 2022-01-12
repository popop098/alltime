const mongoose = require('mongoose')

const NoticeSchema = new mongoose.Schema(
    {
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
            maxlength:[200,'200글자이하로 입력하세요.']
        }
    }
)

module.exports = mongoose.models.Notice || mongoose.model('Notice',NoticeSchema);
