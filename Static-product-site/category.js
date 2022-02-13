/* const url = "https://kea-alt-del.dk/t7/api/products?limit=30";

fetch(url)
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    handleProductList(data);
  });

function handleProductList(data) {
  data.forEach(showProduct);
} */

const categoriesURL = "https://kea-alt-del.dk/t7/api/categories";
const seasonsURL = "https://kea-alt-del.dk/t7/api/seasons";

// FETCH CATEGORIES
fetch(categoriesURL)
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    handleCategories(data);
  });

function handleCategories(data) {
  data.forEach(showCategories);
}

// FETCH SEASONS
fetch(seasonsURL)
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    handleSeasons(data);
  });

function handleSeasons(data) {
  data.forEach(showSeasons);
}

// SHOW CATEGORIES
function showCategories(product) {
  const template = document.querySelector("#categories-template").content;
  const copy = template.cloneNode(true);
  // change content
  copy.querySelector("a").textContent = `${product.category}`;
  copy
    .querySelector("a")
    .setAttribute("href", `productlist.html?category=${product.category}`);
  //   select parent & append
  const parent = document.querySelector("#categories");
  parent.appendChild(copy);
}

// SHOW SEASONS
function showSeasons(product) {
  const template = document.querySelector("#seasons-template").content;
  const copy = template.cloneNode(true);
  // change content
  copy.querySelector("a").textContent = `${product.season}`;
  copy
    .querySelector("a")
    .setAttribute("href", `productlist.html?season=${product.season}`);
  //   select parent & append
  const parent = document.querySelector("#seasons");
  parent.appendChild(copy);
}

/* function showProduct(product) {
  // select the template
  const template = document.querySelector("#productTemplate").content;
  // clone it
  const copy = template.cloneNode(true);
  // change content
  copy.querySelector(
    ".product-tags"
  ).textContent = `${product.brandname} | ${product.articletype}`;
  copy.querySelector(
    ".product-name"
  ).textContent = `${product.productdisplayname}`;

  // select parent
  const parent = document.querySelector("main");
  // append it
  parent.appendChild(copy);
} */
