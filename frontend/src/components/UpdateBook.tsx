import { useEffect, useState } from "react";
import { X } from "lucide-react";
import useBookStore from "../store/bookStore";
import { toast } from "react-toastify";

interface AddBookModalProps {
  bookId: number | null;
  open: boolean;
  onClose: () => void;
}

const UpdateBookModal = ({ bookId, open, onClose }: AddBookModalProps) => {
  const { book, updateBook, fetchBook } = useBookStore();
  const [form, setForm] = useState({
    title: "",
    isbn: "",
    publisher: "",
    publication_year: "",
    total_copies: "",
    shelf_location: "",
    category_id: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open && bookId) {
      fetchBook(bookId);
    }
  }, [open, bookId]);
  useEffect(() => {
    if (book) {
      setForm({
        title: book.title,
        isbn: book.isbn,
        publisher: book.publisher,
        publication_year: book.publication_year,
        total_copies: book.total_copies,
        shelf_location: book.shelf_location,
      });
    }
  }, [book]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await updateBook(book?.id, form);
    toast("Book updated Successfully");
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-lg bg-gray-900 rounded-2xl border border-gray-800 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <div>
            <h2 className="text-xl font-bold text-white">Add New Book</h2>
            <p className="text-sm text-gray-400 mt-1">
              Fill in the details below
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-800 transition text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Title *
              </label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Enter book title"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>

            <div className="col-span-2 sm:col-span-1">
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                ISBN *
              </label>
              <input
                type="text"
                name="isbn"
                value={form.isbn}
                onChange={handleChange}
                placeholder="9780743273565"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Publisher
              </label>
              <input
                type="text"
                name="publisher"
                value={form.publisher}
                onChange={handleChange}
                placeholder="Publisher name"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Year
              </label>
              <input
                type="number"
                name="publication_year"
                value={form.publication_year}
                onChange={handleChange}
                placeholder="2024"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Copies *
              </label>
              <input
                type="number"
                name="total_copies"
                value={form.total_copies}
                onChange={handleChange}
                min={1}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Shelf Location
              </label>
              <input
                type="text"
                name="shelf_location"
                value={form.shelf_location}
                onChange={handleChange}
                placeholder="A3-12"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Category
              </label>
              <select
                name="category_id"
                value={form.category_id}
                onChange={handleChange}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">No category</option>
                <option value="1">Fiction</option>
                <option value="2">Non-Fiction</option>
                <option value="3">Science</option>
                <option value="4">History</option>
                <option value="5">Technology</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-sm font-medium transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg text-sm font-medium transition disabled:opacity-50"
            >
              {loading ? "Adding..." : "Update Book"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateBookModal;
