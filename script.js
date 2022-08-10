"use strict";

const news = fetch(
  "https://newsapi.org/v2/top-headlines?country=us&apiKey=6c2ff6e809814e3b8a68b1b18b887ddc"
);
news
  .then((res) => res.json())
  .then((data) => {
    const articles = data.articles;
    for (const article of articles) {
      const html = `
        <article class="article">
            <div class="article-box">
                <h2 class="title">${article.title}</h2>
                <img class="img" src="${article.urlToImage}"/>
                <div class="desc">${article.description}</div>
            </div>
            <a href="${article.url}" class="more">More &rarr;</a>
        </article>
      `;
      document
        .querySelector(".container")
        .insertAdjacentHTML("beforeend", html);
    }
  })
  .catch((err) => console.error(err.message));
