const express = require("express");
const router = express.Router();

const advsController = require("../controllers/advsController")

router.get("/advs", advsController.index);
router.get("/advs/new", advsController.new);
router.post("/advs/create", advsController.create);
router.get("/advs/:id", advsController.show);
router.post("/advs/:id/destroy", advsController.destroy);
router.get("/advs/:id/edit", advsController.edit);
router.post("/advs/:id/update", advsController.update);

module.exports = router;
