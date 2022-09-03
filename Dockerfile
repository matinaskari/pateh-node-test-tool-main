FROM node:16 as builder
WORKDIR /usr
COPY src/package.json ./
COPY src/tsconfig.json ./
COPY src/webpack.config.js ./
COPY src .
RUN file="$(ls -1 /usr)" && echo $file
RUN npm install -g typescript
RUN npm install -g ts-node
RUN npm install -g webpack
RUN npm install
RUN npm run build

FROM node:16
WORKDIR /usr
COPY /src/package.json ./
COPY /src/tsconfig.json ./
COPY /src/webpack.config.js ./
RUN npm install --only=production
COPY --from=builder /usr/views ./views/
COPY --from=builder /usr/dist ./dist/
COPY --from=builder /usr/public ./public/

ENTRYPOINT ["/entry.sh"]
COPY entry.sh /entry.sh
COPY init.sh /init.sh
RUN chmod +x /entry.sh /init.sh

EXPOSE 3000
