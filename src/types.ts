import type {
  CheerioCrawlingContext,
  Request,
  Awaitable,
  LoadedRequest,
} from "crawlee";

export type PriceRange = { minPrice: null | number; price: null | number };

export type Handler = (
  ctx: Omit<CheerioCrawlingContext<any, any>, "request"> & {
    request: LoadedRequest<Request<any>>;
  },
) => Awaitable<void>;

export type StatisticsState = {
  errors: Record<string, string[]>;
  totalSaved: number;
};
