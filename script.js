"use strict";

const theContainer = document.querySelector(".container");
const searchEl = document.querySelector(".search-input");
let articles, indexHTML, searchTerm;

// Functions
function getNews(news) {
  fetch(news)
    .then((res) => res.json())
    .then((data) => {
      articles = data.articles;
      indexHTML = `
      <header class="search-box">
        <div class="search-title">Search top news from US by term:</div>
        <input class="search-input" type="text" placeholder="Search term..." />
      </header>
    `;

      for (const article of articles) {
        indexHTML += `
        <article class="article" data-id="${articles.indexOf(article)}">
            <div class="article-box">
                <div class="title">${article.title}</div>
                <img class="img" src="${article.urlToImage}"/>
                <div class="desc">${article.description}</div>
            </div>
            <div class="link more">More &rarr;</div>
        </article>
      `;
      }

      theContainer.innerHTML = indexHTML;
    })
    .catch((err) => console.error(`${err.message} 🍕`));
}
getNews(
  "https://newsapi.org/v2/top-headlines?country=us&apiKey=6c2ff6e809814e3b8a68b1b18b887ddc"
);

function performSearch(target) {
  let filter, lastFilter;

  filter = target.value;
  if (filter == lastFilter) return;

  if (filter.length < 3) return; // only search 3 or more characters in searchTerm

  getNews(
    `https://newsapi.org/v2/top-headlines?q=${target.value}&apiKey=6c2ff6e809814e3b8a68b1b18b887ddc`
  );

  lastFilter = filter;
}

// Event Listeners
theContainer.addEventListener("click", (e) => {
  if (!e.target.classList.contains("link")) return;

  theContainer.classList.add("grid-one-column");
  const articleIndex = e.target.closest(".article").dataset.id;
  const article = articles.at(articleIndex);
  const html = `
    <article class="article standalone__article">
      <div class="article-box standalone__article-box">
        <div class="title standalone__title">${article.title}</div>
        <div class="article-content">
          <img class="img standalone__img" src="${article.urlToImage}" />
          <div class="desc standalone__desc">${article.description}</div>
        </div>
      </div>
      <div class="link back">&larr; Back to list</div>
    </article>
  `;
  theContainer.innerHTML = html;

  if (e.target.classList.contains("back")) {
    theContainer.classList.remove("grid-one-column");
    theContainer.innerHTML = indexHTML;
  }
});

let timeout;
theContainer.addEventListener("keyup", (e) => {
  if (!e.target.classList.contains("search-input")) return;

  if (timeout) clearTimeout(timeout);
  timeout = setTimeout(function () {
    performSearch(e.target);
  }, 500);
});
