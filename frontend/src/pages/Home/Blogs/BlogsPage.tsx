import { CalendarIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { usePost } from "../../../contexts/PostContext";
import { Link } from "react-router-dom";

const POSTS_PER_PAGE = 9;

const BlogsPage = () => {
  const { posts, loading } = usePost();
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const pagedArticles = posts.slice(
    (page - 1) * POSTS_PER_PAGE,
    page * POSTS_PER_PAGE
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-gradient-to-r from-accent to-secondary py-20 pt-44 md:pt-44 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Semua Artikel</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Temukan informasi dan tips terbaru seputar teknologi internet
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-20 pt-26 -mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          <div className="col-span-3 text-center py-12">Loading...</div>
        ) : pagedArticles.length === 0 ? (
          <div className="col-span-3 text-center py-12">Belum ada artikel.</div>
        ) : (
          pagedArticles.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={
                    article.post_image
                      ? `http://127.0.0.1:8000/api/storage/${article.post_image}`
                      : "./assets/placeholder.jpg"
                  }
                  alt={article.post_title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center text-gray-500 text-sm mb-3">
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  {new Date(article.post_date).toLocaleDateString("id-ID", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                  {article.post_title}
                </h3>
                <p className="text-gray-400 mb-4 line-clamp-3">
                  {article.post_konten
                    ?.replace(/<[^>]+>/g, "")
                    .substring(0, 100) || ""}
                  ...
                </p>
                <Link
                  to={`/blogs/${article.id}`}
                  className="inline-flex items-center text-accent font-medium hover:text-secondary transition-colors duration-200 cursor-pointer "
                >
                  Baca Selengkapnya
                  <ArrowRightIcon className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
      {/* Pagination */}
      <div className="space-x-2 flex justify-center py-12">
        <button
          className="px-4 py-2 rounded bg-gray-100 text-gray-600 hover:bg-gray-200"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Prev
        </button>
        {Array.from({ length: totalPages }).map((_, idx) => (
          <button
            key={idx}
            className={`px-4 py-2 rounded ${
              page === idx + 1
                ? "bg-secondary/90 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            onClick={() => setPage(idx + 1)}
          >
            {idx + 1}
          </button>
        ))}
        <button
          className="px-4 py-2 rounded bg-gray-100 text-gray-600 hover:bg-gray-200"
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BlogsPage;
