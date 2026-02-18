import { Switch, Route, useLocation } from "wouter";
import { useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Survey from "@/pages/Survey";
import EtapaFinalCNH from "@/pages/EtapaFinalCNH";
import ProgramaHabilitacao from "@/pages/ProgramaHabilitacao";
import Confirmacao from "@/pages/Confirmacao";
import Termos from "@/pages/Termos";
import Privacidade from "@/pages/Privacidade";
import FAQ from "@/pages/FAQ";
import Suporte from "@/pages/Suporte";
import Entrevista from "@/pages/Entrevista";
import AnaliseDados from "@/pages/AnaliseDados";
import EducativoCNH from "@/pages/EducativoCNH";
import SeguroPedagogico from "@/pages/SeguroPedagogico";
import Checkout from "@/pages/Checkout";
import ResultadoAvaliacao from "@/pages/ResultadoAvaliacao";
import Obrigado from "@/pages/Obrigado";
import Quiz from "@/pages/Quiz";
import QuizProcessamento from "@/pages/QuizProcessamento";
import QuizResultado from "@/pages/QuizResultado";
import VagasAprovadas from "@/pages/VagasAprovadas";
import AvaliacaoGerencial from "@/pages/AvaliacaoGerencial";
import AvaliacaoProcessando from "@/pages/AvaliacaoProcessando";
import VagasCheckout from "@/pages/VagasCheckout";

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return null;
}

function Router() {
  return (
    <>
    <ScrollToTop />
    <Switch>
      <Route path="/" component={Survey} />
      <Route path="/quiz/:id" component={Quiz} />
      <Route path="/quiz-processamento/:id" component={QuizProcessamento} />
      <Route path="/quiz-resultado/:id" component={QuizResultado} />
      <Route path="/vagas-aprovadas/:id" component={VagasAprovadas} />
      <Route path="/avaliacao-gerencial/:id" component={AvaliacaoGerencial} />
      <Route path="/avaliacao-processando/:id" component={AvaliacaoProcessando} />
      <Route path="/vagas-checkout/:id" component={VagasCheckout} />
      <Route path="/etapa-final/:id" component={EtapaFinalCNH} />
      <Route path="/programa-habilitacao/:id" component={ProgramaHabilitacao} />
      <Route path="/entrevista/:id" component={Entrevista} />
      <Route path="/analisando-dados/:id" component={AnaliseDados} />
      <Route path="/educativo-cnh/:id" component={EducativoCNH} />
      <Route path="/seguro-pedagogico/:id" component={SeguroPedagogico} />
      <Route path="/confirmacao/:id" component={Confirmacao} />
      <Route path="/checkout/:id" component={Checkout} />
      <Route path="/resultado-avaliacao/:id" component={ResultadoAvaliacao} />
      <Route path="/obrigado" component={Obrigado} />
      <Route path="/termos" component={Termos} />
      <Route path="/privacidade" component={Privacidade} />
      <Route path="/faq" component={FAQ} />
      <Route path="/suporte" component={Suporte} />
      <Route component={NotFound} />
    </Switch>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
