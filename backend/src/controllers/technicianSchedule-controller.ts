import { Request, Response } from "express";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

class technicalSchedule {
  async create(request: Request, response: Response) {
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

    const bodySchema = z.object({
      hour: z.string().regex(timeRegex, {
        message: "Formato de hora deve ser HH:MM (ex: 14:30)",
      }),
    });

    const { hour } = bodySchema.parse(request.body);

    const schedules = await prisma.technicianSchedule.create({
      data: {
        hour,
        technicianId: "asdadasd,oa",
      },
    });
  }
}

export { technicalSchedule };
