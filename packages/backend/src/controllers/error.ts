import type { RequestHandler } from "express";

const error: RequestHandler = (_req, res) => {
  res.status(404).json({ error: "Not Found" });
};

export default error;
