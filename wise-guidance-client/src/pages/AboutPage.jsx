import Layout from "../components/layout/Layout";
export default function AboutPage() {
  return (
    <Layout title="About Us">
      {/* <div className="h-full flex items-center justify-center border-black border bg-slate-200">
       */}
      <section className="flex flex-col items-center text-center py-16 px-4 sm:px-8 lg:px-64 m-16 relative">
        <div className="bg-purple h-80 w-80 rounded-full absolute top-48 -left-[260px]"></div>
        <div className="bg-pink-300 h-80 w-80 rounded-full absolute -right-[260px]"></div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 rela">
          Connecting ambition with achievement through meaningful mentorship.
        </h1>
        <p className="text-lg sm:text-xl lg:text-xl my-14">
          MentorBridge aims to connect ambition with achievement through
          meaningful mentor-mentee relationships, ensuring everyone has access
          to guidance that unlocks their potential.
        </p>

        <div className="flex flex-col sm:flex-row items-baseline justify-center space-y-6 sm:space-y-0 sm:space-x-12 my-20">
          <div className="text-center">
            <h2 className="text-4xl sm:text-5xl font-bold">200K+</h2>
            <p className="text-lg">paid customers</p>
          </div>
          <div className="text-center">
            <h2 className="text-4xl sm:text-5xl font-bold">77</h2>
            <p className="text-lg">of the colleges use Wise Guidance</p>
          </div>
          <div className="text-center">
            <h2 className="text-4xl sm:text-5xl font-bold">150+</h2>
            <p className="text-lg">
              countries have daily active users in Wise Guidance
            </p>
          </div>
        </div>
      </section>
      {/* </div> */}
    </Layout>
  );
}
