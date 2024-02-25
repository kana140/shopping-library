import { createPlaywrightRouter, Dataset, playwrightUtils } from "crawlee";
import { crawler } from "./main.js";
import storeStructures from "./storeStructures.json" assert { type: "json" };

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

//handler for uniqlo - non api handler
// router.addHandler("UNIQLO", async ({ request, page, enqueueLinks, log }) => {
//   log.info(`Processing ${request.url}...`);

//   // Grab the page's title and log it to the console
//   const title = await page.title();
//   console.log(title);

//   await page.waitForSelector(
//     ".fr-ec-layout .fr-ec-filter-layout-page-content .fr-ec-product-collection .fr-ec-product-tile-resize-wrapper .fr-ec-product-tile"
//   );
//   //div.fr-ec-product-tile-resize-wrapper > a
//   // A function to be evaluated by Playwright within the browser context.
//   const data = await page.$$eval(
//     ".fr-ec-layout .fr-ec-filter-layout-page-content .fr-ec-product-collection .fr-ec-product-tile-resize-wrapper .fr-ec-product-tile",
//     ($products) => {
//       const scrapedData = [];
//       $products.forEach(($product) => {
//         scrapedData.push({
//           title: $product.querySelector(".fr-ec-product-tile__end-product-name")
//             .innerText,
//           href: $product.getAttribute("href"),
//           img: $product.querySelector(".fr-ec-image img").getAttribute("src"),
//           price: $product.querySelector(".fr-ec-price-text").innerText,
//         });
//       });

//       return scrapedData;
//     }
//   );

// Store the results to the default dataset.
// await Dataset.pushData(data);

// Wait for the "Load More" button to appear before attempting to enqueue links
// await page.waitForSelector("button.js-load-more");

// const infos = await playwrightUtils.enqueueLinksByClickingElements({
//   page,
//   requestQueue: crawler.requestQueue,
//   selector: "button.js-load-more",
// });

// if (infos.processedRequests.length === 0)
//   log.info(`${request.url} is the last page!`);
// });

// This function is called if the page processing failed more than maxRequestRetries+1 times.
//   failedRequestHandler({ request, log }) {
//     log.info(`Request ${request.url} failed too many times.`);
//   },

router.addHandler(
  "UNIQLO",
  async ({ request, page, enqueueLinks, log, transformRequestFunction }) => {
    log.info(`Processing ${request.url}...`);
    const title = await page.title();
    console.log(title);

    let url = request.url;
    const promise = page.goto(url);
    var response = await promise;
    let resp = await response.json();

    let total = resp.result.pagination.total;
    let newOffset = resp.result.pagination.offset + 1;
    console.log(newOffset);
    let count = resp.result.pagination.count;
    console.log(total, newOffset, count);

    if (count < total) {
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

      await enqueueLinks({
        transformRequestFunction: (request, newOffset) => {
          log.info(newOffset);
          request.payload.offset = newOffset;
          // request.keepUrlFragment = true;
          log.info(request, "is the new request");
          return request;
        },
        requestQueue: crawler.requestQueue,
        label: "UNIQLO",
      });
    }
  }
);

//handler for ZARA
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
        href: $product.querySelector(".product-link a").getAttribute("href"),
        img: $product.querySelector(".media img").getAttribute("src"),
        price: $product.querySelector(".money-amount__main").innerText,
      });
    });

    return scrapedData;
  });
  await Dataset.pushData(data);
});

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
          price: $product.querySelector(".current-price").innerText,
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
