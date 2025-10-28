import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

  function resolveEntryReference(entries: any[], id?: string) {
  if (!id) return "";
  const entry = entries.find(a => a.sys.id === id);
  return entry ? entry : null;
  }

  function fetchCategorySlug(entries: any[], id?: string) {
  if (!id) return "";
  const entry = entries.find(a => a.sys.id === id);
  return entry ? entry.fields.slug : "";
  }

export function Sidebar() {

  const { categorySlug, postSlug } = useParams(); // get current category and post to highlight them for smarter UX experience

  const [posts, setPosts] = useState<any[] | null>(null);
  const [postEntries, setPostEntries] = useState<any[]>([]); 
  const [categories, setCategories] = useState<any[] | null>(null); 
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /* Although I get the categories of posts as entries, I might not get all categories that exist. Therefore I need to fetch the categories as well */ 
  useEffect(() => {
    async function fetchPostsAndCategories() {
      try {
        setLoading(true);
        setError(null);

        // fetch all posts reverse ordered by date
		console.log(`https://cdn.contentful.com/spaces/${
            import.meta.env.VITE_CONTENTFUL_SPACE_ID
          }/environments/master/entries?access_token=${
            import.meta.env.VITE_CONTENTFUL_TOKEN
          }&content_type=post&order=-fields.date`);
        const postRes = await fetch(
          `https://cdn.contentful.com/spaces/${
            import.meta.env.VITE_CONTENTFUL_SPACE_ID
          }/environments/master/entries?access_token=${
            import.meta.env.VITE_CONTENTFUL_TOKEN
          }&content_type=post&order=-fields.date`
        );

        const postData = await postRes.json();
        const postItems = postData.items; /* array of posts */ 

        if (!postItems) throw new Error("Posts not found");

        postItems.length=Math.min(5,postItems.length); /* maximal 5 elements */
		//console.log(postItems.length);
        setPosts(postItems);
		setPostEntries(postData.includes?.Entry || []);

        // fetch all categories
		console.log(`https://cdn.contentful.com/spaces/${
              import.meta.env.VITE_CONTENTFUL_SPACE_ID
            }/environments/master/entries?access_token=${import.meta.env.VITE_CONTENTFUL_TOKEN}&content_type=category`
			);
			
        const categoryRes = await fetch(
          `https://cdn.contentful.com/spaces/${
            import.meta.env.VITE_CONTENTFUL_SPACE_ID
          }/environments/master/entries?access_token=${import.meta.env.VITE_CONTENTFUL_TOKEN}&content_type=category`
        );
        const categoryData = await categoryRes.json();
		const categoryItems = categoryData.items;  /* array of categories */
		  
		if (!categoryItems) throw new Error("Categories not found");
		  
		setCategories(categoryItems);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPostsAndCategories();
	
  }, []);

  if (loading) return <p>⏳ Loading post...</p>;
  if (error) return <p>❌ Error: {error}</p>;
  if (!posts) return <p>Posts not found.</p>;
  if (!categories) return <p>Categories not found.</p>;

  return (
    <aside className="blog-sidebar">
	{/*{console.log(posts)}*/}
      <div className="sidebar-section">
        <h3>Latest Posts</h3>
        <ul>
          {posts.map(p => (
            <li 
			  key={`${p.fields.category.sys.id}-${p.fields.id}`}
			  className={p.fields.slug === postSlug ? "active-post" : ""}
			>
              <Link to={`/blog/${fetchCategorySlug(postEntries,p.fields.category.sys.id)}/${p.fields.slug}`}>{p.fields.title}</Link>
              <p className="meta">
			    {p.fields.date.substr(0,10)} {resolveEntryReference(postEntries,p.fields.category.sys.id) ? `· ${resolveEntryReference(postEntries,p.fields.category.sys.id).fields.name}` : ""}
			  </p>
            </li>
          ))}
        </ul>
      </div>
	  {/*console.log(categories)*/}
      <div className="sidebar-section">
        <h3>Categories</h3>
        <ul>
          {categories.map(c => ( 
			<li
			  key={c.fields.id}
			  className={c.fields.slug === categorySlug ? "active-category" : ""}
			>
              <Link to={`/blog/${c.fields.slug}`}>{c.fields.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
