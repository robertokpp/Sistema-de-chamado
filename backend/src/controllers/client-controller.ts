import { Request, Response } from "express";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

class ClientController {
  async index(request: Request, response: Response) {
    const client = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
      },
      where: {
        role: "CLIENT",
      },
      orderBy: { createdAt: "asc" },
    });

    return response.json(client);
  }

  async show(request: Request, response: Response) {
    const paramsSchema = z.object({
      id: z.uuid(),
    });

    const bodySchema = z.object({
      name: z.string().min(3, "Informe um Nome"),
      email: z.email("Informe um email valido"),
    });

    const { id } = paramsSchema.parse(request.params);
    const { name, email } = bodySchema.parse(request.body);

    await prisma.user.update({
      where: { id },
      data: { name, email },
    });

    return response.json();
  }

  async delete(request: Request, response: Response) {
    const paramsSchema = z.object({
      id: z.string(),
    });

    const { id } = paramsSchema.parse(request.params);

    await prisma.user.delete({
      where: { id, role: "CLIENT" },
    });

    return response.json({ Message: "OK" });
  }
}

export { ClientController };
