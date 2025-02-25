const api_key = "898c520d92754382ae13cdc6b1f8749d";
const api_URL = "https://newsapi.org/v2/everything?q=";

const news_container = document.getElementById("news_container");

async function renderRandomNews(){
    try{
        const headlineURL = `https://newsapi.org/v2/top-headlines?country=us&category=business&pageSize=12&apiKey=${api_key}`;
        const response = await fetch(headlineURL);
        const info = await response.json();
        console.log(info);
    }
    catch(errror){
        console.error("Error rendering news", error);
        return [];
    }
}