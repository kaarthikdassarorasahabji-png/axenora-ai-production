---
title: Axenora AI
emoji: "⚙️"
colorFrom: green
colorTo: gray
sdk: docker
app_port: 7860
pinned: false
---

# Axenora AI

Production website and API for Axenora AI business systems.

## Products

- EmpMetria workforce operations
- Employee monitoring and attendance
- Role-based CRM dashboards
- Office workflow automation
- Custom LLM chatbots
- WhatsApp and Instagram commerce automation

## Architecture

The Docker Space builds the Vite/React frontend and serves it with the Express API from one origin. Chat responses are generated server-side through OpenRouter. Lead details are accepted only with explicit consent, stored through Supabase, and delivered to the business team through Resend.

Secrets are configured in the Hugging Face Space settings and are never included in the frontend bundle.
