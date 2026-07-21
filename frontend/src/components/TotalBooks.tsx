import { Link } from "react-router-dom";

const TotalBooks = ({ books }: { books: any[] }) => {
  const total = books?.length;
  const available = books?.filter((b) => b.available_copies > 0).length;
  const loaned = total - available;
  const zeroCopies = books?.filter((b) => b.available_copies === 0).length;
  const multipleCopies = books?.filter((b) => b.available_copies > 1).length;
  const pct = total > 0 ? Math.round((available / total) * 100) : 0;

  return (
    <Link to="/admin/books">
      <div className="bg-gray-900 rounded-xl p-5 border border-gray-800 hover:border-gray-700 transition">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-gray-400 uppercase tracking-wide">
              Total Books
            </p>
            <p className="text-3xl font-bold text-white mt-1">{total}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-2xl">
            📚
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm mb-4">
          <div className="bg-gray-800 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-gray-400">Available</span>
            </div>
            <p className="text-white font-bold text-lg mt-1">{available}</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-amber-400" />
              <span className="text-gray-400">Loaned Out</span>
            </div>
            <p className="text-white font-bold text-lg mt-1">{loaned}</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-400" />
              <span className="text-gray-400">Multi Copies</span>
            </div>
            <p className="text-white font-bold text-lg mt-1">
              {multipleCopies}
            </p>
          </div>
          <div className="bg-gray-800 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-400" />
              <span className="text-gray-400">All Loaned</span>
            </div>
            <p className="text-white font-bold text-lg mt-1">{zeroCopies}</p>
          </div>
        </div>

        <div className="h-2 rounded-full bg-gray-800 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500 transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="text-xs text-gray-500 mt-2">
          {pct}% of books have copies available
        </p>
      </div>
    </Link>
  );
};

export default TotalBooks;
