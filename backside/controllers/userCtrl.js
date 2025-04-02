const Users = require("../models/userModel");

const userCtrl = {
  searchUser: async (req, res) => {
    try {
      const users = await Users.find({
        username: { $regex: req.query.username, $options: "i" },
      })
        .limit(10)
        .select("fullname username avatar");

      res.json({ users });
    } catch (err) {
        console.log(err);
      return res.status(500).json({ msg: err.message });
    }
  },
  getUser: async (req,res)=>{
      try {
          const user =  await Users.findOne({_id : req.params.id})
          .select("-password")
          if(!user) return res.status(400).json({msg: "No user Exists"})
          res.json({user})
      } catch (err) {
          return res.status(500).json({msg: err.message})
      }
  },
  // updateUser: async (req,res) =>{
  //     try {

  //         const { website, fullname, story, phone, address } =req.body;
  //         if(!fullname)  return res.status(500).json({msg: "Fullname is requires"})

  //         const user = await Users.findOneAndUpdate({_id: req.body._id},{
  //             website, fullname, story, phone, address
  //         })

  //         res.json({msg:'update success', user})
  //     } catch (err) {
  //         return res.status(500).json({msg: err.message})
  //     }
  // },
};
module.exports = userCtrl;
