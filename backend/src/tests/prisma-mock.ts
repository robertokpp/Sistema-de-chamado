const modelMock = () => ({
  create: jest.fn(),
  createMany: jest.fn(),
  delete: jest.fn(),
  deleteMany: jest.fn(),
  findFirst: jest.fn(),
  findMany: jest.fn(),
  findUnique: jest.fn(),
  update: jest.fn(),
});

export const prismaMock = {
  user: modelMock(),
  technicianSchedule: modelMock(),
  service: modelMock(),
  call: modelMock(),
  callService: modelMock(),
};

jest.mock("@/lib/prisma", () => ({ prisma: prismaMock }));
