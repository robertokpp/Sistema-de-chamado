import { prisma } from "@/lib/prisma";
import { Response, Request } from "express";
import { json, z } from "zod";

class ServiceController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      name: z.string().trim().min(3),
      price: z.number().positive(),
    });

    const { name, price } = bodySchema.parse(request.body);

    await prisma.service.create({
      data: {
        name,
        price,
      },
    });

    return response.status(201).json();
  }

  async index(request: Request, response: Response) {
    const services = await prisma.service.findMany({
      orderBy: { createdAt: "asc" },
    });

    return response.json(services);
  }

  async active(request: Request, response: Response) {
    const bodySchema = z.object({
      id: z.string(),
      active: z.boolean(),
    });

    const { id, active } = bodySchema.parse(request.body);

    await prisma.service.update({
      where: { id },
      data: { active },
    });
    return response.json();
  }

  async show(request: Request, response: Response) {
    const paramsSchema = z.object({
      id: z.string(),
    });

    const bodySchema = z.object({
      name: z.string(),
      price: z.number(),
    });

    const { id } = paramsSchema.parse(request.params);
    const { name, price } = bodySchema.parse(request.body);
    const service = await prisma.service.update({
      where: { id },
      data: { name, price },
    });

    return response.json(service);
  }
}

export { ServiceController };
