import dbConnect from "../../../../utils/dbConnect";
import UnkAll from '../../../../model/UnkAll'

dbConnect()

export default async (req,res) => {
    //var UnkAll = require('../../../../model/UnkAll')
    // var mongoose = require('mongoose');
    // var UnkAll = mongoose.model('../../../../model/UnkAll')
    const {
        query:{id},
        method
    } = req;

    switch (method){
        case 'GET':
            try{
                const notice = await UnkAll.findById(id);
                console.log(notice)

                if(!notice){
                    return res.status(400).json({success:false})
                }
                res.status(200).json({success:true,data:notice})
            } catch (error){
                console.log(error)
                res.status(400).json({success:false})
            }
            break;
        case 'POST':
            try {
                const notice = await UnkAll.findByIdAndUpdate(id,{$set:{like:req.body.like}})
                if(!notice){
                    return res.status(400).json({success:false})
                }
                res.status(200).json({success:true,data:notice})
            }catch (error){
                res.status(400).json({success:false})
            }

            break;
        case 'PUT':
            try{
                const notice = await UnkAll.findByIdAndUpdate(id, {$set: {title:req.body.title,description:req.body.description}});

                if(!notice){
                    return res.status(400).json({success:false})
                }
                res.status(200).json({success:true,data:notice})
            } catch (error){
                res.status(400).json({success:false})
            }
            break;
        case 'DELETE':
            try{
                const notice = await UnkAll.deleteOne({_id:id});

                if(!notice){
                    return res.status(400).json({success:false})
                }
                res.status(200).json({success:true,data:{}})
            } catch (error){
                res.status(400).json({success:false})
            }
            break;
        case 'PATCH':
            try{
                const notice = await UnkAll.findByIdAndUpdate(id,{$set:{view:req.body.view}})
                if(!notice){
                    return res.status(400).json({success:false})
                }
                res.status(200).json({success:true,data:notice})
            } catch (error){
                res.status(400).json({success:false})
            }
            break;
        default:
            res.status(400).json({success:false})
            break;
    }

}
