const Post = require("./models").Post;
const Topic = require("./models").Topic;
const Flair = require("./models").Flair;

module.exports = {
  addFlair(newFlair, callback){
      return Flair.create(newFlair)
      .then((flair) => {
        callback(null, flair);
      })
      .catch((err) => {
        callback(err);
      })

    },

  getFlair(name, callback){
      return Post.findByName(name, {

//#3
      include: [{
        model: Flair,
        as: "flair"
      }]
    })
      .then((flair) => {
        callback(null, flair);
      })
      .catch((err) => {
        callback(err);
      })
    },

  deleteFlair(name, callback){
    console.log("deleting Flair");
    console.log(name);
       return Flair.destroy({
          where: { name }
        })
        .then((deletedRecordsCount) => {
          console.log("deleteFlair")
         callback(null, deletedRecordsCount);
        })
        .catch((err) => {
          console.log("err");
         callback(err);
        })
  },

  updateFlair(name, updatedFlair, callback){
     return Flair.findByName(name)
     .then((flair) => {
       if(!flair){
         return callback("Flair not found");
       }

       flair.update(updatedFlair, {
         fields: Object.keys(updatedFlair)
       })
       .then(() => {
         callback(null, flair);
       })
       .catch((err) => {
         callback(err);
       });
     });
   }




}
