import { useState } from "react";
import { toast } from "react-toastify";

const Settings = () => {
  const [activeTab, setActiveTab] = useState<
    "general" | "fines" | "borrowing" | "profile"
  >("general");

  const [general, setGeneral] = useState({
    libraryName: "City Central Library",
    address: "123 Library St, New York, NY",
    phone: "+1 555-0123",
    email: "contact@citylibrary.com",
    openTime: "08:00",
    closeTime: "20:00",
  });

  const [fines, setFines] = useState({
    dailyFine: 1.0,
    maxFine: 50.0,
    gracePeriod: 1,
  });

  const [borrowing, setBorrowing] = useState({
    maxBooksStudent: 5,
    maxBooksFaculty: 10,
    maxBooksPublic: 3,
    loanDaysStudent: 14,
    loanDaysFaculty: 30,
    loanDaysPublic: 7,
    maxRenewals: 2,
  });

  const [profile, setProfile] = useState({
    name: "Admin User",
    email: "admin@library.com",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleSave = (section: string) => {
    toast(`${section} settings saved successfully`);
  };

  const tabs = [
    { key: "general" as const, label: "General", icon: "⚙️" },
    { key: "fines" as const, label: "Fines", icon: "💰" },
    { key: "borrowing" as const, label: "Borrowing", icon: "📖" },
    { key: "profile" as const, label: "Profile", icon: "👤" },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white w-full">
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-gray-900 rounded-xl p-1 border border-gray-800 w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                activeTab === tab.key
                  ? "bg-purple-600 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* General */}
        {activeTab === "general" && (
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 space-y-4">
            <h2 className="text-lg font-semibold mb-4">Library Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Library Name
                </label>
                <input
                  type="text"
                  value={general.libraryName}
                  onChange={(e) =>
                    setGeneral({ ...general, libraryName: e.target.value })
                  }
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Phone
                </label>
                <input
                  type="text"
                  value={general.phone}
                  onChange={(e) =>
                    setGeneral({ ...general, phone: e.target.value })
                  }
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={general.email}
                  onChange={(e) =>
                    setGeneral({ ...general, email: e.target.value })
                  }
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  value={general.address}
                  onChange={(e) =>
                    setGeneral({ ...general, address: e.target.value })
                  }
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Opening Time
                </label>
                <input
                  type="time"
                  value={general.openTime}
                  onChange={(e) =>
                    setGeneral({ ...general, openTime: e.target.value })
                  }
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Closing Time
                </label>
                <input
                  type="time"
                  value={general.closeTime}
                  onChange={(e) =>
                    setGeneral({ ...general, closeTime: e.target.value })
                  }
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                />
              </div>
            </div>
            <div className="pt-4">
              <button
                onClick={() => handleSave("General")}
                className="bg-purple-600 hover:bg-purple-700 px-6 py-2.5 rounded-lg font-medium transition"
              >
                Save Changes
              </button>
            </div>
          </div>
        )}

        {/* Fines */}
        {activeTab === "fines" && (
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 space-y-4">
            <h2 className="text-lg font-semibold mb-4">Fine Configuration</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Daily Fine ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={fines.dailyFine}
                  onChange={(e) =>
                    setFines({
                      ...fines,
                      dailyFine: parseFloat(e.target.value),
                    })
                  }
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Max Fine ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={fines.maxFine}
                  onChange={(e) =>
                    setFines({ ...fines, maxFine: parseFloat(e.target.value) })
                  }
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Grace Period (days)
                </label>
                <input
                  type="number"
                  value={fines.gracePeriod}
                  onChange={(e) =>
                    setFines({
                      ...fines,
                      gracePeriod: parseInt(e.target.value),
                    })
                  }
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                />
              </div>
            </div>
            <div className="pt-4">
              <button
                onClick={() => handleSave("Fines")}
                className="bg-purple-600 hover:bg-purple-700 px-6 py-2.5 rounded-lg font-medium transition"
              >
                Save Changes
              </button>
            </div>
          </div>
        )}

        {/* Borrowing */}
        {activeTab === "borrowing" && (
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 space-y-4">
            <h2 className="text-lg font-semibold mb-4">Borrowing Rules</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                <h3 className="text-sm font-medium text-purple-400 mb-3">
                  Student
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">
                      Max Books
                    </label>
                    <input
                      type="number"
                      value={borrowing.maxBooksStudent}
                      onChange={(e) =>
                        setBorrowing({
                          ...borrowing,
                          maxBooksStudent: parseInt(e.target.value),
                        })
                      }
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-purple-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">
                      Loan Duration (days)
                    </label>
                    <input
                      type="number"
                      value={borrowing.loanDaysStudent}
                      onChange={(e) =>
                        setBorrowing({
                          ...borrowing,
                          loanDaysStudent: parseInt(e.target.value),
                        })
                      }
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-purple-500 outline-none"
                    />
                  </div>
                </div>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                <h3 className="text-sm font-medium text-blue-400 mb-3">
                  Faculty
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">
                      Max Books
                    </label>
                    <input
                      type="number"
                      value={borrowing.maxBooksFaculty}
                      onChange={(e) =>
                        setBorrowing({
                          ...borrowing,
                          maxBooksFaculty: parseInt(e.target.value),
                        })
                      }
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-purple-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">
                      Loan Duration (days)
                    </label>
                    <input
                      type="number"
                      value={borrowing.loanDaysFaculty}
                      onChange={(e) =>
                        setBorrowing({
                          ...borrowing,
                          loanDaysFaculty: parseInt(e.target.value),
                        })
                      }
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-purple-500 outline-none"
                    />
                  </div>
                </div>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                <h3 className="text-sm font-medium text-green-400 mb-3">
                  Public
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">
                      Max Books
                    </label>
                    <input
                      type="number"
                      value={borrowing.maxBooksPublic}
                      onChange={(e) =>
                        setBorrowing({
                          ...borrowing,
                          maxBooksPublic: parseInt(e.target.value),
                        })
                      }
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-purple-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">
                      Loan Duration (days)
                    </label>
                    <input
                      type="number"
                      value={borrowing.loanDaysPublic}
                      onChange={(e) =>
                        setBorrowing({
                          ...borrowing,
                          loanDaysPublic: parseInt(e.target.value),
                        })
                      }
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-purple-500 outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700 md:w-1/3">
              <label className="block text-sm text-gray-400 mb-1">
                Max Renewals
              </label>
              <input
                type="number"
                value={borrowing.maxRenewals}
                onChange={(e) =>
                  setBorrowing({
                    ...borrowing,
                    maxRenewals: parseInt(e.target.value),
                  })
                }
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>
            <div className="pt-4">
              <button
                onClick={() => handleSave("Borrowing")}
                className="bg-purple-600 hover:bg-purple-700 px-6 py-2.5 rounded-lg font-medium transition"
              >
                Save Changes
              </button>
            </div>
          </div>
        )}

        {/* Profile */}
        {activeTab === "profile" && (
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 space-y-4">
            <h2 className="text-lg font-semibold mb-4">Profile Settings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) =>
                    setProfile({ ...profile, name: e.target.value })
                  }
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) =>
                    setProfile({ ...profile, email: e.target.value })
                  }
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                />
              </div>
            </div>

            <hr className="border-gray-800 my-6" />
            <h3 className="text-md font-semibold mb-4">Change Password</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  value={profile.currentPassword}
                  onChange={(e) =>
                    setProfile({ ...profile, currentPassword: e.target.value })
                  }
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  value={profile.newPassword}
                  onChange={(e) =>
                    setProfile({ ...profile, newPassword: e.target.value })
                  }
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={profile.confirmPassword}
                  onChange={(e) =>
                    setProfile({ ...profile, confirmPassword: e.target.value })
                  }
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>
            </div>
            <div className="pt-4">
              <button
                onClick={() => handleSave("Profile")}
                className="bg-purple-600 hover:bg-purple-700 px-6 py-2.5 rounded-lg font-medium transition"
              >
                Save Changes
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
