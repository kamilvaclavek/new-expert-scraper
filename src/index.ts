import { CheerioCrawler } from "crawlee";
import { Actor } from "apify";
import { router } from "./router/index.js";
import { labels } from "./constants.js";
import { tracker } from "./asin_tracker.js";

await Actor.init();
await tracker.initialize();

const crawler = new CheerioCrawler({
  requestHandler: router,
});

await crawler.run([
  {
    url: "https://warehouse-theme-metal.myshopify.com/collections/sales",
    label: labels.START,
  },
]);

console.log("ASIN tracker state: \n");
console.log(tracker.state);

await Actor.exit();
