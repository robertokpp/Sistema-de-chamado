import "./prisma-mock";
import request from "supertest";
import { app } from "@/app";
import { authToken } from "./helpers";
import { prismaMock } from "./prisma-mock";

describe("Endpoints de serviços", () => {
  it("permite ao admin criar um serviço", async () => {
    prismaMock.service.create.mockResolvedValue({ id: "service-id" });

    const response = await request(app)
      .post("/services")
      .set("Authorization", `Bearer ${authToken("ADMIN")}`)
      .send({ name: "Suporte a impressoras", price: 120 });

    expect(response.status).toBe(201);
    expect(prismaMock.service.create).toHaveBeenCalledWith({
      data: { name: "Suporte a impressoras", price: 120 },
    });
  });

  it("lista para o cliente somente os serviços disponíveis", async () => {
    const services = [
      { id: "service-id", name: "Backup", price: 100, active: true },
    ];
    prismaMock.service.findMany.mockResolvedValue(services);

    const response = await request(app)
      .get("/services")
      .set("Authorization", `Bearer ${authToken("CLIENT")}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(services);
    expect(prismaMock.service.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: { availableForClient: true } }),
    );
  });

  it("impede cliente de criar serviço", async () => {
    const response = await request(app)
      .post("/services")
      .set("Authorization", `Bearer ${authToken("CLIENT")}`)
      .send({ name: "Serviço inválido", price: 10 });

    expect(response.status).toBe(401);
  });
});
