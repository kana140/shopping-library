import { createPlaywrightRouter, Dataset, playwrightUtils } from "crawlee";
import { crawler } from "./main.js";

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

router.addHandler("H&M", async ({ request, page, enqueueLinks, log }) => {
  log.info(`Processing ${request.url}...`);

  // Grab the page's title and log it to the console
  const title = await page.title();
  console.log(title);

  // A function to be evaluated by Playwright within the browser context.
  const data = await page.$$eval(".product-item", ($products) => {
    //   const scrapedData: { title: string, rank: string, href: string }[] = [];
    const scrapedData = [];

    const currentProductsLength = $products.length;
    console.log(currentProductsLength);
    $products.forEach(($product) => {
      scrapedData.push({
        title: $product.querySelector(".item-heading a").innerText,
        href: $product.querySelector(".item-heading a").href,
        img: $product.querySelector(".image-container img").getAttribute("src"),
        price: $product.querySelector(".item-price span").innerText,
      });
    });

    return scrapedData;
  });

  // Store the results to the default dataset.
  await Dataset.pushData(data);

  // Wait for the "Load More" button to appear before attempting to enqueue links
  await page.waitForSelector("button.js-load-more");

  // Find a link to the next page and enqueue it if it exists.
  const infos = await playwrightUtils.enqueueLinksByClickingElements({
    page,
    requestQueue: crawler.requestQueue,
    selector: "button.js-load-more",
  });

  if (infos.processedRequests.length === 0)
    log.info(`${request.url} is the last page!`);
});

router.addHandler("UNIQLO", async ({ request, page, enqueueLinks, log }) => {
  log.info(`Processing ${request.url}...`);

  // Grab the page's title and log it to the console
  const title = await page.title();
  console.log(title);

  await page.waitForSelector("a .fr-product-card");
  // A function to be evaluated by Playwright within the browser context.
  const data = await page.$$eval("a.fr-product-card", ($products) => {
    //   const scrapedData: { title: string, rank: string, href: string }[] = [];
    const scrapedData = [];
    console.log("blob");
    // const currentProductsLength = $products.length;
    // console.log(currentProductsLength);
    $products.forEach(($product) => {
      console.log(
        $product.querySelector(".description.fr-no-uppercase h2").innerText
      );
      console.log("yay");
      // scrapedData.push({
      //   title: $product.querySelector(".description fr-no-uppercase p")
      //     .innerText,
      //   href: $product.querySelector(". a").href,
      //   img: $product.querySelector(".thumb-image img").getAttribute("src"),
      //   price: $product.querySelector(".price fr-no-uppercase span")
      //     .innerText,
      // });
    });

    return scrapedData;
  });

  // Store the results to the default dataset.
  await Dataset.pushData(data);

  // Wait for the "Load More" button to appear before attempting to enqueue links
  // await page.waitForSelector("button.js-load-more");

  // const infos = await playwrightUtils.enqueueLinksByClickingElements({
  //   page,
  //   requestQueue: crawler.requestQueue,
  //   selector: "button.js-load-more",
  // });

  // if (infos.processedRequests.length === 0)
  //   log.info(`${request.url} is the last page!`);
});

// This function is called if the page processing failed more than maxRequestRetries+1 times.
//   failedRequestHandler({ request, log }) {
//     log.info(`Request ${request.url} failed too many times.`);
//   },
