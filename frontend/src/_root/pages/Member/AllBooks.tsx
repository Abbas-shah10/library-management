import { useEffect, useState } from "react";
import useBookStore from "../../../store/bookStore";

const AllBooks = () => {
  const { books, fetchBooks, loading } = useBookStore();
  const [search, setSearch] = useState<string>("");
  useEffect(() => {
    fetchBooks();
  }, []);
  console.log(books);

  const filteredBooks = books.filter((b) =>
    b.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-gray-950 text-white w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Books</h1>
            <p className="text-gray-400 mt-1">
              Search the your library collection
            </p>
          </div>
        </div>
        {/* Filters & Search */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearch(e.target.value)
              }
              placeholder="Search by title, author, or ISBN..."
              className="w-full bg-gray-900 border border-gray-800 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <select className="bg-gray-900 border border-gray-800 rounded-lg px-4 py-2.5 text-sm text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500">
            <option>All Categories</option>
            <option>Fiction</option>
            <option>Non-Fiction</option>
            <option>Science</option>
            <option>History</option>
            <option>Technology</option>
          </select>
          <select className="bg-gray-900 border border-gray-800 rounded-lg px-4 py-2.5 text-sm text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500">
            <option>All Status</option>
            <option>Acive</option>
            <option>InActive</option>
          </select>
        </div>
        {/* Books Grid */}
        <div className="bg-gray-900 rounded-xl shadow-sm overflow-hidden border border-gray-800">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-800 border-b border-gray-700">
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-400 uppercase">
                  Title
                </th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-400 uppercase">
                  ISBN
                </th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-400 uppercase">
                  Available Copies
                </th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-400 uppercase">
                  Status
                </th>
                <th className="text-right py-4 px-6 text-xs font-semibold text-gray-400 uppercase">
                  Publisher
                </th>
                <th className="text-right py-4 px-6 text-xs font-semibold text-gray-400 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : filteredBooks.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-gray-500">
                    No Books found
                  </td>
                </tr>
              ) : (
                filteredBooks.map((b) => (
                  <tr key={b.id} className="hover:bg-gray-800/50 transition">
                    <td className="py-4 px-6 font-medium text-gray-200">
                      {b.title}
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-gray-200">{b.isbn}</span>
                    </td>
                    <td className="py-4 px-6 text-gray-400">
                      {b.available_copies}
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          b.active === false
                            ? "bg-yellow-900/50 text-yellow-400 border border-yellow-700"
                            : b.active === true
                              ? "bg-emerald-900/50 text-emerald-400 border border-emerald-700"
                              : ""
                        }`}
                      >
                        {b.active}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">{b.publisher}</td>
                    <td className="py-4 px-6 text-right">
                      <button className="py-3 px-2 rounded-md bg-blue-600 hover:bg-blue-400 transition-all">
                        Borrow Book
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllBooks;
