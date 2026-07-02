import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const features = [
  {
    icon: "✍️",
    title: "Write Your Story",
    desc: "Craft and publish your stories with a clean, distraction-free editor.",
  },
  {
    icon: "📖",
    title: "Explore Stories",
    desc: "Browse a growing collection of stories shared by our community.",
  },
  {
    icon: "🔒",
    title: "Secure & Private",
    desc: "Your account is protected with token-based authentication.",
  },
  {
    icon: "⚡",
    title: "Instant Updates",
    desc: "Edit or delete your stories anytime — changes reflect immediately.",
  },
];

const stats = [
  { value: "500+", label: "Stories Published" },
  { value: "200+", label: "Active Writers" },
  { value: "10K+", label: "Readers Monthly" },
];

export default function Home() {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="-mx-4 sm:-mx-6 lg:-mx-8">

      {/* Hero */}
      <section className="relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1600&auto=format&fit=crop&q=80"
          alt="Open book with warm light"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/80 via-purple-900/70 to-indigo-900/60" />
        <div className="relative mx-auto max-w-4xl px-6 py-32 text-center text-white">
          <span className="inline-block rounded-full bg-white/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest backdrop-blur-sm mb-6">
            Your Story Starts Here
          </span>
          <h1 className="text-5xl font-extrabold leading-tight tracking-tight sm:text-6xl">
            Share Stories That{" "}
            <span className="text-violet-300">Inspire</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80 leading-relaxed">
            A community-driven platform where every voice matters. Write, read, and connect through the power of storytelling.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            {isAuthenticated ? (
              <>
                <Link
                  to="/AddStory"
                  className="rounded-xl bg-violet-500 px-8 py-3.5 font-semibold text-white shadow-lg transition hover:bg-violet-400 hover:shadow-violet-400/40"
                >
                  Write a Story
                </Link>
                <Link
                  to="/ViewStory"
                  className="rounded-xl bg-white/15 px-8 py-3.5 font-semibold text-white backdrop-blur-sm transition hover:bg-white/25"
                >
                  Browse Stories
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/register"
                  className="rounded-xl bg-violet-500 px-8 py-3.5 font-semibold text-white shadow-lg transition hover:bg-violet-400"
                >
                  Get Started Free
                </Link>
                <Link
                  to="/ViewStory"
                  className="rounded-xl bg-white/15 px-8 py-3.5 font-semibold text-white backdrop-blur-sm transition hover:bg-white/25"
                >
                  Browse Stories
                </Link>
              </>
            )}
          </div>
          {isAuthenticated && (
            <p className="mt-6 text-sm text-violet-200">
              Welcome back, <span className="font-semibold">{user?.email}</span> 👋
            </p>
          )}
        </div>
      </section>

      {/* Stats */}
      <section className="bg-violet-700 py-10">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid grid-cols-3 gap-6 text-center text-white">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-3xl font-extrabold">{s.value}</p>
                <p className="mt-1 text-sm text-violet-200">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-slate-50 py-20 px-6">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-violet-600">Why Story Site?</span>
            <h2 className="mt-3 text-3xl font-bold text-slate-900">Everything you need to tell your story</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md hover:-translate-y-1"
              >
                <span className="text-3xl">{f.icon}</span>
                <h3 className="mt-4 font-bold text-slate-900">{f.title}</h3>
                <p className="mt-2 text-sm text-slate-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Showcase image strip */}
      <section className="grid grid-cols-3 h-56 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&auto=format&fit=crop&q=80"
          alt="Books"
          className="h-full w-full object-cover"
        />
        <img
          src="https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=600&auto=format&fit=crop&q=80"
          alt="Writing"
          className="h-full w-full object-cover"
        />
        <img
          src="https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=600&auto=format&fit=crop&q=80"
          alt="Reading"
          className="h-full w-full object-cover"
        />
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-violet-900 to-indigo-900 py-20 px-6 text-center text-white">
        <h2 className="text-3xl font-extrabold sm:text-4xl">Ready to share your story?</h2>
        <p className="mx-auto mt-4 max-w-xl text-violet-200">
          Join hundreds of writers already on the platform. It only takes a minute to get started.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {isAuthenticated ? (
            <Link
              to="/AddStory"
              className="rounded-xl bg-violet-400 px-8 py-3.5 font-semibold text-white transition hover:bg-violet-300"
            >
              Write Now →
            </Link>
          ) : (
            <>
              <Link
                to="/register"
                className="rounded-xl bg-violet-400 px-8 py-3.5 font-semibold text-white transition hover:bg-violet-300"
              >
                Create Account
              </Link>
              <Link
                to="/login"
                className="rounded-xl border border-white/30 px-8 py-3.5 font-semibold text-white transition hover:bg-white/10"
              >
                Sign In
              </Link>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
