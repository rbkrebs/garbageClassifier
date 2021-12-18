FROM node:erbium

WORKDIR /usr/app

COPY package*.json ./

RUN apt-get update && \ 
    apt-get install -y build-essential \
    wget \
    python3 \
    make \
    gcc \ 
    libc6-dev \
    libjpeg-dev \
    cmake

RUN npm install

COPY . .

EXPOSE 3000

CMD ['npm', 'start']