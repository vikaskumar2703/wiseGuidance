import Layout from "../components/layout/Layout";
import { blogs } from "../content/blog.jsx";
import { useNavigate } from "react-router-dom";
export default function BlogsPage() {
  const navigate = useNavigate();
  return (
    <Layout title="Blogs">
      <div className="min-h-screen">
        <div className=" banner h-72 flex justify-center items-center  bg-purple">
          <div className=" text-white w-full flex flex-col items-center">
            <h1 className="text-center font-semibold text-4xl ">Blogs</h1>
            <p className="text-sm w-1/2 text-center mt-4">
              Blogs curated by our experienced mentors to help mentees enhance
              their knowledge and inculcate good habit of reading blogs.
            </p>
          </div>
        </div>
        <div className="section p-20">
          <div className="blogs-container  grid gap-10 grid-cols-3">
            {blogs.map((b) => (
              <div
                className="blog-card border rounded-xl hover:border-2 p-2 space-y-2 "
                onClick={() => {
                  navigate(b.title);
                }}
              >
                <img src={b.img} className="thumbnail h-56 "></img>
                <div className="blog-info space-y-4">
                  <h1 className="blog-title text-lg font-semibold">
                    {b.title}
                  </h1>
                  <p className="text-sm w-full">{b.brief}</p>
                  <p className="text-sm font-semibold">{b.author}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
