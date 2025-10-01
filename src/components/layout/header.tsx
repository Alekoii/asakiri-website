"use client";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { useTheme } from "@/providers/theme-provider";
import { Menu, Moon, Sun } from "lucide-react";
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
      <header className="border-b border-border/60 bg-background">
        <div className="flex w-full items-center justify-between gap-4 px-4 py-4 md:px-8">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 text-foreground">
              <Image src={logo} alt="Asakiri Logo" className="w-8" />
              <span className="text-lg font-semibold tracking-tight">
                {brandName}
              </span>
            </Link>
          </div>

          <nav className="hidden md:flex">
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

          <div className="flex items-center gap-2">
            <Button
              asChild
              variant="link"
              size="sm"
              className="hidden sm:inline-flex"
            >
              <a href={siteConfig.links.github} target="_blank" rel="noreferrer">
                Github
              </a>
            </Button>
            <Button asChild size="sm">
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
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  aria-label="Open navigation menu"
                >
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="gap-6 p-6">
                <SheetHeader className="p-0">
                  <SheetTitle className="flex items-center gap-2 text-lg">
                    <Image src={logo} alt="Asakiri Logo" className="w-7" />
                    {brandName}
                  </SheetTitle>
                  <SheetDescription>
                    Navigate across the platform and manage your course tools.
                  </SheetDescription>
                </SheetHeader>

                <nav className="flex flex-col gap-3 text-base font-medium text-foreground">
                  {navItems.map((item) => (
                    <Link
                      key={`mobile-${item.label}`}
                      href={item.href}
                      className="rounded-lg bg-muted/40 px-4 py-2 transition hover:bg-muted"
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>

                <SheetFooter className="p-0">
                  <div className="flex flex-col gap-2">
                    <Button asChild size="sm">
                      <a
                        href={siteConfig.links.patreon}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Support Asakiri
                      </a>
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={toggleTheme}
                      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
                      aria-pressed={isDark}
                    >
                      {isDark ? "Use light mode" : "Use dark mode"}
                    </Button>
                  </div>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  );
}
