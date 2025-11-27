import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const languages = [
    { code: "en", name: "English" },
    { code: "pt-BR", name: "Português" },
  ];

  const currentLanguage = languages.find(
    (lang) => lang.code === i18n.language
  )?.name || "Language";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Globe className="h-5 w-5" />
          <span className="sr-only">Switch Language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => i18n.changeLanguage(lang.code)}
            className={i18n.language === lang.code ? "font-bold" : ""}
          >
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
