import { Request, Response } from "express";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { AppError } from "@/utils/AppError";

class CallsController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      title: z.string().trim().min(3),
      description: z.string().trim(),
      serviceId: z.uuid(),
    });

    const { title, description, serviceId } = bodySchema.parse(request.body);
    const user = request.user?.id;

    if (!user) {
      throw new AppError("Usuário não autenticado", 401);
    }

    const verifyService = await prisma.service.findFirst({
      where: { id: serviceId },
    });

    if (!verifyService) {
      throw new AppError("O serviço não existe", 404);
    }

    const call = await prisma.call.create({
      data: {
        title,
        description,
        clientId: user,
      },
    });

    await prisma.callService.create({
      data: {
        callId: call.id,
        serviceId: verifyService.id,
        price: verifyService.price,
      },
    });

    return response.status(201).json();
  }

  async index(request: Request, response: Response) {
    const userRole = request.user?.role;
    const userId = request.user?.id;

    if (userRole === "CLIENT") {
      return response.json(
        await prisma.call.findMany({
          where: { clientId: userId },
        }),
      );
    }

    if (userRole === "ADMIN") {
      return response.json(await prisma.call.findMany({}));
    }

    if (userRole === "TECHNICAL") {
      return response.json(
        await prisma.call.findMany({
          where: {
            technicalId: userId,
          },
        }),
      );
    }

    return response.status(401).json({
      message: "Usuário sem permissão",
    });
  }
}

export { CallsController };
