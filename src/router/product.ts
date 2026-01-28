import type { Cheerio, Element } from "crawlee";
import type { Handler, PriceRange } from "../types.js";
import { selectors } from "../constants.js";
import { tracker } from "../asin_tracker.js";

function parseVariant($option: Cheerio<Element>) {
  const sku = $option.attr("data-sku") ?? "";
  const rawOptionText = $option.text().trim();
  const variantName = rawOptionText.split(" - ")[0] ?? "";
  const priceText = rawOptionText.split(" - ")[1] ?? "";
  const price = parseInt(
    priceText.replace("$", "").replace(".", "").replace(",", ""),
  );
  return { sku, variantName, price };
}

export const productHandler: Handler = ({ $, request, pushData, log }) => {
  log.info(`Product detail page: ${request.url}`);

  const sku = $(selectors.PRODUCT_SKU).text().trim();
  const $productForm = $(selectors.PRODUCT_FORM);
  const productId = $productForm.attr("id")?.split("_main")[1] ?? "";
  const $price = $(selectors.PRODUCT_PRICE).contents().last();
  const priceRange: PriceRange = { minPrice: null, price: null };
  const priceText = $price
    .text()
    .trim()
    .replace("$", "")
    .replace(".", "")
    .replace(",", "");

  if (priceText.startsWith("From ")) {
    priceRange.minPrice = parseInt(priceText.replace("From ", ""));
  } else {
    priceRange.minPrice = parseInt(priceText);
    priceRange.price = priceRange.minPrice;
  }

  const item = {
    url: request.url,
    title: $(selectors.PRODUCT_TITLE).text().trim(),
    vendor: $(selectors.PRODUCT_VENDOR).text().trim(),
    ...priceRange,
    variantName: null,
    sku,
    productId,
  };

  const $variants = $(selectors.PRODUCT_VARIANTS);
  if ($variants.length === 0) {
    log.info("Saving a product");
    tracker.incrementASIN(productId);
    pushData(item);
  } else {
    for (const element of $variants.toArray()) {
      const variant = parseVariant($(element) as Cheerio<Element>);
      log.info("Saving a product variant");
      tracker.incrementASIN(productId);
      pushData({ ...item, ...variant });
    }
  }
};
