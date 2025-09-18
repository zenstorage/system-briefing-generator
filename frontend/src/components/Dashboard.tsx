import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { BriefingCard } from "./BriefingCard";
import { BriefingGenerator } from "./BriefingGenerator";
import { 
  Plus, 
  Search, 
  Filter, 
  FileText, 
  TrendingUp, 
  Users, 
  Clock,
  BarChart3 
} from "lucide-react";
import heroImage from "@/assets/hero-briefing.jpg";

// Mock data for demonstration
const mockBriefings = [
  {
    id: "1",
    title: "Campanha de Lançamento - FinApp",
    description: "Estratégia de marketing digital para lançamento de aplicativo financeiro voltado para pequenos empreendedores.",
    status: "completed" as const,
    createdAt: "15 Jan 2024",
    clientName: "FinTech Solutions",
  },
  {
    id: "2", 
    title: "Rebranding - EduTech Platform",
    description: "Renovação completa da identidade visual e posicionamento de marca para plataforma educacional.",
    status: "in-progress" as const,
    createdAt: "18 Jan 2024",
    clientName: "EduInova",
  },
  {
    id: "3",
    title: "Campanha de Acquisition - HealthApp",
    description: "Estratégia de aquisição de usuários para aplicativo de saúde e bem-estar.",
    status: "draft" as const,
    createdAt: "20 Jan 2024", 
    clientName: "HealthTech Corp",
  },
];

const stats = [
  {
    title: "Total de Briefings",
    value: "24",
    description: "3 novos este mês",
    icon: FileText,
    trend: "+12%",
  },
  {
    title: "Clientes Ativos",
    value: "18",
    description: "Startups atendidas",
    icon: Users,
    trend: "+5%",
  },
  {
    title: "Taxa de Sucesso",
    value: "94%",
    description: "Projetos finalizados",
    icon: TrendingUp,
    trend: "+2%",
  },
  {
    title: "Tempo Médio",
    value: "5.2d",
    description: "Para completar briefing",
    icon: Clock,
    trend: "-8%",
  },
];

export const Dashboard = () => {
  const [currentView, setCurrentView] = useState<"dashboard" | "generator">("dashboard");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBriefings = mockBriefings.filter(briefing =>
    briefing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    briefing.clientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (currentView === "generator") {
    return <BriefingGenerator onBack={() => setCurrentView("dashboard")} />;
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-primary">
                <FileText className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">BriefGen</h1>
                <p className="text-sm text-muted-foreground">Sistema de Briefings para Startups</p>
              </div>
            </div>
            
            <Button 
              variant="hero" 
              size="lg"
              onClick={() => setCurrentView("generator")}
              className="shadow-lg"
            >
              <Plus className="h-5 w-5" />
              Novo Briefing
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-2xl">
          <div className="absolute inset-0">
            <img 
              src={heroImage} 
              alt="Ilustração profissional de briefings para startups"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />
          </div>
          <div className="relative px-8 py-12 text-primary-foreground">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-bold mb-4">
                Crie briefings estratégicos para sua startup
              </h2>
              <p className="text-xl mb-6 text-primary-foreground/90">
                Transforme suas ideias em briefings estruturados e profissionais 
                que impulsionam o crescimento do seu negócio.
              </p>
              <Button 
                variant="accent" 
                size="lg"
                onClick={() => setCurrentView("generator")}
                className="shadow-xl"
              >
                Começar Agora
                <BarChart3 className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            const isPositive = stat.trend.startsWith('+');
            
            return (
              <Card key={stat.title} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <Badge 
                      variant={isPositive ? "default" : "secondary"}
                      className={isPositive ? "bg-gradient-accent" : ""}
                    >
                      {stat.trend}
                    </Badge>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-2xl font-bold">{stat.value}</h3>
                    <p className="font-medium text-sm">{stat.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </section>

        {/* Briefings Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Seus Briefings</h2>
              <p className="text-muted-foreground">
                Gerencie e acompanhe o progresso dos seus projetos
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar briefings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                  aria-label="Buscar briefings por título ou cliente"
                />
              </div>
              <Button variant="outline" size="icon" aria-label="Filtrar briefings">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {filteredBriefings.length === 0 ? (
            <Card className="py-12">
              <CardContent className="text-center">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  {searchTerm ? "Nenhum briefing encontrado" : "Nenhum briefing criado ainda"}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {searchTerm 
                    ? `Nenhum resultado para "${searchTerm}"`
                    : "Comece criando seu primeiro briefing estratégico"
                  }
                </p>
                {!searchTerm && (
                  <Button 
                    variant="outline-primary"
                    onClick={() => setCurrentView("generator")}
                  >
                    <Plus className="h-4 w-4" />
                    Criar Primeiro Briefing
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBriefings.map((briefing) => (
                <BriefingCard
                  key={briefing.id}
                  {...briefing}
                  onClick={() => {
                    // Aqui você implementaria a navegação para o briefing específico
                    console.log("Opening briefing:", briefing.id);
                  }}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};