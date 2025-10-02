import { ref, get } from "firebase/database";
import { database } from "./config";

export async function fetchTeachersOnce({limit = 4, page = 1, filters = {}} = {}) {
  const snap = await get(ref(database, "teachers"));
  if (!snap.exists()) return { items: [], page, totalPages: 1 };

  const raw = snap.val();

  const all = Array.isArray(raw)
    ? raw.map((data, idx) => ({ id: String(idx), ...data }))
    : Object.entries(raw).map(([id, data]) => ({ id, ...data }));
  
  const { language = "", level = "" } = filters;

  const filtered = all.filter(t => {
    const okLang  = !language || (Array.isArray(t.languages) && t.languages.includes(language));
    const okLevel = !level    || (Array.isArray(t.levels)    && t.levels.includes(level));
    return okLang && okLevel;
  });
  
  const _limit = Number(limit) || 4;
  const _page = Number(page) || 1

  const totalPages = Math.max(1, Math.ceil(filtered.length / _limit));
  const start = (_page - 1) * _limit;
  const end = start + _limit;

  return { items: filtered.slice(start, end), page: _page, totalPages };
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