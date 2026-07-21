import { Request, Response } from "express";
import { prisma } from "@/lib/prisma";
import { uuid, z } from "zod";

class CallsServiceController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      name: z.string().trim().min(3),
      price: z.number().positive(),
    });

    const paramsSchema = z.object({
      id: uuid(),
    });

    const { id } = paramsSchema.parse(request.params);
    const { name, price } = bodySchema.parse(request.body);

    const service = await prisma.service.create({
      data: {
        name,
        price,
        availableForClient: false,
      },
    });

    const callService = await prisma.callService.create({
      data: {
        callId: id,
        serviceId: service.id,
        price,
      },
    });

    return response.status(201).json();
  }

  async delete(request: Request, response: Response) {
    const paramsBody = z.object({
      id: uuid(),
    });

    const { id } = paramsBody.parse(request.params);

    await prisma.callService.deleteMany({
      where: { serviceId: id },
    });

    await prisma.service.delete({
      where: { id },
    });

    return response.json();
  }
}

export { CallsServiceController };
