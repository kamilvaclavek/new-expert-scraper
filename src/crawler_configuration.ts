import { Actor } from "apify";
import { router } from "./router/index.js";
import type {
  CheerioCrawlerOptions,
  CrawlingContext,
  ErrorHandler,
} from "crawlee";
import { statistics } from "./statistics.js";

await Actor.init();

const proxy = await Actor.createProxyConfiguration({
  groups: ["RESIDENTIAL"],
  countryCode: "US",
});

if (!proxy) {
  throw new Error("Couldn't configure the proxy");
}

export const crawlerConfiguration: CheerioCrawlerOptions = {
  requestHandler: router,
  maxConcurrency: 50,
  proxyConfiguration: proxy,
  sessionPoolOptions: {
    sessionOptions: {
      maxUsageCount: 5,
      maxErrorScore: 1,
    },
  },
  errorHandler: statistics.errorHandler,
};
