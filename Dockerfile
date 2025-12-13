# Usar una imagen base oficial de Node.js
ARG NODE_VERSION=18
FROM node:${NODE_VERSION}-alpine

# Establecer el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copiar package.json y package-lock.json (si existe)
COPY package*.json ./

# Instalar las dependencias del proyecto
RUN npm install

# Copiar el resto del código de la aplicación
COPY . .

# Exponer el puerto en el que la aplicación se ejecutará
EXPOSE 3011

# Comando para iniciar la aplicación
CMD [ "node", "src/index.js" ]
