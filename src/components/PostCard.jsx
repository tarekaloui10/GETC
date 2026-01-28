import Heart from "./heart.svg";
import Com from "./comments.svg";

export default function PostCard({ username, content }) {
  return (
    <div className="
      bg-white dark:bg-gray-800
      rounded-lg shadow-sm
      p-4 mb-4
      transition-colors
    ">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600"></div>

        <span className="font-semibold text-sm text-gray-900 dark:text-gray-100">
          {username}
        </span>
      </div>
      <p className="text-gray-800 dark:text-gray-200 text-sm">
        {content}
      </p>
      <div className="flex gap-4 mt-3">
        <button className="opacity-70 hover:opacity-100 transition">
          <img
            src={Heart}
            alt="like"
            className="w-5 h-5 dark:invert"
          />
        </button>

        <button className="opacity-70 hover:opacity-100 transition">
          <img
            src={Com}
            alt="comment"
            className="w-5 h-5 dark:invert"
          />
        </button>
      </div>
    </div>
  );
}
