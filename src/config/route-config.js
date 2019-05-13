module.exports = {
  init(app){
    const staticRoutes = require("../routes/static");
    const topicRoutes = require("../routes/topics");
    const advsRoutes = require("../routes/advs");
    app.use(staticRoutes);
    app.use(topicRoutes);
    app.use(advsRoutes);
  }
}
