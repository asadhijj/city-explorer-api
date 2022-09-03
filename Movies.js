const axios = require('axios');
let myMemory ={};

async function getMovies(req,res) {
    const searchQuery = req.query.searchQuery;

    if (myMemory[searchQuery] == ! undefined) {
        res.status(200).send(myMemory[searchQuery])
    }
    else {
        const URL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY_MOVIES}&query=${searchQuery}&page=1`;
  
        axios.get(URL).then( result => {
            let sendData = result.data.results.map( file => {
                return new Movies(file);
            })
            myMemory[searchQuery] = sendData
            return res.status(200).send(sendData);
        }).catch(error => {
            return res.status(404).send(error)
        })
    }

  }
  
class Movies {
    constructor(item){
        this.title = item.title;
        this.overview = item.overview;
        this.vote_average = item.vote_average;
        this.vote_count = item.vote_count;
        this.poster_path = "https://image.tmdb.org/t/p/w500/" + item.poster_path;
        this.popularity = item.popularity;
        this.release_date = item.release_date;
        
    }
}




module.exports= getMovies;