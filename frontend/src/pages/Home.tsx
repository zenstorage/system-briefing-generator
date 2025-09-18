import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { FileText, Zap, Users, Shield, ArrowRight, CheckCircle } from "lucide-react";
import heroImage from "@/assets/hero-briefing.jpg";
import DisclaimerModal from "@/components/DisclaimerModal";

const Home = () => {
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  useEffect(() => {
    setShowDisclaimer(true);
  }, []);

  const features = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Criação Rápida",
      description: "Gere briefings profissionais em minutos com IA avançada"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Colaboração",
      description: "Trabalhe em equipe e compartilhe briefings facilmente"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Segurança",
      description: "Seus dados e projetos protegidos com criptografia"
    }
  ];

  const benefits = [
    "Templates inteligentes adaptáveis",
    "Integração com ferramentas populares", 
    "Análise e métricas detalhadas",
    "Suporte especializado 24/7"
  ];

  return (
    <>
      <DisclaimerModal 
        isOpen={showDisclaimer} 
        onClose={() => setShowDisclaimer(false)} 
      />
      <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex items-center justify-between h-16 px-6">
          <div className="flex items-center space-x-2">
            <FileText className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">BriefGen</h1>
          </div>
          <nav className="flex items-center space-x-4">
            <Link to="/login">
              <Button variant="outline">Entrar</Button>
            </Link>
            <Link to="/register">
              <Button>Cadastrar</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="container max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
                  Crie briefings
                  <span className="bg-gradient-primary bg-clip-text text-transparent"> inteligentes</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg">
                  Transforme suas ideias em briefings profissionais com o poder da IA. 
                  Economize tempo e crie projetos mais eficazes.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register">
                  <Button size="lg" className="group">
                    Começar Gratuitamente
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" size="lg">
                    Já tenho conta
                  </Button>
                </Link>
              </div>

              <div className="flex items-center space-x-6 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">10k+</div>
                  <div className="text-sm text-muted-foreground">Briefings criados</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">500+</div>
                  <div className="text-sm text-muted-foreground">Empresas confiam</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">99%</div>
                  <div className="text-sm text-muted-foreground">Satisfação</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-primary rounded-2xl blur-2xl opacity-20"></div>
              <img 
                src={heroImage} 
                alt="Briefing profissional sendo criado"
                className="relative rounded-2xl shadow-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-background">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Por que escolher o BriefGen?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Uma plataforma completa para criar, gerenciar e otimizar seus briefings profissionais
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
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
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                Tudo que você precisa em um só lugar
              </h3>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <Card className="p-8 bg-gradient-subtle border-0 shadow-card">
              <CardHeader className="text-center p-0 pb-6">
                <CardTitle className="text-2xl">Comece agora mesmo</CardTitle>
                <CardDescription>
                  Crie sua conta gratuita e experimente o poder da IA
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 space-y-4">
                <Link to="/register" className="block">
                  <Button size="lg" className="w-full">
                    Criar Conta Gratuita
                  </Button>
                </Link>
                <p className="text-center text-sm text-muted-foreground">
                  Sem cartão de crédito necessário
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-muted">
        <div className="container max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <FileText className="h-6 w-6 text-primary" />
              <span className="text-lg font-semibold text-foreground">BriefGen</span>
            </div>
            <p className="text-muted-foreground text-center">
              © 2024 BriefGen. Criando briefings inteligentes para o futuro.
            </p>
          </div>
        </div>
      </footer>
      </div>
    </>
  );
};

export default Home;