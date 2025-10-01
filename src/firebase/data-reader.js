import { ref, get } from "firebase/database";
import { database } from "./config";

export async function fetchTeachersOnce(limit = 4, page = 1) {
  const snap = await get(ref(database, "teachers"));
  if (!snap.exists()) return { items: [], page, totalPages: 1 };

  const raw = snap.val();

  const all = Array.isArray(raw)
    ? raw.map((data, idx) => ({ id: String(idx), ...data }))
    : Object.entries(raw).map(([id, data]) => ({ id, ...data }));

  const totalPages = Math.max(1, Math.ceil(all.length / limit));
  const start = (page - 1) * limit;
  const end = start + limit;

  return { items: all.slice(start, end), page, totalPages };
}

export async function fetchAllLanguages () {
  const snap = await get(ref(database, "teachers"));
  if (!snap.exists()) return [];

  const raw = snap.val();

  const all = Array.isArray(raw)
    ? raw.map((data, idx) => ({ id: String(idx), ...data }))
    : Object.entries(raw).map(([id, data]) => ({ id, ...data }));
  
  const set = new Set();
  for (const t of all) {
    (t.languages || []).forEach(lang => set.add(lang))
  }

  return Array.from(set).sort();
}