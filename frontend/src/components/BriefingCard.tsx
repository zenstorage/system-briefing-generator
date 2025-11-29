import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Calendar, Users, ArrowRight } from "lucide-react";

interface BriefingCardProps {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  clientName: string;
  onClick?: () => void;
}

export const BriefingCard = ({ 
  id, 
  title, 
  description, 
  createdAt, 
  clientName, 
  onClick 
}: BriefingCardProps) => {
  const formattedDate = new Date(createdAt).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return (
    <Card 
      className="group hover:shadow-lg transition-all duration-300 hover:border-primary/20 cursor-pointer h-full flex flex-col justify-between"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
      aria-label={`Briefing ${title} para ${clientName}`}
    >
      <CardHeader className="pb-3 flex-1">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" aria-hidden="true" />
            <CardTitle className="text-lg group-hover:text-primary transition-colors">
              {title}
            </CardTitle>
          </div>
        </div>
        <CardDescription className="line-clamp-2">
          {description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" aria-hidden="true" />
              <span className="capitalize">{clientName}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" aria-hidden="true" />
              <span>{formattedDate}</span>
            </div>
          </div>
          
          <Button 
            variant="ghost" 
            size="sm"
            className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
            aria-label={`Abrir briefing ${title}`}
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};