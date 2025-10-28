import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Sidebar } from "../components/Sidebar";
import ReactMarkdown from "react-markdown";
//import { resolveAssetUrl } from "../utils/contentful";

export function PostPage() {

/*const { categorySlug, postSlug } = useParams();*/ /* we only need postSlug, we do not need categorySlug */
  const {postSlug} = useParams();

  const [post, setPost] = useState<any | null>(null);
  const [postAssets, setPostAssets] = useState<any[]>([]);
  const [postEntries, setPostEntries] = useState<any[]>([]);  
  const [author, setAuthor] = useState<any | null>(null);
  const [authorAssets, setAuthorAssets] = useState<any[]>([]);  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");  

  useEffect(() => {
    async function fetchPost() {
      try {
        setLoading(true);
        setError(null);

        // fetch post by slug
		console.log(`https://cdn.contentful.com/spaces/${
            import.meta.env.VITE_CONTENTFUL_SPACE_ID
          }/environments/master/entries?access_token=${
            import.meta.env.VITE_CONTENTFUL_TOKEN
          }&content_type=post&fields.slug=${postSlug}`);
        const res = await fetch(
          `https://cdn.contentful.com/spaces/${
            import.meta.env.VITE_CONTENTFUL_SPACE_ID
          }/environments/master/entries?access_token=${
            import.meta.env.VITE_CONTENTFUL_TOKEN
          }&content_type=post&fields.slug=${postSlug}`
        );

        const data = await res.json();
        const postItem = data.items[0];

        if (!postItem) throw new Error("Post not found");

        setPost(postItem);
        setPostAssets(data.includes?.Asset || []);
		setPostEntries(data.includes?.Entry || []);

        // fetch author if linked
		console.log(`https://cdn.contentful.com/spaces/${
              import.meta.env.VITE_CONTENTFUL_SPACE_ID
            }/environments/master/entries?access_token=${import.meta.env.VITE_CONTENTFUL_TOKEN}&&content_type=author&sys.id=${
              postItem.fields.author.sys.id
            }`);
			
        if (postItem.fields.author?.sys?.id) {
          const authorRes = await fetch(
            `https://cdn.contentful.com/spaces/${
              import.meta.env.VITE_CONTENTFUL_SPACE_ID
            }/environments/master/entries?access_token=${import.meta.env.VITE_CONTENTFUL_TOKEN}&&content_type=author&sys.id=${
              postItem.fields.author.sys.id
            }`
          );
          const authorData = await authorRes.json();
		  const authorItem = authorData.items[0];
		  
		  if (!authorItem) throw new Error("Author not found");
		  
		  setAuthor(authorItem);
		  setAuthorAssets(authorData.includes?.Asset || []);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
	
  }, [postSlug]);

  if (loading) return <p>⏳ Loading post...</p>;
  if (error) return <p>❌ Error: {error}</p>;
  if (!post) return <p>Post not found.</p>;

  /* get entries by resolving post links (and then in a second step access their assets) */ /* I can access all their fields later on */
  function resolveEntryReference(entries: any[], id?: string) {
  if (!id) return "";
  const entry = entries.find(e => e.sys.id === id);
  return entry ? entry : null;
  }

/* get assets by resolving post or entry links */ /* then I can access all their fields later on */
  function resolveAssetReference(assets: any[], id?: string) {
  if (!id) return "";
  const asset = assets.find(a => a.sys.id === id);
  return asset ? asset : null;
  }
  /* direct link in post */  
  const coverImageAsset      = resolveAssetReference(postAssets, post.fields.coverImage?.sys.id);
  
  /* Author Approach I: get author details from the post includes (Entry and Asset) */
  /* author is a link in post that refers to an entry in includes. That entry has a field picture which in turn is a link to an asset */
  const authorPostEntry      = resolveEntryReference(postEntries, post.fields.author?.sys.id);
  const authorPostImageAsset = resolveAssetReference(postAssets, authorPostEntry.fields.picture?.sys.id);

/* 
  function resolveAssetUrl(assets: any[], id?: string) {
  if (!id) return "";
  const asset = assets.find(a => a.sys.id === id);
  return asset ? "https:" + asset.fields.file.url : "";
  }
  
  const coverImageUrl = resolveAssetUrl(assets, post.fields.coverImage?.sys.id);
*/  
  /* Author Approach II: load author separately and get author details from the author includes (Asset) */
  const authorImageAsset = resolveAssetReference(authorAssets, author.fields.picture?.sys.id);

/* Feedback Handling */  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
	  const webhookApiKey = import.meta.env.VITE_FEEDBACK_WEBHOOK_API_KEY;
	  {/*	  console.log(webhookApiKey); */}
      const res = await fetch(import.meta.env.VITE_FEEDBACK_WEBHOOK_URL!, {
        method: "POST",
        headers: { 
		  "Content-Type": "application/json",
		  "zeitenschmiede_api_key": webhookApiKey,
		  },
        body: JSON.stringify({
          postId: post.id,
          postTitle: post.title,
		  name,
          email,
          message,
        }),
      });

      if (res.ok) {
        setStatus("success");
        setMessage("");
        setEmail("");
		setName("");
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };
  
  return (
    <div className="blog-layout">
        {/*		
        {console.log(post)}
		{console.log(postAssets)}
	    {console.log(postEntries)}
	    {console.log(author)} 
		{console.log(authorImageAsset)}
		*/}
	
      <main className="blog-main">
        <div className="post-header">
		  <h2>{post.fields.title}</h2>
          <p className="meta"><em>{post.fields.date}</em></p>

        {coverImageAsset.fields.file.url && (
          <img className = "post-cover-image"
            src={"https:" + coverImageAsset.fields.file.url}
            alt={coverImageAsset.fields.title}
            style={{ maxWidth: "160px", borderRadius: "8px", marginBottom: "1rem" }}
          />
        )}
        {/* Author Approach I */}
        {authorPostImageAsset && (
          <div className="author-panel" style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
            {authorPostImageAsset.fields.file.url && (
              <img
                src={"https:" + authorPostImageAsset.fields.file.url}
                alt={authorPostImageAsset.fields.title}
                width={48}
                height={48}
                style={{ borderRadius: "50%", marginRight: "0.75rem" }}
              />
            )}
            <span>By {authorPostEntry.fields.name}</span>
          </div>
        )}
		
        {/* Author Approach II */}
		{authorImageAsset && (
          <div className="author-panel" style={{ display: "none", alignItems: "center", marginBottom: "1rem" }}>
            {authorImageAsset.fields.file.url && (
              <img
                src={"https:" + authorImageAsset.fields.file.url}
                alt={authorImageAsset.fields.title}
                width={48}
                height={48}
                style={{ borderRadius: "50%", marginRight: "0.75rem" }}
              />
            )}
            <span>By {author.fields.name}</span>
          </div>
        )}

        </div>
		
        <div className="post-content">
		  {/*console.log(post.fields.content.content[0].content[0].value)*/}
          <ReactMarkdown>{post.fields.content.content[0].content[0].value}</ReactMarkdown>
        </div>

        <hr />
	  
        <h3>Send Feedback</h3>
	  
        <form onSubmit={handleSubmit} className="feedback">
	  	  <p>Name*</p>
          <input
            type="text"
            placeholder="Your name please"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />		
	      <p>eMail*</p>
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
		  <p>Message*</p>		
          <textarea
            placeholder="Your feedback..."
            value={message}
            onChange={e => setMessage(e.target.value)}
            required
          />
		  <p/>
		  <button type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Sending..." : "Send Feedback"}
          </button>
        </form>

        {status === "success" && <p className="feedback-success">✅ Thank you for your feedback!</p>}
        {status === "error" && <p>❌ Something went wrong. Please try again.</p>}
		
      </main>

      <Sidebar />
	  
    </div>
  );
}

export default PostPage;
