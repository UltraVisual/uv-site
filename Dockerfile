from node

EXPOSE 3000
RUN yarn install
ADD ./ /

CMD node index.js
