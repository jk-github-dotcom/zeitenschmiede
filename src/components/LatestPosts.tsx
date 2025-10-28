import { useEffect, useState } from "react";
import { CardHorizontal } from "../components/CardHorizontal";

type LatestPostsProps = {
  numberOfPosts?: number;
};

  function resolveEntryReference(entries: any[], id?: string) {
  if (!id) return "";
  const entry = entries.find(a => a.sys.id === id);
  return entry ? entry : null;
  }
/* we use more general resolveEntryReference(...,...).fields.slug */
/*
  function fetchCategorySlug(entries: any[], id?: string) {
  if (!id) return "";
  const entry = entries.find(a => a.sys.id === id);
  return entry ? entry.fields.slug : "";
  }
*/  
  function resolveAssetReference(assets: any[], id?: string) {
  if (!id) return "";
  const asset = assets.find(a => a.sys.id === id);
  return asset ? asset : null;
  }

export function LatestPosts({ numberOfPosts }: LatestPostsProps) { 

  const [posts, setPosts] = useState<any[] | null>(null);
  const [postEntries, setPostEntries] = useState<any[]>([]);
  const [postAssets, setPostAssets] = useState<any[]>([]);  
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
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

        postItems.length=Math.min((numberOfPosts ? numberOfPosts :5),postItems.length); /* default 5 elements */ /* maximal numberOfPosts elements */
		//console.log(postItems.length);
		
        setPosts(postItems);
		setPostEntries(postData.includes?.Entry || []);
		setPostAssets(postData.includes?.Asset || []);
		
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
	
  }, []);

  if (loading) return <p>⏳ Loading post...</p>;
  if (error) return <p>❌ Error: {error}</p>;
  if (!posts) return <p>No posts found.</p>;

  return (
    <div>

      <h1>Latest Posts</h1>
	  {/*console.log(postAssets)*/}	  
      <div>
        {posts.map(p => (
          <CardHorizontal
            key={`${p.fields.category.sys.id}-${p.fields.id}`}
            title={p.fields.title}
            description={p.fields.excerpt}
            image={resolveAssetReference(postAssets,p.fields.coverImage.sys.id).fields.file.url}
            link={`/blog/${resolveEntryReference(postEntries,p.fields.category.sys.id).fields.slug}/${p.fields.slug}`}
            date={p.fields.date.substr(0,10)}
            categoryName={resolveEntryReference(postEntries,p.fields.category.sys.id).fields.name}
           />
        ))}
      </div>
	  
    </div>
  );
}