import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BookOpen, Calendar, Clock, ArrowRight, User, X } from 'lucide-react';
import { BlogPost } from '../types';

export const BlogSection: React.FC = () => {
  const { blogPosts, t, language } = useApp();
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <section id="blog-section" className="py-16 bg-white dark:bg-slate-900 border-b border-slate-200/70 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              {language === 'ne' ? 'क्यारियर तथा बजार मार्गनिर्देशन' : 'Career Intelligence'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              {t.blogTitle}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              {t.blogSubtitle}
            </p>
          </div>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogPosts.map(post => (
            <div
              key={post.id}
              id={`blog-card-${post.id}`}
              onClick={() => setSelectedPost(post)}
              className="group bg-slate-50/70 dark:bg-slate-800/60 rounded-2xl border border-slate-200/80 dark:border-slate-700 overflow-hidden hover:border-blue-400 dark:hover:border-blue-600 hover:shadow-xl transition-all duration-200 flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold">
                    {post.category}
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-3 text-xs text-slate-400 mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{post.date}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{post.readTime}</span>
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition leading-snug mb-2">
                    {language === 'ne' && post.nepaliTitle ? post.nepaliTitle : post.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-5 pt-2 flex items-center justify-between border-t border-slate-200/60 dark:border-slate-700/60 text-xs font-semibold text-blue-600 dark:text-blue-400">
                <span className="text-slate-500 dark:text-slate-400 font-normal">
                  By {post.author}
                </span>
                <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Read Guide <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Blog Article Reader Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 relative">
            <button
              id="close-blog-reader-btn"
              onClick={() => setSelectedPost(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="h-56 sm:h-72 -mx-6 sm:-mx-8 -mt-6 sm:-mt-8 mb-6 overflow-hidden relative">
              <img
                src={selectedPost.coverImage}
                alt={selectedPost.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6">
                <span className="px-3 py-1 rounded-md bg-blue-600 text-white text-xs font-bold">
                  {selectedPost.category}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
              <span>{selectedPost.date}</span>
              <span>•</span>
              <span>{selectedPost.readTime}</span>
              <span>•</span>
              <span>Author: {selectedPost.author}</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white leading-tight mb-4">
              {language === 'ne' && selectedPost.nepaliTitle ? selectedPost.nepaliTitle : selectedPost.title}
            </h2>

            <div className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed space-y-4 whitespace-pre-line border-t border-slate-100 dark:border-slate-800 pt-4">
              {selectedPost.content}
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <button
                id="close-blog-bottom-btn"
                onClick={() => setSelectedPost(null)}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 cursor-pointer"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
