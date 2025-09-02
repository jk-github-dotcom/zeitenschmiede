import { categories } from "../data/blogData";
import { Link } from "react-router-dom";
import { CardHorizontal } from "../components/CardHorizontal";

type LatestPostsProps = {
  numberOfPosts?: number;
};

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

export function LatestPosts({ numberOfPosts }: LatestPostsProps) { 
  const latestPosts = getLatestPosts(numberOfPosts ?? 7);
	
  return (
    <div>
      <h1>Latest Posts</h1>
	  
      <div>
        {latestPosts.map(p => (
          <CardHorizontal
            key={`${p.categoryId}-${p.id}`}
            title={p.title}
            description={p.description}
            image={p.image}
            link={`/blog/${p.categoryId}/${p.id}`}
            date={p.date}
            categoryName={p.categoryName}
           />
        ))}
      </div>
	  
    </div>
  );
}