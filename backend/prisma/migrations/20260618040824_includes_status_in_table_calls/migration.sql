-- CreateEnum
CREATE TYPE "Status" AS ENUM ('open', 'inProgress', 'close');

-- AlterTable
ALTER TABLE "calls" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'open';
