export default class AppError extends Error {
  meta = {};
  statusCode = 500;
  constructor(
    message: string,
    name = "ServerError",
    meta = {},
    statusCode = 500
  ) {
    super(message);
    this.meta = meta;
    this.name = name;
    this.statusCode = statusCode;
  }
  toString(): string {
    return `${this.name} ${this.statusCode} : ${
      this.message
    } -Meta: ${JSON.stringify(this.meta)}`;
  }
}
