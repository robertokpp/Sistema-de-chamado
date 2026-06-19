import { prisma } from "@/lib/prisma";
import { Response, Request } from "express";
import { z } from "zod";
import { id } from "zod/locales";

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
    const services = await prisma.service.findFirst({});

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
  }
}

export { ServiceController };
