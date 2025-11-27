import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, ArrowRight, CheckCircle, Lightbulb, Target, Users } from "lucide-react";
import { BriefingResult } from "./BriefingResult";
import { Stepper } from "./Stepper";
import { API_ENDPOINT } from "@/App";

interface BriefingGeneratorProps {
  onBack: () => void;
}

interface BriefingData {
  company_name: string;
  industry: string;
  target_audience: string;
  problem: string;
  solution: string;
  objectives: string;
  timeline: string;
  budget: string;
}

const BriefingGenerator = ({ onBack }: BriefingGeneratorProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { step } = useParams<{ step: string }>();
  const [currentStep, setCurrentStep] = useState(1);
  const [showResult, setShowResult] = useState(false);
  const [generatedBriefing, setGeneratedBriefing] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [briefingData, setBriefingData] = useState<BriefingData>({
    company_name: "",
    industry: "",
    target_audience: "",
    problem: "",
    solution: "",
    objectives: "",
    timeline: "",
    budget: ""
  });

  const steps = [
    {
      id: 1,
      title: t("briefing_generator.steps.1.title"),
      description: t("briefing_generator.steps.1.description"),
      icon: Users,
    },
    {
      id: 2,
      title: t("briefing_generator.steps.2.title"),
      description: t("briefing_generator.steps.2.description"),
      icon: Lightbulb,
    },
    {
      id: 3,
      title: t("briefing_generator.steps.3.title"),
      description: t("briefing_generator.steps.3.description"),
      icon: Target,
    },
  ];

  useEffect(() => {
    const initialStep = step ? parseInt(step, 10) : 1;
    if (!isNaN(initialStep) && initialStep >= 1 && initialStep <= steps.length) {
      setCurrentStep(initialStep);
    } else {
      navigate("/dashboard/new/1");
    }
  }, [step, navigate]);

  const updateStep = (newStep: number) => {
    setCurrentStep(newStep);
    navigate(`/dashboard/new/${newStep}`);
  };

  const updateData = (field: keyof BriefingData, value: string) => {
    setBriefingData(prev => ({ ...prev, [field]: value }));
  };

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return briefingData.company_name.trim() !== "" && 
               briefingData.industry !== "" && 
               briefingData.target_audience.trim() !== "";
      case 2:
        return briefingData.problem.trim() !== "" && 
               briefingData.solution.trim() !== "";
      case 3:
        return briefingData.objectives.trim() !== "";
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep < 3 && validateCurrentStep()) {
      updateStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      updateStep(currentStep - 1);
    }
  };

  const handleGenerate = async () => {
    if (!validateCurrentStep()) return;
    
    setIsGenerating(true);
    try {
      console.log("Generating briefing with data:", briefingData);

      const token = localStorage.getItem("token")

      const res = await fetch(`${API_ENDPOINT}/api/briefings`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(briefingData),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const resJson = await res.json();
      console.log("Generated briefing:", resJson);
      
      setGeneratedBriefing(resJson);
      setShowResult(true);
    } catch (error) {
      console.error("Error generating briefing:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleNewBriefing = () => {
    setShowResult(false);
    setGeneratedBriefing(null);
    updateStep(1);
    setBriefingData({
      company_name: "",
      industry: "",
      target_audience: "",
      problem: "",
      solution: "",
      objectives: "",
      timeline: "",
      budget: "",
    });
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="companyName" required={true}>{t("briefing_generator.step1.company_name_label")}</Label>
              <Input
                id="companyName"
                placeholder={t("briefing_generator.step1.company_name_placeholder")}
                value={briefingData.company_name}
                onChange={(e) => updateData("company_name", e.target.value)}
                required
                aria-describedby="companyName-help"
              />
              <p id="companyName-help" className="text-sm text-muted-foreground">
                {t("briefing_generator.step1.company_name_help")}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="industry" required={true}>{t("briefing_generator.step1.industry_label")}</Label>
              <Select onValueChange={(value) => updateData("industry", value)}>
                <SelectTrigger id="industry" aria-describedby="industry-help">
                  <SelectValue placeholder={t("briefing_generator.step1.industry_placeholder")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fintech">{t("briefing_generator.industries.fintech")}</SelectItem>
                  <SelectItem value="edtech">{t("briefing_generator.industries.edtech")}</SelectItem>
                  <SelectItem value="healthtech">{t("briefing_generator.industries.healthtech")}</SelectItem>
                  <SelectItem value="ecommerce">{t("briefing_generator.industries.ecommerce")}</SelectItem>
                  <SelectItem value="saas">{t("briefing_generator.industries.saas")}</SelectItem>
                  <SelectItem value="marketplace">{t("briefing_generator.industries.marketplace")}</SelectItem>
                  <SelectItem value="other">{t("briefing_generator.industries.other")}</SelectItem>
                </SelectContent>
              </Select>
              <p id="industry-help" className="text-sm text-muted-foreground">
                {t("briefing_generator.step1.industry_help")}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="targetAudience" required={true}>{t("briefing_generator.step1.target_audience_label")}</Label>
              <Textarea
                id="targetAudience"
                placeholder={t("briefing_generator.step1.target_audience_placeholder")}
                value={briefingData.target_audience}
                onChange={(e) => updateData("target_audience", e.target.value)}
                rows={3}
                required
                aria-describedby="targetAudience-help"
              />
              <p id="targetAudience-help" className="text-sm text-muted-foreground">
                {t("briefing_generator.step1.target_audience_help")}
              </p>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="problem" required={true}>{t("briefing_generator.step2.problem_label")}</Label>
              <Textarea
                id="problem"
                placeholder={t("briefing_generator.step2.problem_placeholder")}
                value={briefingData.problem}
                onChange={(e) => updateData("problem", e.target.value)}
                rows={4}
                required
                aria-describedby="problem-help"
              />
              <p id="problem-help" className="text-sm text-muted-foreground">
                {t("briefing_generator.step2.problem_help")}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="solution" required={true}>{t("briefing_generator.step2.solution_label")}</Label>
              <Textarea
                id="solution"
                placeholder={t("briefing_generator.step2.solution_placeholder")}
                value={briefingData.solution}
                onChange={(e) => updateData("solution", e.target.value)}
                rows={4}
                required
                aria-describedby="solution-help"
              />
              <p id="solution-help" className="text-sm text-muted-foreground">
                {t("briefing_generator.step2.solution_help")}
              </p>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="objectives" required={true}>{t("briefing_generator.step3.objectives_label")}</Label>
              <Textarea
                id="objectives"
                placeholder={t("briefing_generator.step3.objectives_placeholder")}
                value={briefingData.objectives}
                onChange={(e) => updateData("objectives", e.target.value)}
                rows={3}
                required
                aria-describedby="objectives-help"
              />
              <p id="objectives-help" className="text-sm text-muted-foreground">
                {t("briefing_generator.step3.objectives_help")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="timeline">{t("briefing_generator.step3.timeline_label")}</Label>
                <Select onValueChange={(value) => updateData("timeline", value)}>
                  <SelectTrigger id="timeline">
                    <SelectValue placeholder={t("briefing_generator.step3.timeline_placeholder")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-month">{t("briefing_generator.timeline.1_month")}</SelectItem>
                    <SelectItem value="3-months">{t("briefing_generator.timeline.3_months")}</SelectItem>
                    <SelectItem value="6-months">{t("briefing_generator.timeline.6_months")}</SelectItem>
                    <SelectItem value="1-year">{t("briefing_generator.timeline.1_year")}</SelectItem>
                    <SelectItem value="flexible">{t("briefing_generator.timeline.flexible")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="budget">{t("briefing_generator.step3.budget_label")}</Label>
                <Select onValueChange={(value) => updateData("budget", value)}>
                  <SelectTrigger id="budget">
                    <SelectValue placeholder={t("briefing_generator.step3.budget_placeholder")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="up-to-10k">{t("briefing_generator.budget.up_to_10k")}</SelectItem>
                    <SelectItem value="10k-50k">{t("briefing_generator.budget.10k_50k")}</SelectItem>
                    <SelectItem value="50k-100k">{t("briefing_generator.budget.50k_100k")}</SelectItem>
                    <SelectItem value="100k-plus">{t("briefing_generator.budget.100k_plus")}</SelectItem>
                    <SelectItem value="flexible">{t("briefing_generator.budget.flexible")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (showResult && generatedBriefing) {
    const getBriefingContent = () => {
      try {
        if (generatedBriefing?.candidates?.[0]?.content?.parts?.[0]?.text) {
          const textContent = generatedBriefing.candidates[0].content.parts[0].text;
          const parsedContent = JSON.parse(textContent);
          return parsedContent.briefing || textContent;
        }
        return t("briefing_generator.result.error");
      } catch (error) {
        console.error("Error parsing briefing content:", error);
        return t("briefing_generator.result.error");
      }
    };

    return (
      <BriefingResult 
        briefingContent={getBriefingContent()}
        onBack={() => navigate("/dashboard")}
        onNewBriefing={handleNewBriefing}
      />
    );
  }

  const CurrentIcon = steps[currentStep - 1].icon;

  return (
    <div className="max-w-4xl mx-auto mt-10 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/dashboard")}
          aria-label={t("briefing_generator.back_to_dashboard_aria")}
        >
          <ArrowLeft className="h-4 w-4" />
          {t("briefing_generator.back_button")}
        </Button>
        <div>
          <h1 className="text-2xl font-bold">{t("briefing_generator.title")}</h1>
          <p className="text-muted-foreground">
            {t("briefing_generator.subtitle")}
          </p>
        </div>
      </div>

      {/* Progress */}
      <Card>
        <CardContent className="pt-6">
          <Stepper steps={steps} currentStep={currentStep} />
        </CardContent>
      </Card>

      {/* Step Content */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <CurrentIcon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle>{t("briefing_generator.step_title", { step: currentStep })}: {steps[currentStep - 1].title}</CardTitle>
              <CardDescription>{steps[currentStep - 1].description}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {renderStepContent()}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={handlePrevious}
          disabled={currentStep === 1}
        >
          <ArrowLeft className="h-4 w-4" />
          {t("briefing_generator.previous_button")}
        </Button>

        {currentStep < 3 ? (
          <Button 
            variant="hero" 
            onClick={handleNext}
            disabled={!validateCurrentStep()}
          >
            {t("briefing_generator.next_button")}
            <ArrowRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button 
            variant="accent" 
            onClick={handleGenerate}
            disabled={!validateCurrentStep() || isGenerating}
          >
            <CheckCircle className="h-4 w-4" />
            {isGenerating ? t("briefing_generator.generating_button") : t("briefing_generator.generate_button")}
          </Button>
        )}
      </div>
    </div>
  );
};

export default BriefingGenerator;