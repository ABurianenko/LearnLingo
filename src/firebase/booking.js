import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { makeTeacherKey } from "../utils/teacherKey";
import { firestore } from "./config";

export async function createBooking({ form, teacher, user }) {
    const teacherKey = makeTeacherKey?.(teacher) ?? null;

    const docRef = await addDoc(collection(firestore, "bookings"), {
        name: form.name,
        email: form.email,
        phone: form.phone,
        reason: form.reason,

        teacherKey,
        teacherName: teacher?.name ?? null,
        teacherSurname: teacher?.surname ?? null,

        userId: user?.uid ?? null,
        status: 'pending',

        createdAt: serverTimestamp(),
    });

    return docRef.id;
}