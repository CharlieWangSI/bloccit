const flairQueries = require("../db/queries.flairs.js");
const Post = require("../db/models").Post;

module.exports = {

  new(req, res, next){
    Post.findOne({where: {id: req.params.postId}}).then((post)=>{
      res.render("flairs/new", {post});
    })

   },

   create(req, res, next){
     let newFlair= {
       name: req.body.name,
       color: req.body.color,
       postId:req.params.postId
     };
     flairQueries.addFlair(newFlair, (err, flair) => {
       if(err){
         console.log(err);
         res.redirect(500, "/flairs/new");
       } else {
         res.redirect(303, `/topics/${req.params.topicId}/posts/${newFlair.postId}/`);
       }
     });
   },

   show(req, res, next){
     flairQueries.getFlair(req.params.id, (err, flair) => {
       if(err || flair == null){
         console.log(err);
         res.redirect(404, "/");
       } else {
         Post.findOne({where: {id: req.params.postId}}).then((post)=>{
           res.render("flairs/show", {flair,post});
         });
       }
     });
   },

   destroy(req, res, next){
     flairQueries.deleteFlair(req.params.id, (err, deletedRecordsCount) => {
       if(err){
         console.log(err);
         res.redirect(500, `/topics/${req.params.topicId}/posts/${req.params.postId}/flairs/${req.params.id}`)
       } else {
         console.log("log success")
         res.redirect(303, `/topics/${req.params.topicId}/posts/${req.params.postId}`)
       }
     });
   },

   edit(req, res, next){
     flairQueries.getFlair(req.params.id, (err, flair) => {
       if(err || flair == null){
         res.redirect(404, "/");
       } else {
         Post.findOne({where: {id: req.params.postId}}).then((post)=>{
           res.render("flairs/edit", {flair,post});
         });
       }
     });
   },

   update(req, res, next){
     flairQueries.updateFlair(req.params.id, req.body, (err, flair) => {
       if(err || flair == null){
         res.redirect(404, `/topics/${req.params.topicId}/posts/${req.params.postId}/flairs/${req.params.id}/edit`);
       } else {
         res.redirect(`/topics/${req.params.topicId}/posts/${req.params.id}/flairs/${req.params.id}`);
       }
     });
   }


}
