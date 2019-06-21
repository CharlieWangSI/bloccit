const flairQueries = require("../db/queries.flairs.js");

module.exports = {

  new(req, res, next){
     res.render("flairs/new", {flairId: req.params.flairId});
   },

   create(req, res, next){
     let newFlair= {
       name: req.body.name,
       color: req.body.color,
     };
     flairQueries.addFlair(newFlair, (err, flair) => {
       if(err){
         res.redirect(500, "/flairs/new");
       } else {
         res.redirect(303, `/topics/${newFlair.topicId}/posts/${newFlair.postId}/flairs/${newFlair.flairId}`);
       }
     });
   },

   show(req, res, next){
     flairQueries.getFlair(req.params.flairId, (err, post) => {
       if(err || flair == null){
         res.redirect(404, "/");
       } else {
         res.render("flairs/show", {flair});
       }
     });
   },

   destroy(req, res, next){
     flairQueries.deleteFlair(req.params.flairId, (err, deletedRecordsCount) => {
       if(err){
         console.log(err);
         res.redirect(500, `/topics/${req.params.topicId}/posts/${req.params.postId}`)
       } else {
         console.log("log success")
         res.redirect(303, `/topics/${req.params.topicId}/posts/${req.params.postId}`)
       }
     });
   },

   edit(req, res, next){
     flairQueries.getFlair(req.params.flairId, (err, flair) => {
       if(err || flair == null){
         res.redirect(404, "/");
       } else {
         res.render("flairs/edit", {flair});
       }
     });
   },

   update(req, res, next){
     flairQueries.updateFlair(req.params.flairId, req.body, (err, flair) => {
       if(err || flair == null){
         res.redirect(404, `/topics/${req.params.topicId}/posts/${req.params.postId}/flairs/${req.params.flairId}/edit`);
       } else {
         res.redirect(`/topics/${req.params.topicId}/posts/${req.params.id}/flairs/${req.params.flairId}`);
       }
     });
   }


}
