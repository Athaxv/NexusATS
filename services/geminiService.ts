import { GoogleGenAI, Type } from "@google/genai";
import { AtsAnalysis } from "../types";

const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY is not defined in the environment.");
  }
  return new GoogleGenAI({ apiKey });
};

// Helper to convert file to Base64
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      // Remove the data URL prefix (e.g., "data:application/pdf;base64,")
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = error => reject(error);
  });
};

export const analyzeResume = async (base64File: string, mimeType: string): Promise<AtsAnalysis> => {
  const ai = getAiClient();
  
  const systemInstruction = `
    You are an expert Application Tracking System (ATS) and Resume Scanner. 
    Analyze the provided resume file. 
    Critique it based on formatting, keyword optimization, impact metrics, and clarity.
    Provide a score from 0 to 100.
    Identify the likely Job Role based on the content.
    
    CRITICAL: You must also provide specific, line-by-line or section-by-section suggestions where the wording is weak.
    Extract the exact original text that is problematic, provide a rewritten version that uses action verbs and quantifies results, and explain why.
    Return the response strictly as a JSON object.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: {
      parts: [
        { inlineData: { mimeType: mimeType, data: base64File } },
        { text: "Analyze this resume for ATS compatibility and provide specific line rewrites." }
      ]
    },
    config: {
      systemInstruction: systemInstruction,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          score: { type: Type.INTEGER, description: "A score from 0-100 indicating ATS readiness." },
          summary: { type: Type.STRING, description: "A brief executive summary of the resume's quality." },
          jobRoleMatch: { type: Type.STRING, description: "The job role this resume seems targeted for." },
          keywordsFound: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: "List of strong industry keywords found."
          },
          missingKeywords: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: "List of important missing keywords for this role."
          },
          improvements: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                priority: { type: Type.STRING, enum: ['High', 'Medium', 'Low'] }
              },
              required: ['title', 'description', 'priority']
            }
          },
          lineByLineAnalysis: {
            type: Type.ARRAY,
            description: "Specific lines or phrases from the resume that need improvement.",
            items: {
              type: Type.OBJECT,
              properties: {
                originalText: { type: Type.STRING, description: "The exact text found in the resume." },
                suggestion: { type: Type.STRING, description: "The rewritten or improved version of the text." },
                reason: { type: Type.STRING, description: "Why this change is recommended." },
                severity: { type: Type.STRING, enum: ['High', 'Medium', 'Low'] }
              },
              required: ['originalText', 'suggestion', 'reason', 'severity']
            }
          }
        },
        required: ['score', 'summary', 'jobRoleMatch', 'keywordsFound', 'missingKeywords', 'improvements', 'lineByLineAnalysis']
      }
    }
  });

  if (!response.text) {
    throw new Error("No response from AI");
  }

  return JSON.parse(response.text) as AtsAnalysis;
};

export const createChatSession = (base64File: string, mimeType: string) => {
  const ai = getAiClient();
  // We initialize a chat with the resume context already primed
  return ai.chats.create({
    model: 'gemini-2.5-flash',
    history: [
      {
        role: 'user',
        parts: [
          { inlineData: { mimeType: mimeType, data: base64File } },
          { text: "This is my resume. Please answer questions about it and help me improve it." }
        ]
      },
      {
        role: 'model',
        parts: [{ text: "I have analyzed your resume. How can I help you improve it today?" }]
      }
    ],
    config: {
      systemInstruction: "You are a helpful career coach and resume expert. Keep answers concise and actionable."
    }
  });
};