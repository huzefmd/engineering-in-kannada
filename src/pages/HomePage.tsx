import { useState } from "react";
import coursesData from "../data/courses.json";
import { CourseCard } from "../components/CourseCard";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { AnnouncementBanner } from "../components/AnnouncementBanner";
import { ScrollToTop } from "../components/ScrollToTop";
import { Course } from "../types";
import { useSearchStore } from "../store/search";

export function HomePage() {
  const { query, setQuery } = useSearchStore();
  const [showSearch, setShowSearch] = useState(false);

  const filteredCourses = (coursesData.courses as Course[]).filter(
    (course) =>
      course.title.toLowerCase().includes(query.toLowerCase()) ||
      course.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white text-black dark:bg-dark dark:text-white transition-colors duration-300">
      <ScrollToTop />
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex justify-center">
            {/* Light/Dark Mode Responsive Logo */}
            <img
              src="/images/darklogo.png"
              alt="Engineering in Kannada (Light)"
              className="h-50 w-auto block dark:hidden "
            />
            <img
              src="/images/logo.png"
              alt="Engineering in Kannada (Dark)"
              className="h-50 w-auto hidden dark:block"
            />
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-700 dark:text-gray-300">
            Quality technical education in Kannada, accessible to everyone.
            Start your learning journey today with my free and carefully curated
            content.
          </p>
        </div>

        <div className="mt-8">
          <AnnouncementBanner />
        </div>

        <div className="mt-16">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Available Courses
            </h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowSearch((prev) => !prev)}
                className="text-gray-700 dark:text-gray-200 hover:text-primary text-xl transition"
                aria-label="Search"
              >
                🔍
              </button>
              {showSearch && (
                <input
                  type="text"
                  placeholder="Search courses..."
                  className="rounded-md px-3 py-1 bg-gray-100 text-black dark:bg-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              )}
            </div>
          </div>

          {filteredCourses.length > 0 ? (
            <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {filteredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <p className="mt-4 text-center text-gray-500 dark:text-gray-400">
              No courses found.
            </p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
