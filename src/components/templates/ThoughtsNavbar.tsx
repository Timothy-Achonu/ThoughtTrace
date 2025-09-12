"use client";
import { Moon, Sun, Settings, LogOut, BookOpen } from "lucide-react";
// import { Button } from "../atoms";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { signoutFirebase } from "@/lib/auth/actions";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

export const ThoughtsNavbar = () => {
  const pathname = usePathname();
  const cleanedPathname = pathname
    .split("/")
    .filter((char) => char)
    .join("/");
  const handleLogOut = async () => {
    await signoutFirebase();
    signOut(); //signOut next-auth
  };

  return cleanedPathname.endsWith("thoughts") ? (
    <header className="bg-body-light dark:bg-body-dark backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <BookOpen className="h-8 w-8 text-purple-600 dark:text-purple-400" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Thoughttrace
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <button>
            <Settings className="h-4 w-4" />
          </button>
          <button onClick={() => handleLogOut()}>
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  ) : (
    <></>
  );
};

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="w-4 h-4"
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </button>
  );
}
