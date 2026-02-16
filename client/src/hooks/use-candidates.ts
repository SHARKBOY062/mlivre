import { useMutation } from "@tanstack/react-query";
import { api, type InsertCandidate } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";

export function useCreateCandidate() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: InsertCandidate) => {
      const res = await fetch(api.candidates.create.path, {
        method: api.candidates.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        if (res.status === 400) {
          const error = await res.json();
          throw new Error(error.message || "Validation failed");
        }
        throw new Error("Failed to submit application");
      }

      return await res.json();
    },
    onError: (error: Error) => {
      toast({
        title: "Erro ao enviar",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
