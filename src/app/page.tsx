"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import ColumnSection from "@/components/ColumnSection";
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

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/posts")
      .then((r) => r.json())
      .then((data) => setPosts(data))
      .finally(() => setLoading(false));
  }, []);

  const personalPosts = posts.filter((p) => p.category === "PERSONAL");
  const gibPosts = posts.filter((p) => p.category === "GIB");
  const turmobPosts = posts.filter((p) => p.category === "TURMOB");

  return (
    <div className="min-h-screen bg-slate-100">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center text-slate-400 text-sm py-20">Yükleniyor...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ColumnSection
              title="Kişisel Yazılar"
              icon={<PersonalIcon />}
              colorClass="text-blue-700"
              borderClass="border-blue-500"
              bgClass="bg-blue-50"
              posts={personalPosts}
            />
            <ColumnSection
              title="GİB Yazıları"
              icon={<GibIcon />}
              colorClass="text-emerald-700"
              borderClass="border-emerald-500"
              bgClass="bg-emerald-50"
              posts={gibPosts}
            />
            <ColumnSection
              title="TÜRMOB Yazıları"
              icon={<TurmobIcon />}
              colorClass="text-purple-700"
              borderClass="border-purple-500"
              bgClass="bg-purple-50"
              posts={turmobPosts}
            />
          </div>
        )}
      </main>
    </div>
  );
}
