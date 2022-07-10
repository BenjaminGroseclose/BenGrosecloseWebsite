FROM node:14-alpine


# Frontend
WORKDIR /Frontend

COPY ben-groseclose-ui/package.json ben-groseclose-ui/package-lock.json ./
RUN npm install

COPY ./ben-groseclose-ui/ . 
RUN cd

CMD ["npm", "start"]

EXPOSE 3000
