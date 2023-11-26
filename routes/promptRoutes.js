const { Router } = require("express");
const { promptQuery } = require("../controller/promptController");

const router = Router();

router.post("/prompt", promptQuery);

module.exports = router;
