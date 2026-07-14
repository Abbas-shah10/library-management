import { useEffect, useState } from "react";
import TotalBooks from "../../../components/TotalBooks";
import useBookStore from "../../../store/bookStore";
import AddBookModal from "./CreateBook";

const Books = () => {
  const { books, fetchBooks, createBook } = useBookStore();
  const [modelOpen, setModelOpen] = useState<boolean>(false);
  useEffect(() => {
    fetchBooks();
  }, []);
  return (
    <div className="min-h-screen bg-gray-950 text-white w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Books</h1>
            <p className="text-gray-400 mt-1">Manage your library collection</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg font-medium transition-all" onClick={()=> setModelOpen(true)}>
            Add New Book
          </button>
            <AddBookModal
              open={modelOpen}
              onClose={() => setModelOpen(false)}
              onSubmit={async (data) => {
                await createBook(data); // from your bookStore
                setModelOpen(false);
                fetchBooks();
              }}
            />
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
            <option>Available</option>
            <option>Loaned Out</option>
            <option>Unavailable</option>
          </select>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <TotalBooks books={books} />
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {books?.map((book, i) => (
            <div
              key={i}
              className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden hover:border-gray-700 transition-all group"
            >
              <div className="h-32 bg-gradient-to-br from-purple-900/40 to-gray-900 flex items-center justify-center border-b border-gray-800">
                <div className="w-16 h-20 bg-gradient-to-b from-purple-600/30 to-pink-600/30 rounded border border-purple-500/20 flex items-center justify-center">
                  <span className="text-3xl">📖</span>
                </div>
              </div>
              <div className="p-4 space-y-3">
                <div>
                  <h3 className="font-semibold text-sm truncate">
                    {book.title}
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">{book.author}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-purple-500/20 text-purple-300 text-xs rounded-full border border-purple-500/30">
                    {book.category}
                  </span>
                  <span className="text-xs text-gray-500">
                    ISBN: {book.isbn.slice(0, 8)}...
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <span className="text-gray-400">
                      Copies:{" "}
                      <span className="text-white font-medium">
                        {book.copies}
                      </span>
                    </span>
                    <span className="text-gray-400">
                      Available:{" "}
                      <span
                        className={`font-medium ${book.available > 0 ? "text-emerald-400" : "text-rose-400"}`}
                      >
                        {book.available}
                      </span>
                    </span>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      book.available > 0
                        ? "bg-emerald-500/20 text-emerald-300"
                        : "bg-rose-500/20 text-rose-300"
                    }`}
                  >
                    {book.available > 0 ? "Available" : "Loaned Out"}
                  </span>
                </div>
                <div className="flex gap-2 pt-1">
                  <button className="flex-1 px-3 py-1.5 bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 text-xs rounded-lg transition border border-purple-500/30">
                    View
                  </button>
                  <button className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs rounded-lg transition">
                    ✏️
                  </button>
                  <button className="px-3 py-1.5 bg-gray-800 hover:bg-red-500/20 text-gray-300 hover:text-red-300 text-xs rounded-lg transition">
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-800">
          <p className="text-sm text-gray-400">Showing 1-6 of 1,247 books</p>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 bg-gray-900 border border-gray-800 rounded-lg text-sm text-gray-400 hover:text-white hover:border-gray-700 transition">
              Previous
            </button>
            <button className="px-3 py-1.5 bg-purple-600/20 border border-purple-500/30 rounded-lg text-sm text-purple-300">
              1
            </button>
            <button className="px-3 py-1.5 bg-gray-900 border border-gray-800 rounded-lg text-sm text-gray-400 hover:text-white hover:border-gray-700 transition">
              2
            </button>
            <button className="px-3 py-1.5 bg-gray-900 border border-gray-800 rounded-lg text-sm text-gray-400 hover:text-white hover:border-gray-700 transition">
              3
            </button>
            <span className="text-gray-600">...</span>
            <button className="px-3 py-1.5 bg-gray-900 border border-gray-800 rounded-lg text-sm text-gray-400 hover:text-white hover:border-gray-700 transition">
              12
            </button>
            <button className="px-3 py-1.5 bg-gray-900 border border-gray-800 rounded-lg text-sm text-gray-400 hover:text-white hover:border-gray-700 transition">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Books;
