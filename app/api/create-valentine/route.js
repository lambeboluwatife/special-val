import { NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabaseClient";

export async function POST(req) {
  try {
    const {
      her_name,
      his_name,
      message,
      intro_message,
      intro_subtext,
      reasons,
      question,
      final_message,
      gifts,
      theme,
      music_id,
      animation_type,
    } = await req.json();

    if (!her_name || !his_name) {
      return NextResponse.json(
        { error: "Her name and your name are required." },
        { status: 400 },
      );
    }

    // Generate a unique slug
    const slug = `${her_name}-from-${his_name}-${Math.floor(
      Math.random() * 10000,
    )}`
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");

    const { data, error } = await supabase
      .from("valentines")
      .insert({
        her_name,
        his_name,
        message,
        intro_message,
        intro_subtext,
        reasons,
        question,
        final_message,
        countdown_date: "2026-02-14",
        gifts,
        slug,
        theme: theme || "classic",
        music_id: music_id || "classic",
        animation_type: animation_type || "hearts",
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ slug: data.slug }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
