import Feed from "@/components/Feed";

export default function Home() {
  return (
    <main className="h-screen" >
      <section className="w-full flex-center flex-col py-16 text-gray-800 ">
        <h1 className="text-4xl text-center  py-16 mx-16 rounded-lg bg-gradient-to-r from-indigo-500 from-10% to-sky-500 to-90%">
          <span className="text-6xl mt-1.5 font-bold text-white">Health Hub</span>
          <p className="text-2xl text-center mt-2 text-white">Your one-stop shop for health and wellness products</p>
        </h1>
        <Feed />
      </section>
    </main>
  );
}
