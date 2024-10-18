#Imagen Base

FROM node

#Crear el directorio donde va a vivir mi aplicación
WORKDIR /app

#Copiar el package.json
COPY package*.json ./

#Instalar los Node Modules
RUN npm install

#Copiar archivos de mi local al contenerdor
COPY . .

#Compilar aplicación
RUN npm run build

#Comando de inicio de contenedor
CMD ["node","dist/src/index.js"]

#Comando contenedor de prueba: docker container run -it --rm [nombre imagen] [terminal con la que se quiere entrar]

