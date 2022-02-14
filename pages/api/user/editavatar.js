import dbConnect from "../../../utils/dbConnect";
import Account from '../../../model/Account'

dbConnect()

export default async function editAvatar(req, res) {
  const { method } = req;

  switch (method){
    case "POST":
      try {
        // const { id } = req.body;
        // const account = await Account.findById(id);
        // const { avatar } = req.files;
        // const { filename } = avatar;
        // account.avatar = `/images/avatar/${filename}`;
        // await account.save();
        console.log(req.body)
        res.status(200).json({
          status: "success"
        });
      } catch (error) {
        res.status(400).json({
          status: "fail",
          message: error.message
        });
      }
      break;
    default:
      res.status(400).json({
        status: "fail",
        message: "Method not allowed"
      });
      break;
  }
}
