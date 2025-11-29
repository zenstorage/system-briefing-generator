import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { FileText, Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { z } from "zod";
import { useTranslation } from "react-i18next";
import { API_ENDPOINT } from "@/App";
import { motion } from "framer-motion";

const Login = () => {
  const { t } = useTranslation();
  const loginSchema = z.object({
    email: z.string().email({ message: t("login.toasts.invalid_email") }),
    password: z.string().min(1, { message: t("login.toasts.password_required") }),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "luiz@email.com",
    password: "luiz@123"
  });
  
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = loginSchema.safeParse(formData);

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      const errorMessages = Object.values(errors).flat();
      toast({
        title: t("login.toasts.validation_error"),
        description: errorMessages.join("\n"),
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const res = await axios.post(`${API_ENDPOINT}/login`, formData);
      const { token, token_expiration: tokenExpiration } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("token_expiration", tokenExpiration);

      navigate("/dashboard");
    } catch (error) {
      toast({
        title: t("login.toasts.login_error_title"),
        description: t("login.toasts.login_error_description"),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <>
      <div className="bg-gradient-subtle flex items-center justify-center px-6 h-[calc(100vh-66px)]">
      <motion.div 
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Login Form */}
        <Card className="border-0 shadow-card">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">{t("login.form_title")}</CardTitle>
            <CardDescription className="text-center">
              {t("login.form_subtitle")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" required>{t("login.email_label")}</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder={t("login.email_placeholder")}
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" required>{t("login.password_label")}</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder={t("login.password_placeholder")}
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pl-10 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Link 
                  to="/forgot-password" 
                  className="text-sm text-primary hover:underline"
                >
                  {t("login.forgot_password")}
                </Link>
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? t("login.loading_button") : t("login.login_button")}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                {t("login.no_account")}{" "}
                <Link to="/register" className="text-primary hover:underline font-medium">
                  {t("login.register_link")}
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      </div>
    </>
  );
};

export default Login;