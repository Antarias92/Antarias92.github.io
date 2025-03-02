
const api_key = "dMC2OFEnh9THjWRT1OjjpLm0klaKAlCW";

const gif_container = document.getElementById("gif_container");
const search_input = document.getElementById("search_Input");
const search_button = document.getElementById("search_button");


async function getQuery(query){
    try{
        console.log("Getting your query");
        const gifURL = `https://api.giphy.com/v1/gifs/search?api_key=${api_key}&q=${query}&limit=36`;
        const response = await fetch(gifURL);
        const info = await response.json();
        const gifResults = info.data.filter(
            (data) => data.images.original.url
        );
        console.log("Here are your results");
        return gifResults;
    }
    catch(error){
        console.error("Error rendering gifs", error);
        return [];
    }
}


function displayGifs(gifResults){
    gif_container.innerHTML = "";
    gifResults.forEach((data) => {
        const gifCard = document.createElement("div");
        gifCard.classList.add("gif_card");
        const img = document.createElement("img");
        img.src = data.images.original.url;

        gifCard.appendChild(img);
        gifCard.addEventListener("click", () => {            /*Allows user to click search results*/
            window.open(data.images.original.url, "_blank");
          });
        gif_container.appendChild(gifCard);
    });
   
}

search_button.addEventListener("click", async () => {
    const query = search_input.value.trim();
    if(query !== ""){
        try{
            const gifResults = await getQuery(query);
            displayGifs(gifResults);
        }
        catch(error){
            console.log("Search not found", error);
        }
    }
});
