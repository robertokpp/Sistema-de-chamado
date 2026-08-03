import "./prisma-mock";
import request from "supertest";
import { app } from "@/app";
import { authToken } from "./helpers";
import { prismaMock } from "./prisma-mock";

const serviceId = "3267b538-63f1-4c19-8796-e351da2b497f";
const callId = "84bcc96d-4c50-43aa-9e4c-3914d913ff6f";

describe("Endpoints de chamados", () => {
  it("permite ao cliente criar chamado com serviço ativo", async () => {
    prismaMock.service.findFirst.mockResolvedValue({
      id: serviceId,
      price: 150,
      active: true,
    });
    prismaMock.user.findMany.mockResolvedValue([
      { id: "technical-id", technicalId: [] },
    ]);
    prismaMock.call.create.mockResolvedValue({ id: callId });
    prismaMock.callService.create.mockResolvedValue({ id: "relation-id" });

    const response = await request(app)
      .post("/calls")
      .set("Authorization", `Bearer ${authToken("CLIENT", "client-id")}`)
      .send({
        title: "Computador lento",
        description: "O computador demora para iniciar",
        serviceId,
      });

    expect(response.status).toBe(201);
    expect(prismaMock.call.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        clientId: "client-id",
        technicalId: "technical-id",
      }),
    });
    expect(prismaMock.callService.create).toHaveBeenCalledWith({
      data: { callId, serviceId, price: 150 },
    });
  });

  it("retorna 404 ao criar chamado com serviço inativo", async () => {
    prismaMock.service.findFirst.mockResolvedValue(null);

    const response = await request(app)
      .post("/calls")
      .set("Authorization", `Bearer ${authToken("CLIENT")}`)
      .send({ title: "Sem internet", description: "Sem conexão", serviceId });

    expect(response.status).toBe(404);
  });

  it("permite ao técnico alterar o status", async () => {
    prismaMock.call.update.mockResolvedValue({ id: callId });

    const response = await request(app)
      .patch(`/calls/${callId}`)
      .set("Authorization", `Bearer ${authToken("TECHNICAL")}`)
      .send({ status: "IN_PROGRESS" });

    expect(response.status).toBe(200);
    expect(prismaMock.call.update).toHaveBeenCalledWith({
      where: { id: callId },
      data: { status: "IN_PROGRESS" },
    });
  });

  it("impede cliente de alterar o status", async () => {
    const response = await request(app)
      .patch(`/calls/${callId}`)
      .set("Authorization", `Bearer ${authToken("CLIENT")}`)
      .send({ status: "CLOSE" });

    expect(response.status).toBe(401);
  });
});
