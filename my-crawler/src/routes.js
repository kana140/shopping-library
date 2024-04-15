import { createPlaywrightRouter, Dataset, playwrightUtils } from "crawlee";
import { crawler } from "./main.js";
import storeStructures from "./storeStructures.json" assert { type: "json" };
// import { SearchBar } from "../../client/src/components/SearchBar/SearchBar.js";

export const router = createPlaywrightRouter();

// router.addDefaultHandler(async ({ enqueueLinks, log }) => {
//     log.info(`enqueueing new URLs`);
//     await enqueueLinks({
//         globs: ['https://crawlee.dev/**'],
//         label: 'detail',
//     });
// });

// router.addHandler('detail', async ({ request, page, log, pushData }) => {
//     const title = await page.title();
//     log.info(`${title}`, { url: request.loadedUrl });

//     await pushData({
//         url: request.loadedUrl,
//         title,
//     });
// });

router.addDefaultHandler(({ log }) => {
  log.info("Route reached.");
});

router.addHandler(
  "H&M",
  async ({ request, page, enqueueLinks, log, infiniteScroll }) => {
    log.info(`Processing ${request.url}...`);

    // Grab the page's title and log it to the console
    const title = await page.title();
    console.log(title);

    const promise = page.goto(request.url);
    var response = await promise;

    let resp = await response.json();
    const products = resp.products;

    const scrapedData = [];
    products.forEach((product) => {
      scrapedData.push({
        title: product.title,
        href: `https://www2.hm.com${product.link}`,
        img: product.image[0].src,
        price: product.price,
      });
    }),
      await Dataset.pushData(scrapedData);
  }
);

router.addHandler(
  "UNIQLO",
  async ({ request, page, enqueueLinks, log, transformRequestFunction }) => {
    log.info(`Processing ${request.url}...`);
    console.log(request.userData.input);

    let url = request.url;
    const promise = page.goto(url);
    var response = await promise;
    let resp = await response.json();

    let total = resp.result.pagination.total;
    let offset = resp.result.pagination.offset;
    console.log(offset);
    let newOffset = offset + 36;
    console.log(newOffset);
    let count = resp.result.pagination.count + 36;
    console.log(total, newOffset, count);

    if (offset < total) {
      const products = resp.result.items;

      const scrapedData = [];
      products.forEach((product) => {
        scrapedData.push({
          title: product.name,
          href: `https://www.uniqlo.com/us/en/products/${product.productId}/00?colorDisplayCode=${product.representative.color.displayCode}&sizeDisplayCode=003`,
          img: product.images.main[product.representative.color.displayCode]
            .image,
          price: product.prices.base.value,
        });
      }),
        await Dataset.pushData(scrapedData);

      console.log(request.userData.input);
      const newLink =
        "https://www.uniqlo.com/us/api/commerce/v5/en/products?q=" +
        request.userData.input +
        "&queryRelaxationFlag=true&offset=" +
        newOffset +
        "&limit=36&httpFailure=true";
      console.log(newLink);
      await enqueueLinks({
        urls: [newLink],
        requestQueue: crawler.requestQueue,
        label: "UNIQLO",
        userData: { input: request.userData.input },
      });
    }
  }
);

// handler for ZARA
router.addHandler("ZARA", async ({ request, page, enqueueLinks, log }) => {
  log.info(`Processing ${request.url}...`);

  // Grab the page's title and log it to the console
  const title = await page.title();
  console.log(title);

  await page.waitForSelector(".product-grid-product");
  //div.fr-ec-product-tile-resize-wrapper > a
  // A function to be evaluated by Playwright within the browser context.
  const data = await page.$$eval(".product-grid-product", ($products) => {
    const scrapedData = [];
    $products.forEach(($product) => {
      scrapedData.push({
        title: $product.querySelector(".product-grid-product-info__main-info a")
          .innerText,
        href: $product
          .querySelector(".product-link product-grid-product__link link")
          .getAttribute("href"),
        img: $product
          .querySelector(".media-image__image media__wrapper--media img")
          .getAttribute("src"),
        price: $product.querySelector(".money-amount__main").innerText,
      });
    });

    return scrapedData;
  });
  await Dataset.pushData(data);
});

// router.addHandler("ZARA", async ({ request, page, enqueueLinks, log }) => {
//   log.info(`Processing ${request.url}...`);
//   console.log(request.userData.input);

//   let url = request.url;
//   const promise = page.goto(url);
//   var response = await promise;
//   let resp = await response.json();

//   let total = resp.totalResults;
//   // let offset = resp.result.pagination.offset;
//   // console.log(offset);
//   // let newOffset = offset + 36;
//   // console.log(newOffset);
//   console.log(total);

