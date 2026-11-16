/**
 * API 클라이언트 (세 사람 공용)
 *
 * 서버 주소는 코드에 직접 쓰지 않고 .env.local 에 넣는다.
 *   NEXT_PUBLIC_API_BASE_URL=https://(백엔드 주소)/api/v1
 *
 * 사용 예)
 *   import { api, storePath } from "@/lib/api";
 *
 *   const home = await api.get<HomeResponse>(storePath("/home"));
 *   const items = await api.get<Item[]>(storePath("/items"));
 *   await api.post(storePath("/items"), { ...입력값 });
 *   await api.patch(`/stores/${STORE_ID}`, { ...바꿀 값 });
 *   const geo = await api.get("/geo/search", { query: { ...검색 조건 } });
 *   (필드 이름은 Swagger 기준으로 맞출 것)
 *
 * 참고: 데모 서버(Render 무료)는 15분 동안 요청이 없으면 잠들어서 첫 요청이 30~60초 걸린다.
 */

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

/** 데모 가게 ID (한빛베이커리, 서교동) */
export const STORE_ID = 1;

/** '/home' → '/stores/1/home' */
export const storePath = (path: string) => `/stores/${STORE_ID}${path}`;

/** API가 실패했을 때 던지는 에러. status로 404/400 등을 구분할 수 있음 */
export class ApiError extends Error {
  constructor(
    public status: number,
    public body: unknown,
  ) {
    super(`API ${status} 에러`);
    this.name = "ApiError";
  }
}

type Query = Record<string, string | number | boolean | undefined | null>;

type RequestOptions = {
  /** URL 뒤에 붙는 ?a=1&b=2 */
  query?: Query;
  /** JSON 객체 또는 파일 업로드용 FormData */
  body?: unknown;
  signal?: AbortSignal;
};

function buildUrl(path: string, query?: Query) {
  if (!API_BASE_URL) {
    console.warn("[api] NEXT_PUBLIC_API_BASE_URL 이 비어 있어요. .env.local 을 확인하세요.");
  }
  const url = new URL(API_BASE_URL + path);
  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined && value !== null) url.searchParams.set(key, String(value));
    }
  }
  return url.toString();
}

async function request<T>(method: string, path: string, options: RequestOptions = {}): Promise<T> {
  const { query, body, signal } = options;
  const isFormData = typeof FormData !== "undefined" && body instanceof FormData;

  const res = await fetch(buildUrl(path, query), {
    method,
    signal,
    headers: body === undefined || isFormData ? undefined : { "Content-Type": "application/json" },
    body: body === undefined ? undefined : isFormData ? (body as FormData) : JSON.stringify(body),
  });

  const text = await res.text();
  let data: unknown = undefined;
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }
  }

  if (!res.ok) throw new ApiError(res.status, data);
  return data as T;
}

export const api = {
  get: <T>(path: string, options?: Omit<RequestOptions, "body">) => request<T>("GET", path, options),
  post: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>("POST", path, { ...options, body }),
  put: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>("PUT", path, { ...options, body }),
  patch: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>("PATCH", path, { ...options, body }),
  delete: <T>(path: string, options?: RequestOptions) => request<T>("DELETE", path, options),
};
