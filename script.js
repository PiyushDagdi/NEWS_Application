const API_KEY = "0a5f8a15884c4292b43b2901b57fee54";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load',() => fetchNews("India"));

async function fetchNews(query){
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    // console.log(data);
    bindData(data.articles);
}

function bindData(articles){
    const cardContainer = document.getElementById('card-container');
    const cardTemplate = document.getElementById('card-template');

    cardContainer.innerHTML ='';
    articles.forEach((article)=>{
        if(!article.urlToImage) return;
        const cardClone = cardTemplate.content.cloneNode(true);
        fillData(cardClone,article);
        cardContainer.appendChild(cardClone);
    })
}

function fillData(cardClone,article){
    const cardImg = cardClone.querySelector('#card-img');
    const cardTitle = cardClone.querySelector('#card-title');
    const cardSource = cardClone.querySelector('#card-source');
    const cardDesc = cardClone.querySelector('#card-desc');

    cardImg.src = article.urlToImage;
    cardTitle.innerHTML =  article.title;
    cardDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toDateString();
    cardSource.innerHTML = `${article.source.name} . ${date}`;

    cardClone.firstElementChild.addEventListener('click',()=>{
        window.open(article.url,"_blank");
    })
}

let curSelectedNav = null;
function onnavItemClick(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = navItem;
    curSelectedNav.classList.add('active'); 
}

const textSearch = document.getElementById('search-text');
const searchButton = document.getElementById('search-button');

searchButton.addEventListener('click',()=>{
    const query = textSearch.value;
    if(!query) return;
    fetchNews(query);
    
    curSelectedNav?.classList.remove('active');
    curSelectedNav = null;
})
