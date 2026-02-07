import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

export function errorMiddleware(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  // Zod validation errors
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: "ValidationError",
      details: err.issues.map((issues) => ({
        path: issues.path,
        message: issues.message
      }))
    });
  }

  // Generic errors
  if (err instanceof Error) {
    return res.status(500).json({
      error: "ServerError",
      message: err.message
    });
  }

  return res.status(500).json({ error: "UnknownError" });
}
