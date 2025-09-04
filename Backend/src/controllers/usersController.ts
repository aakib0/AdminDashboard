import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const listUsers = async (req: Request, res: Response) => {
  const page = Math.max(parseInt((req.query.page as string) || "1"), 1);
  const limit = Math.min(Math.max(parseInt((req.query.limit as string) || "10"), 1), 100);
  const skip = (page - 1) * limit;

  const sortBy = (req.query.sortBy as string) || "createdAt";
  const sortOrder = (req.query.sortOrder as string) === "asc" ? "asc" : "desc";

  const search = (req.query.search as string) || "";
  const city = (req.query.city as string) || undefined;
  const status = (req.query.status as string) || undefined;

  const where: any = {};
  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
      { phone: { contains: search } },
    ];
  }
  if (city) where.city = { equals: city };
  if (status) where.status = { equals: status };

  const [total, data] = await Promise.all([
    prisma.user.count({ where }),
    prisma.user.findMany({
      where,
      skip,
      take: limit,
      orderBy: { [sortBy]: sortOrder },
    }),
  ]);

  res.json({
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
    data,
  });
};

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
};

export const createUser = async (req: Request, res: Response) => {
  const { name, phone, email, city, status } = req.body;
  if (!name || !phone || !email) {
    return res.status(400).json({ error: "name, phone and email are required" });
  }
  const user = await prisma.user.create({
    data: { name, phone, email, city, status },
  });
  res.status(201).json(user);
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  try {
    const user = await prisma.user.update({
      where: { id },
      data: payload,
    });
    res.json(user);
  } catch (e) {
    res.status(404).json({ error: "User not found or invalid data" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.user.delete({ where: { id } });
    res.status(204).send(null);
  } catch (e) {
    res.status(404).json({ error: "User not found" });
  }
};
