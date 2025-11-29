import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Share2, Printer, Image } from "lucide-react";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";

import { toast } from "@/components/ui/use-toast";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import html2canvas from "html2canvas";

interface BriefingResultProps {
  briefingContent: string;
  onBack: () => void;
  onNewBriefing: () => void;
  title?: string;
}

export const BriefingResult = ({ briefingContent, onBack, onNewBriefing, title }: BriefingResultProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPng = async () => {
    setIsLoading(true);
    try {
      const element = document.getElementById('briefing-content');
      if (element) {
        const canvas = await html2canvas(element, {
          scale: 2,
          backgroundColor: null,
          onclone: (document) => {
            const clonedElement = document.getElementById('briefing-content');
            if (clonedElement) {
              const isDark = document.documentElement.classList.contains('dark');
              clonedElement.style.backgroundColor = isDark ? '#09090b' : '#ffffff';
              clonedElement.style.color = isDark ? '#fafafa' : '#09090b';
              clonedElement.style.padding = '3rem';
              
              const textElements = clonedElement.querySelectorAll('*');
              textElements.forEach((el) => {
                if (el instanceof HTMLElement) {
                  el.style.color = isDark ? '#fafafa' : '#09090b';
                  if (el.tagName === 'H1' || el.tagName === 'STRONG') {
                     el.style.color = isDark ? '#fafafa' : '#09090b';
                  }
                  if (el.tagName === 'TH' || el.tagName === 'TD') {
                    el.style.borderColor = isDark ? '#27272a' : '#e4e4e7';
                  }
                }
              });
            }
          }
        });
        const link = document.createElement('a');
        link.download = `${title || 'briefing'}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      }
    } catch (error) {
      console.error("Error downloading PNG:", error);
      toast({
        title: "Erro ao baixar PNG",
        description: "Ocorreu um erro ao tentar baixar o briefing como PNG.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Briefing da Startup',
          text: briefingContent,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      toast({
        title: "Compartilhamento não suportado",
        description: "Seu navegador não suporta a função de compartilhamento.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto mb-6 space-y-6 mt-6 px-4 md:px-0">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            onClick={onBack}
            aria-label="Voltar para gerador"
            size="icon" 
            className="md:hidden"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            onClick={onBack}
            aria-label="Voltar para gerador"
            className="hidden md:flex"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl md:text-2xl font-bold truncate">Briefing Gerado</h1>
            <p className="text-muted-foreground text-sm md:text-base hidden sm:block">
              Seu briefing está pronto para ser usado
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={handleShare}
            aria-label="Compartilhar briefing"
            className="hidden md:flex"
          >
            <Share2 className="h-4 w-4 mr-2" />
            Compartilhar
          </Button>
           <Button 
            variant="outline" 
            onClick={handleShare}
            aria-label="Compartilhar briefing"
            size="icon"
            className="md:hidden"
          >
            <Share2 className="h-4 w-4" />
          </Button>
          <Popover>
            <PopoverTrigger asChild>
              <Button 
                variant="secondary" 
                aria-label="Baixar briefing"
                className="hidden md:flex"
              >
                <Download className="h-4 w-4 mr-2" />
                Baixar
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48">
              <div className="grid gap-4">
                <Button
                  variant="ghost"
                  onClick={handlePrint}
                  className="justify-start"
                >
                  <Printer className="mr-2 h-4 w-4" />
                  Imprimir
                </Button>
                <Button
                  variant="ghost"
                  onClick={handleDownloadPng}
                  disabled={isLoading}
                  className="justify-start"
                >
                  <Image className="mr-2 h-4 w-4" />
                  {isLoading ? "Baixando..." : "Baixar PNG"}
                </Button>
              </div>
            </PopoverContent>
          </Popover>
           <Popover>
            <PopoverTrigger asChild>
              <Button 
                variant="secondary" 
                aria-label="Baixar briefing"
                size="icon"
                className="md:hidden"
              >
                <Download className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48">
              <div className="grid gap-4">
                <Button
                  variant="ghost"
                  onClick={handlePrint}
                  className="justify-start"
                >
                  <Printer className="mr-2 h-4 w-4" />
                  Imprimir
                </Button>
                <Button
                  variant="ghost"
                  onClick={handleDownloadPng}
                  disabled={isLoading}
                  className="justify-start"
                >
                  <Image className="mr-2 h-4 w-4" />
                  {isLoading ? "Baixando..." : "Baixar PNG"}
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Briefing Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            📋 Briefing da Startup
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-slate dark:prose-invert max-w-none" id="briefing-content">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ children }) => (
                  <h1 className="text-2xl font-bold text-primary mb-4 border-b border-border pb-2">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-xl font-semibold text-foreground mt-6 mb-3">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-lg font-medium text-foreground mt-4 mb-2">
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {children}
                  </p>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
                    {children}
                  </ul>
                ),
                li: ({ children }) => (
                  <li className="leading-relaxed">
                    {children}
                  </li>
                ),
                strong: ({ children }) => (
                  <strong className="font-semibold text-foreground">
                    {children}
                  </strong>
                ),
                table: ({ children }) => (
                  <div className="my-6 w-full overflow-y-auto">
                    <table className="w-full border-collapse border border-border text-sm">
                      {children}
                    </table>
                  </div>
                ),
                thead: ({ children }) => (
                  <thead className="bg-muted border-b border-foreground">
                    {children}
                  </thead>
                ),
                tbody: ({ children }) => (
                  <tbody>
                    {children}
                  </tbody>
                ),
                tr: ({ children }) => (
                  <tr className="border-b border-border transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    {children}
                  </tr>
                ),
                th: ({ children }) => (
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 border-r border-border last:border-r-0">
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 border-r border-border last:border-r-0">
                    {children}
                  </td>
                ),
              }}
            >
              {briefingContent}
            </ReactMarkdown>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-center mb-6">
        <Button 
          variant="hero" 
          onClick={onNewBriefing}
          size="lg"
        >
          Criar Novo Briefing
        </Button>
      </div>
    </div>
  );
};