"use client";
import Link from "next/link";
import { useAuth } from "../contexts/AuthContext";
import { UserCircle, Car, LogOut } from "lucide-react";

export function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="border-b bg-white dark:bg-black dark:border-zinc-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold dark:text-white">
            <Car className="w-6 h-6" />
            <span>KeyCircle</span>
          </Link>
          
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link href="/dashboard" className="text-sm font-medium hover:text-blue-600 dark:text-zinc-300 dark:hover:text-white transition">
                  Dashboard
                </Link>
                <div className="flex items-center gap-4 ml-4 border-l pl-4 dark:border-zinc-700">
                  <span className="text-sm font-medium dark:text-zinc-200">{user.full_name}</span>
                  <button onClick={logout} className="p-2 text-zinc-500 hover:text-red-500 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition">
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="text-sm font-medium dark:text-zinc-300 hover:text-blue-600 dark:hover:text-white transition">
                  Log in
                </Link>
                <Link href="/auth/signup" className="text-sm font-medium px-4 py-2 bg-black text-white dark:bg-white dark:text-black rounded-full hover:bg-zinc-800 dark:hover:bg-zinc-200 transition">
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
