import { Request, Response } from "express";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { hash } from "bcrypt";

import { AppError } from "@/utils/AppError";

class UserController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      name: z.string().trim(),
      email: z.email(),
      password: z.string().min(6),
    });

    const { name, email, password } = bodySchema.parse(request.body);
    const hashPassword = await hash(password, 8);

    const emailAlreadyRegistered = await prisma.user.findFirst({
      where: { email },
    });

    if (emailAlreadyRegistered) {
      throw new AppError("Já existe um usuário com esse e-mail.");
    }

    await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashPassword,
      },
    });

    return response.status(201).json();
  }

  async index(request: Request, response: Response) {
    const user = await prisma.user.findMany();

    return response.json(user);
  }
}

export { UserController };
