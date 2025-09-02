import { useParams } from "react-router-dom";
/* import { Link } from "react-router-dom"; */
import { categories } from "../data/blogData";
import { Sidebar } from "../components/Sidebar";
import { CardHorizontal } from "../components/CardHorizontal";

export function CategoryPage() {
  const { categoryId } = useParams();
  const category = categories.find(c => c.id === categoryId);

  if (!category) return <p>Category not found</p>;

  return (
    <div className="blog-layout">
      <main className="blog-main">
        <h2>{category.name}</h2>
<div>
  {category.posts.map(post => (
    <CardHorizontal
      key={post.id}
      title={post.title}
      description={post.description}
      image={post.image}
      link={`/blog/${category.id}/${post.id}`}
      date={post.date}
    />
  ))}
</div>

      </main>

      <Sidebar />
    </div>
  );
}

export default CategoryPage;

