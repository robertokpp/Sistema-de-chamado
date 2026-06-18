import { prisma } from "@/lib/prisma";
import { Response, Request } from "express";
import { z } from "zod";

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
}

export { ServiceController };
