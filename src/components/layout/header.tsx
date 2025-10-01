"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "@/providers/theme-provider";
import { Moon, Sun } from "lucide-react";
import Image from "next/image";
import logo from "../../../public/logo.svg";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <>
      <header className="flex justify-between px-8 py-4 items-center">
        <div className="flex gap-8 items-center">
          <div className="flex gap-2 items-center">
            <Image src={logo} alt="Asakiri Logo" className="w-8" />
            <h1>Asakiri</h1>
          </div>
          <nav className="flex">
            <menu className="flex gap-4">
              <li>
                <a href="">Home</a>
              </li>
              <li>
                <a href="">Download</a>
              </li>
              <li>
                <a href="">Courses</a>
              </li>
            </menu>
          </nav>
        </div>
        <div className="flex gap-2">
          <Button variant="link">
            <a href="https://github.com" target="_blank">
              Github
            </a>
          </Button>
          <Button>Support</Button>
          <Button
            variant="secondary"
            size="icon"
            className="size-9"
            onClick={toggleTheme}
            aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
            aria-pressed={isDark}
          >
            {isDark ? <Sun className="size-5" /> : <Moon className="size-5" />}
          </Button>
        </div>
      </header>
    </>
  );
}
