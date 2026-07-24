-- Editable homepage hero "photo bubble" collage: four optional images.
ALTER TABLE "HomeHero"
  ADD COLUMN "showcaseLeftMain" TEXT,
  ADD COLUMN "showcaseLeftSub" TEXT,
  ADD COLUMN "showcaseRightMain" TEXT,
  ADD COLUMN "showcaseRightSub" TEXT;
