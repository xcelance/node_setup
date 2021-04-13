FROM node:13.14.0
ARG DB_HOST
COPY . /app
WORKDIR /app
RUN npm install
EXPOSE 3000
CMD [ "node","index.js" ]