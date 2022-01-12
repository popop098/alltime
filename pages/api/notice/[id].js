import dbConnect from "../../../utils/dbConnect";
import Notice from '../../../model/Notice'

dbConnect()

export default async (req,res) => {
    const {
        query:{id},
        method
    } = req;

    switch (method){
        case 'GET':
            try{
                const notice = await Notice.findById(id);
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
        case 'PUT':
            try{
                const notice = await Notice.findByIdAndUpdate(id,req.body,{
                    new:true,
                    runValidators: true
                });

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
                const notice = await Notice.deleteOne({_id:id});

                if(!notice){
                    return res.status(400).json({success:false})
                }
                res.status(200).json({success:true,data:{}})
            } catch (error){
                res.status(400).json({success:false})
            }
            break;
        default:
            res.status(400).json({success:false})
            break;
    }

}
