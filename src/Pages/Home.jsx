export default function Home() {
    return(
        <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-sky-700">React practice project</p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">User Dashboard</h1>
            <p className="mt-4 text-lg leading-8 text-slate-600">
                Learn React concepts through a practical user management project with forms, routing, fetch, Axios, and React Query.
            </p>
            <div className="mt-8 grid gap-4 text-left sm:grid-cols-3">
                <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                    <h2 className="font-semibold text-slate-950">Create</h2>
                    <p className="mt-2 text-sm text-slate-600">Add local users with a clean controlled form.</p>
                </div>
                <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                    <h2 className="font-semibold text-slate-950">Load</h2>
                    <p className="mt-2 text-sm text-slate-600">Compare users loaded with Fetch and Axios.</p>
                </div>
                <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                    <h2 className="font-semibold text-slate-950">Cache</h2>
                    <p className="mt-2 text-sm text-slate-600">Use React Query for cached API data.</p>
                </div>
            </div>
      
        </div>
    );
}
