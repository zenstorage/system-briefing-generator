import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { BriefingCard } from "./BriefingCard";
import { BriefingResult } from "./BriefingResult";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";


import {
  Plus,
  Search,
  Filter,
  FileText,
  TrendingUp,
  BarChart3,
  Award,
} from "lucide-react";
import heroImage from "@/assets/hero-briefing.jpg";

import { useTranslation } from "react-i18next";
import { API_ENDPOINT } from "@/App";
import Fuse from "fuse.js";

interface Briefing {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  clientName: string;
  briefingResult?: any;
}

export const Dashboard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [briefings, setBriefings] = useState<Briefing[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBriefing, setSelectedBriefing] = useState<Briefing | null>(null);

  useEffect(() => {
    const fetchBriefings = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_ENDPOINT}/api/briefings`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (!Array.isArray(data)) {
          console.error("Fetched data is not an array:", data);
          setBriefings([]);
          return;
        }
        const formattedBriefings = data.map((briefing: any) => ({
          id: briefing.id,
          title: briefing.briefing_result.briefing_short_title ?? 'Untitled Briefing',
          description: (briefing.briefing_result?.briefing?.substring(0, 100) ?? 'No description available') + "...",
          createdAt: new Date(briefing.created_at).toISOString(),
          clientName: briefing.company_name ?? 'Unknown Client',
          briefingResult: briefing.briefing_result,
        }));
        setBriefings(formattedBriefings);

        const totalBriefings = formattedBriefings.length;
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        const monthlyBriefings = formattedBriefings.filter((briefing: Briefing) => {
          const briefingDate = new Date(briefing.createdAt);
          return briefingDate.getMonth() === currentMonth && briefingDate.getFullYear() === currentYear;
        }).length;
        const dailyBriefings = formattedBriefings.filter((briefing: Briefing) => {
          const briefingDate = new Date(briefing.createdAt);
          return briefingDate.getDate() === new Date().getDate() && briefingDate.getMonth() === currentMonth && briefingDate.getFullYear() === currentYear;
        }).length;

        const monthlyPercentage = totalBriefings > 0 ? (monthlyBriefings / totalBriefings) * 100 : 0;
        const dailyPercentage = totalBriefings > 0 ? (dailyBriefings / totalBriefings) * 100 : 0;


        setStats([
          {
            title: t("dashboard.stats.total_briefings.title"),
            value: totalBriefings.toString(),
            description: t("dashboard.stats.total_briefings.description"),
            icon: FileText,
            trend: `${monthlyPercentage.toFixed(0)}%`,
          },
          {
            title: t("dashboard.stats.monthly_briefings.title"),
            value: monthlyBriefings.toString(),
            description: t("dashboard.stats.monthly_briefings.description"),
            icon: TrendingUp,
            trend: `${monthlyPercentage.toFixed(0)}%`,
          },
          {
            title: t("dashboard.stats.average_briefings.title"),
            value: dailyBriefings.toString(),
            description: t("dashboard.stats.average_briefings.description"),
            icon: BarChart3,
            trend: `${dailyPercentage.toFixed(0)}%`,
          },

        ]);


      } catch (error) {
        console.error("Error fetching briefings:", error);
        setBriefings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBriefings();
  }, []);

  const fuse = new Fuse(briefings, {
    keys: ["title", "clientName", "description"],
  });

  const filteredBriefings = searchTerm
    ? fuse.search(searchTerm).map((result) => result.item)
    : briefings;

  const handleBriefingClick = (briefing: Briefing) => {
    console.log("Briefing clicked:", briefing);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setSelectedBriefing(briefing);
  };

  useEffect(() => {
    setStats(prevStats => [
      {
        ...prevStats[0],
        title: t("dashboard.stats.total_briefings.title"),
        description: t("dashboard.stats.total_briefings.description"),
      },
      {
        ...prevStats[1],
        title: t("dashboard.stats.monthly_briefings.title"),
        description: t("dashboard.stats.monthly_briefings.description"),
      },
      {
        ...prevStats[2],
        title: t("dashboard.stats.average_briefings.title"),
        description: t("dashboard.stats.average_briefings.description"),
      },

    ]);
  }, [t]);
  

  const [stats, setStats] = useState([
    {
      title: t("dashboard.stats.total_briefings.title"),
      value: "0",
      description: t("dashboard.stats.total_briefings.description"),
      icon: FileText,
      trend: "0%",
    },
    {
      title: t("dashboard.stats.monthly_briefings.title"),
      value: "0",
      description: t("dashboard.stats.monthly_briefings.description"),
      icon: TrendingUp,
      trend: "0%",
    },
    {
      title: t("dashboard.stats.average_briefings.title"),
      value: "0",
      description: t("dashboard.stats.average_briefings.description"),
      icon: BarChart3,
      trend: "0%",
    },

  ]);

  const handleBack = () => {
    setSelectedBriefing(null);
  };

  if (selectedBriefing) {
    console.log(selectedBriefing.briefingResult.briefing)
    return (
      <BriefingResult
        briefingContent={selectedBriefing.briefingResult.briefing.replaceAll("\\n", "\n")}
        onBack={handleBack}
        onNewBriefing={() => navigate("/dashboard/new")}
        title={selectedBriefing.title}
      />
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">


      <main className="container mx-auto px-4 py-8 space-y-8">
        <div className="flex justify-end">
          <Button
            variant="hero"
            size="lg"
            onClick={() => navigate("/dashboard/new")}
            className="shadow-lg"
          >
            <Plus className="h-5 w-5 sm:mr-2" />
            <span className="hidden sm:inline">{t("dashboard.header.new_briefing_button")}</span>
          </Button>
        </div>
        {/* Hero Section */}
        <motion.section 
          className="relative overflow-hidden rounded-2xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute inset-0">
            <img
              src={heroImage}
              alt="Ilustração profissional de briefings para startups"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />
          </div>
          <div className="relative px-6 sm:px-8 py-10 sm:py-12 text-primary-foreground">
            <div className="max-w-2xl">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                {t("dashboard.hero.title")}
              </h2>
              <p className="text-lg sm:text-xl mb-6 text-primary-foreground/90">
                {t("dashboard.hero.subtitle")}
              </p>
              <Button
                variant="accent"
                size="lg"
                onClick={() => navigate("/dashboard/new")}
                className="shadow-xl"
              >
                {t("dashboard.hero.cta")}
                <BarChart3 className="h-5 w-5 ml-2" />
              </Button>
            </div>
          </div>
        </motion.section>

        {/* Stats */}
        <motion.section 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {stats.map((stat) => {
            const Icon = stat.icon;
            const isPositive = stat.trend.startsWith('+');

            return (
              <motion.div key={stat.title} variants={itemVariants}>
                <Card className="hover:shadow-lg transition-shadow h-full">
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
              </motion.div>
            );
          })}
        </motion.section>

        {/* Briefings Section */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold">{t("dashboard.briefings_section.title")}</h2>
              <p className="text-muted-foreground">
                {t("dashboard.briefings_section.subtitle")}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t("dashboard.briefings_section.search_placeholder")}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full sm:w-64"
                  aria-label={t("dashboard.briefings_section.search_aria_label")}
                />
              </div>
              <Button variant="outline" size="icon" aria-label={t("dashboard.briefings_section.filter_aria_label")}>
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-6">
                    <Skeleton className="h-4 w-3/4 mb-2" />
                    <Skeleton className="h-3 w-full mb-4" />
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-4 w-1/4" />
                      <Skeleton className="h-4 w-1/4" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredBriefings.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="py-12">
                <CardContent className="text-center">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    {searchTerm ? t("dashboard.briefings_section.no_briefings_found_title") : t("dashboard.briefings_section.no_briefings_created_title")}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {searchTerm
                      ? `${t("dashboard.briefings_section.no_results_for")} "${searchTerm}"`
                      : t("dashboard.briefings_section.start_creating_briefing")
                    }
                  </p>
                  {!searchTerm && (
                    <Button
                      variant="outline-primary"
                      onClick={() => navigate("/dashboard/new")}
                    >
                      <Plus className="h-4 w-4" />
                      {t("dashboard.briefings_section.create_first_briefing_button")}
                    </Button>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredBriefings.map((briefing) => (
                <motion.div key={briefing.id} variants={itemVariants}>
                  <BriefingCard
                    {...briefing}
                    onClick={() => handleBriefingClick(briefing)}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </section>
      </main>
    </div>
  );
};
