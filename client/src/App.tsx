import { Switch, Route } from "wouter";
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

function Router() {
  return (
    <Switch>
      <Route path="/" component={Survey} />
      <Route path="/etapa-final/:id" component={EtapaFinalCNH} />
      <Route path="/programa-habilitacao/:id" component={ProgramaHabilitacao} />
      <Route path="/confirmacao/:id" component={Confirmacao} />
      <Route path="/termos" component={Termos} />
      <Route path="/privacidade" component={Privacidade} />
      <Route path="/faq" component={FAQ} />
      <Route path="/suporte" component={Suporte} />
      <Route component={NotFound} />
    </Switch>
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
