import { Request, Response } from "express";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { AppError } from "@/utils/AppError";
import { clientRouter } from "@/routes/client-router";

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
    const user = request.user?.id;
    const role = request.user?.role;

    let where = {};

    if (role === "CLIENT") {
      where = {
        call: {
          clientId: user,
        },
      };
    }

    if (role === "TECHNICAL") {
      where = {
        call: {
          technicalId: user,
        },
      };
    }

    const calls = await prisma.callService.findMany({
      where,
      select: {
        price: true,
        call: {
          select: {
            id: true,
            title: true,
            description: true,
            status: true,
            updatedAt: true,
            technical: true,
            client: true,
          },
        },
        service: {
          select: {
            name: true,
          },
        },
      },
    });

    const responseCall = calls.map((call) => ({
      updatedAt: call.call.updatedAt,
      id: call.call.id,
      title: call.call.title,
      service: call.service.name,
      price: call.price,
      technical: call.call.technical?.name,
      status: call.call.status,
      client: call.call.client.name,
    }));

    return response.json(responseCall);
  }

  


}

export { CallsController };
