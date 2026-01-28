import { Actor } from "apify";
import { labels } from "./constants.js";
import { CheerioCrawler } from "crawlee";
import { tracker } from "./asin_tracker.js";
import { crawlerConfiguration } from "./crawler_configuration.js";
import { statistics } from "./statistics.js";

await Actor.init();
await tracker.initialize();

const crawler = new CheerioCrawler(crawlerConfiguration);

await crawler.run([
  {
    url: "https://warehouse-theme-metal.myshopify.com/collections/sales",
    label: labels.START,
  },
]);

console.log("ASIN tracker final state: \n");
console.log(tracker.state);
console.log("\n\nStatistics final state: \n");
console.log(statistics.state);

await Actor.exit();
