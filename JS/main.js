
const api_key = "898c520d92754382ae13cdc6b1f8749d";
const api_URL = "https://newsapi.org/v2/everything?q=";

const news_container = document.getElementById("news_container");


async function renderHeadlines(){
    try{
        const headlineURL = `https://newsapi.org/v2/top-headlines?country=us&pageSize=13&apiKey=${api_key}`;
        const response = await fetch(headlineURL);
        const info = await response.json();
        return info.articles;
    }
    catch(error){
        console.error("Error rendering news", error);
        return [];
    }
}

function displayNews(articles){
    news_container.innerHTML = "";
    articles.forEach((article) => {
        const newsCard = document.createElement("div");
        newsCard.classList.add("news_card");
        const img = document.createElement("img");
        img.src = article.urlToImage;

        newsCard.appendChild(img);
        news_container.appendChild(newsCard);
    });
   
}

(async () => {
    try{
        const articles = await renderHeadlines();
        displayNews(articles);
    }
    catch(error){
        console.error("Error rendering news", error);
    }
})();