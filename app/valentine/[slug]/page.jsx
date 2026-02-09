import { supabase } from "@/app/lib/supabaseClient";
import ValentineContent from "./ValentineContent";

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const { data: valentine } = await supabase
    .from("valentines")
    .select("her_name, his_name")
    .eq("slug", slug)
    .single();

  if (!valentine) {
    return {
      title: "Valentine Not Found 😢",
    };
  }

  return {
    title: `For ${valentine.her_name} 💖`,
    description: `${valentine.his_name} has a tiny secret for you...`,
    openGraph: {
      title: `For ${valentine.her_name} 💖`,
      description: `${valentine.his_name} sent you a special Valentine message.`,
    },
  };
}

export default async function ValentinePage({ params }) {
  const { slug } = await params;

  const { data: valentine, error } = await supabase
    .from("valentines")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !valentine) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-xl font-medium text-red-500 mb-4">
            Valentine page not found 😢
          </p>
          <a href="/" className="text-accent underline">
            Create your own Valentine 💖
          </a>
        </div>
      </div>
    );
  }

  return <ValentineContent valentine={valentine} />;
}
