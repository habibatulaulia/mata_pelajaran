import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js ";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js"

const firebaseConfig = {
  apiKey: "AIzaSyD9uJSx87wLWMehUFmpdboN9sBM9s_tN1M",
  authDomain: "insan-cemerlang-41b6b.firebaseapp.com",
  projectId: "insan-cemerlang-41b6b",
  storageBucket: "insan-cemerlang-41b6b.appspot.com",
  messagingSenderId: "1057804782651",
  appId: "1:1057804782651:web:bf911a5c4bff4f7bef201e"
};
// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function ambilDaftarMataPelajaran() {
  const refDokumen = collection(db, "matapelajaran");
  const kueri = query(refDokumen, orderBy("nama"));
  const cuplikanKueri = await getDocs(kueri);

  let hasil = [];
  cuplikanKueri.forEach((dok) => {
    hasil.push({
      id: dok.id,
      guru: dok.data().guru,
      hari: dok.data().hari,
      jamKe: dok.data().jamKe,
      kelas: dok.data().kelas,
      mapel: dok.data().mapel,
      waktu: dok.data().waktu

    });
  });



  return hasil;
}

export function formatAngka(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export async function tambahMataPelajaran(guru, hari, jamKe, kelas, mapel, waktu,) {
  try {
    const dokRef = await addDoc(collection(db, 'matapelajaran'), {
      guru: guru,
      hari: hari,
      jamKe: jamKe,
      kelas: kelas,
      mapel: mapel,
      waktu: waktu
    });
    console.log('berhasil menembah ' + dokRef.id);
  } catch (e) {
    console.log('gagal menambah ' + e);
  }
}

export async function hapusMataPelajaran(docId) {
  await deleteDoc(doc(db, "matapelajaran", docId));
}

export async function ubahMataPelajaran(docId, guru, hari, jamKe, kelas, mapel, waktu) {
  await updateDoc(doc(db, "matapelajaran", docId), {
    guru: guru,
    hari: hari,
    jamKe: jamKe,
    kelas: kelas,
    mapel: mapel,
    waktu: waktu
  });
}

export async function ambilMataPelajaran(docId) {
  const docRef = await doc(db, "matapelajaran", docId);
  const docSnap = await getDoc(docRef);

  return await docSnap.data();
}