FROM node:20-alpine AS frontend
WORKDIR /app
COPY package*.json ./
RUN npm ci --ignore-scripts
COPY . .
RUN npm run build

FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=7860
COPY backend/package*.json ./backend/
RUN cd backend && npm ci --omit=dev --ignore-scripts
COPY backend ./backend
COPY --from=frontend /app/dist ./dist
EXPOSE 7860
CMD ["node", "backend/server.js"]
