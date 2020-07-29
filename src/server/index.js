require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const path = require("path");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", express.static(path.join(__dirname, "../public")));

const roverType ={
    curiosity: `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2020-07-01&api_key=${process.env.API_KEY}`,
    spirit: `https://api.nasa.gov/mars-photos/api/v1/rovers/spirit/photos?earth_date=2004-6-3&api_key=${process.env.API_KEY}`,
    opportunity:  `https://api.nasa.gov/mars-photos/api/v1/rovers/opportunity/photos?earth_date=2004-6-3&api_key=${process.env.API_KEY}`
}

// your API calls

// example API call
app.get("/apod", async (req, res) => {
  try {
    let image = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}`
    ).then((res) => res.json());
    res.send({ image });
  } catch (err) {
    console.log("error:", err);
  }
});

app.post("/rover", async (req, res) => {
 let param = req.body.url
 const url = roverType[param]
  try { 

    let data = await fetch(
    url
    ).then((res) => res.json());
    res.send({ data });
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
