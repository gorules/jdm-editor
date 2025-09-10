declare class HttpResponse {
  readonly data: any;
  readonly headers: Record<string, string>;
  readonly status: number;
}

interface HttpConfig {
  headers?: Record<string, string | number | boolean>;
  params?: Record<string, string | number | boolean>;
  data?: any;
  auth?: HttpIamAuth;
}

type HttpIamAuth = { type: 'iam' } & (
  | { provider: 'aws'; service: string; region?: string }
  | { provider: 'gcp'; service: string }
  | { provider: 'azure' }
);

class Http {
  head(url: string, config?: HttpConfig): Promise<HttpResponse>;

  get(url: string, config?: HttpConfig): Promise<HttpResponse>;

  delete(url: string, config?: HttpConfig): Promise<HttpResponse>;

  post(url: string, data: any, config?: HttpConfig): Promise<HttpResponse>;

  patch(url: string, data: any, config?: HttpConfig): Promise<HttpResponse>;

  put(url: string, data: any, config?: HttpConfig): Promise<HttpResponse>;
}

export interface HttpStatic extends Http {}

declare const http: HttpStatic;
export default http;
