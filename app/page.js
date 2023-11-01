import Feed from "@/components/Feed";

export default function Home() {
  return (
    <main>
      <section className="w-full flex-center flex-col">
        <h1 className="text-center">Your Health and Wellness Partner
            <br/>
            <span className="text-center"> Health Hub</span>
        </h1>
        <p className="text-center">Your one stop shop for health and wellness porducts</p>
        <Feed/>
      </section>
    </main>
  )
}
