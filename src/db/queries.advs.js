const Advs = require("./models").Advs;

module.exports = {

//#1
  getAllAdvs(callback){
    return Advs.all()

//#2
    .then((Advs) => {
      callback(null, Advs);
    })
    .catch((err) => {
      callback(err);
    })
  },

  getAdvs(id, callback){
     return Advs.findById(id)
     .then((Advs) => {
       callback(null, Advs);
     })
     .catch((err) => {
       callback(err);
     })
   },

  addAds(newAdvs, callback){
      return Advs.create({
        title: newAdvs.title,
        description: newAdvs.description
      })
      .then((advs) => {
        callback(null, advs);
      })
      .catch((err) => {
        callback(err);
      })
    },

    deleteAdvs(id, callback){
    return Advs.destroy({
      where: {id}
    })
    .then((advs) => {
      callback(null, advs);
    })
    .catch((err) => {
      callback(err);
    })
  },

  updateAdvs(id, updatedAdvs, callback){
     return Advs.findById(id)
     .then((advs) => {
       if(!advs){
         return callback("Ads not found");
       }

//#1
       Advs.update(updatedAdvs, {
         fields: Object.keys(updatedAdvs)
       })
       .then(() => {
         callback(null, advs);
       })
       .catch((err) => {
         callback(err);
       });
     });
   }
}
