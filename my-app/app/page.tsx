'use client';

import { useState } from 'react';
import { BlogList } from '@/components/BlogList';
import { BlogPost } from '@/components/BlogPost';
import { About } from '@/components/About';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { blogPosts } from '@/data/blogPosts';

export default function Home() {
  const [currentPage, setCurrentPage] = useState<'home' | 'about'>('home');
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const currentPost = selectedPost
    ? blogPosts.find(post => post.id === selectedPost)
    : null;

  const handleBackToHome = () => {
    setCurrentPage('home');
    setSelectedPost(null);
    setSearchQuery('');
    setSelectedCategory(null);
    setSelectedTag(null);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header
        onLogoClick={handleBackToHome}
        showBackButton={!!selectedPost || currentPage === 'about'}
        currentPage={currentPage}
        onNavigate={setCurrentPage}
      />

      <main>
        {currentPage === 'about' ? (
          <About />
        ) : selectedPost && currentPost ? (
          <BlogPost
            post={currentPost}
            onBack={handleBackToHome}
          />
        ) : (
          <>
            <Hero />
            <BlogList
              posts={blogPosts}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedTag={selectedTag}
              setSelectedTag={setSelectedTag}
              onPostClick={setSelectedPost}
            />
          </>
        )}
      </main>

      <footer className="bg-gray-900 text-gray-400 py-12 mt-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p>&copy; 2026 Backend Dev Blog. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
