import { createCheerioRouter } from "crawlee";
import { labels } from "../constants.js";

/* HANDLER IMPORTS */
import { productHandler } from "./product.js";
import { startHandler } from "./start.js";

const router = createCheerioRouter();

router.addHandler(labels.START, startHandler);

router.addHandler(labels.PRODUCT, productHandler);

export { router };
