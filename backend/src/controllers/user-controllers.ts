import { Request, Response } from "express";
import { prisma } from "@/lib/prisma";
import {  z } from "zod";
import { hash } from "bcrypt";
import { unlink, access } from "node:fs/promises";

import { AppError } from "@/utils/AppError";
import path from "node:path";

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

  async upload(request: Request, response: Response) {
    const id = request.user?.id;
    const file = request.file;
    if (!id) {
      throw new AppError("Usuário não autenticado.");
    }
    if (!file) {
      throw new AppError("Nenhuma imagem foi enviada.");
    }

    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new AppError("Usuário não encontrado.");
    }



    await prisma.user.update({
      where: { id },
      data: { avatar: file.filename },
    });

    return response.json({ message: "Avatar atualizado com sucesso." });
  }
}

export { UserController };
