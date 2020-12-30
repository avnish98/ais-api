FROM thompsnm/nodejs-chrome
COPY . development/
WORKDIR development
RUN npm install --save chromium
RUN npm cache clean -f && npm install -g && npm install
CMD [ "node", "index.js" ]
