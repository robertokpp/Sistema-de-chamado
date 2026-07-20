import { Request, Response } from "express";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { AppError } from "@/utils/AppError";
import { CallStatus } from "@/generated/prisma/enums";

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
      where: { id: serviceId, active: true },
    });

    if (!verifyService) {
      throw new AppError("O serviço não existe ou está inativo!", 404);
    }

    const technicians = await prisma.user.findMany({
      where: {
        role: "TECHNICAL",
      },
      include: {
        technicalId: {
          where: {
            status: {
              in: ["OPEN", "IN_PROGRESS"],
            },
          },
        },
      },
    });

    const technician = technicians.sort(
      (a, b) => a.technicalId.length - b.technicalId.length,
    )[0];

    const call = await prisma.call.create({
      data: {
        title,
        description,
        clientId: user,
        technicalId: technician.id,
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
            availableForClient: true,
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
      availableForClient: call.service.availableForClient,
    }));

    return response.json(responseCall);
  }

  async indexUnique(request: Request, response: Response) {
    const paramsSchema = z.object({
      id: z.uuid(),
    });

    const { id } = paramsSchema.parse(request.params);

    const call = await prisma.call.findFirst({
      where: { id },
      select: {
        id: true,
        title: true,
        description: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        technicalId: true,
        technical: true,
        client: true,
        services: true,
      },
    });

    if (!call) {
      throw new AppError("Chamado não encontrado.");
    }

    const callService = await prisma.callService.findMany({
      where: { callId: id },
      select: {
        service: true,
        call: {
          select: {
            technical: true,
          },
        },
      },
      orderBy: { service: { createdAt: "asc" } },
    });

    let total = 0;
    callService.map((item) => {
      total += item.service.price.toNumber();
    });

    const callServices = {
      title: call?.title,
      description: call?.description,
      client: call.client.name,
      category: callService.map((service) => ({
        id: service.service.id,
        name: service.service.name,
        price: service.service.price.toNumber(),
      })),
      status: call.status,
      createdAt: call.createdAt,
      updateAt: call.updatedAt,
      technicalName: call.technical?.name,
      technicalEmail: call.technical?.email,
      services: call.services,
      totalService: total,
    };

    return response.json({ callServices });
  }

  async updateStatus(request: Request, response: Response) {
    const paramsSchema = z.object({
      id: z.uuid(),
    });

    const bodySchema = z.object({
      status: z.enum(CallStatus),
    });

    const { id } = paramsSchema.parse(request.params);
    const { status } = bodySchema.parse(request.body);

    await prisma.call.update({
      where: { id },
      data: { status },
    });

    return response.json();
  }

}

export { CallsController };
