"use client"

import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {

  const [isDarkMode, setIsDarkMode] = React.useState(false);

  React.useEffect(() => {
  const rootElement = document.documentElement;
  const storedTheme = localStorage.getItem('theme');
  const isDarkOs = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (storedTheme) {
      setIsDarkMode(storedTheme === 'dark');
      rootElement.classList.toggle('dark', storedTheme ==='dark');
    } else {
      setIsDarkMode(isDarkOs);
      rootElement.classList.toggle('dark', isDarkOs);
    }
  }, []);

  function toggleTheme() {
    const rootElement = document.documentElement;

    if (isDarkMode) {
    
      setIsDarkMode(false);
      rootElement.classList.toggle('dark' , false);
      localStorage.setItem('theme', 'light')
    } else {
      setIsDarkMode(true);
      rootElement.classList.toggle('dark' , true);
      localStorage.setItem('theme', 'dark')
    }
  }
  return (
    <SwitchPrimitive.Root
      checked={isDarkMode}
      onCheckedChange={toggleTheme}

      data-slot="switch"
      className={cn(
        "peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0"
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }