import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { account, storage } from "../appwriteConfig";
import { useAuth } from "../utils/AuthContext";
import { ID, Permission, Role } from "appwrite";

const BUCKET_ID = import.meta.env.VITE_APPWRITE_BUCKET_ID;

export default function EditProfile() {
  const { logoutUser } = useAuth();
  const [me, setMe] = useState(null);
  const [name, setName] = useState("");
  const [profilePicId, setProfilePicId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const inputRef = useRef();
  const navigate = useNavigate();

  // Load current user
  useEffect(() => {
    const load = async () => {
      try {
        const u = await account.get();
        setMe(u);
        setName(u.name ?? "");
        setProfilePicId(u.prefs?.profilePic || null);
      } catch (err) {
        toast.error("Failed to load profile");
        navigate("/login", { replace: true });
      } finally {
        setInitialLoading(false);
      }
    };
    load();
  }, [navigate]);

  // Upload profile picture
  const handlePicUpload = async (e) => {
    if (!me) return toast.error("User not loaded yet");

    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    try {
      const uploaded = await storage.createFile(BUCKET_ID, ID.unique(), file, [
        Permission.read(Role.any()),
        Permission.update(Role.user(me.$id)),
        Permission.delete(Role.user(me.$id)),
      ]);
      await account.updatePrefs({ profilePic: uploaded.$id });
      setProfilePicId(uploaded.$id);
      toast.success("Profile picture updated ✅");
    } catch (err) {
      console.error(err);
      toast.error(err?.message || "Upload failed");
    } finally {
      setLoading(false);
      e.target.value = ""; // reset input
    }
  };

  // Save name (and navigate to /view)
  const saveName = async () => {
    if (!name.trim()) return toast.error("Name is required");
    setLoading(true);
    try {
      await account.updateName(name.trim());
      const u = await account.get();
      setMe(u);
      toast.success("Profile saved");
      navigate("/view"); // Navigate after saving
    } catch (e) {
      toast.error(e?.message || "Could not update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/login", { replace: true });
    } catch {
      navigate("/login", { replace: true });
    }
  };

  if (initialLoading) return <div className="p-6">Loading...</div>;
  if (!me) return null;

  const profilePicUrl = profilePicId
    ? `${import.meta.env.VITE_APPWRITE_ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${profilePicId}/view?project=${import.meta.env.VITE_APPWRITE_PROJECT_ID}`
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(me.name || "User")}&background=22c55e&color=fff`;

  return (
    <div className="min-h-screen bg-[#1e1a17] text-white">
      {/* Header */}
      <header className="px-6 md:px-20 py-6 bg-gradient-to-r from-[#2d2420] to-[#3a3028] shadow-md">
        <h1 className="text-2xl md:text-3xl font-extrabold">Edit Profile</h1>
        <p className="text-sm text-gray-300">Update your details and profile photo.</p>
      </header>

      <main className="max-w-3xl mx-auto px-6 md:px-20 py-10">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            saveName();
          }}
          className="space-y-8"
        >
          {/* Profile photo */}
          <section className="bg-[#2f2925] rounded-2xl shadow-md p-6">
            <h3 className="text-lg font-bold text-amber-900 mb-4">Profile photo</h3>
            <div className="flex items-center gap-5">
              <div className="w-24 h-24 rounded-full bg-[#3a3028] ring-2 ring-amber-900 overflow-hidden">
                <img
                  src={profilePicUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex flex-col gap-3">
                <input
                  ref={inputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePicUpload}
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  className="px-4 py-2 rounded-xl bg-amber-800 hover:bg-amber-900 transition disabled:opacity-60"
                  disabled={loading}
                >
                  Choose Image
                </button>
              </div>
            </div>
          </section>

          {/* Basic info */}
          <section className="bg-[#2f2925] rounded-2xl shadow-md p-6 space-y-4">
            <h3 className="text-lg font-bold text-amber-900">Basic information</h3>
            <div className="grid grid-cols-1 gap-4">
              <label className="block">
                <span className="text-sm text-gray-300">Display name</span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 w-full rounded-xl bg-[#3a3028] text-white px-3 py-2 outline-none ring-1 ring-transparent focus:ring-amber-800 placeholder:text-gray-400"
                  placeholder="Your name"
                />
              </label>

              <label className="block">
                <span className="text-sm text-gray-300">Email</span>
                <input
                  value={me.email || ""}
                  disabled
                  className="mt-1 w-full rounded-xl bg-[#3a3028] text-white px-3 py-2 outline-none ring-1 ring-transparent opacity-80 cursor-not-allowed"
                />
              </label>
            </div>
          </section>

          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 rounded-xl bg-amber-800 hover:bg-amber-900 disabled:opacity-60 transition"
            >
              {loading ? "Saving..." : "Save changes"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/view")}
              className="px-5 py-2 rounded-xl border border-amber-800 hover:bg-amber-900/30 transition"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="ml-auto px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}