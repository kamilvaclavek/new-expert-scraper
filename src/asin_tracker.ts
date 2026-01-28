import { Actor } from "apify";
import { ASIN_TRACKER } from "./constants.js";

class ASINTracker {
  public state: Record<string, number>;

  constructor() {
    this.state = {};

    Actor.on("persistState", async () => {
      await Actor.setValue(ASIN_TRACKER, this.state);
    });

    setInterval(() => console.log(this.state), 10000);
  }

  async initialize() {
    this.state = (await Actor.getValue(ASIN_TRACKER)) ?? this.state;
  }

  incrementASIN(asin: string) {
    this.state[asin] === undefined
      ? (this.state[asin] = 1)
      : (this.state[asin] += 1);
  }
}

export const tracker = new ASINTracker();
