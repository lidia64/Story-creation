import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteStory, getStories } from "../Services/StoryServices";
import { useAuth } from "../Context/AuthContext";

export default function StoryList() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    getStories()
      .then((data) => setStories(data))
      .catch((err) => console.error("Error fetching stories:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (storyId) => {
    if (!window.confirm("Are you sure you want to delete this story?")) return;
    await deleteStory(storyId);
    setStories((prev) => prev.filter((s) => s.id !== storyId));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-violet-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900">Stories</h2>
          <p className="mt-1 text-sm text-slate-500">
            {isAuthenticated
              ? "You're logged in — you can create, edit, and delete stories."
              : "Browse stories below. Log in to manage your own."}
          </p>
        </div>
        {isAuthenticated && (
          <Link
            to="/AddStory"
            className="rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700"
          >
            + Write a Story
          </Link>
        )}
      </div>

      {stories.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center text-slate-400">
          No stories yet. Be the first to write one!
        </div>
      ) : (
        <ul className="grid gap-5 sm:grid-cols-2">
          {stories.map((story) => (
            <li
              key={story.id}
              className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-violet-600 mb-1">
                  {story.authorName}
                </p>
                <p className="text-slate-700 leading-relaxed line-clamp-3">{story.content}</p>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                <Link
                  to={`/Story/${story.id}`}
                  className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200"
                >
                  Read
                </Link>
                {isAuthenticated && (
                  <>
                    <Link
                      to={`/UpdateStory/${story.id}`}
                      className="rounded-lg bg-violet-100 px-4 py-2 text-sm font-medium text-violet-700 transition hover:bg-violet-200"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(story.id)}
                      className="rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
