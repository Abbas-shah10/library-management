import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useBookStore from "../../../store/bookStore";
import useMemberStore from "../../../store/memberStore";
import useLoanStore from "../../../store/loanStore";
import { Search, User, Book, CalendarDays, ArrowLeft, Loader2 } from "lucide-react";

const IssueBook = () => {
  const navigate = useNavigate();
  const { books, fetchBooks } = useBookStore();
  const { members, fetchAllMembers } = useMemberStore();
  const { borrowBook, loading } = useLoanStore();

  const [memberSearch, setMemberSearch] = useState("");
  const [bookSearch, setBookSearch] = useState("");
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [selectedBook, setSelectedBook] = useState<any>(null);
  const [dueDate, setDueDate] = useState("");
  const [step, setStep] = useState<"member" | "book" | "confirm">("member");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchBooks();
    fetchAllMembers();
  }, []);

  const availableBooks = books?.filter((b) => b.available_copies > 0) || [];
  const filteredMembers = members?.filter(
    (m) =>
      m.name?.toLowerCase().includes(memberSearch.toLowerCase()) ||
      m.email?.toLowerCase().includes(memberSearch.toLowerCase()),
  );
  const filteredBooks = availableBooks.filter(
    (b) =>
      b.title?.toLowerCase().includes(bookSearch.toLowerCase()) ||
      b.isbn?.toLowerCase().includes(bookSearch.toLowerCase()),
  );

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  const handleIssue = async () => {
    if (!selectedMember || !selectedBook || !dueDate) return;
    setSubmitting(true);
    await borrowBook({
      member_id: selectedMember.id,
      book_id: selectedBook.id,
      due_date: dueDate,
    });
    setSubmitting(false);
    toast.success(`"${selectedBook.title}" issued to ${selectedMember.name}`);
    navigate("/librarian/dashboard");
  };

  const resetForm = () => {
    setSelectedMember(null);
    setSelectedBook(null);
    setDueDate("");
    setMemberSearch("");
    setBookSearch("");
    setStep("member");
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white w-full p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <button onClick={() => navigate("/librarian/dashboard")} className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold">Issue Book</h1>
            <p className="text-gray-400 text-sm">Borrow a book to a library member</p>
          </div>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center gap-2 text-sm">
          {["member", "book", "confirm"].map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                step === s ? "bg-purple-600 text-white" : i < ["member", "book", "confirm"].indexOf(step) ? "bg-emerald-600 text-white" : "bg-gray-800 text-gray-500"
              }`}>{i + 1}</div>
              <span className={`capitalize ${step === s ? "text-white" : "text-gray-500"}`}>{s}</span>
              {i < 2 && <div className="w-8 h-px bg-gray-700" />}
            </div>
          ))}
        </div>

        {/* Step 1: Select Member */}
        {step === "member" && (
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                <User className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-semibold">Select Member</h2>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={memberSearch}
                onChange={(e) => setMemberSearch(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                autoFocus
              />
            </div>
            <div className="max-h-64 overflow-y-auto space-y-2">
              {filteredMembers?.map((m) => (
                <button
                  key={m.id}
                  onClick={() => { setSelectedMember(m); setStep("book"); }}
                  className={`w-full text-left p-4 rounded-lg border transition ${
                    selectedMember?.id === m.id
                      ? "bg-purple-500/10 border-purple-500/50"
                      : "bg-gray-800/50 border-gray-700/50 hover:border-gray-600"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{m.name}</p>
                      <p className="text-sm text-gray-400">{m.email}</p>
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full bg-gray-700 text-gray-300 capitalize">
                      {m.membership_type}
                    </span>
                  </div>
                </button>
              ))}
              {(!filteredMembers || filteredMembers.length === 0) && (
                <p className="text-center text-gray-500 py-8">No members found</p>
              )}
            </div>
          </div>
        )}

        {/* Step 2: Select Book */}
        {step === "book" && (
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Book className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Select Book</h2>
                <p className="text-sm text-gray-400">Issuing to: <span className="text-emerald-400">{selectedMember?.name}</span></p>
              </div>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search by title or ISBN..."
                value={bookSearch}
                onChange={(e) => setBookSearch(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                autoFocus
              />
            </div>
            <div className="max-h-64 overflow-y-auto space-y-2">
              {filteredBooks.map((b) => (
                <button
                  key={b.id}
                  onClick={() => { setSelectedBook(b); setStep("confirm"); }}
                  className={`w-full text-left p-4 rounded-lg border transition ${
                    selectedBook?.id === b.id
                      ? "bg-purple-500/10 border-purple-500/50"
                      : "bg-gray-800/50 border-gray-700/50 hover:border-gray-600"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{b.title}</p>
                      <p className="text-sm text-gray-400">ISBN: {b.isbn}</p>
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-300">
                      {b.available_copies} available
                    </span>
                  </div>
                </button>
              ))}
              {filteredBooks.length === 0 && (
                <p className="text-center text-gray-500 py-8">No available books found</p>
              )}
            </div>
            <button onClick={() => setStep("member")} className="text-sm text-gray-400 hover:text-white transition">
              &larr; Change member
            </button>
          </div>
        )}

        {/* Step 3: Confirm */}
        {step === "confirm" && (
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                <CalendarDays className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-semibold">Confirm & Set Due Date</h2>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-800/50 rounded-lg p-4">
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Member</p>
                <p className="font-medium">{selectedMember?.name}</p>
                <p className="text-sm text-gray-400">{selectedMember?.email}</p>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-4">
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Book</p>
                <p className="font-medium">{selectedBook?.title}</p>
                <p className="text-sm text-gray-400">ISBN: {selectedBook?.isbn}</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Due Date</label>
              <input
                type="date"
                value={dueDate}
                min={minDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <p className="text-xs text-gray-500 mt-1">Minimum loan period is 1 day</p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep("book")}
                className="px-6 py-3 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 transition"
              >
                Back
              </button>
              <button
                onClick={handleIssue}
                disabled={!dueDate || submitting || loading}
                className="flex-1 px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {submitting || loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  "Issue Book"
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IssueBook;
