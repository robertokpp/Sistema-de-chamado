-- DropForeignKey
ALTER TABLE "calls" DROP CONSTRAINT "calls_technicalId_fkey";

-- AlterTable
ALTER TABLE "calls" ALTER COLUMN "technicalId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "calls" ADD CONSTRAINT "calls_technicalId_fkey" FOREIGN KEY ("technicalId") REFERENCES "technical"("id") ON DELETE SET NULL ON UPDATE CASCADE;
