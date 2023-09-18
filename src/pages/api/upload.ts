import type { APIRoute } from "astro";
import { Storage } from "@google-cloud/storage";

const bucket = new Storage().bucket("jasfinacandles-dev.appspot.com");

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();
  const file = data.get("pic") as File;
  const client = new Storage();
  const arrBuff = await file.arrayBuffer();
  const buffer = Buffer.from(arrBuff);
  try {
    bucket.file(file.name).save(buffer, {
      public: true,
      contentType: file.type,
      private: false,
    });
    return new Response(null, { status: 200 });
  } catch {
    return new Response(null, { status: 500 });
  }
};

export const GET: APIRoute = async () => {
  try {
    const [file] = await bucket.getFiles();
    file.forEach((f) => console.log(f.publicUrl()));
    return new Response(null, { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response(null, { status: 500 });
  }
};
