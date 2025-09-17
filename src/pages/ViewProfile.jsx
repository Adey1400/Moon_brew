import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { account, client, storage } from "../appwriteConfig";
import { useAuth } from "../utils/AuthContext";

const BUCKET_ID = import.meta.env.VITE_APPWRITE_BUCKET_ID;

export default function ViewProfile() {
  const { logoutUser } = useAuth();
  const [me, setMe] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const u = await account.get();
        setMe(u);
      } catch (e) {
        toast.error("Could not load profile");
        navigate("/login", { replace: true });
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/login", { replace: true });
    } catch {
      navigate("/login", { replace: true });
    }
  };

  if (loading) return <div className="p-6 text-center text-green-700 font-semibold">Loading...</div>;
  if (!me) return null;

  // Profile picture URL
  const avatarUrl = me.prefs?.profilePic
    ? `${import.meta.env.VITE_APPWRITE_ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${me.prefs.profilePic}/view?project=${import.meta.env.VITE_APPWRITE_PROJECT_ID}`
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(me.name || "User")}&background=22c55e&color=fff`;

  const displayName = me.name || "User";
  const displayEmail = me.email || "No email";

  return (
    <div className="min-h-screen bg-[#1e1a17] text-white">
      <main className="max-w-4xl mx-auto px-6 md:px-20 py-10 space-y-8">
        {/* Identity card */}
        <section className="bg-[#2f2925] rounded-2xl shadow-md p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            {/* Left: avatar + basic info */}
            <div className="flex items-center gap-5">
              <div className="relative">
                <img
                  src={avatarUrl}
                  alt="Avatar"
                  className="w-24 h-24 rounded-full object-cover ring-2 ring-amber-900"
                />
              </div>

              <div>
                <h2 className="text-2xl font-bold">{displayName}</h2>
                <p className="text-gray-300">{displayEmail}</p>
                <p className="text-xs text-gray-400 mt-1">
                  Personal info is stored securely. Profile photo is optional and can be updated anytime.
                </p>
              </div>
            </div>

            {/* Right: action */}
            <div className="flex-shrink-0 flex gap-3">
              <button
                onClick={() => navigate("/edit-profile")}
                className="bg-amber-800 hover:bg-amber-900 text-white font-semibold px-5 py-2 rounded-xl shadow-md transition w-full md:w-auto"
              >
                Edit profile
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-2 rounded-xl shadow-md transition w-full md:w-auto"
              >
                Logout
              </button>
            </div>
          </div>
        </section>

        {/* Account card */}
        <section className="bg-[#2f2925] rounded-2xl shadow-md p-6">
          <h3 className="text-lg font-bold text-amber-900 mb-4">Account</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-[#3a3028]">
              <p className="text-sm text-gray-400">Name</p>
              <p className="font-semibold">{displayName}</p>
            </div>
            <div className="p-4 rounded-xl bg-[#3a3028]">
              <p className="text-sm text-gray-400">Email</p>
              <p className="font-semibold">{displayEmail}</p>
            </div>
          </div>
        </section>

        {/* Preferences card */}
        <section className="bg-[#2f2925] rounded-2xl shadow-md p-6">
          <h3 className="text-lg font-bold text-amber-900 mb-4">Focus Preferences</h3>
          <ul className="text-gray-300 space-y-2">
            <li>Default focus: 25 min</li>
            <li>Default break: 5 min</li>
            <li>Adaptive plan: Enabled</li>
          </ul>
          <p className="mt-3 text-xs text-gray-400">
            Preferences feed into the adaptive training plan to gradually increase focus span.
          </p>
        </section>
      </main>
    </div>
  );
}