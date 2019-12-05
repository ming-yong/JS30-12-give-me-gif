const express = require("express"); //use express
const fetch = require("node-fetch"); //fetch in server code
require("dotenv").config();//env
const app = express();
app.use(express.static("public")); //generate web pages from folder public
const port = process.env.PORT || 3000;
const giphyKey = process.env.GIPHY_KEY;
const wordnikKey = process.env.WORDNIK_KEY;
const giphyAPI = `https://api.giphy.com/v1/gifs/search?api_key=${giphyKey}`;
const wordnikAPI = `http://api.wordnik.com/v4/words.json/randomWord?api_key=${wordnikKey}`;

app.listen(port, () => console.log(`listening at ${port}`));

app.get("/giveMeGif", async(request,response)=>{
  let result;
  try {
    console.log("Getting a GIF for ya!");
    const response_wordnik = await fetch(wordnikAPI);
    const json_wordnik = await response_wordnik.json();
    const response_giphy = await fetch(giphyAPI + json_wordnik.word);
    const json_giphy = await response_giphy.json();
    result = {
      word: json_wordnik.word,
      url: json_giphy.data[0].images.downsized.url,
      alt: json_giphy.data[0].title
    };
  } catch (error) {
    console.error(error);
    result = {
      word: "N/A",
      url: "https://media.giphy.com/media/9Y5BbDSkSTiY8/giphy.gif",
      alt: "sad baby"
    };
  }
  response.json(result);
})