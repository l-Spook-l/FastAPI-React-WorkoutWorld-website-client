# Базовый образ Node.js
FROM node:18.0-buster-slim

# Рабочая директория в контейнере
WORKDIR /app

# Копируем файлы package.json и package-lock.json для установки зависимостей
COPY package*.json ./

# Установка зависимостей
RUN npm install

# Копируем все файлы React в контейнер
COPY . .

# Команда для сборки React приложения
RUN npm run build

# Этап для запуска React
FROM nginx:1.22-alpine-slim

# Копируем собранные файлы React в Nginx сервер
COPY --from=0 /app/build /usr/share/nginx/html

# Порт для Nginx
EXPOSE 80

# Команда для запуска Nginx
CMD ["nginx", "-g", "daemon off;"]
