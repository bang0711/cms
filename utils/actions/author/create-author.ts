"use server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const createAuthor = async (
  name: string,
  instagram: string,
  image_url: string
) => {
  const cookieStore = cookies();


  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  try {
    const { data, error } = await supabase
      .from("author")
      .insert([
        {
          author_name: name,
          author_profile_img: image_url,
          author_instagram: instagram,
        },
      ])
      .select();

    console.log("err", error);
    console.log("data", data);

    if (error?.code) return error;

    return data;
  } catch (error: any) {
    return error;
  }
};
