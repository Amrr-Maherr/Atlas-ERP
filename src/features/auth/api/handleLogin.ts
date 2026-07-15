import { createClient } from "@/lib/supabase/client";

type HandleLoginProps = {
    email: string;
    password: string;
};

export default async function handleLogin({ email, password }: HandleLoginProps) {
    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });
    return { data, error };
}
