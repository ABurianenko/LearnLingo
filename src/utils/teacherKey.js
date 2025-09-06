export const slugify = (s = "") =>
  String(s)
    .toLowerCase()
    .normalize("NFKD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const hash = (s = "") => {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = (h * 33) ^ s.charCodeAt(i);
  return (h >>> 0).toString(36);
};

export const makeTeacherKey = (t = {}, idx) => {
  const base = `${slugify(t.name)}-${slugify(t.surname)}`.replace(/^-+|-+$/g, "") || "teacher";
  const fp = `${t.avatar_url || ""}|${t.lesson_info?.slice(0, 32) || ""}`;
  const suffix = hash(fp).slice(0, 6);
  return `${base}-${suffix}${Number.isFinite(idx) ? `-${idx}` : ""}`;
};

