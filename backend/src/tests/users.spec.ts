import "./prisma-mock";
import request from "supertest";
import { app } from "@/app";
import { authToken } from "./helpers";
import { prismaMock } from "./prisma-mock";

describe("Endpoints de usuários", () => {
  it("cria uma conta de cliente", async () => {
    prismaMock.user.findFirst.mockResolvedValue(null);
    prismaMock.user.create.mockResolvedValue({ id: "client-id" });

    const response = await request(app).post("/user").send({
      name: "Cliente Teste",
      email: "cliente@teste.com",
      password: "123456",
    });

    expect(response.status).toBe(201);
    expect(prismaMock.user.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        name: "Cliente Teste",
        email: "cliente@teste.com",
        password: expect.any(String),
      }),
    });
  });

  it("permite ao admin listar técnicos", async () => {
    prismaMock.user.findMany.mockResolvedValue([
      {
        id: "technical-id",
        name: "Técnico",
        email: "tecnico@teste.com",
        avatar: null,
        technicianSchedules: [{ hour: "14:00" }, { hour: "08:00" }],
      },
    ]);

    const response = await request(app)
      .get("/technical")
      .set("Authorization", `Bearer ${authToken("ADMIN")}`);

    expect(response.status).toBe(200);
    expect(response.body[0].hours).toEqual(["08:00", "14:00"]);
  });

  it("impede cliente de acessar a gestão de técnicos", async () => {
    const response = await request(app)
      .get("/technical")
      .set("Authorization", `Bearer ${authToken("CLIENT")}`);

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Unauthorized");
  });
});
