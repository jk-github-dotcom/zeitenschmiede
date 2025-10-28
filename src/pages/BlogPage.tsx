import { Sidebar } from "../components/Sidebar";
import { CardHorizontal } from "../components/CardHorizontal";
import { useEffect, useState } from "react";

function BlogPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [assets, setAssets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

//  console.log(import.meta.env.VITE_CONTENTFUL_SPACE_ID);
//  console.log(import.meta.env.VITE_CONTENTFUL_TOKEN);
  console.log(`https://cdn.contentful.com/spaces/${import.meta.env.VITE_CONTENTFUL_SPACE_ID}/environments/master/entries?access_token=${import.meta.env.VITE_CONTENTFUL_TOKEN}&content_type=category`);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await fetch(
          `https://cdn.contentful.com/spaces/${import.meta.env.VITE_CONTENTFUL_SPACE_ID}/environments/master/entries?access_token=${import.meta.env.VITE_CONTENTFUL_TOKEN}&content_type=category`
        );
		if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setCategories(data.items);
        setAssets(data.includes.Asset);
//	    console.log(data.items.length);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
      } 
    }
    fetchData();
  },[]);
  
  if (loading) return <p>⏳ Loading posts...</p>;
  if (error) return <p>❌ Error: {error}</p>;
  
  function getImageUrl(cat: any, assets: any[]) {
    const asset = assets.find(
     (a) => a.sys.id === cat.fields.image.sys.id
    );
    return asset ? "https:" + asset.fields.file.url : "";
  }
 
  return (
    <div className="blog-layout">
	  <main className="blog-main">
	  {/*	  <img src="/images/website.blog.overzicht.banner.himmelsscheibe.1500x750.jpg" width="406" height="203"/> */}
	
        <h2>Welcome to my blog</h2>
        <p>This is an overview of the blog categories:</p>

	    <div>
{/*        
          {console.log(categories)}
	      {console.log(assets)}
*/}
         {categories.map(cat => {
           const imageUrl = getImageUrl(cat, assets);
           return (
             <CardHorizontal
               key={cat.fields.id}
               title={cat.fields.name}
               description={cat.fields.description}
               image={imageUrl}
               link={`/blog/${cat.fields.slug}`}
             />
           );
         })}
        </div>
	  </main>
      <Sidebar />	
    </div>
  );
}

export default BlogPage;



