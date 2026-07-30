import useBookStore from "@/store/bookStore";
import { useEffect, useState } from "react";

export default function LibraryReservation() {
  const { books, fetchBooks } = useBookStore();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    cardNumber: "",
    name: "",
    email: "",
    phone: "",
    notes: "",
  });

  useEffect(() => {
    fetchBooks();
  }, []);

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
  //   setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  // const filteredBooks = books.filter(
  //   (b) =>
  //     b.title.toLowerCase().includes(bookSearch.toLowerCase()) ||
  //     b.author.toLowerCase().includes(bookSearch.toLowerCase()),
  // );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen text-white bg-gradient-to-br w-full bg-gray-900">
      {/* Header */}
      <div className="bg-black border-b border-indigo-100/60 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-6">
          <div className="flex items-center gap-3 mb-1">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">
                Library Reservation
              </h1>
              <p className="text-sm text-white">Place to hold on a book</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main section */}
      <div className="flex-col md:flex-row flex justify-between mt-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Search by book or member..."
              className="w-full bg-gray-900 border border-gray-800 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <svg
              className="absolute left-3 top-3 h-5 w-5 text-gray-500"
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
          </div>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2.5 rounded-lg font-medium flex items-center gap-2 transition">
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            New Reservation
          </button>
        </div>
      </div>
    </div>
  );
}
