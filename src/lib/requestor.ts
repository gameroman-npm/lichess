import type * as z from "minizod";
import { ndjsonStream } from "./ndjson";

type QueryParams = Record<
  string,
  string | number | boolean | string[] | number[] | null | undefined
>;

type RequestHandlerParams<TQueryParams extends QueryParams, TBody> = {
  path: string;
  baseUrl?: string;
  query?: TQueryParams;
  body?: TBody;
};

type RequestMethod = "GET" | "POST" | "HEAD" | "PUT" | "DELETE";

function addQueryParams(url: URL, params: Record<string, unknown>): void {
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    if (Array.isArray(value)) {
      url.searchParams.set(key, value.join(","));
      return;
    }

    url.searchParams.set(key, String(value));
  });
}

type ResponseFormat =
  | { kind: "json"; schema: z.ZodMiniType }
  | { kind: "ndjson"; schema: z.ZodMiniType }
  | { kind: "chess-pgn" }
  | { kind: "nocontent" }
  | { kind: "mixed" };

type RequestConfig = Record<number, ResponseFormat>;

type InferResponse<T extends RequestConfig> = {
  [Status in keyof T]: T[Status] extends { kind: "json"; schema: infer S }
    ? { status: Status; response: Response; data: z.infer<S> }
    : T[Status] extends { kind: "ndjson"; schema: infer S }
      ? {
          status: Status;
          response: Response;
          stream: AsyncGenerator<z.infer<S>>;
        }
      : T[Status] extends { kind: "chess-pgn" }
        ? { status: Status; response: Response }
        : T[Status] extends { kind: "mixed" }
          ? { status: Status; response: Response }
          : { status: Status; response: Response };
}[keyof T];

export class Requestor {
  readonly #headers: { readonly Authorization: `Bearer ${string}` } | undefined;
  readonly #baseUrl: string;

  constructor({ token, baseUrl }: { token: string | null; baseUrl: string }) {
    this.#headers = token
      ? ({ Authorization: `Bearer ${token}` } as const)
      : undefined;
    this.#baseUrl = baseUrl;
  }

  #makeRequest<
    TReequestMethod extends RequestMethod,
    TQueryParams extends QueryParams,
    TBody,
  >({
    method,
    path,
    baseUrl,
    query,
    body,
  }: {
    method: TReequestMethod;
    path: string;
    baseUrl?: string;
    query?: TQueryParams;
    body?: TBody;
  }) {
    const url = new URL(path, baseUrl ?? this.#baseUrl);
    if (query) {
      addQueryParams(url, query);
    }
    const request = new Request(url, {
      method,
      headers: this.#headers,
      body: JSON.stringify(body),
    });
    return request;
  }

  async #handleRequest<T extends RequestConfig>(
    request: Request,
    config: T,
  ): Promise<InferResponse<T>> {
    const response = await fetch(request);
    const status = response.status;
    const handler = config[status];
    if (!handler) {
      throw new Error(`Unexpected status code: ${status}`);
    }
    if (handler.kind === "json") {
      const json = await response.clone().json();
      const data = handler.schema.parse(json);
      return { response, status, data } as InferResponse<T>;
    }
    if (handler.kind === "ndjson") {
      const stream = ndjsonStream({ response, schema: handler.schema });
      return { response, status, stream } as InferResponse<T>;
    }
    return { response, status } as InferResponse<T>;
  }

  async get<T extends RequestConfig, TQueryParams extends QueryParams>(
    params: RequestHandlerParams<TQueryParams, never>,
    config: T,
  ): Promise<InferResponse<T>> {
    const request = this.#makeRequest({ method: "GET", ...params });
    return this.#handleRequest(request, config);
  }

  async post<T extends RequestConfig, TQueryParams extends QueryParams, TBody>(
    params: RequestHandlerParams<TQueryParams, TBody>,
    config: T,
  ): Promise<InferResponse<T>> {
    const request = this.#makeRequest({ method: "POST", ...params });
    return this.#handleRequest(request, config);
  }

  async head<T extends RequestConfig, TQueryParams extends QueryParams>(
    params: RequestHandlerParams<TQueryParams, never>,
    config: T,
  ): Promise<InferResponse<T>> {
    const request = this.#makeRequest({ method: "HEAD", ...params });
    return this.#handleRequest(request, config);
  }

  async delete<T extends RequestConfig, TQueryParams extends QueryParams>(
    params: RequestHandlerParams<TQueryParams, never>,
    config: T,
  ): Promise<InferResponse<T>> {
    const request = this.#makeRequest({ method: "DELETE", ...params });
    return this.#handleRequest(request, config);
  }

  async put<T extends RequestConfig, TQueryParams extends QueryParams, TBody>(
    params: RequestHandlerParams<TQueryParams, TBody>,
    config: T,
  ): Promise<InferResponse<T>> {
    const request = this.#makeRequest({ method: "PUT", ...params });
    return this.#handleRequest(request, config);
  }
}
