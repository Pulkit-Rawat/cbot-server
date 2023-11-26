const { getPromptRes } = require("../modules/chatapi");

const promptQuery = async (req, res) => {
  console.log(req.body);
  let { agent, message } = req.body;
  try {
    if (agent?.toLowerCase() == "user") {
      let promptRes = await getPromptRes(message);
      return res.status(200).json({
        message: promptRes,
        error: "",
        status: true,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { promptQuery };
