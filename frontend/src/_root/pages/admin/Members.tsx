import useMemberStore from "@/store/memberStore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Members = () => {
  const {
    fetchAllMembers,
    members,
    deleteMember,
    createMember,
    updateMember,
    fetchMember,
    member,
  } = useMemberStore();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    membership_type: "Student",
    membership_date: "",
    max_books_allowed: 5,
  });
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editMemberId, setEditMemberId] = useState<number | null>(null);

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
      membership_type: "Student",
      membership_date: "",
      max_books_allowed: 5,
    });
    setIsEdit(false);
    setEditMemberId(null);
  };

  useEffect(() => {
    fetchAllMembers();
  }, []);

  useEffect(() => {
    if (isEdit && editMemberId) {
      fetchMember(editMemberId);
    }
  }, [isEdit, editMemberId]);

  useEffect(() => {
    if (isEdit && member && member.id === editMemberId) {
      setFormData({
        name: member.name,
        email: member.email,
        phone: member.phone,
        address: member.address,
        membership_type: member.membership_type,
        membership_date: member.membership_date,
        max_books_allowed: parseInt(member.max_books_allowed),
      });
    }
  }, [member, isEdit, editMemberId]);

  const handleDelete = async (id: number) => {
    setLoading(true);
    await deleteMember(id);
    toast("Member deleted successfully");
    fetchAllMembers();
    setLoading(false);
  };

  const stats = {
    total: members.length,
    student: members.filter((m) => m.membership_type === "Student").length,
    faculty: members.filter((m) => m.membership_type === "Faculty").length,
    public: members.filter((m) => m.membership_type === "Public").length,
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData((prevForm) => ({
      ...prevForm,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEdit && editMemberId) {
        await updateMember(editMemberId, formData);
        toast("Member updated successfully");
      } else {
        const newMember = await createMember(formData);
        if (!newMember) throw new Error("Failed to create member");
        toast("Member created successfully");
      }
      resetForm();
      setShowModal(false);
      fetchAllMembers();
    } catch (error: any) {
      console.log(error.message);
      toast(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (member: any) => {
    setEditMemberId(member.id);
    setIsEdit(true);
    setShowModal(true);
  };

  const filteredMembers = members.filter(
    (m) =>
      m.name?.toLowerCase().includes(search.toLowerCase()) ||
      m.email?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen p-8 w-full bg-gray-950 text-white">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-200">Members Management</h1>
        <p className="text-white mt-1">
          Manage library members and their memberships
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard
          label="Total Members"
          value={stats.total}
          color="gray"
          change="+12%"
        />
        <StatCard
          label="Student"
          value={stats.student}
          color="purple"
          change="+8%"
        />
        <StatCard
          label="Public"
          value={stats.public}
          color="green"
          change="+5%"
        />
        <StatCard
          label="Faculty"
          value={stats.faculty}
          color="blue"
          change="+3%"
        />
      </div>

      {/* Search + Add */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Search by name or email..."
            className="w-full bg-gray-900 border border-gray-800 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <svg
            className="absolute left-3 top-3 h-5 w-5 text-gray-400"
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
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium flex items-center gap-2 transition shadow-sm"
        >
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
          Add Member
        </button>
      </div>

      {/* Table */}
      <div className="bg-gray-800 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-900 border-b border-gray-700">
              <th className="text-left py-4 px-6 text-xs font-semibold text-gray-400 uppercase">
                Member
              </th>
              <th className="text-left py-4 px-6 text-xs font-semibold text-gray-400 uppercase">
                Email
              </th>
              <th className="text-left py-4 px-6 text-xs font-semibold text-gray-400 uppercase">
                Phone
              </th>
              <th className="text-left py-4 px-6 text-xs font-semibold text-gray-400 uppercase">
                Address
              </th>
              <th className="text-left py-4 px-6 text-xs font-semibold text-gray-400 uppercase">
                Type
              </th>
              <th className="text-left py-4 px-6 text-xs font-semibold text-gray-400 uppercase">
                Max Books
              </th>
              <th className="text-left py-4 px-6 text-xs font-semibold text-gray-400 uppercase">
                Joined
              </th>
              <th className="text-right py-4 px-6 text-xs font-semibold text-gray-400 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {loading ? (
              <tr>
                <td colSpan={8} className="py-12 text-center text-gray-400">
                  Loading...
                </td>
              </tr>
            ) : filteredMembers.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-12 text-center text-gray-400">
                  No members found
                </td>
              </tr>
            ) : (
              filteredMembers.map((member) => (
                <tr
                  key={member.id}
                  className="hover:bg-gray-700/50 transition cursor-pointer"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-blue-900/50 flex items-center justify-center text-blue-400 font-semibold">
                        {member.name?.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-medium text-gray-200">
                        {member.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-400">{member.email}</td>
                  <td className="py-4 px-6 text-gray-400">
                    {member.phone || "—"}
                  </td>
                  <td className="py-4 px-6 text-gray-400">
                    {member.address || "—"}
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        member.membership_type === "Student"
                          ? "bg-purple-900/50 text-purple-400"
                          : member.membership_type === "Faculty"
                            ? "bg-blue-900/50 text-blue-400"
                            : "bg-green-900/50 text-green-400"
                      }`}
                    >
                      {member.membership_type}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-400">
                    {member.max_books_allowed}
                  </td>
                  <td className="py-4 px-6 text-gray-500 text-sm">
                    {new Date(member.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button
                      className="text-blue-400 hover:text-blue-300 mr-3 transition"
                      title="Edit"
                      onClick={() => handleEdit(member)}
                    >
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
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(member.id)}
                      className="text-red-400 hover:text-red-300 transition"
                      title="Delete"
                    >
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
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold text-gray-800">
                {isEdit ? "Update Member" : "Add New Member"}
              </h2>
              <button
                onClick={() => {
                  resetForm();
                  setShowModal(false);
                }}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4 text-black">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Membership *
                  </label>
                  <select
                    value={formData.membership_type}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-700"
                  >
                    <option value="Student">Student</option>
                    <option value="Public">Public</option>
                    <option value="Faculty">Faculty</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-700"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Max Books *
                  </label>
                  <input
                    type="number"
                    name="max_books_allowed"
                    value={formData.max_books_allowed}
                    onChange={handleChange}
                    min="1"
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Membership Date
                  </label>
                  <input
                    type="date"
                    name="membership_date"
                    value={formData.membership_date}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-700"
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    resetForm();
                    setShowModal(false);
                  }}
                  className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-4 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition font-medium disabled:opacity-50"
                >
                  {loading
                    ? "Saving..."
                    : isEdit
                      ? "Update Member"
                      : "Add Member"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const StatCard = ({
  label,
  value,
  color,
  change,
}: {
  label: string;
  value: number;
  color: string;
  change: string;
}) => {
  const colors: Record<string, string> = {
    gray: "bg-gray-800 text-white",
    purple: "bg-purple-900/50 text-purple-400",
    green: "bg-green-900/50 text-green-400",
    blue: "bg-blue-900/50 text-blue-400",
  };
  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl shadow-lg p-6 border border-gray-800 hover:border-gray-700 transition">
      <p className="text-sm text-gray-400 uppercase tracking-wide font-medium">
        {label}
      </p>
      <p className="text-4xl font-bold text-white mt-2">{value}</p>
      <div className="mt-4 flex items-center text-sm">
        <span className="text-green-400 font-medium">{change}</span>
        <span className="text-gray-500 ml-2">from last month</span>
      </div>
    </div>
  );
};

export default Members;
