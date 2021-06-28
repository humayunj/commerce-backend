import AppError from "./AppError";

export default class DocumentNotFound extends AppError {
  constructor(docId: string) {
    super(`Document ${docId} not found`, "DocumentNotFound", { docId: docId },404);
  }
}
