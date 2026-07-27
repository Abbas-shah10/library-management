import useBookStore from "@/store/bookStore";
import { useEffect, useState } from "react";

const ReturnBook = () => {
  const { book, fetchBook, loading, error } = useBookStore();
  const [bookId, setBookId] = useState("");
  const [returned, setReturned] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [fine, setFine] = useState(0);

  useEffect(() => {
    fetchBook(parseInt(bookId));
  }, [bookId]);

  const handleSearch = () => {
    if (!bookId.trim()) return;

    setReturned(false);
    setFine(0);
  };

  const handleReturn = () => {
    if (!book) return;
    const today = new Date();
    const updated = new Date(book.updatedAt);
    const diffDays = Math.floor(
      (today.getTime() - updated.getTime()) / (1000 * 60 * 60 * 24),
    );
    const daysOverdue = Math.max(diffDays - 14, 0); // 14 days loan period
    setFine(daysOverdue * 10);
    setReturned(true);
  };

  const handleReset = () => {
    setReturned(false);
    setFine(0);
    setSearchValue("");
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white w-full relative">
      {/* Header */}
      <div className="bg-black text-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
              <svg
                className="h-6 w-6 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Return Book</h1>
              <p className="text-sm text-slate-200">
                Search and process book returns
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Search Section */}
        <div className="mb-8 rounded-xl bg-black p-6 shadow-sm ring-1 ring-slate-200">
          <label
            htmlFor="book-search"
            className="block text-sm font-medium text-slate-700 mb-2"
          >
            Enter ISBN Number
          </label>
          <div className="flex gap-3">
            <div className="relative flex-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  className="h-5 w-5 text-slate-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </div>
              <input
                id="book-search"
                type="text"
                placeholder="e.g. 9780743273465"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="block w-full rounded-lg border border-slate-300 bg-white text-black py-3 pl-10 pr-4 text-sm placeholder-slate-400 shadow-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <svg
                    className="h-4 w-4 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Searching...
                </>
              ) : (
                <>
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>
                  Search
                </>
              )}
            </button>
          </div>
        </div>

        {/* Error State */}
        {/* {error && (
          <div className="mb-6 rounded-lg bg-red-50 border border-red-200 p-4">
            <div className="flex items-center gap-2">
              <svg
                className="h-5 w-5 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                />
              </svg>
              <p className="text-sm font-medium text-red-800">{error}</p>
            </div>
          </div>
        )} */}

        {/* Book Details */}
        {book && !returned && searchValue && (
          <div className="rounded-xl bg-white shadow-sm ring-1 ring-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
              <h2 className="text-lg font-semibold text-white">
                Borrowed Book Details
              </h2>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-slate-900">
                  {book.title}
                </h3>
                <p className="text-slate-600">by {book.publisher}</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div className="rounded-lg bg-slate-50 p-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    ISBN
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    {book.isbn}
                  </p>
                </div>
                <div className="rounded-lg bg-slate-50 p-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    Shelf
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    {book.shelf_location}
                  </p>
                </div>
                <div className="rounded-lg bg-slate-50 p-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    Year
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    {book.publication_year}
                  </p>
                </div>
                <div className="rounded-lg bg-slate-50 p-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    Copies
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    {book.available_copies}/{book.total_copies}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 text-sm mb-6">
                <div>
                  <span className="text-slate-500">Last Updated: </span>
                  <span className="font-medium text-slate-900">
                    {new Date(book.updatedAt).toLocaleDateString()}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500">Status: </span>
                  {book.active ? (
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                      Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                      Inactive
                    </span>
                  )}
                </div>
              </div>

              <div className="flex gap-3 border-t border-slate-200 pt-6">
                <button
                  onClick={handleReturn}
                  className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-green-700"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                  Confirm Return
                </button>
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Success State
        {returned && (
          <div className="rounded-xl overflow-hidden shadow-sm ring-1 ring-green-200">
            <div className="bg-gradient-to-r from-green-600 to-green-700 p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                  <svg
                    className="h-7 w-7 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">
                    Return Successful!
                  </h2>
                  <p className="text-green-100">
                    The book has been returned to the library.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6">
              <div className="rounded-lg bg-slate-50 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600">Book Returned</p>
                    <p className="text-lg font-bold text-slate-900">
                      {book?.title}
                    </p>
                  </div>
                  <div className="text-right">
                    {fine > 0 ? (
                      <div>
                        <p className="text-sm text-red-600">Late Fine</p>
                        <p className="text-2xl font-bold text-red-600">
                          ${fine}
                        </p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-sm text-green-600">No Fine</p>
                        <p className="text-lg font-bold text-green-600">
                          On time!
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <button
                onClick={handleReset}
                className="mt-4 w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700"
              >
                Process Another Return
              </button>
            </div>
          </div>
        )} */}

        {/* Empty State */}
        {!book && !error && !loading && (
          <div className="rounded-xl bg-white p-12 shadow-sm ring-1 ring-slate-200 text-center">
            <svg
              className="mx-auto h-16 w-16 text-slate-300"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
              />
            </svg>
            <h3 className="mt-4 text-lg font-semibold text-slate-900">
              No book selected
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              Enter an ISBN number above to search for a borrowed book.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReturnBook;
