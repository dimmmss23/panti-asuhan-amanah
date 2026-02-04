import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { authGuard } from "@/app/libs/auth-guard";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: NextRequest) {
  const unauthorized = await authGuard();
  if (unauthorized) return unauthorized;

  const formData = await req.formData();
  const file = formData.get("file") as File;
  if (!file) return NextResponse.json({ error: "No file uploaded" }, { status: 400 });

  const fileName = `strukturpengurus/${Date.now()}_${file.name}`;
  const { data, error } = await supabase.storage
    .from("images")
    .upload(fileName, file, { upsert: true, contentType: file.type });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const { data: publicUrl } = supabase.storage.from("images").getPublicUrl(fileName);
  return NextResponse.json({ url: publicUrl.publicUrl });
}
