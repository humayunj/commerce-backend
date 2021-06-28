import express from "express";

/**
 * Class extending {APIResponder} agree to send respond only via {sendResponse} method or
 * throwing error through next
 */
export default abstract class APIResponder {
  sendResponse = (res: express.Response, data: any, status = 200): void => {
    res.status(status).send({
      status: "ok",
      statusCode: status,
      data: data,
    });
  };
}
