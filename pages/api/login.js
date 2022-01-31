// https://www.youtube.com/watch?v=ahAilJEe-_A&list=PL_kAgwZgMfWx0ToY-XKCcAm9JH5UlTA-W&index=2&ab_channel=JasonRivera
import dbConnect from "../../utils/dbConnect";
import Account from '../../model/Account'
import bcrypt from "bcrypt";

dbConnect()
export default async (req,res) => {
    const { method } = req;
    switch (method){
        case 'POST':
            try {
                console.log(req.body)
                await Account.findOne({id:req.body.id},function (err,doc) {
                    console.log(doc)
                    if(doc){
                        const UserPwd = doc.password
                        const CheckPwd = bcrypt.compareSync(req.body.pwd, UserPwd);
                        console.log(CheckPwd)
                        if(CheckPwd){
                            res.status(200).json({success:true,data:{
                                "id":doc.id,
                                "email":doc.email,
                                "role":doc.role
                                }})
                            res.end()
                        } else {
                            res.status(401).json({success:false})
                        }
                    } else {
                        res.status(401).json({success:false})
                    }
                }).clone().catch(function(err){ console.log(err)})
                // const hash = bcrypt.hashSync(req.body.pwd, 10);
                // const account = await Account.create({
                //     "id":req.body.id,
                //     "password":String(hash),
                //     "email":req.body.email,
                //     "role":req.body.role
                // })
                // res.status(201).json({success:true,data:account})
                // return
            }catch (error){
                res.status(400).json({success:false})
            }
            break;
        default:
            res.status(400).json({success:false});
            break;
    }
}
