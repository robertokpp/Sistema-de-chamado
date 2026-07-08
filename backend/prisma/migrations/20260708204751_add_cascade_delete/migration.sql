-- DropForeignKey
ALTER TABLE "CallService" DROP CONSTRAINT "CallService_callId_fkey";

-- DropForeignKey
ALTER TABLE "call" DROP CONSTRAINT "call_clientId_fkey";

-- AddForeignKey
ALTER TABLE "call" ADD CONSTRAINT "call_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CallService" ADD CONSTRAINT "CallService_callId_fkey" FOREIGN KEY ("callId") REFERENCES "call"("id") ON DELETE CASCADE ON UPDATE CASCADE;
