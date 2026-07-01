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
    });

    return response.json(client);
  }

  async delete(request: Request, response: Response) {
    const paramsSchema = z.object({
      userId: z.string(),
    });

    const { userId } = paramsSchema.parse(request.params);

    await prisma.user.delete({
      where: { id: userId, role: "CLIENT" },
    });

    return response.json({ Message: "OK" });
  }
}

export { ClientController };
