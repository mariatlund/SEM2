const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

const url = "https://kea-alt-del.dk/t7/api/products/" + id;

// fetch the data
fetch(url)
  .then((res) => res.json())
  .then((data) => showProduct(data));
// populate the page

function showProduct(product) {
  console.log(product);
  // select the template
  const template = document.querySelector("#productTemplate").content;
  // clone it
  const copy = template.cloneNode(true);
  // change content

  copy.querySelector(".product-name").textContent = product.productdisplayname;
  copy.querySelector(".product-information").innerHTML = product.description;
  copy.querySelector(
    "img"
  ).src = `https://kea-alt-del.dk/t7/images/webp/1000/${product.id}.webp`;
  copy.querySelector("img").alt = product.productdisplayname;
  copy.querySelector(
    ".product-tags"
  ).textContent = `${product.brandname} | ${product.articletype}`;

  // sold out / on sale
  if (product.soldout) {
    copy.querySelector(".purchase-box").classList.add("soldOut");
    copy.querySelector(".soldout-label").textContent = "Sold Out";
  }
  if (product.discount) {
    copy.querySelector(".purchase-box").classList.add("onSale");
    copy.querySelector(".discount-label").textContent = `-${product.discount}%`;
  }

  // price & discount
  if (product.discount) {
    copy.querySelector(".product-price").textContent = `DKK ${Math.floor(
      product.price - product.price * (product.discount / 100)
    )} ,-`;
  }

  // select parent
  const parent = document.querySelector("main");
  // append it
  parent.appendChild(copy);
}
