import React from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { ScrollToTop } from "../components/ScrollToTop"; 
import { Github, Loader2 } from "lucide-react";
import { fetchLeaderboardData, GitHubContributor } from "../services/github";

export function LeaderboardPage() {
  const [contributors, setContributors] = React.useState<GitHubContributor[]>(
    []
  );
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchLeaderboardData();
        setContributors(data);
      } catch (err) {
        setError("Failed to load contributor data. Please try again later.");
        console.error("Error loading contributors:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div className="min-h-screen dark:bg-dark bg-white">
      <ScrollToTop /> {/* 🟢 Add ScrollToTop component */}
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 ">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold dark:text-white text-black sm:text-4xl">
            Contributor Leaderboard
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg dark:text-gray-300 text-gray-900">
            Celebrating our amazing contributors who help make engineering
            education accessible in Kannada.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <Loader2 className="h-8 w-8 dark:text-primary   animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center p-8 dark:bg-red-500/10 bg-red-500 rounded-xl border dark:border-red-500/20 border-red-500">
            <p className="dark:text-red-400 text-white">{error}</p>
          </div>
        ) : (
          <div className="mt-8 overflow-hidden rounded-xl dark:bg-white/10 bg-black/70  backdrop-blur-sm border border-white/20">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-white/10">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-4 text-left text-sm font-semibold dark:text-white text-black"
                    >
                      Rank
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-left text-sm font-semibold dark:text-white text-black"
                    >
                      Contributor
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-center text-sm font-semibold dark:text-white text-black"
                    >
                      PRs
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-center text-sm font-semibold dark:text-white text-black"
                    >
                      Issues
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-center text-sm font-semibold dark:text-white text-black"
                    >
                      Commits
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-right text-sm font-semibold dark:text-white text-black"
                    >
                      Profile
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {contributors.map((contributor, index) => (
                    <tr key={contributor.github} className="dark:hover:bg-white/5  hover:bg-black/90">
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex items-center">
                          <span
                            className={`inline-flex items-center justify-center h-8 w-8 rounded-full ${
                              index === 0
                                ? "dark:bg-yellow-500/20 bg-yellow-500/30 text-yellow-500 "
                                : index === 1
                                ? "dark:bg-gray-400/20 bg-gray-400/30 text-gray-400"
                                : index === 2
                                ? "dark:bg-amber-600/20 bg-amber-600/30 text-amber-600 "
                                : "dark:bg-white/10 bg-black text-gray-400 "
                            } text-sm font-semibold`}
                          >
                            #{index + 1}
                          </span>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex items-center">
                          <img
                            src={contributor.profileImage}
                            alt={contributor.name}
                            className="h-10 w-10 rounded-full"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                contributor.name || contributor.github
                              )}&background=random`;
                            }}
                          />
                          <div className="ml-4">
                            <div className="font-medium dark:text-white text-black">
                              {contributor.name || contributor.github}
                            </div>
                            <div className="text-sm dark:text-gray-400 text-gray-200">
                              @{contributor.github}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-center text-sm dark:text-gray-300 text-gray-200">
                        <span className="inline-flex items-center rounded-full bg-primary/20 px-2.5 py-0.5 text-sm font-medium text-primary ">
                          {contributor.prs}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-center text-sm dark:text-gray-300 text-gray-200">
                        <span className="inline-flex items-center rounded-full bg-primary/20 px-2.5 py-0.5 text-sm font-medium text-primary ">
                          {contributor.issues}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-center text-sm dark:text-gray-300 text-gray-200">
                        <span className="inline-flex items-center rounded-full bg-primary/20 px-2.5 py-0.5 text-sm font-medium text-primary ">
                          {contributor.commits}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-right text-sm dark:text-gray-300 text-gray-200">
                        <div className="flex items-center justify-end space-x-3">
                          <a
                            href={contributor.githubProfile}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="dark:text-gray-400 text-gray-200  hover:text-primary transition-colors"
                          >
                            <Github className="h-5 w-5" />
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}