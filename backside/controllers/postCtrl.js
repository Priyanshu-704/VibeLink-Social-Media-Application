const Posts = require("../models/postModel");

const postCtrl = {
  createPost: async (req, res) => {
    try {
      
      const { content, images } = req.body;

      const newPost = new Posts({
        content,
        images,
      });
      await newPost.save();

     return res.status(200).json({
            msg: "Post saved",
            newPost,
        })
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = postCtrl;
