const fetch = require('node-fetch')
const cheerio = require('cheerio')

const movieCache = {};
const ReadCache = {};
function MangaList(){
	return fetch('https://www.mangaid.co/')
	.then(res=>res.text())
	.then(body=>{
		const list = [];
		const $ = cheerio.load(body,
		{
			normalizeWhitespace: true,
    		xmlMode: true
		});
		$('h3.manga-heading.pull-left').each(function(index, data){
			const $data = $(data);
			const $multi = $data.find('a');
			const result = {
				title : $multi.text(),
				url : $multi.attr('href').replace('https://www.mangaid.co/manga/','http://localhost:3000/anime/')
			};
			list.push(result);
		});
		return list;
	});
}

function MangaPosts(title){

	 if(movieCache[title]) {
	    console.log('Serving from cache:', title);
	    return Promise.resolve(movieCache[title]);
  		}

	// return fetch(`${item}`)
	return fetch(title)
	.then(res=>res.text())
	.then(body=>{
		const $ = cheerio.load(body,
		{
			normalizeWhitespace:true,
			xmlMode:true
		})
		const items = [];
		$('h5.chapter-title-rtl').each(function(index, data){
			const $data = $(data);
			const $multi = $data.find(' a ')
			const dataItem = {
				title : $multi.text(),
				url : $multi.attr('href')
			}
			items.push(dataItem);
		})
		movieCache[title] = items;
		console.log(title)
		return items;
		// console.log(result)
	})
}

function ReadManga(item){

	 if(ReadCache[item]) {
	    console.log('Serving from cache:', item);
	    return Promise.resolve(ReadCache[item]);
  		}

	return fetch('https://www.mangaid.co/manga/dungeon-seeker/1/1')
	.then(res=>res.text())
	.then(result => {
		const $ = cheerio.load(result);
		// console.log($.text())
		const listImage = [];
		$('img.img-responsive').each(function(index, data){
			const $data = $(data);
			const $rs	= $data.attr('src');
			const hasil = {
				url:$rs
			}
			listImage.push(hasil);
		})
		ReadCache[item]=listImage;
		return listImage;
	})
}

// MangaItem();


module.exports = {
	MangaList,
	MangaPosts,
	ReadManga
}