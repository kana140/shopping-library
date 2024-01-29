import {
  Dataset,
  KeyValueStore,
  PlaywrightCrawler,
  playwrightUtils,
  log,
} from "crawlee";
import { router } from "./routes.js";

const crawler = new PlaywrightCrawler({
  requestHandler: router,
});

async function runCrawlee(searchInput) {
  await runCrawler(crawler, searchInput);
}

// Run the crawler and wait for it to finish.
async function runCrawler(crawler, searchInput) {
  return new Promise(async (resolve, reject) => {
    log.info("Starting the crawl.");
    log.info(searchInput);
    await crawler.run([
      {
        url: "https://www2.hm.com/en_us/search-results.html?q=bike%20shorts",
        label: "H&M",
      },
    ]);

    // const dataset = await Dataset.open();

    // await KeyValueStore.setValue("OUTPUT", (await dataset.getData()).items);

    console.log("Crawler finished.");
  });
}

export { runCrawlee, crawler };

// log.info("Starting the crawl.");

// await crawler.run([
//   {
//     url: "https://www2.hm.com/en_us/search-results.html?q=bike%20shorts",
//     label: "H&M",
//   },
// ]);

// // const dataset = await Dataset.open();

// // await KeyValueStore.setValue("OUTPUT", (await dataset.getData()).items);

// console.log("Crawler finished.");

// // make this so each time user click shop filter, it is added to crawlers RequestQueue
// // await crawler.addRequests([
// //   "https://www2.hm.com/en_us/search-results.html?q=black%20dress",
// // ]);

// export { crawler };
