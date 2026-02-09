"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = __importDefault(require("../db/prisma"));
const router = (0, express_1.Router)();
// GET /reps
router.get("/", async (_req, res, next) => {
    try {
        const reps = await prisma_1.default.rep.findMany({
            orderBy: { createdAt: "asc" },
        });
        res.json(reps);
    }
    catch (e) {
        next(e);
    }
});
// GET /reps/:id
router.get("/:id", async (req, res, next) => {
    try {
        const rep = await prisma_1.default.rep.findUnique({
            where: { id: req.params.id },
        });
        if (!rep)
            return res.status(404).json({ error: "NotFound" });
        res.json(rep);
    }
    catch (e) {
        next(e);
    }
});
exports.default = router;
//# sourceMappingURL=reps.routes.js.map