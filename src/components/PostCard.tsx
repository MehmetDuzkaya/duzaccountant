import { Post } from "@/types";

interface PostCardProps {
  post: Post;
  showAdminActions?: boolean;
  onEdit?: (post: Post) => void;
  onDelete?: (id: string) => void;
}

export default function PostCard({
  post,
  showAdminActions = false,
  onEdit,
  onDelete,
}: PostCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("tr-TR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-100 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold text-slate-800 text-sm leading-snug flex-1">
          {post.title}
        </h3>
        {showAdminActions && (
          <div className="flex gap-1 shrink-0">
            <button
              onClick={() => onEdit?.(post)}
              className="p-1 text-blue-500 hover:bg-blue-50 rounded transition-colors"
              title="Düzenle"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </button>
            <button
              onClick={() => onDelete?.(post.id)}
              className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
              title="Sil"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
      <p className="text-slate-600 text-xs mt-2 leading-relaxed line-clamp-3">
        {post.content}
      </p>
      <p className="text-slate-400 text-xs mt-3 pt-2 border-t border-slate-50">
        {formatDate(post.createdAt)}
      </p>
    </div>
  );
}
