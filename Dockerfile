FROM node:alpine AS deps
RUN apk add --no-cache libc6-compat

WORKDIR /app
COPY package*.json ./
RUN npm install

FROM node:alpine AS builder
WORKDIR /app
COPY . .
COPY .env* ./

FROM node:alpine AS runner
RUN npm install pm2 -g
WORKDIR /app

COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.next ./.next

EXPOSE 3001

## Development
CMD npm run dev -- -p 3001

## Production
#CMD ["pm2-runtime", "start", "npm", "name", "fa", "--", "start", "--", "-p", "3001"]