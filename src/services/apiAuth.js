import supabase from "./supabase.js";

export async function login({email, password}) {
    let { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

export async function getCurrentUser() {
    const { data: session, error: sessionError } = await supabase.auth.getSession();

    if (sessionError) throw new Error('Login error: ' + sessionError.message);
    if (!session?.session) return null;

    const { data: user, error: userError } = await supabase.auth.getUser();

    if (userError) {
        throw new Error(userError.message);
    }

    return user?.user;
}

export async function logout() {
    const { err } = await supabase.auth.signOut();

    if (err) throw new Error(err.message);
}
