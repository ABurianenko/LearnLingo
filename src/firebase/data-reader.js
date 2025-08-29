import { ref, get } from "firebase/database";
import { database } from "./config";

export async function fetchTeachersOnce() {
  const snap = await get(ref(database, "teachers"));
  if (!snap.exists()) return [];
  const obj = snap.val(); 
  return Object.entries(obj).map(([id, data]) => ({ id, ...data }));
}
