import { Link, useParams } from "react-router-dom";
import { categories } from "../data/blogData";

// Helper: flatten posts across categories
function getLatestPosts(limit: number) {
  const allPosts = categories.flatMap(category =>
    category.posts.map(post => ({
      ...post,
      categoryId: category.id,
      categoryName: category.name,
    }))
  );

  return allPosts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}

export function Sidebar() {
  const { categoryId, postId } = useParams(); // 🚀 get current category and post to highlight them for smarter UX experience
  const latestPosts = getLatestPosts(7); // show 7 latest posts

  return (
    <aside className="blog-sidebar">
      <div className="sidebar-section">
        <h3>Latest Posts</h3>
        <ul>
          {latestPosts.map(p => (
            <li 
			  key={`${p.categoryId}-${p.id}`}
			  className={p.id === postId ? "active-post" : ""}
			>
              <Link to={`/blog/${p.categoryId}/${p.id}`}>{p.title}</Link>
              <p className="meta">{p.date}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="sidebar-section">
        <h3>Categories</h3>
        <ul>
          {categories.map(c => (
            <li
			  key={c.id}
			  className={c.id === categoryId ? "active-category" : ""}
			>
              <Link to={`/blog/${c.id}`}>{c.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
