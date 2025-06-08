import { CalendarIcon } from "@radix-ui/react-icons";
import { useParams } from "react-router-dom";
import { usePost } from "../../../contexts/PostContext";
import { useEffect, useState } from "react";

const BlogDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { getPost } = usePost();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [article, setArticle] = useState<any>(null);

  useEffect(() => {
    if (id) {
      getPost(Number(id)).then(setArticle);
    }
  }, [id, getPost]);

  if (!article)
    return <div className="text-center py-24">Artikel tidak ditemukan.</div>;

  return (
    <div className="container mx-auto px-4 py-12 pt-28 md:pt-44 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
        <div className="mb-6">
          <img
            src={
              article.post_image
                ? `http://127.0.0.1:8000/api/storage/${article.post_image}`
                : "./assets/placeholder.jpg"
            }
            alt={article.post_title}
            className="w-full h-64 object-cover rounded"
          />
        </div>
        <div className="flex items-center text-gray-500 text-sm mb-4">
          <CalendarIcon className="w-4 h-4 mr-2" />
          {new Date(article.post_date).toLocaleDateString("id-ID", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {article.post_title}
        </h1>
        <div
          className="text-gray-700 text-lg prose"
          dangerouslySetInnerHTML={{ __html: article.post_konten }}
        />
      </div>
    </div>
  );
};

export default BlogDetail;
