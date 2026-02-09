import { NextResponse } from "next/server";
import axios from "axios";
import { supabase } from "@/app/lib/supabaseClient";

export async function POST(req) {
  try {
    // Extract transaction_id AND payload from request
    const { transaction_id, payload } = await req.json();

    console.log("Verifying transaction:", transaction_id);

    if (!transaction_id) {
      return NextResponse.json(
        { error: "Transaction ID is required" },
        { status: 400 },
      );
    }

    // Verify payment with Flutterwave
    const response = await axios.get(
      `https://api.flutterwave.com/v3/transactions/${transaction_id}/verify`,
      {
        headers: {
          Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
        },
      },
    );

    const payment = response.data;

    // Check if payment was successful
    if (payment.status !== "success" || payment.data.status !== "successful") {
      return NextResponse.json(
        { error: "Payment verification failed" },
        { status: 400 },
      );
    }

    // Extract data from payload
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
    } = payload;

    if (!her_name || !his_name) {
      return NextResponse.json(
        { error: "Her name and your name are required." },
        { status: 400 },
      );
    }

    // Create slug
    const slug = `${her_name}-from-${his_name}-${Date.now()}`
      .toLowerCase()
      .replace(/\s+/g, "-");

    // Insert into database
    const { data: rowData, error } = await supabase
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
        paid: true,
        gifts,
        slug,
        theme: theme || "classic",
        music_id: music_id || "classic",
        animation_type: animation_type || "hearts",
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ slug: rowData.slug }, { status: 200 });
  } catch (err) {
    console.error("API error:", err.response?.data || err.message);
    return NextResponse.json(
      { error: err.response?.data?.message || "Internal Server Error" },
      { status: 500 },
    );
  }
}
