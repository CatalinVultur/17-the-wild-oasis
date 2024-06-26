import supabase, { supabaseUrl } from "./supabase.js";

export async function signup({ fullName, email, password }) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                fullName,
                avatar: ''
            }
        }
    });

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

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

export async function updateCurrentUser({ password, fullName, avatar }) {
    let updateData;

    if (password) updateData = { password };
    if (fullName) updateData = {
        data: {
            fullName
        }
    };

    const { data, error } = await supabase.auth.updateUser(updateData);

    if (error) throw new Error(error.message);
    if (!avatar) return data;

    // Upload avatar if exists
    const fileName = `avatar=${data.user.id}-${Math.random()}`;
    const  { error: storageError } = await supabase.storage.from('avatars').upload(fileName, avatar);

    if (storageError) throw new Error(storageError.message);

    // Update avatar in DB
    const { data: updatedUser, error: errorUpdatedUser} = await supabase.auth.updateUser({
        data: {
            avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`
        }
    });

    if (storageError) throw new Error(errorUpdatedUser.message);
    return updatedUser;
}
