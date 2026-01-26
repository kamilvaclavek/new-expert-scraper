import { createCheerioRouter } from "crawlee";
import { labels } from "../constants.js";

/* HANDLER IMPORTS */
import { productHandler } from "./product.js";
import { startHandler } from "./start.js";

const r = createCheerioRouter();

r.addHandler(labels.START, startHandler);

r.addHandler(labels.PRODUCT, productHandler);

export const router = r;
