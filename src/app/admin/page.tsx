"use client";

import { useEffect, useState, useCallback } from "react";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { useAuth, getAuthToken } from "@/lib/useAuth";
import ColumnSection from "@/components/ColumnSection";
import AdminPostForm from "@/components/AdminPostForm";
import { Post } from "@/types";

const PersonalIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);
const GibIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);
const TurmobIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

export default function AdminPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [postsLoading, setPostsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/admin/login");
    }
  }, [user, loading, router]);

  const fetchPosts = useCallback(async () => {
    setPostsLoading(true);
    try {
      const res = await fetch("/api/posts");
      const data = await res.json();
      setPosts(data);
    } finally {
      setPostsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user) fetchPosts();
  }, [user, fetchPosts]);

  const handleDelete = async (id: string) => {
    if (!confirm("Bu yazıyı silmek istediğinize emin misiniz?")) return;
    const token = await getAuthToken();
    await fetch(`/api/posts/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchPosts();
  };

  const handleEdit = (post: Post) => {
    setEditingPost(post);
    setShowForm(true);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingPost(null);
    fetchPosts();
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/admin/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-slate-400 text-sm">Yükleniyor...</div>
      </div>
    );
  }
  if (!user) return null;

  const personal = posts.filter((p) => p.category === "PERSONAL");
  const gib = posts.filter((p) => p.category === "GIB");
  const turmob = posts.filter((p) => p.category === "TURMOB");

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Admin Header */}
      <header className="bg-slate-800 text-white shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-500 rounded-full p-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h1 className="font-bold text-base">Admin Paneli</h1>
              <p className="text-slate-400 text-xs">{user.email}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => { setEditingPost(null); setShowForm(true); }}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Yeni Yazı
            </button>
            <button
              onClick={handleLogout}
              className="border border-slate-600 hover:bg-slate-700 text-slate-300 text-sm px-4 py-2 rounded-lg transition-colors"
            >
              Çıkış
            </button>
          </div>
        </div>
      </header>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h2 className="font-bold text-slate-800">
                {editingPost ? "Yazıyı Düzenle" : "Yeni Yazı Ekle"}
              </h2>
              <button
                onClick={() => { setShowForm(false); setEditingPost(null); }}
                className="text-slate-400 hover:text-slate-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <AdminPostForm
                editingPost={editingPost}
                onSuccess={handleFormSuccess}
                onCancel={() => { setShowForm(false); setEditingPost(null); }}
              />
            </div>
          </div>
        </div>
      )}

      {/* 3 Sütun */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {postsLoading ? (
          <div className="text-center text-slate-400 text-sm py-20">Yazılar yükleniyor...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ColumnSection
              title="Kişisel Yazılar"
              icon={<PersonalIcon />}
              colorClass="text-blue-700"
              borderClass="border-blue-500"
              bgClass="bg-blue-50"
              posts={personal}
              showAdminActions
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
            <ColumnSection
              title="GİB Yazıları"
              icon={<GibIcon />}
              colorClass="text-emerald-700"
              borderClass="border-emerald-500"
              bgClass="bg-emerald-50"
              posts={gib}
              showAdminActions
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
            <ColumnSection
              title="TÜRMOB Yazıları"
              icon={<TurmobIcon />}
              colorClass="text-violet-700"
              borderClass="border-violet-500"
              bgClass="bg-violet-50"
              posts={turmob}
              showAdminActions
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        )}
      </main>
    </div>
  );
}
