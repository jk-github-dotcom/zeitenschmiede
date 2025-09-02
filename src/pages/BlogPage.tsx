import { Link } from "react-router-dom";
import { categories } from "../data/blogData";
import { Sidebar } from "../components/Sidebar";
import { CardHorizontal } from "../components/CardHorizontal";

function BlogPage() {
  return (
    <div className="blog-layout">
	<main className="blog-main">
	
	{/*	  <img src="/images/website.blog.overzicht.banner.himmelsscheibe.1500x750.jpg" width="406" height="203"/> */}
      <h2>Welcome to my blog</h2>
      <p>This is an overview of the blog categories:</p>

	  <div>
		{categories.map(c => (
		  <CardHorizontal
            key={c.id}
            title={c.name}
            description={c.description}
            image={c.image}
            link={`/blog/${c.id}`}
          />
        ))}
      </div>
	  
	</main>
	
    <Sidebar />	
	
    </div>
  );
}

export default BlogPage;



