import { Actor } from "apify";
import { STATISTICS } from "./constants.js";
import type { StatisticsState } from "./types.js";
import type { CheerioCrawlingContext, ErrorHandler } from "crawlee";

await Actor.init();

class Statistics {
  public state: StatisticsState;

  constructor() {
    this.state = {
      errors: {},
      totalSaved: 0,
    };
  }

  async initialize() {
    const data: StatisticsState | null = await Actor.getValue(STATISTICS);

    if (data) {
      this.state = data;
    }

    Actor.on("persistState", async () => {
      await Actor.setValue(STATISTICS, this.state);
    });

    setInterval(() => console.log(this.state), 10000);
  }

  errorHandler: ErrorHandler<CheerioCrawlingContext<any, any>> = ({
    request: { url },
    error,
  }) => {
    this.state.errors?.[url]
      ? this.state.errors[url].push(`${error}`)
      : (this.state.errors[url] = [`${error}`]);
  };

  success() {
    this.state.totalSaved += 1;
  }
}

export const statistics = new Statistics();
