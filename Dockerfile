from node

WORKDIR /usr/src/app

COPY package*.json ./
RUN yarn
RUN yarn global add serve
RUN yarn build
COPY . .

EXPOSE 3000

CMD ["serve",  "-s", "build", "-p", "3000"]
