import supabase, { supabaseUrl } from "./supaBase";

export const getCabins = async () => {
  let { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
};

export const deleteCabin = async (id) => {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    throw new Error("Cabins could not be deleted");
  }
  return data;
};

//  https://vbarzuuvsjiwccpuazru.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  //1. create/edit cabin

  let query = supabase.from("cabins");

  // create cabin
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);
  //edit cabin
  if (id) query = query.update({ ...newCabin, image: hasImagePath ? newCabin.image : imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    throw new Error("Cabin could not created");
  }

  //2. upload image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  //3. delete the cabin if there was an error
  if (storageError) {
    console.error(storageError);
    await supabase.from("cabins").delete().eq("id", data.id);
    throw new Error(
      "Cabin image could not be uploaded and the Cabin was not created"
    );
  }

  return data;
}

// export async function createCabin(newCabin) {
//   const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
//     "/",
//     ""
//   );

//   const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
//   //1. create cabin
//   const { data, error } = await supabase
//     .from("cabins")
//     .insert([{ ...newCabin, image: imagePath }])
//     .select();

//   if (error) {
//     throw new Error("Cabin could not created");
//   }

//   //2. upload image
//   const { error: storageError } = await supabase.storage
//     .from("cabin-images")
//         .upload(imageName, newCabin.image);

//     //3. delete the cabin if there was an error
//   if (storageError) {
//     console.error(storageError);
//     await supabase.from("cabins").delete().eq("id", data.id);
//     throw new Error(
//       "Cabin image could not be uploaded and the Cabin was not created"
//     );
//   }

//   return data;
// }
