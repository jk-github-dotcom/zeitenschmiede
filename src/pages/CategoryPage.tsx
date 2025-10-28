import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { CardHorizontal } from "../components/CardHorizontal";
import { resolveAssetUrl } from "../utils/contentful"; // optional helper

export function CategoryPage() {
  const { categorySlug } = useParams();

  const [category, setCategory] = useState<any | null>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [assets, setAssets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCategoryAndPosts() {
      try {
        setLoading(true);
        setError(null);

        // 1️⃣ Fetch the category entry by slug
		console.log(`https://cdn.contentful.com/spaces/${import.meta.env.VITE_CONTENTFUL_SPACE_ID}/environments/master/entries?access_token=${import.meta.env.VITE_CONTENTFUL_TOKEN}&content_type=category&fields.slug=${categorySlug}`);
        const catRes = await fetch(
          `https://cdn.contentful.com/spaces/${import.meta.env.VITE_CONTENTFUL_SPACE_ID}/environments/master/entries?access_token=${import.meta.env.VITE_CONTENTFUL_TOKEN}&content_type=category&fields.slug=${categorySlug}`
        );
        const catData = await catRes.json();
        const categoryEntry = catData.items[0];
        if (!categoryEntry) throw new Error("Category not found");

        setCategory(categoryEntry);

        // 2️⃣ Fetch all posts for that category by ID
        const catId = categoryEntry.sys.id;
		console.log(`https://cdn.contentful.com/spaces/${import.meta.env.VITE_CONTENTFUL_SPACE_ID}/environments/master/entries?access_token=${import.meta.env.VITE_CONTENTFUL_TOKEN}&content_type=post&fields.category.sys.id=${catId}`);
        const postRes = await fetch(
          `https://cdn.contentful.com/spaces/${import.meta.env.VITE_CONTENTFUL_SPACE_ID}/environments/master/entries?access_token=${import.meta.env.VITE_CONTENTFUL_TOKEN}&content_type=post&fields.category.sys.id=${catId}`
        );
        const postData = await postRes.json();
        setPosts(postData.items);
        setAssets(postData.includes?.Asset || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCategoryAndPosts();
  }, [categorySlug]);

  if (loading) return <p>⏳ Loading posts...</p>;
  if (error) return <p>❌ Error: {error}</p>;
  if (!category) return <p>Category not found.</p>;

  return (
    <div className="blog-layout">
      <main className="blog-main">
        <h2>{category.fields.name}</h2>
        <p>{category.fields.description}</p>

        <div>
          {posts.length === 0 ? (
            <p>No posts yet in this category.</p>
          ) : (
            posts.map(post => {
              const imageUrl = resolveAssetUrl
                ? resolveAssetUrl(assets, post.fields.coverImage?.sys.id)
                : "https:" + (assets.find(a => a.sys.id === post.fields.coverImage?.sys.id)?.fields.file.url || "");
              return (
                <CardHorizontal
                  key={post.sys.id}
                  title={post.fields.title}
                  description={post.fields.excerpt}
                  image={imageUrl}
                  link={`/blog/${category.fields.slug}/${post.fields.slug}`}
                  date={post.fields.date.substr(0,10)}
                />
              );
            })
          )}
        </div>
      </main>

      <Sidebar />
    </div>
  );
}

export default CategoryPage;


