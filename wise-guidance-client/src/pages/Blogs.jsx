import Layout from "../components/layout/Layout";
import blog from "../assets/blog.jpeg";
export default function BlogsPage() {
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
            <div className="blog-card border rounded-xl p-2 space-y-2 ">
              <img src={blog} className="thumbnail"></img>
              <div className="blog-info space-y-4">
                <h1 className="blog-title text-lg font-semibold">
                  Basics of React Framework
                </h1>
                <p className="text-sm w-full">
                  React is a JavaScript library for building user interfaces
                  with reusable components.
                </p>
                <p className="text-sm font-semibold">
                  Blog By : Abhishek Jhakar
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
