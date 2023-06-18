const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const port = 8020;

const {Configuration , OpenAIApi } = require('openai');

const config = new Configuration({
    apiKey: "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",
})

const openAi = new OpenAIApi(config);

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.options("/chat", cors());

app.post("/chat", async (req,res) => {
    const {prompt} = req.body;
    const resultData = await openAi.createCompletion({
        model: "text-davinci-003",
        max_tokens: 512,
        temperature : 0,
        prompt: prompt
    });
    console.log(resultData.data.choices[0].text);
    res.status(200).send(resultData.data.choices[0].text);
});

app.listen(port , () => {
    console.log(`Server is listening on port ${port}`);
});