import { useEffect } from "react";
import { usePost } from "../../../contexts/PostContext";
import { useNavigate } from "react-router-dom";

const PostAdminPage = () => {
  const { posts, totalPages, currentPage, loading, fetchPosts, deletePost } =
    usePost();

  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm("Hapus post ini?")) {
      await deletePost(id);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 lg:ml-64 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4 sm:mb-0">
            Manajemen Post
          </h1>
          <button
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-150 flex items-center justify-center"
            onClick={() => navigate("/admin/post/create")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Tambah Post Baru
          </button>
        </div>

        {loading && posts.length === 0 ? (
          <div className="text-center py-10 text-gray-500">Memuat post...</div>
        ) : posts.length === 0 && !loading ? (
          <div className="text-center py-10 text-gray-500">Belum ada post.</div>
        ) : (
          <div className="bg-white shadow-lg rounded-xl overflow-hidden">
            <table className="w-full text-sm text-left text-gray-600">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Judul
                  </th>
                  <th scope="col" className="px-6 py-3 ">
                    Tanggal
                  </th>
                  <th scope="col" className="px-6 py-3 text-right">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr
                    key={post.id}
                    className="bg-white border-b hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {post.post_title}
                    </td>
                    <td className="px-6 py-4">
                      {new Date(post.post_date).toLocaleDateString("id-ID", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        className="font-medium text-blue-600 hover:text-blue-800"
                        onClick={() => navigate(`/admin/post/${post.id}/edit`)}
                      >
                        Edit
                      </button>
                      <button
                        className="font-medium text-red-600 hover:text-red-800"
                        onClick={() => handleDelete(post.id)}
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {/* Previous */}
            <button
              onClick={() => currentPage > 1 && fetchPosts(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
        ${
          currentPage === 1
            ? "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed"
            : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
        }`}
            >
              Previous
            </button>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
          ${
            currentPage === idx + 1
              ? "bg-blue-600 text-white shadow-md"
              : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
          }`}
                onClick={() => fetchPosts(idx + 1)}
              >
                {idx + 1}
              </button>
            ))}

            {/* Next */}
            <button
              onClick={() =>
                currentPage < totalPages && fetchPosts(currentPage + 1)
              }
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
        ${
          currentPage === totalPages
            ? "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed"
            : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
        }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostAdminPage;
