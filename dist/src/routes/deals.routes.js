"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const zod_1 = require("zod");
const prisma_1 = __importDefault(require("../db/prisma"));
const deal_validator_1 = require("../validators/deal.validator");
const router = (0, express_1.Router)();
/**
 * Query params validation
 * GET /deals?stage=&owner=&accountId=
 */
const dealQuerySchema = zod_1.z.object({
    stage: zod_1.z.enum(["LEAD", "QUALIFIED", "PROPOSAL", "WON", "LOST"]).optional(),
    owner: zod_1.z.string().min(1).optional(),
    accountId: zod_1.z.string().uuid().optional(),
});
// GET /deals (con filtri)
router.get("/", async (req, res, next) => {
    try {
        const { stage, owner, accountId } = dealQuerySchema.parse(req.query);
        const deals = await prisma_1.default.deal.findMany({
            where: {
                ...(stage && { stage }),
                ...(owner && { owner }),
                ...(accountId && { accountId }),
            },
            orderBy: { createdAt: "desc" },
            include: { account: true },
        });
        res.json(deals);
    }
    catch (e) {
        next(e);
    }
});
// GET /deals/:id
router.get("/:id", async (req, res, next) => {
    try {
        const deal = await prisma_1.default.deal.findUnique({
            where: { id: req.params.id },
            include: { account: true },
        });
        if (!deal) {
            return res.status(404).json({ error: "NotFound" });
        }
        res.json(deal);
    }
    catch (e) {
        next(e);
    }
});
// POST /deals
router.post("/", async (req, res, next) => {
    try {
        const data = deal_validator_1.dealCreateSchema.parse(req.body);
        const created = await prisma_1.default.deal.create({
            data,
        });
        res.status(201).json(created);
    }
    catch (e) {
        next(e);
    }
});
// PUT /deals/:id
router.put("/:id", async (req, res, next) => {
    try {
        const data = deal_validator_1.dealUpdateSchema.parse(req.body);
        const updated = await prisma_1.default.deal.update({
            where: { id: req.params.id },
            data,
        });
        res.json(updated);
    }
    catch (e) {
        if ((e === null || e === void 0 ? void 0 : e.code) === "P2025") {
            return res.status(404).json({ error: "NotFound" });
        }
        next(e);
    }
});
// DELETE /deals/:id
router.delete("/:id", async (req, res, next) => {
    try {
        await prisma_1.default.deal.delete({
            where: { id: req.params.id },
        });
        res.status(204).send();
    }
    catch (e) {
        if ((e === null || e === void 0 ? void 0 : e.code) === "P2025") {
            return res.status(404).json({ error: "NotFound" });
        }
        next(e);
    }
});
exports.default = router;
//# sourceMappingURL=deals.routes.js.map