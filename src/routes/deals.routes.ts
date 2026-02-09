import { Router } from "express";
import { z } from "zod";
import prisma from "../db/prisma";
import { dealCreateSchema, dealUpdateSchema } from "../validators/deal.validator";

const router = Router();

/**
 * Query params validation
 * GET /deals?stage=&owner=&accountId=
 */
const dealQuerySchema = z.object({
  stage: z.enum(["LEAD", "QUALIFIED", "PROPOSAL", "WON", "LOST"]).optional(),
  owner: z.string().min(1).optional(),
  accountId: z.string().uuid().optional(),
});

// GET /deals (con filtri)
router.get("/", async (req, res, next) => {
  try {
    const { stage, owner, accountId } = dealQuerySchema.parse(req.query);

    const deals = await prisma.deal.findMany({
      where: {
        ...(stage && { stage }),
        ...(owner && { owner }),
        ...(accountId && { accountId }),
      },
      orderBy: { createdAt: "desc" },
      include: { account: true },
    });

    res.json(deals);
  } catch (e) {
    next(e);
  }
});

// GET /deals/:id
router.get("/:id", async (req, res, next) => {
  try {
    const deal = await prisma.deal.findUnique({
      where: { id: req.params.id },
      include: { account: true },
    });

    if (!deal) {
      return res.status(404).json({ error: "NotFound" });
    }

    res.json(deal);
  } catch (e) {
    next(e);
  }
});

// POST /deals
router.post("/", async (req, res, next) => {
  try {
    const data = dealCreateSchema.parse(req.body);

    const created = await prisma.deal.create({
      data,
    });

    res.status(201).json(created);
  } catch (e) {
    next(e);
  }
});

// PUT /deals/:id
router.put("/:id", async (req, res, next) => {
  try {
    const data = dealUpdateSchema.parse(req.body);

    const updated = await prisma.deal.update({
      where: { id: req.params.id },
      data,
    });

    res.json(updated);
  } catch (e: any) {
    if (e?.code === "P2025") {
      return res.status(404).json({ error: "NotFound" });
    }
    next(e);
  }
});

// DELETE /deals/:id
router.delete("/:id", async (req, res, next) => {
  try {
    await prisma.deal.delete({
      where: { id: req.params.id },
    });

    res.status(204).send();
  } catch (e: any) {
    if (e?.code === "P2025") {
      return res.status(404).json({ error: "NotFound" });
    }
    next(e);
  }
});

export default router;
