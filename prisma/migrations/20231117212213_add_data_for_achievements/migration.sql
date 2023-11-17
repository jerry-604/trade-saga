-- AlterTable
ALTER TABLE "GamePlayer" ADD COLUMN     "stocksBought" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "stocksSold" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "stocksViewed" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "imageUrl" TEXT NOT NULL DEFAULT 'https://rqhpnffkqqqtowynnwxd.supabase.co/storage/v1/object/sign/avatars/pfps/default.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhdmF0YXJzL3BmcHMvZGVmYXVsdC5wbmciLCJpYXQiOjE2OTk2NDA1OTMsImV4cCI6NDgyMTcwNDU5M30.Uo6I2GRihyMycXCu4iTGBDxpalYF56A_fx-Bx8fOVkQ&t=2023-11-10T18%3A23%3A14.366Z';
