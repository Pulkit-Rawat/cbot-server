const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.openai_key,
});

const getPromptRes = async (content) => {
  console.log("promptcalled");
  try {
    const params = {
      messages: [{ role: "user", content: content || "introduce" }],
      model: "gpt-3.5-turbo",
    };
    const chatCompletion = await openai.chat.completions.create(params);

    console.log(
      "res from chat>>>>>>",
      chatCompletion.choices[0].message.content
    );
    return chatCompletion.choices[0].message.content;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getPromptRes };
