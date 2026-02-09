import { Router } from "express";
import prisma from "../db/prisma";

const router = Router();

// GET /reps
router.get("/", async (_req, res, next) => {
  try {
    const reps = await prisma.rep.findMany({
      orderBy: { createdAt: "asc" },
    });
    res.json(reps);
  } catch (e) {
    next(e);
  }
});

// GET /reps/:id
router.get("/:id", async (req, res, next) => {
  try {
    const rep = await prisma.rep.findUnique({
      where: { id: req.params.id },
    });

    if (!rep) return res.status(404).json({ error: "NotFound" });
    res.json(rep);
  } catch (e) {
    next(e);
  }
});

export default router;
