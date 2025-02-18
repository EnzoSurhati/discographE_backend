-- AlterTable
CREATE SEQUENCE album_id_seq;
ALTER TABLE "Album" ALTER COLUMN "id" SET DEFAULT nextval('album_id_seq');
ALTER SEQUENCE album_id_seq OWNED BY "Album"."id";
