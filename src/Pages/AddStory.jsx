import { useState } from "react";
import { createStory } from "../Services/StoryServices";
import { useNavigate } from "react-router-dom";

export default function AddStory() {
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!author.trim() || !content.trim()) {
      setErrorMessage("Please fill in both author and content.");
      return;
    }

    try {
      setIsSubmitting(true);
      await createStory({ authorName: author.trim(), content: content.trim() });
      setSuccessMessage("Story created! Redirecting...");
      setTimeout(() => navigate("/ViewStory"), 1200);
    } catch (error) {
      const message =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Failed to create story. Please try again.";
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-8">
      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-xl rounded-2xl border border-slate-200 bg-white p-8 shadow-md"
      >
        <div className="mb-6">
          <span className="text-xs font-semibold uppercase tracking-widest text-violet-600">New Story</span>
          <h2 className="mt-1 text-2xl font-bold text-slate-900">Write Your Story</h2>
        </div>

        {errorMessage && (
          <p className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {errorMessage}
          </p>
        )}
        {successMessage && (
          <p className="mb-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
            {successMessage}
          </p>
        )}

        <div className="mb-4">
          <label className="mb-1.5 block text-sm font-semibold text-slate-700" htmlFor="author">
            Author Name
          </label>
          <input
            id="author"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Your name"
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
          />
        </div>

        <div className="mb-6">
          <label className="mb-1.5 block text-sm font-semibold text-slate-700" htmlFor="content">
            Story Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Once upon a time..."
            rows={6}
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100 resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-lg bg-violet-600 px-4 py-2.5 font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:bg-violet-300"
        >
          {isSubmitting ? "Publishing..." : "Publish Story"}
        </button>
      </form>
    </div>
  );
}
