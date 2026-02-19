import type { Express } from "express";
import { type Server } from "http";
import { storage } from "./storage";
import { insertCandidateSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express,
): Promise<Server> {
  app.post("/api/candidates", async (req, res) => {
    try {
      const data = insertCandidateSchema.parse(req.body);
      const candidate = await storage.createCandidate(data);
      res.status(201).json(candidate);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Dados inválidos", errors: error.errors });
      } else {
        console.error("Erro em /api/candidates:", error);
        res.status(500).json({ message: "Erro interno do servidor" });
      }
    }
  });

  app.patch("/api/candidates/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);

      if (Number.isNaN(id)) {
        return res.status(400).json({ message: "ID inválido" });
      }

      const data = insertCandidateSchema.partial().parse(req.body);
      const candidate = await storage.updateCandidate(id, data);
      res.json(candidate);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Dados inválidos", errors: error.errors });
      } else {
        console.error("Erro em PATCH /api/candidates/:id:", error);
        res.status(500).json({ message: "Erro interno do servidor" });
      }
    }
  });

  /**
   * Criar transação PIX (proxy seguro)
   * Frontend chama: POST /api/pix/create
   * Backend chama:  POST https://bsxnex.live/api/transaction/pix
   */
  app.post("/api/pix/create", async (req, res) => {
    try {
      const bodySchema = z.object({
        amount: z.union([z.number(), z.string()]),
        name: z.string().min(1, "Nome é obrigatório"),
        document: z.string().min(11, "Documento inválido"),
        phone: z.string().min(10, "Telefone inválido"),
        external_id: z.string().min(1, "external_id é obrigatório"),
      });

      const parsed = bodySchema.parse(req.body);

      const baseUrl = process.env.BSXNEX_BASE_URL || "https://bsxnex.live/api";
      const authKey = process.env.BSXNEX_AUTH_KEY;
      const secretKey = process.env.BSXNEX_SECRET_KEY;

      if (!authKey || !secretKey) {
        return res.status(500).json({
          success: false,
          message: "Credenciais PIX não configuradas no servidor",
        });
      }

      // Garante amount numérico
      const amount =
        typeof parsed.amount === "string"
          ? Number(parsed.amount.replace(",", "."))
          : parsed.amount;

      if (!Number.isFinite(amount) || amount <= 0) {
        return res.status(400).json({
          success: false,
          message: "Valor (amount) inválido",
        });
      }

      const upstreamResponse = await fetch(`${baseUrl}/transaction/pix`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Key": authKey,
          "X-Secret-Key": secretKey,
        },
        body: JSON.stringify({
          amount,
          name: parsed.name,
          document: parsed.document.replace(/\D/g, ""),
          phone: parsed.phone.replace(/\D/g, ""),
          external_id: parsed.external_id,
        }),
      });

      // Tenta ler JSON, mas evita quebrar se a API responder texto/html
      const rawText = await upstreamResponse.text();
      let upstreamData: any;

      try {
        upstreamData = JSON.parse(rawText);
      } catch {
        upstreamData = {
          success: false,
          message: "Resposta inválida da API PIX",
          raw: rawText,
        };
      }

      return res.status(upstreamResponse.status).json(upstreamData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: "Dados inválidos",
          errors: error.errors,
        });
      }

      console.error("Erro em /api/pix/create:", error);
      return res.status(500).json({
        success: false,
        message: "Erro interno ao criar transação PIX",
      });
    }
  });

  return httpServer;
}
