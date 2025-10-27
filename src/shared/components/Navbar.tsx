import { useState, useRef, useEffect } from "react";
import { useAuthStore } from "@/module/auth/store/auth.store";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";

export const Navbar = () => {
  const store = useAuthStore();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleLogout = async () => {
    await store.logout();
    router.replace("/auth/login");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full shadow-md bg-white flex flex-row justify-center fixed left-0 right-0 top-0 z-10">
      <div className="w-full max-w-7xl p-4 flex justify-end space-x-4 items-center">
        <p>{store.user?.name}</p>
        <div className="h-6 border-l border-l-neutral-40"></div>

        <div className="relative" ref={dropdownRef}>
          <img
            src={`https://ui-avatars.com/api/?name=${store.user?.name}`}
            className="w-10 h-10 rounded-full cursor-pointer"
            alt="user-avatar"
            onClick={() => setOpen((prev) => !prev)}
          />

          {open && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg">
              <button
                onClick={handleLogout}
                className="block w-full cursor-pointer text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
                <Icon icon="tabler:logout-2" className="inline-block mr-2" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
