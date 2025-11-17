-- AlterTable
ALTER TABLE "User" ADD COLUMN     "bio" TEXT,
ADD COLUMN     "locale" TEXT,
ADD COLUMN     "marketingOptIn" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "notifyEmail" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "notifyPush" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "theme" TEXT,
ADD COLUMN     "timezone" TEXT;
