const express = require('express');
const cors = require('cors');

const api = require('./api');

const app = express();
app.use(cors());

app.get('/', (req, res) => {
  res.json({
    message: 'Scraping is Fun!'
  });
})

app.get('/anime/:itemID', (req, res) => {
  api
  .MangaPosts('https://www.mangaid.co/manga/' + req.params.itemID)
  .then(data=>{
  	res.json(data);
  });
})

app.get('/read/:IDtitle/:IDposts/:IDnumber', (req, res) => {
  api
  .ReadManga('https://www.mangaid.co/manga/' + req.params.IDtitle + '/' + req.params.IDposts + '/' + req.params.IDnumber)
  .then(data=>{
  	res.json(data);
  });
})

app.get('/list', (req, res) => {
  api
  .MangaList()
  .then(list=>{
  	res.json(list);
  });
})


const port = process.env.PORT || 7101;
app.listen(port, () => {
  console.log(`Listening on ${port}`);
});