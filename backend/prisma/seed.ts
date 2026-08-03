import "dotenv/config";
import { hash } from "bcrypt";
import { prisma } from "../src/lib/prisma.js";

function requiredPassword(name: string) {
  const value = process.env[name];
  if (!value || value.length < 8) {
    throw new Error(`${name} deve ter pelo menos 8 caracteres.`);
  }
  return value;
}

const adminPassword = requiredPassword("ADMIN_PASSWORD");
const technicalPassword = requiredPassword("TECHNICAL_DEFAULT_PASSWORD");

const technicians = [
  {
    name: "Técnico 1",
    email: "tecnico1@helpdesk.com",
    hours: ["08:00", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"],
  },
  {
    name: "Técnico 2",
    email: "tecnico2@helpdesk.com",
    hours: ["10:00", "11:00", "12:00", "13:00", "16:00", "17:00", "18:00", "19:00"],
  },
  {
    name: "Técnico 3",
    email: "tecnico3@helpdesk.com",
    hours: ["12:00", "13:00", "14:00", "15:00", "18:00", "19:00", "20:00", "21:00"],
  },
];

const services = [
  { name: "Instalação e atualização de softwares", price: 120 },
  { name: "Instalação e atualização de hardwares", price: 180 },
  { name: "Diagnóstico e remoção de vírus", price: 150 },
  { name: "Suporte a impressoras", price: 100 },
  { name: "Backup e recuperação de dados", price: 200 },
];

async function seed() {
  const admin = await prisma.user.findFirst({
    where: { email: "admin@helpdesk.com" },
  });

  if (!admin) {
    await prisma.user.create({
      data: {
        name: "Administrador",
        email: "admin@helpdesk.com",
        password: await hash(adminPassword, 8),
        role: "ADMIN",
      },
    });
  }

  for (const item of technicians) {
    let technician = await prisma.user.findFirst({
      where: { email: item.email },
    });

    if (!technician) {
      technician = await prisma.user.create({
        data: {
          name: item.name,
          email: item.email,
          password: await hash(technicalPassword, 8),
          role: "TECHNICAL",
        },
      });
    }

    const existingSchedules = await prisma.technicianSchedule.count({
      where: { technicianId: technician.id },
    });

    if (existingSchedules === 0) {
      await prisma.technicianSchedule.createMany({
        data: item.hours.map((hour) => ({
          technicianId: technician.id,
          hour,
        })),
      });
    }
  }

  for (const item of services) {
    const service = await prisma.service.findFirst({
      where: { name: item.name },
    });

    if (!service) {
      await prisma.service.create({ data: item });
    }
  }
}

seed()
  .then(() => console.log("Seed concluído com sucesso."))
  .finally(() => prisma.$disconnect());
