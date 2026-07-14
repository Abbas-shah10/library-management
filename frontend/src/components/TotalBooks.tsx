const TotalBooks = ({ books }: { books: any[] }) => {
  const total = books?.length;
  const available = books?.filter((b) => b.available_copies > 0).length;
  const loaned = total - available;
  const pct = total > 0 ? Math.round((available / total) * 100) : 0;

  return (
    <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm text-gray-400">Total Books</p>
          <p className="text-3xl font-bold text-white mt-1">{total}</p>
        </div>
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-2xl">
          📚
        </div>
      </div>

      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="text-gray-400">Available</span>
          <span className="text-white font-medium">{available}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-amber-400" />
          <span className="text-gray-400">Loaned</span>
          <span className="text-white font-medium">{loaned}</span>
        </div>
      </div>

      <div className="mt-4 h-2 rounded-full bg-gray-800 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500 transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="text-xs text-gray-500 mt-2">
        {pct}% of books are available
      </p>
    </div>
  );
};

export default TotalBooks;
