// import dbConnect from "../../../../../utils/dbConnect";
// import UnkAll from '../../../../../model/UnkAll'
//
// dbConnect()
//
// export default async (req,res) => {
//     const {
//         query:{id},
//         method
//     } = req;
//
//     switch (method){
//         case "GET":
//             res.status(400).json({success:false})
//             break;
//         case 'POST':
//             try{
//                 const notice = await UnkAll.findByIdAndUpdate(id,{$set:{like:req.body.like}})
//                 if(!notice){
//                     return res.status(400).json({success:false})
//                 }
//                 res.status(200).json({success:true,data:notice})
//             } catch (error){
//                 res.status(400).json({success:false})
//             }
//             break;
//         default:
//             res.status(400).json({success:false})
//             break;
//     }
//
// }
