// https://www.youtube.com/watch?v=ahAilJEe-_A&list=PL_kAgwZgMfWx0ToY-XKCcAm9JH5UlTA-W&index=2&ab_channel=JasonRivera
import dbConnect from "../../../utils/dbConnect";
import Notice from '../../../model/Notice'

dbConnect()

export default async (req,res) => {
    const { method } = req;

    switch (method){
        case 'GET':
            try {
                const notices = await Notice.find({});
                res.status(200).json({success:true,data:notices})
            }catch (error){
                res.status(400).json({success:false})
            }
            break;
        case 'POST':
            try {
                const notices = await Notice.create(req.body);
                res.status(201).json({success:true,data:notices})
            }catch (error){
                res.status(400).json({success:false})
            }
            break;
        default:
            res.status(400).json({success:false});
        break;
    }
}
