FROM thompsnm/nodejs-chrome
COPY . development/
WORKDIR development
RUN npm cache clean -f && npm install -g
CMD [ "node", "index.js" ]
