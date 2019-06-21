const Post = require("./models").Post;
const Topic = require("./models").Topic;

module.exports = {
  addPost(newPost, callback){
      return Post.create(newPost)
      .then((post) => {
        callback(null, post);
      })
      .catch((err) => {
        callback(err);
      })

    },

  getPost(id, callback){
      return Post.findById(id, {

//#3
      include: [{
        model: Flair,
        as: "flair"
      }]
    })
      .then((post) => {
        callback(null, post);
      })
      .catch((err) => {
        callback(err);
      })
    },

  deletePost(id, callback){
    console.log("deleting post");
    console.log(id);
       return Post.destroy({
          where: { id }
        })
        .then((deletedRecordsCount) => {
          console.log("deletePost")
         callback(null, deletedRecordsCount);
        })
        .catch((err) => {
          console.log("err");
         callback(err);
        })
  },

  updatePost(id, updatedPost, callback){
     return Post.findById(id)
     .then((post) => {
       if(!post){
         return callback("Post not found");
       }

       post.update(updatedPost, {
         fields: Object.keys(updatedPost)
       })
       .then(() => {
         callback(null, post);
       })
       .catch((err) => {
         callback(err);
       });
     });
   }




}
