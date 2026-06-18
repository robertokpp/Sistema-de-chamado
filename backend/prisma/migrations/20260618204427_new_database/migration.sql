-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'TECHNICAL', 'CLIENT');

-- CreateEnum
CREATE TYPE "CallStatus" AS ENUM ('OPEN', 'IN_PROGRESS', 'CLOSE');

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'CLIENT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "technicianSchedule" (
    "id" TEXT NOT NULL,
    "technicianId" TEXT NOT NULL,
    "hour" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "technicianSchedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "call" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "technicalId" TEXT,
    "status" "CallStatus" NOT NULL DEFAULT 'OPEN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "call_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CallService" (
    "id" TEXT NOT NULL,
    "callId" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CallService_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "technicianSchedule" ADD CONSTRAINT "technicianSchedule_technicianId_fkey" FOREIGN KEY ("technicianId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "call" ADD CONSTRAINT "call_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "call" ADD CONSTRAINT "call_technicalId_fkey" FOREIGN KEY ("technicalId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CallService" ADD CONSTRAINT "CallService_callId_fkey" FOREIGN KEY ("callId") REFERENCES "call"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CallService" ADD CONSTRAINT "CallService_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
