import "./prisma-mock";
import request from "supertest";
import { hash } from "bcrypt";
import { app } from "@/app";
import { prismaMock } from "./prisma-mock";

describe("Autenticação", () => {
  it("autentica credenciais válidas e não expõe a senha", async () => {
    prismaMock.user.findFirst.mockResolvedValue({
      id: "admin-id",
      name: "Admin",
      email: "admin@helpdesk.com",
      password: await hash("123456", 4),
      role: "ADMIN",
      avatar: null,
    });

    const response = await request(app).post("/session").send({
      email: "admin@helpdesk.com",
      password: "123456",
    });

    expect(response.status).toBe(200);
    expect(response.body.token).toEqual(expect.any(String));
    expect(response.body.user).not.toHaveProperty("password");
  });

  it("rejeita uma senha incorreta", async () => {
    prismaMock.user.findFirst.mockResolvedValue({
      id: "admin-id",
      email: "admin@helpdesk.com",
      password: await hash("senha-correta", 4),
      role: "ADMIN",
    });

    const response = await request(app).post("/session").send({
      email: "admin@helpdesk.com",
      password: "senha-errada",
    });

    expect(response.status).toBe(401);
  });

  it("protege endpoints privados sem token", async () => {
    const response = await request(app).get("/services");

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Invalid token");
  });
});
