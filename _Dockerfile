FROM arm64v8/node:16.18.1 as build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install 
COPY . .
RUN npm run build --prod

FROM arm64v8/nginx:1.23-alpine
RUN rm -rf /usr/share/nginx/html/*
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/shop /usr/share/nginx/html
