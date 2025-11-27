import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { FileText, Menu, LogOut } from "lucide-react";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { useMobile } from "@/hooks/use-mobile";
import { ModeToggle } from "./ModeToggle";
import { useToast } from "@/hooks/use-toast";

interface HeaderProps {
  showAuthButtons?: boolean;
}

const Header: React.FC<HeaderProps> = ({ showAuthButtons = true }) => {
  const { t } = useTranslation();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const isMobile = useMobile();
  const navigate = useNavigate();
  const { toast } = useToast();

  const isAuthenticated = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiration");
    toast({
      title: t("logout.toast.success_title"),
      description: t("logout.toast.success_description"),
    });
    navigate("/login");
  };

  const authLinks = (
    <Button variant="ghost" size="icon" onClick={handleLogout} aria-label="Logout">
      <LogOut className="h-5 w-5" />
    </Button>
  );

  const guestLinks = (
    <>
      <Link to="/login" onClick={() => setIsSheetOpen(false)}>
        <Button variant="outline">{t("home.header.login")}</Button>
      </Link>
      <Link to="/register" onClick={() => setIsSheetOpen(false)}>
        <Button>{t("home.header.register")}</Button>
      </Link>
    </>
  );

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container flex items-center justify-between h-16 sm:px-6">
        <Link to="/" className="flex items-center space-x-2">
          <FileText className="h-8 w-8 text-primary" />
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">{t("home.header.brand")}</h1>
        </Link>
        
        <div className="flex items-center space-x-2 sm:space-x-4">
          <LanguageSwitcher />
          <ModeToggle />
          {showAuthButtons && (
            isMobile ? (
              <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full max-w-xs">
                  <nav className="flex flex-col space-y-4 mt-8">
                    {isAuthenticated ? (
                      <Button variant="outline" onClick={handleLogout} className="w-full justify-start">
                        <LogOut className="mr-2 h-4 w-4" />
                        {t("logout.button_text")}
                      </Button>
                    ) : (
                      guestLinks
                    )}
                  </nav>
                </SheetContent>
              </Sheet>
            ) : (
              <nav className="flex items-center space-x-2">
                {isAuthenticated ? authLinks : guestLinks}
              </nav>
            )
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
