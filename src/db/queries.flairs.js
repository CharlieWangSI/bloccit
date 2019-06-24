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

  getFlair(id, callback){

      return Flair.findOne({where:{id:parseInt(id)}

    })
      .then((flair) => {
        callback(null, flair);
      })
      .catch((err) => {
        callback(err);
      })
    },

  deleteFlair(id, callback){
    console.log("deleting Flair");
       return Flair.destroy({
          where: { id }
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

  updateFlair(id, updatedFlair, callback){
     return Flair.findOne({where:{id}})
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