//   const products = resp.results;

//   const scrapedData = [];
//   products.forEach((product) => {
//     scrapedData.push({
//       title: product.content.name.toLowerCase(),
//       href: `https://www.zara.com/us/en/box-pleat-mini-shirtdress-p03152313.html`,
//       img: `https://static.zara.net/photos///${product.content.xmedia[0].path}/w/354/${product.content.xmedia[0].name}.jpg?ts=${product.content.xmedia[0].timestamp}`,
//       price: product.content.price,
//     });
//   }),
//     await Dataset.pushData(scrapedData);

//   if (offset === undefined) offset = 72;
//   else offset = offset + 36;
//   const newLink =
//     "https://www.zara.com/itxrest/1/search/store/11719/query?query=" +
//     request.userData.input +
//     "&locale=en_US&session=8bdc5a59-b9bd-4872-8704-cc4be5084307&deviceType=desktop&deviceOS=Android&deviceOSVersion=6.0&catalogue=24056&warehouse=15053&section=WOMAN&offset=" +
//     offset +
//     "&limit=36&scope=default&origin=default&filter=searchSection%3AWOMAN&cursor=AAAAJA&ajax=true";
//   console.log(newLink);

//   if (results.isLastPage) {
//     const newLink = "";
//     await enqueueLinks({
//       urls: [newLink],
//       requestQueue: crawler.requestQueue,
//       label: "ZARA",
//       userData: { input: request.userData.input, offset: offset },
//     });
//   }
// });

//handler for pull and bear
router.addHandler(
  "PULLANDBEAR",
  async ({ request, page, enqueueLinks, log }) => {
    log.info(`Processing ${request.url}...`);

    // Grab the page's title and log it to the console
    const title = await page.title();
    console.log(title);

    await page.waitForSelector(".search-product");
    //div.fr-ec-product-tile-resize-wrapper > a
    // A function to be evaluated by Playwright within the browser context.
    const data = await page.$$eval(".search-product", ($products) => {
      const scrapedData = [];
      $products.forEach(($product) => {
        scrapedData.push({
          title: $product.querySelector(".product-name").innerText,
          href: $product.getAttribute("href"),
          img: $product.querySelector("#image img").getAttribute("src"),
          price: $product.querySelector(".current-price span").innerText,
        });
      });

      return scrapedData;
    });
    await Dataset.pushData(data);
  }
);

router.addHandler("BERSHKA", async ({ request, page, enqueueLinks, log }) => {
  log.info(`Processing ${request.url}...`);
  await handleStoreRequest("BERHSKA", page);
});

router.addHandler("MANGO", async ({ request, page, enqueueLinks, log }) => {
  log.info(`Processing ${request.url}...`);
  await handleStoreRequest("MANGO", page);
});

router.addHandler("ASOS", async ({ request, page, enqueueLinks, log }) => {
  log.info(`Processing ${request.url}...`);
  await handleStoreRequest("ASOS", page);
});

router.addHandler(
  "STRADIVARIUS",
  async ({ request, page, enqueueLinks, log }) => {
    log.info(`Processing ${request.url}...`);
    const title = await page.title();
    console.log(title);

    const promise = page.goto(request.url);
    var response = await promise;

    let resp = await response.json();
    const products = resp.catalog.content;

    const scrapedData = [];
    products.forEach((product) => {
      scrapedData.push({
        title: product.name,
        href: `https://www.stradivarius.com/us/${product.url}?colorId=${product.color.id}`,
        img: product.imagePreviewUrl,
        price: product.prices.current.priceRange.minPrice,
      });
    }),
      await Dataset.pushData(scrapedData);
  }
);

async function handleStoreRequest(store, page) {
  const storeElement = storeStructures.find((element) => {
    if (element.name === store) return element;
  });

  const title = await page.title();
  console.log(title);

  const productSelector = storeElement.productSelector;

  await page.waitForSelector(productSelector);
  // A function to be evaluated by Playwright within the browser context.
  const data = await page.$$eval(
    productSelector,
    ($products, storeElement) => {
      const scrapedData = [];
      $products.forEach(($product) => {
        console.log(storeElement);
        scrapedData.push({
          title: $product.querySelector(storeElement.titleSelector).innerText,
          href: $product
            .querySelector(storeElement.linkSelector)
            .getAttribute("href"),
          img: $product
            .querySelector(storeElement.imageSelector)
            .getAttribute("src"),
          price: $product.querySelector(storeElement.priceSelector).innerText,
        });
      });

      return scrapedData;
    },
    storeElement
  );
  await Dataset.pushData(data);
}
