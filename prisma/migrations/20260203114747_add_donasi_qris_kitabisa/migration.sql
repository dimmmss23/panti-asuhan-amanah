-- CreateTable
CREATE TABLE "donasi" (
    "id" SERIAL NOT NULL,
    "namaBank" TEXT NOT NULL,
    "nomorRekening" TEXT NOT NULL,
    "atasNama" TEXT NOT NULL,
    "logoUrl" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "donasi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "qris" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL DEFAULT 'QRIS Donasi',
    "imageUrl" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "qris_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kitabisa" (
    "id" SERIAL NOT NULL,
    "namaProgram" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "linkKitaBisa" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "kitabisa_pkey" PRIMARY KEY ("id")
);
