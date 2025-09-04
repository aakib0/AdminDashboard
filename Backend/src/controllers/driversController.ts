import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * GET /api/drivers
 * Query params:
 *  - page (default 1)
 *  - limit (default 10)
 *  - sortBy (default createdAt)
 *  - sortOrder (asc|desc)
 *  - search (search in name/email/phone)
 *  - city
 *  - status
 */
export const listDrivers = async (req: Request, res: Response) => {
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
    prisma.driver.count({ where }),
    prisma.driver.findMany({
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

export const getDriver = async (req: Request, res: Response) => {
  const { id } = req.params;
  const driver = await prisma.driver.findUnique({ where: { id } });
  if (!driver) return res.status(404).json({ error: "Driver not found" });
  res.json(driver);
};

export const createDriver = async (req: Request, res: Response) => {
  const { name, phone, email, city, license, aadhar, pan, status } = req.body;
  if (!name || !phone || !email) {
    return res.status(400).json({ error: "name, phone and email are required" });
  }
  const driver = await prisma.driver.create({
    data: { name, phone, email, city, license, aadhar, pan, status },
  });
  res.status(201).json(driver);
};

export const updateDriver = async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  try {
    const driver = await prisma.driver.update({
      where: { id },
      data: payload,
    });
    res.json(driver);
  } catch (e: any) {
    return res.status(404).json({ error: "Driver not found or invalid data" });
  }
};

export const deleteDriver = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.driver.delete({ where: { id } });
    res.status(204).send(null);
  } catch (e) {
    res.status(404).json({ error: "Driver not found" });
  }
};
