import { Request, Response } from "express";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { AppError } from "@/utils/AppError";

class CallsController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      title: z.string().trim().min(3),
      description: z.string().trim(),
      service: z.enum([
        "Instalação de Rede",
        "Recuperação de Dados",
        "Suporte de Software",
      ]),
    });

    const { title, description, service } = bodySchema.parse(request.body);

    const user = request.user?.id;
    if (!user) {
      throw new AppError("Usuário não autenticado", 401);
    }

    const call = await prisma.calls.create({
      data: {
        title,
        description,
        service,
        value: 200,
        clientId: user,
      },
    });
    return response.json(call);
  }

  async index(request: Request, response: Response) {
    const userRole = request.user?.role;
    const userId = request.user?.id;

    if (userRole === "client") {
      return response.json(
        await prisma.calls.findMany({
          where: { clientId: userId },
        }),
      );
    }

    if (userRole === "admin") {
      return response.json(await prisma.calls.findMany({}));
    }

    if (userRole === "technical") {
      return response.json(
        await prisma.calls.findMany({
          where: {
            technicalId: userId,
          },
        }),
      );
    }

    return response.status(403).json({
      message: "Usuário sem permissão",
    });
  }

}

export { CallsController };
