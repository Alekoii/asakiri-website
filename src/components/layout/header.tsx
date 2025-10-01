"use client";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { useTheme } from "@/providers/theme-provider";
import { Moon, Sun } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/logo.svg";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const navItems = siteConfig.header.nav;
  const brandName = siteConfig.name;

  return (
    <>
      <header className="flex justify-between px-8 py-4 items-center">
        <div className="flex gap-8 items-center">
          <Link href="/" className="flex gap-2 items-center text-foreground">
            <Image src={logo} alt="Asakiri Logo" className="w-8" />
            <span className="text-lg font-semibold tracking-tight">{brandName}</span>
          </Link>
          <nav className="flex">
            <NavigationMenu viewport={false}>
              <NavigationMenuList className="gap-3">
                {navItems.map((item) => (
                  <NavigationMenuItem key={item.label}>
                    <NavigationMenuLink
                      asChild
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "bg-transparent hover:bg-accent/30"
                      )}
                    >
                      <Link href={item.href}>{item.label}</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </nav>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="link">
            <a href={siteConfig.links.github} target="_blank" rel="noreferrer">
              Github
            </a>
          </Button>
          <Button asChild>
            <a href={siteConfig.links.patreon} target="_blank" rel="noreferrer">
              Support
            </a>
          </Button>
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
