"use client";

import { Switch } from "@/components/ui/switch";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // Set default theme to dark
  useEffect(() => {
    if (!theme || theme === "system") {
      setTheme("dark");
    }
  }, [theme, setTheme]);

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const isDark = theme === "dark";
  const ICON_SIZE = 16;

  return (
    <div className="flex items-center gap-2">
      <Switch
        checked={isDark}
        className="outline outline-1 outline-offset-2 outline-primary shadow-md"
        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
      />
      <div className="w-8 h-8 overflow-hidden flex items-center justify-center">
        <motion.div
          animate={{ y: isDark ? 22 : -22 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="flex flex-col items-center gap-7"
        >
          <Moon size={ICON_SIZE} className="text-muted-foreground" />
          <Sun size={ICON_SIZE} className="text-muted-foreground" />
        </motion.div>
      </div>
    </div>
  );
};

export { ThemeSwitcher };
