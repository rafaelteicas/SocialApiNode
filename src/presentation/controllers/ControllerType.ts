export interface Controller {
  handle: (request: HttpRequest) => Promise<HttpResponse>
}

export interface HttpRequest {
  body?: any
  params?: any
}

export interface HttpResponse {
  body?: any
  statusCode: number
}
