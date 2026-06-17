import { Request, Response } from "express";

class ClientController {
  async create(request: Request, response: Response) {
    return response.json({ message: "ok" });
  }
}

export { ClientController };
