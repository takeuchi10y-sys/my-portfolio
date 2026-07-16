-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "avatarUrl" TEXT NOT NULL DEFAULT '/images/default.png',
ADD COLUMN     "projects" TEXT[];
