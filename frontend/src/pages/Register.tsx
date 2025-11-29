import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Link, useNavigate } from "react-router-dom";
import { FileText, Eye, EyeOff, Mail, Lock, User, CloudCog } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { z } from "zod";
import { useTranslation } from "react-i18next";
import { API_ENDPOINT } from "@/App";
import { motion } from "framer-motion";

const Register = () => {  
  const { t } = useTranslation();
  const registerSchema = z.object({
    name: z.string().min(3, { message: t("register.toasts.name_min_length") }),
    email: z.string().email({ message: t("register.toasts.invalid_email") }),
    password: z.string().min(6, { message: t("register.toasts.password_min_length") }),
    confirmPassword: z.string(),
  }).refine((data) => data.password === data.confirmPassword, {
    message: t("register.toasts.passwords_do_not_match"),
    path: ["confirmPassword"],
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
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

    const result = registerSchema.safeParse(formData);

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      const errorMessages = Object.values(errors).flat();
      toast({
        title: t("register.toasts.validation_error"),
        description: errorMessages.join("\n"),
        variant: "destructive",
      });
      return;
    }

    if (!acceptTerms) {
      toast({
        title: t("register.toasts.terms_required_title"),
        description: t("register.toasts.terms_required_description"),
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const res = await axios.post(`${API_ENDPOINT}/register`, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      const { token, token_expiration: tokenExpiration } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("token_expiration", tokenExpiration);

      navigate("/dashboard");
    } catch (error) {
      toast({
        title: t("register.toasts.register_error_title"),
        description: t("register.toasts.register_error_description"),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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
        
        {/* Registration Form */}
        <Card className="border-0 shadow-card">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">{t("register.form_title")}</CardTitle>
            <CardDescription className="text-center">
              {t("register.form_subtitle")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" required>{t("register.name_label")}</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder={t("register.name_placeholder")}
                    value={formData.name}
                    onChange={handleInputChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" required>{t("register.email_label")}</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder={t("register.email_placeholder")}
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" required>{t("register.password_label")}</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder={t("register.password_placeholder")}
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

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" required>{t("register.confirm_password_label")}</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder={t("register.confirm_password_placeholder")}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="pl-10 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
                {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
                  <p className="text-sm text-destructive">{t("register.passwords_do_not_match")}</p>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="terms" 
                  checked={acceptTerms}
                  onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                />
                <Label htmlFor="terms" className="text-sm leading-relaxed">
                  {t("register.terms_prefix")}{" "}
                  <Link to="/terms" className="text-primary hover:underline">
                    {t("register.terms_of_use")}
                  </Link>{" "}
                  {t("register.terms_conjunction")}{" "}
                  <Link to="/privacy" className="text-primary hover:underline">
                    {t("register.privacy_policy")}
                  </Link>
                </Label>
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading || formData.name === "" || formData.email === "" || formData.password !== formData.confirmPassword || !acceptTerms}
              >
                {isLoading ? t("register.loading_button") : t("register.register_button")}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                {t("register.has_account")}{" "}
                <Link to="/login" className="text-primary hover:underline font-medium">
                  {t("register.login_link")}
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

export default Register;