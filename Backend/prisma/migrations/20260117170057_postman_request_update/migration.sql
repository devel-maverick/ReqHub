-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "provider" TEXT NOT NULL DEFAULT 'local',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApiRequest" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "method" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "params" JSONB,
    "headers" JSONB NOT NULL,
    "authType" TEXT,
    "authData" JSONB,
    "bodyType" TEXT,
    "body" JSONB,
    "rawText" TEXT,
    "binaryRef" TEXT,
    "status" INTEGER NOT NULL,
    "resHeaders" JSONB NOT NULL,
    "resBody" JSONB,
    "resText" TEXT,
    "cookies" JSONB,
    "timeMs" INTEGER NOT NULL,
    "sizeBytes" INTEGER NOT NULL,
    "isStarred" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ApiRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "ApiRequest" ADD CONSTRAINT "ApiRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
