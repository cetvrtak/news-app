"use strict";

const theContainer = document.querySelector(".container");
// prettier-ignore
const categories = ["entertainment","business","health","science","sports","technology"]
let articles = [];
let innerHTML = "";

// Functions
function getNewsByCategory() {
  Promise.all(
    categories.map((category) =>
      fetch(
        `https://newsapi.org/v2/top-headlines?country=${localStorage.currentCountry}&category=${category}&apiKey=7853d16bbc1948e68ff71ffd7695bbb7`
      )
    )
  )
    .then((response) => Promise.all(response.map((res) => res.json())))
    .then((data) => {
      data.forEach((category) => articles.push(category.articles.splice(0, 5)));
      insertArticlesHTML(articles);
    })
    .catch((err) => console.error(`${err.message} 🍕`));
}
getNewsByCategory();

function insertArticlesHTML(articles) {
  articles.forEach((category) => {
    const categoryStr = categories[articles.indexOf(category)];
    innerHTML += `
      <section class="category">
        <div class="section-title">${getCategoryTitle(categoryStr)}
        </div>
        <div class="category-articles">
    `;

    displayNews(category, categoryStr);

    innerHTML += `
        </div>
      </section>
    `;
  });
}

function getCategoryTitle(category) {
  return `${category[0].toUpperCase()}${category.slice(1)}`;
}

function displayNews(category, categoryStr) {
  category.forEach((article) => {
    innerHTML += `
      <article class="article" data-category="${categoryStr}" data-id="
        ${category.indexOf(article)}">
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
    const categoryStr = e.target.closest(".article").dataset.category;
    const categoryIndex = categories.indexOf(categoryStr);
    const articleIndex = e.target.closest(".article").dataset.id;
    const article = articles[categoryIndex].at(articleIndex);
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
