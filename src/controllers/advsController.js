const advsQueries = require("../db/queries.advs.js");

module.exports = {
  index(req, res, next){
    adsQueries.getAllAdvs((err, advs) => {

//#3
        if(err){
          res.redirect(500, "static/index");
        } else {
          res.render("advs/index", {Advs});
        }
      })
  },

  new(req, res, next){
      res.render("advs/new");
  },

  create(req, res, next){
     let newAdvs = {
       title: req.body.title,
       description: req.body.description
     };
     advsQueries.addAdvs(newAdvs, (err, advs) => {
       if(err){
         res.redirect(500, "/advs/new");
       } else {
         res.redirect(303, `/advs/${advs.id}`);
       }
     });
   },

   show(req, res, next){

//#1
     advsQueries.getAdvs(req.params.id, (err, advs) => {

//#2
       if(err || Advs == null){
         res.redirect(404, "/");
       } else {
         res.render("advs/show", {advs});
       }
     });
   },

   destroy(req, res, next){
     advsQueries.deleteAdvs(req.params.id, (err, advs) => {
       if(err){
         res.redirect(500, `/advs/${advs.id}`)
       } else {
         res.redirect(303, "/advs")
       }
     });
   },

   edit(req, res, next){
     advsQueries.getAdvs(req.params.id, (err, advs) => {
       if(err || advs == null){
         res.redirect(404, "/");
       } else {
         res.render("advs/edit", {advs});
       }
     });
   },

   update(req, res, next){

//#1
     advsQueries.updateAdvs(req.params.id, req.body, (err,advs) => {

//#2
       if(err || advs == null){
         res.redirect(404, `/advs/${req.params.id}/edit`);
       } else {
         res.redirect(`/advs/${advs.id}`);
       }
     });
   }
