/* const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

const url = "https://kea-alt-del.dk/t7/api/products/" + id; */

const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get("category");
const season = urlParams.get("season");

const categoriesURL =
  "https://kea-alt-del.dk/t7/api/products?category=" + category;
fetch(categoriesURL)
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    handleProductList(data);
  });

function handleProductList(data) {
  data.forEach(showProduct);
}

const seasonsURL = "https://kea-alt-del.dk/t7/api/products?season=" + season;
fetch(seasonsURL)
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    handleProductList(data);
  });

function handleProductList(data) {
  data.forEach(showProduct);
}

function showProduct(product) {
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
  // sold out / on sale
  if (product.soldout) {
    copy.querySelector("article").classList.add("soldOut");
    copy.querySelector(".soldout-label").textContent = "Sold Out";
  }
  if (product.discount) {
    copy.querySelector("article").classList.add("onSale");
    copy.querySelector(".discount-label").textContent = `-${product.discount}%`;
  }
  //   price & discount
  if (product.discount) {
    copy.querySelector(".product-price").textContent = `DKK ${Math.floor(
      product.price - product.price * (product.discount / 100)
    )} ,-`;
  }
  // images
  copy.querySelector(
    "img"
  ).src = `https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp`;
  // links
  copy.querySelector("a").setAttribute("href", `product.html?id=${product.id}`);
  // select parent
  const parent = document.querySelector("#product-list");
  // append it
  parent.appendChild(copy);
}

/* <template id="productTemplate">
        <article class="product">
          <img src="images/product-placeholder.jpg" alt="Product name" />
          <div class="discount-label">-40%</div>
          <div class="soldout-label">Sold Out</div>
          <h3>Men's Longsleeve - Yellow</h3>
          <p class="product-tags">Brand Name | T-shirts</p>
          <p>100% cotton, comfortable longsleeve with chest print.</p>
          <p class="product-price">DKK 250,-</p>
          <a href="product.html">View Product</a>
        </article>
      </template> */
