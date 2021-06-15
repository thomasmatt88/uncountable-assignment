FROM node:12.18.3

WORKDIR /frontend

COPY . .

ENV GENERATE_SOURCEMAP=false

# Make Sure you allocate at least 5GB of memory in Preferences->Resources->Advanced!
RUN NODE_OPTIONS="--max-old-space-size=4096" npm install

EXPOSE 3000

CMD ["npm", "start"]
