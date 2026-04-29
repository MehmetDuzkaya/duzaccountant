// GET  /api/posts          → tüm yazıları listele (opsiyonel ?category=PERSONAL|GIB|TURMOB)
// POST /api/posts          → yeni yazı ekle (Firebase ID Token doğrulaması gerekli)
import { NextRequest, NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/lib/firebase-admin";

async function verifyToken(req: NextRequest) {
  const authorization = req.headers.get("Authorization");
  if (!authorization?.startsWith("Bearer ")) return null;
  const token = authorization.split("Bearer ")[1];
  try {
    return await adminAuth.verifyIdToken(token);
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    let query: FirebaseFirestore.Query = adminDb.collection("posts").orderBy("createdAt", "desc");
    if (category) {
      query = query.where("category", "==", category);
    }

    const snapshot = await query.get();
    const posts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json(posts);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const decodedToken = await verifyToken(req);
  if (!decodedToken) {
    return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 });
  }

  try {
    const { title, content, category } = await req.json();

    if (!title || !content || !category) {
      return NextResponse.json({ error: "Tüm alanlar zorunludur" }, { status: 400 });
    }
    if (!["PERSONAL", "GIB", "TURMOB"].includes(category)) {
      return NextResponse.json({ error: "Geçersiz kategori" }, { status: 400 });
    }

    const docRef = await adminDb.collection("posts").add({
      title,
      content,
      category,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    const doc = await docRef.get();
    return NextResponse.json({ id: doc.id, ...doc.data() }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}
