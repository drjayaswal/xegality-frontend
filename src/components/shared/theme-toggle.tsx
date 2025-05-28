"use client"

import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { useIsMounted } from "@/lib/hooks";

const ThemeToggle = ({ className }: { className?: String }) => {
  const isMounted = useIsMounted();

  const { systemTheme, theme, setTheme } = useTheme();

  useEffect(() => { setTheme((theme === "system" ? systemTheme : theme) ?? "dark") }, [])

  function toggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  return (

    <button
      onClick={toggleTheme}
      className={cn("w-[1.6rem] ease hover:bg-foreground/10 ml-3 flex items-center justify-center rounded-full p-1 text-zinc-900 dark:text-zinc-300", className)}
      aria-label="theme-switcher"
    >

      {
        isMounted()
          ? theme === "light"
            ? <Image src="/svg/sun.svg" alt="sun_svg" className="dark:invert bg-transparent" width={20} height={17} />
            : <Image src="/svg/moon.svg" className="dark:invert bg-transparent" alt="sun_svg" width={20} height={17} />
          : <Image src="/svg/moon.svg" alt="sun_svg" className="dark:invert bg-transparent" width={20} height={17} />
      }
    </button >
  )
}

export default ThemeToggle;
