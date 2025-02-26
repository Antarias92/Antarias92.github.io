
const api_key = "898c520d92754382ae13cdc6b1f8749d";
const api_URL = "https://newsapi.org/v2/everything?q=";

const news_container = document.getElementById("news_container");
const search_input = document.getElementById("search_Input");
const search_button = document.getElementById("search_button");


async function renderHeadlines(){
    try{
        console.log("Loading top headlines...");
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


async function getQuery(query){
    try{
        console.log("Getting your query");
        const headlineURL = `https://newsapi.org/v2/everything?q=${query}&pageSize=13&apiKey=${api_key}`;
        const response = await fetch(headlineURL);
        const info = await response.json();
        const newsArticles = info.articles.filter(
            (article) => article.urlToImage
        );
        return newsArticles;
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
        img.alt = article.title;
        const title = document.createElement("h3");
        title.textContent = article.title;

        newsCard.appendChild(img);
        newsCard.appendChild(title);
        news_container.appendChild(newsCard);
    });
   
}

search_button.addEventListener("click", async () => {
    const query = search_input.value.trim();
    if(query !== ""){
        try{
            const articles = await getQuery(query);
            displayNews(articles);
        }
        catch(error){
            console.log("Search not found", error);
        }
    }
});

(async () => {
    try{
        const articles = await renderHeadlines();
        displayNews(articles);
    }
    catch(error){
        console.error("Error rendering news", error);
    }
})();