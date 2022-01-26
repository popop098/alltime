// https://www.youtube.com/watch?v=ahAilJEe-_A&list=PL_kAgwZgMfWx0ToY-XKCcAm9JH5UlTA-W&index=2&ab_channel=JasonRivera
import dbConnect from "../../utils/dbConnect";
import Account from '../../model/Account'
import bcrypt from "bcrypt";

dbConnect()

export default async (req,res) => {
    const { method } = req;
    switch (method){
        case 'POST':
            console.log(req.body)
            try {
                const available = await Account.findOne({"id":String(req.body.id)})
                if(available){
                    // console.log(await Account.findOne({id:String(req.body.id)}).select('password'))
                    return res.status(400).json({success:false})
                }
                const hash = bcrypt.hashSync(req.body.pwd, 10);
                const account = await Account.create({
                    "id":req.body.id,
                    "password":String(hash),
                    "email":req.body.email,
                    "role":req.body.role
                })
                res.status(201).json({success:true,data:account})
                return
            }catch (error){
                console.log(error)
                res.status(400).json({success:false})
            }
            break;
        default:
            res.status(400).json({success:false});
            break;
    }
}
