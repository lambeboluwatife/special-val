import { NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabaseClient";

export async function GET({ params }) {
  try {
    const slug = params.slug;

    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("valentines")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { error: "Valentine not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
