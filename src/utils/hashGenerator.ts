import bcrypt from 'bcrypt'

export async function hashText(text:string, round = 10) {
  try {
    const salt = await bcrypt.genSalt(round);

    return await bcrypt.hash(text, salt);
  } catch(err:any) {
    throw Error(err.message);
  }
}

export async function compareHash(text:string, hash:string) {
  try {
    return await bcrypt.compare(text, hash);
  } catch (e:any) {
    throw new Error(e.message);
  }
}