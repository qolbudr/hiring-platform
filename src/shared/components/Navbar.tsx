import { useAuthStore } from "@/module/auth/store/auth.store";

export const Navbar = () => {
  const store = useAuthStore();

  return (
    <div className="w-full shadow-md bg-white flex flex-row justify-center fixed left-0 right-0 top-0 z-10">
      <div className="w-full max-w-7xl p-4 flex justify-end space-x-4 items-center">
        <p>{store.user?.name}</p>
        <div className="h-6 border-l border-l-neutral-40"></div>
        <img src={`https://ui-avatars.com/api/?name=${store.user?.name}`} className="w-10 h-10 rounded-full" alt="user-avatar"></img>
      </div>
    </div>
  )
}