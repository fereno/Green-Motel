import supabase, { supabaseUrl } from "./supaBase";

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);
  console.log(data);
  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;
  const { data, error } = await supabase.auth.getUser();
  console.log(data);
  if (error) throw new Error(error.message);
  return data?.user;
}

export async function logOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function SignUp({ email, password, fullName }) {
  const { error, data } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) throw new Error(error.message);
  return data;
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  //1-update passwoerd or fullname
  let updateUserData;
  if (!fullName) updateUserData = { password };
  if (!password) updateUserData = { data: { fullName } };

  const { error, data } = await supabase.auth.updateUser(updateUserData);

  if (error) throw Error(error.message);

  if (!avatar) return data;

  //2-upload avatar image
  const fileName = `avatar-${data.user.id}-${Math.random()}`;
  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) throw Error(storageError.message);

  //3-update avatar in the user
  const { data: updateUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    },
  });
  if (error2) throw Error(error2.message);
  return updateUser;
}
