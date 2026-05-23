const API_KEY = "1b3ae7be28508fddb3813b232a0603d0";

const BASE_URL = "https://api.themoviedb.org/3";

const movieList = document.getElementById("movie-list");

const message = document.getElementById("message");

const searchInput = document.getElementById("search");

const btnSearch = document.getElementById("btnSearch");


async function fetchMovies(query = ""){

    try{

        showMessage("Carregando filmes...");

        let url = "";

        if(query === ""){
            url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=pt-BR`;
        }

        else{
            url = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=pt-BR&query=${query}`;
        }

        const response = await fetch(url);

        const data = await response.json();

        showMessage("");

        return data.results;

    }

    catch(error){

        showMessage("Erro ao carregar filmes.");

        console.log(error);

        return [];

    }

}


function createMovieCard(movie){

    const card = document.createElement("div");

    card.classList.add("movie-card");


    const poster = document.createElement("img");

    if(movie.poster_path){
        poster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    }

    else{
        poster.src = "https://via.placeholder.com/500x750?text=Sem+Imagem";
    }


    const title = document.createElement("h2");

    title.textContent = movie.title;


    const year = document.createElement("p");

    if(movie.release_date){
        year.textContent = `Ano: ${movie.release_date.slice(0,4)}`;
    }

    else{
        year.textContent = "Ano não informado";
    }


    const rating = document.createElement("p");

    rating.textContent = `Nota: ${movie.vote_average}`;


    const overview = document.createElement("p");

    if(movie.overview){
        overview.textContent = movie.overview.slice(0,120) + "...";
    }

    else{
        overview.textContent = "Sem descrição.";
    }


    card.appendChild(poster);

    card.appendChild(title);

    card.appendChild(year);

    card.appendChild(rating);

    card.appendChild(overview);


    return card;

}


function renderMovies(movies){

    movieList.innerHTML = "";

    if(movies.length === 0){

        showMessage("Nenhum filme encontrado.");

        return;

    }

    movies.forEach(movie => {

        const card = createMovieCard(movie);

        movieList.appendChild(card);

    });

}


function showMessage(text){

    message.textContent = text;

}


async function init(){

    const movies = await fetchMovies();

    renderMovies(movies);

}


btnSearch.addEventListener("click", async () => {

    const query = searchInput.value;

    const movies = await fetchMovies(query);

    renderMovies(movies);

});


init();