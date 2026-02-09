"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = errorMiddleware;
const zod_1 = require("zod");
function errorMiddleware(err, _req, res, _next) {
    // Zod validation errors
    if (err instanceof zod_1.ZodError) {
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
//# sourceMappingURL=error.middleware.js.map