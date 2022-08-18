"use strict";

const theContainer = document.querySelector(".container");
// prettier-ignore
const categories = ["entertainment","business","health","science","sports","technology"]
let articles = [];
let searchTerm;
let innerHTML = "";

// Functions
function getNewsByCategory() {
  Promise.all(
    categories.map((category) =>
      fetch(
        `https://newsapi.org/v2/top-headlines?country=${localStorage.currentCountry}&category=${category}&apiKey=09bb02d216d242e9b6cc2590414f7769`
      )
    )
  )
    .then((response) => Promise.all(response.map((res) => res.json())))
    .then((data) => {
      insertArticlesHTML(
        data.map((category) => category.articles.splice(0, 5))
      );
    })
    .catch((err) => console.error(`${err.message} 🍕`));
}
getNewsByCategory();

function insertArticlesHTML(articles) {
  articles.forEach((category) => {
    const categoryStr = categories[articles.indexOf(category)];
    innerHTML += `
      <section class="category">
        <div class="section-title">${categoryStr[0].toUpperCase()}${categoryStr.slice(
      1
    )}</div>
        <div class="category-articles">
    `;
    displayNews(category);
    innerHTML += `
        </div>
      </section>
    `;
  });
}

function displayNews(category) {
  category.forEach((article) => {
    innerHTML += `
    <article class="article" data-category="${category}" data-id="${category.indexOf(
      article
    )}">
        <div class="article-box">
            <div class="title">${article.title}</div>
            <img class="img" src="${article.urlToImage}"/>
            <div class="desc">${article.description}</div>
        </div>
        <div class="link more">More &rarr;</div>
    </article>
  `;
  });
  theContainer.innerHTML = innerHTML;
}

function updateTitle() {
  document.querySelector(
    ".categories-title"
  ).textContent = `Top 5 news by categories from ${localStorage.currentCountry}`;
}
updateTitle();

function containerDisplayBlock() {
  theContainer.classList.add("categories-container");
}
containerDisplayBlock();

// Event Listeners
theContainer.addEventListener("click", (e) => {
  if (!e.target.classList.contains("link")) return;

  theContainer.classList.toggle("grid-one-column");
  theContainer.classList.toggle("width-1000px");

  if (e.target.classList.contains("more")) {
    const category = e.target.closest(".article").dataset.category;
    const articleIndex = e.target.closest(".article").dataset.id;
    const article = articles[category].at(articleIndex);
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
  }

  if (e.target.classList.contains("back")) {
    theContainer.innerHTML = innerHTML;
  }
});
