-- CreateTable
CREATE TABLE "profiles" (
    "id" SERIAL NOT NULL,
    "AnakAsuh" INTEGER NOT NULL,
    "strukturorganisasi_URL" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "legalitas" (
    "id" SERIAL NOT NULL,
    "jenisdokumen" TEXT,
    "nomordokumen" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "profilId" INTEGER NOT NULL,

    CONSTRAINT "legalitas_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "legalitas" ADD CONSTRAINT "legalitas_profilId_fkey" FOREIGN KEY ("profilId") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
