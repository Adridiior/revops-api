import { Router } from "express";
import prisma from "../db/prisma";
import { z } from "zod";

const router = Router();

const accountCreateSchema = z.object({
  name: z.string().min(2),
  industry: z.string().min(2).optional(),
  website: z.string().url().optional()
});

// GET /accounts
router.get("/", async (_req, res, next) => {
  try {
    const accounts = await prisma.account.findMany({
      orderBy: { createdAt: "desc" }
    });
    res.json(accounts);
  } catch (e) {
    next(e);
  }
});

// GET /accounts/:id
router.get("/:id", async (req, res, next) => {
  try {
    const account = await prisma.account.findUnique({
      where: { id: req.params.id }
    });

    if (!account) return res.status(404).json({ error: "NotFound" });

    res.json(account);
  } catch (e) {
    next(e);
  }
});

// POST /accounts
router.post("/", async (req, res, next) => {
  try {
    const data = accountCreateSchema.parse(req.body);
    const created = await prisma.account.create({ data });
    res.status(201).json(created);
  } catch (e) {
    next(e);
  }
});

export default router;
