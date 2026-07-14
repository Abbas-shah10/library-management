import useAuthStore from "../../store/authStore";
import { User as UserIcon, Shield, Mail } from "lucide-react";

const Profile = () => {
  const user = useAuthStore((state) => state.user);
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-6">Profile</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
              <UserIcon className="w-10 h-10 text-purple-400" />
              <div>
                <p className="text-gray-400 text-sm">Username</p>
                <p className="text-white font-medium">{user?.username}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
              <Mail className="w-10 h-10 text-purple-400" />
              <div>
                <p className="text-gray-400 text-sm">Email</p>
                <p className="text-white font-medium">{user?.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
              <Shield className="w-10 h-10 text-purple-400" />
              <div>
                <p className="text-gray-400 text-sm">Role</p>
                <p className="text-white font-medium">{user?.role}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
