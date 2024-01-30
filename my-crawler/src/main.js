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

async function runCrawlee(searchInput, label, urlPrefix) {
  await runCrawler(crawler, searchInput, label, urlPrefix);
  console.log("runcrawler function finished");
}

// Run the crawler and wait for it to finish.
async function runCrawler(crawler, searchInput, label, urlPrefix) {
  return new Promise(async (resolve, reject) => {
    log.info("Starting the crawl.");
    log.info(searchInput);
    log.info(`${urlPrefix}${searchInput}`);
    await crawler.run([
      {
        url: `${urlPrefix}${searchInput}`,
        label: label,
      },
    ]);

    //https://www.uniqlo.com/us/en/search?q=shorts&path=22210%2C%2C%2C (path = women)

    // const dataset = await Dataset.open();

    // await KeyValueStore.setValue("OUTPUT", (await dataset.getData()).items);
    await Dataset.exportToJSON("results");
    resolve();
    console.log("exported to csv");

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
