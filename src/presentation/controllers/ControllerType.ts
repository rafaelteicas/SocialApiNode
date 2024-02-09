export interface Controller {
  handle: (request: HttpRequest) => Promise<HttpResponse>
}

export interface HttpRequest<BodyType = any, ParamsType = any> {
  body?: BodyType
  params?: ParamsType
}

export interface HttpResponse<BodyType = any> {
  body?: BodyType
  statusCode: number
}
