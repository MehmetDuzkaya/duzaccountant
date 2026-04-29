"use client";

import { Post } from "@/types";
import PostCard from "./PostCard";

interface ColumnSectionProps {
  title: string;
  icon: React.ReactNode;
  colorClass: string;
  borderClass: string;
  bgClass: string;
  posts: Post[];
  showAdminActions?: boolean;
  onEdit?: (post: Post) => void;
  onDelete?: (id: string) => void;
}

export default function ColumnSection({
  title,
  icon,
  colorClass,
  borderClass,
  bgClass,
  posts,
  showAdminActions = false,
  onEdit,
  onDelete,
}: ColumnSectionProps) {
  return (
    <div className={`flex flex-col rounded-xl border-t-4 ${borderClass} bg-slate-50 shadow-sm`}>
      <div className={`${bgClass} rounded-t-lg px-4 py-3 flex items-center gap-2`}>
        <span className={colorClass}>{icon}</span>
        <h2 className={`font-bold text-base ${colorClass}`}>{title}</h2>
        <span className={`ml-auto text-xs font-semibold px-2 py-0.5 rounded-full bg-white/60 ${colorClass}`}>
          {posts.length}
        </span>
      </div>

      <div className="flex flex-col gap-3 p-4 overflow-y-auto max-h-[calc(100vh-220px)]">
        {posts.length === 0 ? (
          <p className="text-slate-400 text-sm text-center py-8">
            Henüz yazı eklenmemiş.
          </p>
        ) : (
          posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              showAdminActions={showAdminActions}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}
