import { CalendarIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { usePost } from "../../../contexts/PostContext";
import { Link } from "react-router-dom";

const PostSection = () => {
  const { posts, loading } = usePost();

  return (
    <section className="py-16 bg-gradient-to-b from-secondary/10 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Artikel Terbaru
          </h2>
          <p className="mt-4 text-md text-gray-400 max-w-2xl mx-auto">
            Temukan informasi dan tips terbaru seputar teknologi internet
          </p>
          <hr className="mx-auto h-px my-8 bg-accent/20 w-[300px] text-center border-0"></hr>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <div className="col-span-3 text-center py-12">Loading...</div>
          ) : posts.length === 0 ? (
            <div className="col-span-3 text-center py-12">
              Belum ada artikel.
            </div>
          ) : (
            posts.slice(0, 6).map((article) => (
              <div
                key={article.id}
                className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={
                      article.post_image
                        ? `http://localhost:8000/api/storage/${article.post_image}`
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
                    className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors duration-200 cursor-pointer hover:text-secondary"
                  >
                    Baca Selengkapnya
                    <ArrowRightIcon className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/blogs"
            className="inline-flex items-center px-6 py-3 bg-accent border border-gray-300 rounded-lg text-white font-medium hover:bg-secondary transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer"
          >
            Lihat Artikel Lainnya
            <ArrowRightIcon className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PostSection;
