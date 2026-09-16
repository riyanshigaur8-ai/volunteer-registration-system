export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex min-h-screen max-w-7xl items-center px-6 py-20">
        <div className="max-w-3xl">
          <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
            VolunteerHub V2
          </span>

          <h1 className="mt-6 text-5xl font-bold tracking-tight sm:text-7xl">
            Volunteer for something that matters.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Discover meaningful volunteer opportunities, connect with
            organizations, track your impact, and earn verified certificates.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <button className="rounded-xl bg-white px-6 py-3 font-semibold text-slate-950 transition hover:bg-slate-200">
              Find Opportunities
            </button>

            <button className="rounded-xl border border-white/20 px-6 py-3 font-semibold text-white transition hover:bg-white/10">
              Join as a Volunteer
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}