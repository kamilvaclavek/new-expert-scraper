import { labels, selectors } from "../constants.js";
import type { Handler } from "../types.js";

export const startHandler: Handler = async ({ enqueueLinks }) => {
  await enqueueLinks({
    selector: selectors.START_PRODUCTS,
    label: labels.PRODUCT,
  });
};
