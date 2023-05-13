# Sewing company management app

I made a sewing company management because i lied to my teacher that i did an internship with a sewing company.

The app made using Next.js and pocketbase with other tools. see [package.json](package.json) file to see all the depenencys

# Runing Pocketbase db migrations

The [pb_migrations](pb_migrations) folder contain migrations scripts that will create all the collection necessary for the app to work.

Run `./pocketbase migrate`.

# Runing the app localy in developement mode

Run `./pocketbase serve` to start pocketbase server.

After starting pocketbase server run `npm run dev` in another terminal window to start next.js development server.

# Runing the app in production mode using docker

1. First make sure that [docker](https://docs.docker.com/get-docker/) is installed on your machine and Docker desktop is runing.

2. Build your container: `docker build -t nextjs-docker .`.

3. Run your container: `docker run -p 3000:3000 nextjs-docker`.

You can view your images created with docker images

# App Demo

will uploaded soon
