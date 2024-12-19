"use client";

import { Moon, Sun, Menu } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const tools = [
  { name: "JSON Viewer", href: "/viewer" },
  { name: "JSON Formatter", href: "/formatter" },
  { name: "JSON Validator", href: "/validator" },
  { name: "JSON Editor", href: "/editor" },
  { name: "JSON Minify", href: "/minify" },
  { name: "XML to JSON", href: "/xml-to-json" },
  { name: "CSV to JSON", href: "/csv-to-json" },
  { name: "TSV to JSON", href: "/tsv-to-json" },
  { name: "JSON to XML", href: "/json-to-xml" },
  { name: "JSON to CSV", href: "/json-to-csv" },
  { name: "JSON to Text", href: "/json-to-text" },
  { name: "JSON to TSV", href: "/json-to-tsv" },
];

export function Navigation() {
  const { setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold">
              JSON Tools
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {tools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {tool.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "md:hidden",
            isOpen ? "block" : "hidden"
          )}
        >
          <div className="space-y-1 pb-3 pt-2">
            {tools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="block px-3 py-2 text-base font-medium text-foreground hover:bg-accent"
                onClick={() => setIsOpen(false)}
              >
                {tool.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}