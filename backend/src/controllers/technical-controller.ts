import { AppError } from "@/utils/AppError";
import { Request, Response } from "express";
import { prisma } from "@/lib/prisma";
import { hash } from "bcrypt";
import { z } from "zod";

class TechnicalController {
  async create(request: Request, response: Response) {
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

    const bodySchema = z.object({
      name: z.string().trim(),
      email: z.email(),
      password: z.string().min(6),
      hours: z.array(
        z.string().regex(timeRegex, {
          message: "Formato de hora deve ser HH:MM (ex: 14:30)",
        }),
      ),
    });

    const { name, email, password, hours } = bodySchema.parse(request.body);
    const hashPassword = await hash(password, 8);

    const emailAlreadyRegistered = await prisma.user.findFirst({
      where: { email },
    });

    if (emailAlreadyRegistered) {
      throw new AppError("Já existe um usuário com esse e-mail.");
    }

    const technical = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashPassword,
        role: "TECHNICAL",
      },
    });

    await prisma.technicianSchedule.createMany({
      data: hours.map((hour) => ({
        hour,
        technicianId: technical.id,
      })),
    });

    return response.json("ok");
  }

  async index(request: Request, response: Response) {
    await prisma.user.findFirst({
      select: {
        id: true,
        name: true,
        email: true,
      },
      where: { role: "TECHNICAL" },
    });
  }
}

export { TechnicalController };
