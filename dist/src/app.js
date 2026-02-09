"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const accounts_routes_1 = __importDefault(require("./routes/accounts.routes"));
const reps_routes_1 = __importDefault(require("./routes/reps.routes"));
const deals_routes_1 = __importDefault(require("./routes/deals.routes"));
const error_middleware_1 = require("./middleware/error.middleware");
const app = (0, express_1.default)();
// middleware base
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// health check
app.get("/health", (_req, res) => {
    res.json({ ok: true });
});
// routes
app.use("/deals", deals_routes_1.default);
app.use("/accounts", accounts_routes_1.default);
app.use("/reps", reps_routes_1.default);
// error middleware (SEMPRE per ultimo)
app.use(error_middleware_1.errorMiddleware);
exports.default = app;
//# sourceMappingURL=app.js.map