import { Calendar, Clock, Tag } from 'lucide-react';
import { BlogPostType } from '@/types/blog';
import { MarkdownRenderer } from './MarkdownRenderer';

type BlogPostProps = {
  post: BlogPostType;
  onBack: () => void;
};

export function BlogPost({ post }: BlogPostProps) {
  return (
    <article className="max-w-4xl mx-auto px-6 py-12">
      {/* Post Header */}
      <header className="mb-8">
        <div className="mb-4">
          <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full">
            {post.category}
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
          <span className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            {post.date}
          </span>
          <span className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            {post.readTime}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Tag className="w-5 h-5 text-gray-400" />
          {post.tags.map(tag => (
            <span
              key={tag}
              className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      </header>

      {/* Post Content */}
      <div className="prose prose-lg max-w-none">
        <MarkdownRenderer content={post.content} />
      </div>
    </article>
  );
}
