import Feed from "@/components/Feed";

export default function Home() {
  return (
    <main className="bg-gray-100 h-screen" >
      <section className="w-full flex-center flex-col py-16 text-gray-800">
        <h1 className="text-4xl font-bold text-center">
          Your Health and Wellness Partner
          <br />
          <span className="text-2xl">Health Hub</span>
        </h1>
        <p className="text-lg text-center mt-4">
          Your one-stop shop for health and wellness products
        </p>
        <Feed />
      </section>
    </main>
  );
}
