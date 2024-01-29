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
      console.log("getting search results");
      const requestBody = req.body;
      console.log(requestBody.input);

      try {
        // Use axios to fetch HTML content

        // Run Crawlee from the other project
        await runCrawlee(requestBody.input);

        // Handle the scraped data
        res.json({ success: true });
      } catch (error) {
        // Handle web scraping error
        console.log(error);
        res.status(500).json({ success: false, error: error.message });
      }
    });

    app.listen(PORT, () => {
      console.log("app listening on port 3000");
    });
  })
  .catch((err) => {
    console.error("Error loading module: ", err);
  });
