import { CheerioCrawler } from "crawlee";
import { Actor } from "apify";
import { router } from "./router/index.js";
import { labels } from "./constants.js";

await Actor.init();

const crawler = new CheerioCrawler({
  requestHandler: router,
});

await crawler.run([
  {
    url: "https://warehouse-theme-metal.myshopify.com/collections/sales",
    label: labels.START,
  },
]);

await Actor.exit();
