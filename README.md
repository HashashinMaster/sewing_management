# Sewing company management app

I made a sewing company management because i lied to my teacher that i did an internship with a sewing company.

The app made using Next.js and pocketbase with other tools. see [package.json](package.json) file to see all the depenencys

# Installing Node dependencies

After starting pocketbase server run `npm i` to install all dependencies.

# Runing the app localy in developement mode

## Runing Pocketbase db migrations

The [pb_migrations](api/pb_migrations) folder contain migrations scripts that will create all the collection necessary for the app to work.
Run `./pocketbase migrate`.

## Starting Pocketbase server

go the [api directory](api) run `./pocketbase serve` to start pocketbase server.

## Startinf Nextjs server

Run `npm run dev` to start next.js development server.

# Runing the app in production mode using docker

1. First Make sure you have docker and docker composer installed in your machine (If you are on widnows docker compose in installed with desktop).

2. Run `docker-composer up`. This command will create the images if they are not already created and start 2 containers, one for the pocketbase and the other for next.js.

# App Demo

will uploaded soon
