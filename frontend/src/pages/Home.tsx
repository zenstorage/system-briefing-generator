import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { FileText, Zap, Users, Shield, ArrowRight, CheckCircle } from "lucide-react";
import heroImage from "@/assets/hero-briefing.jpg";
import { useTranslation, Trans } from "react-i18next";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAuthNavigation = (path: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate(path);
      return;
    }
    
    toast({
      title: "Bem-vindo de volta!",
      description: "Você já está logado. Redirecionando para o dashboard...",
    });
    navigate("/dashboard");
  };

  const features = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: t("home.features.fast_creation.title"),
      description: t("home.features.fast_creation.description"),
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: t("home.features.collaboration.title"),
      description: t("home.features.collaboration.description"),
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: t("home.features.security.title"),
      description: t("home.features.security.description"),
    },
  ];

  const benefits = t("home.benefits.items", { returnObjects: true }) as string[];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-subtle">
      

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="container max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
                  <Trans i18nKey="home.hero.title">
                    Crie briefings
                    <span className="bg-gradient-primary bg-clip-text text-transparent">inteligentes</span>
                  </Trans>
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg">
                  {t("home.hero.subtitle")}
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="group" onClick={() => handleAuthNavigation("/register")}>
                  {t("home.hero.cta")}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button variant="outline" size="lg" onClick={() => handleAuthNavigation("/login")}>
                  {t("home.hero.cta_secondary")}
                </Button>
              </div>

              <div className="flex items-center space-x-6 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">10k+</div>
                  <div className="text-sm text-muted-foreground">{t("home.hero.stats.briefings")}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">500+</div>
                  <div className="text-sm text-muted-foreground">{t("home.hero.stats.companies")}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">99%</div>
                  <div className="text-sm text-muted-foreground">{t("home.hero.stats.satisfaction")}</div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            >
              <div className="absolute inset-0 bg-gradient-primary rounded-2xl blur-2xl opacity-20"></div>
              <img 
                src={heroImage} 
                alt="Briefing profissional sendo criado"
                className="relative rounded-2xl shadow-2xl w-full h-auto"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-background">
        <div className="container max-w-6xl mx-auto">
          <motion.div 
            className="text-center space-y-4 mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              {t("home.features.title")}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t("home.features.subtitle")}
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-3 gap-8 mb-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="border-0 shadow-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center text-primary-foreground mb-4">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                {t("home.benefits.title")}
              </h3>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div 
                    key={index} 
                    className="flex items-start space-x-3"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="p-8 bg-gradient-subtle border-0 shadow-card">
                <CardHeader className="text-center p-0 pb-6">
                  <CardTitle className="text-2xl">{t("home.cta_section.title")}</CardTitle>
                  <CardDescription>
                    {t("home.cta_section.subtitle")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0 space-y-4">
                  <Link to="/register" className="block">
                    <Button size="lg" className="w-full">
                      {t("home.cta_section.cta")}
                    </Button>
                  </Link>
                  <p className="text-center text-sm text-muted-foreground">
                    {t("home.cta_section.no_credit_card")}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-muted">
        <div className="container max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <FileText className="h-6 w-6 text-primary" />
              <span className="text-lg font-semibold text-foreground">{t("home.header.brand")}</span>
            </div>
            <p className="text-muted-foreground text-center">
              {t("home.footer.copyright")}
            </p>
          </div>
        </div>
      </footer>
      </div>
    </>
  );
};

export default Home;