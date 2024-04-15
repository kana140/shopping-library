// let runCrawleeModule = await import("../my-crawler/src/main.js");
// let runCrawlee = runCrawleeModule.runCrawlee;
// // import { runCrawlee } from "../my-crawler/src/main";
// const express = require("express");
// const axios = require("axios");
// const app = express();
// const cors = require("cors");
// // let runCrawlee = import("../my-crawler/src/main.js");
// // let runCrawlee = import("../my-crawler/src/main.js");

// const PORT = 3001;

// app.use(cors());
// app.use(express.json());

// app.get("/", function (req, res) {
//   res.send({ name: "Jane Doe" });
// });

// app.post("/get");

// // Endpoint to serve the content ??
// app.post("/search-results", async (req, res) => {
//   console.log("getting search results");
//   const requestBody = req.body;
//   console.log(requestBody.input);

//   try {
//     // Use axios to fetch HTML content

//     // Run Crawlee from the other project
//     // const data = await runCrawlee(requestBody.input);
//     console.log(typeof runCrawlee);
//     await runCrawlee(requestBody.input);
//     // console.log("data", data);

//     // Handle the scraped data
//     // res.json({ success: true, data });
//     res.json({ success: true });
//   } catch (error) {
//     // Handle web scraping error
//     console.log(error);
//     res.status(500).json({ success: false, error: error.message });
//   }
// });

// app.listen(PORT, () => {
//   console.log("app listening on port 3000");
// });

// //have separate function to return data of search that has already been executed will be on api or backend side?

// Import the module without using await
import("../my-crawler/src/main.js")
  .then((runCrawleeModule) => {
    // Extract the runCrawlee function from the module
    let runCrawlee = runCrawleeModule.runCrawlee;

    // Start your server setup inside the promise
    const express = require("express");
    const axios = require("axios");
    const app = express();
    const cors = require("cors");

    const PORT = 3001;

    app.use(cors());
    app.use(express.json());

    app.get("/", function (req, res) {
      res.send({ name: "Jane Doe" });
    });

    app.post("/get");

    // Endpoint to serve the content ??
    app.post("/search-results", async (req, res) => {
      // if (requestBody.label === "STRADIVARIUS") {
      //   handleStradivarusData(requestBody.input);
      //   res.json({ success: true, data });
      // }
      console.log("getting search results");

      const requestBody = req.body;
      console.log(requestBody.input);
      const urlPrefix = await getURLPrefix(requestBody.label);
      console.log(urlPrefix);
      var link = urlPrefix[0] + requestBody.input;
      if (urlPrefix[1] != undefined)
        link = urlPrefix[0] + requestBody.input + urlPrefix[1];
      console.log(link);

      try {
        // Use axios to fetch HTML content

        // Run Crawlee from the other project
        await runCrawlee(link, requestBody.label, requestBody.input);

        console.log("getting data");
        const data = await getData();
        console.log("data", data);

        // Handle the scraped data
        res.json({ success: true, data });
      } catch (error) {
        // Handle web scraping error
        console.log(error);
        res.status(500).json({ success: false, error: error.message });
      }
    });

    app.listen(PORT, () => {
      console.log("app listening on port ", PORT);
    });
  })
  .catch((err) => {
    console.error("Error loading module: ", err);
  });

async function getData() {
  const fs = require("fs").promises;
  const join = require("path").join;
  console.log("entered getData function");
  const publicDir = join(__dirname, "/storage/key_value_stores/default");
  console.log(publicDir);
  const productsFile = join(publicDir, "results.json");
  const productData = await fs.readFile(productsFile, "utf-8");
  const products = JSON.parse(productData);
  return products;
}

async function getURLPrefix(store) {
  const fs = require("fs").promises;
  const join = require("path").join;
  console.log("creating url prefix for", store);
  const storesFile = join(__dirname, "/StoreDetails.json");
  console.log(storesFile);
  const storesData = await fs.readFile(storesFile, "utf-8");
  const storesJSON = JSON.parse(storesData);
  const storeElement = storesJSON.find((element) => {
    if (element.name === store) return element;
  });
  if (typeof storeElement.extra === "undefined") return [storeElement.link];
  return [storeElement.link, storeElement.extra];

  //will need to add link where it chooses the correct location based on user input
}
