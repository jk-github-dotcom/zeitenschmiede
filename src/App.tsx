import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import HomePage from "./pages/HomePage";
import BlogPage from "./pages/BlogPage";
import CategoryPage from "./pages/CategoryPage";
import PostPage from "./pages/PostPage";
import AboutPage from "./pages/AboutPage";
import "./styles.css";

function App() {
  return (
  <div>
    <BrowserRouter>
	{/*
   	<div className="box-sizing-example"><p>hallo</p></div>
	*/}
	  <Header title="Zeitenschmiede" />
      <nav className="nav">
        <Link to="/">Home</Link> | <Link to="/blog">Blog</Link> | <Link to="/about">About</Link>
      </nav>
	  <p/>	

      <Routes>
        <Route path="/" element={<HomePage />} />
		<Route path="/blog" element={<BlogPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/blog/:categoryId" element={<CategoryPage />} />
		<Route path="/blog/:categoryId/:postId" element={<PostPage />} />
      </Routes>
	  
	  <Footer edition="Edition 08-2025" />
    </BrowserRouter>
	</div>
  );
}

export default App;


