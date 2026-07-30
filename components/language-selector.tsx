"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"
import Image from "next/image"

const languages = [
  { code: "en", name: "English", flag: "/flags/us.jpg" },
  { code: "hi", name: "हिंदी", flag: "/flags/in.png" },
  { code: "pa", name: "ਪੰਜਾਬੀ", flag: "/flags/ca.png" },
]

export function LanguageSelector() {
  const [currentLanguage, setCurrentLanguage] = useState(languages[0])

  const handleLanguageChange = (language: (typeof languages)[0]) => {
    setCurrentLanguage(language)
    localStorage.setItem("vyavahaar_language", language.code)
    // Here you would typically trigger a language change in your i18n system
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Image
            src={currentLanguage.flag || "/placeholder.svg"}
            alt={currentLanguage.name}
            width={20}
            height={15}
            className="rounded-sm"
          />
          <Globe className="w-4 h-4" />
          <span className="hidden sm:inline">{currentLanguage.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((language) => (
          <DropdownMenuItem key={language.code} onClick={() => handleLanguageChange(language)} className="gap-2">
            <Image
              src={language.flag || "/placeholder.svg"}
              alt={language.name}
              width={20}
              height={15}
              className="rounded-sm"
            />
            {language.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
