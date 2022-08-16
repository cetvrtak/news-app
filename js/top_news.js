"use strict";

const theContainer = document.querySelector(".container");
let articles, curArticles, searchTerm;

// Functions
function getNews() {
  fetch(
    `https://newsapi.org/v2/top-headlines?country=${localStorage.currentCountry}&apiKey=09bb02d216d242e9b6cc2590414f7769`
  )
    .then((res) => res.json())
    .then((data) => {
      articles = data.articles;
      displayNews(articles);
    })
    .catch((err) => console.error(`${err.message} 🍕`));
}
getNews();

function displayNews(articles) {
  curArticles = articles;

  let html = "";
  for (const article of articles) {
    html += `
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

  theContainer.innerHTML = html;
}

// Event Listeners
theContainer.addEventListener("click", (e) => {
  if (!e.target.classList.contains("link")) return;

  theContainer.classList.toggle("grid-one-column");
  const articleIndex = e.target.closest(".article").dataset.id;
  const article = curArticles.at(articleIndex);
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
    displayNews(curArticles);
  }
});
