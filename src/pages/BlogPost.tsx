import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBlogPost } from '../utils/blogUtils';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ScrollToTop } from '../components/ScrollToTop'; // 🟢 Import ScrollToTop component
import { ArrowLeft } from 'lucide-react';

export const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const blog = slug ? getBlogPost(slug) : null;

  if (!blog) {
    return (
      <div className="min-h-screen dark:bg-dark bg-white dark:text-white text-black">
        <ScrollToTop /> {/* 🟢 Add ScrollToTop component */}
        <Header />
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-4">Blog Post Not Found</h1>
          <Link to="/blogs" className="dark:text-primary text-black hover:underline">
            ← Back to Blogs
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen dark:bg-dark bg-white dark:text-white text-black">
      <ScrollToTop /> {/* 🟢 Add ScrollToTop component */}
      <Header />
      <div className="container mx-auto px-4 py-12">
        <Link
          to="/blogs"
          className="inline-flex items-center gap-2 dark:text-primary text-black hover:text-primary/80 transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blogs
        </Link>
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {blog.metadata.title}
            </h1>
            <div className="flex items-center gap-6 dark:text-gray-400 text-gray-600 text-sm">
              <span>
                By{" "}
                {blog.metadata.authorUrl ? (
                  <a
                    href={blog.metadata.authorUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {blog.metadata.author}
                  </a>
                ) : (
                  blog.metadata.author
                )}
              </span>
              <span>{new Date(blog.metadata.date).toLocaleDateString()}</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mb-8">
            {blog.metadata.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 dark:bg-primary/10 bg-primary/50 rounded-full text-sm dark:text-primary text-black"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="h-px bg-white/10 mb-12"></div>
          <article className="prose dark:prose-invert max-w-none [&_*]:text-black dark:[&_*]:text-white">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {blog.content}
            </ReactMarkdown>
          </article>
        </div>
      </div>
      <Footer />
    </div>
  );
};