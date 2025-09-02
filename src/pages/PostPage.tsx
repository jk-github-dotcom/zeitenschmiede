import { useState } from "react";     
import { useParams, Link } from "react-router-dom";
import { categories } from "../data/blogData";
import ReactMarkdown from "react-markdown";
import { Sidebar } from "../components/Sidebar";

function PostPage() {
  const { categoryId, postId } = useParams<{ categoryId: string; postId: string }>();

  const category = categories.find(c => c.id === categoryId);
  if (!category) return <h2>Category not found</h2>;

  const post = category.posts.find(p => p.id === postId);
  if (!post) return <h2>Post not found</h2>;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
/*  const webhookApiKey = ""; */ /* vercel reports scope issue */

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
	
	  <main className="blog-main">
	    <div className="post-header">
          <h2>{post.title}</h2>
          <p className="meta"><em>{post.date}</em></p>
          <img src={post.image} alt={post.title} width={200} />
        </div>
	  
	    <div className="post-content">
          <ReactMarkdown>{post.content}</ReactMarkdown>
	    </div>
	  
	  {/*        <p>
          <Link to={`/blog/${category.id}`}>← Back to {category.name}</Link>
	  </p> */}
	  
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

