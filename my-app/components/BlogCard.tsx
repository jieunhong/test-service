import { Calendar, Clock } from 'lucide-react';
import { BlogPostType } from '@/types/blog';

type BlogCardProps = {
  post: BlogPostType;
  onClick: () => void;
};

export function BlogCard({ post, onClick }: BlogCardProps) {
  return (
    <article
      onClick={onClick}
      className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer group"
    >
      <div className="mb-3">
        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
          {post.category}
        </span>
      </div>

      <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
        {post.title}
      </h2>

      <p className="text-gray-600 mb-4 line-clamp-3">
        {post.excerpt}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {post.tags.map(tag => (
          <span
            key={tag}
            className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded"
          >
            #{tag}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-4 text-sm text-gray-500">
        <span className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          {post.date}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          {post.readTime}
        </span>
      </div>
    </article>
  );
}
