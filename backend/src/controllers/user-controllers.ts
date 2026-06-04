import { Request, Response } from "express";
import { z } from "zod";

class UserController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      name: z.string().trim(),
      email: z.email(),
      password: z.string().min(6),
    });

    const { name, email, password } = bodySchema.parse(request.body);

    console.log(name, email, password);

    return response.json({ message: "ok" });
  }
}

export { UserController };
