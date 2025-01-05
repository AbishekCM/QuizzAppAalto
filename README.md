# wsd-answer-question-quiz

Live demo - https://wsd-answer-question-quiz.onrender.com/

## wsd-answer-question-quiz Admin Access

Email: abi@gmail.com Password: 1234

## Contents

The wsd-answer-question-quiz is a simple Deno application that starts on port
`7777`. The application allows user to create topics (for Admins), create
question and answer for specific topics (All users), the best feature is the
quiz element, allowing users to pick a topic and answer quiz questions for that
specific topic.

Launching the wsd-answer-question-quiz application starts the Deno application,
a PostgreSQL server, and a database migration process (Flyway).

## Starting and shutting down

The wsd-answer-question-quiz application is used with Docker Compose.

- To start the wsd-answer-question-quiz application, open up the terminal in the
  folder that contains the `docker-compose.yml` file and type
  `docker compose up`.
- To stop the wsd-answer-question-quiz application, press `ctrl+C` (or similar)
  in the same terminal where you wrote the command `docker compose up`. Another
  option is to open up a new terminal and navigate to the folder that contains
  the `docker-compose.yml` file, and then write `docker compose stop`.

## Watching for changes

The wsd-answer-question-quiz by default watches for changes in the Deno code and
restarts the application whenever needed.

## Database

When wsd-answer-question-quiz is up and running, you can access the PostgreSQL
database from the terminal using the following command:

```
docker exec -it database-server psql -U username database
```

This opens up `psql` console, where you can write SQL commands.

## Database migrations

When the wsd-answer-question-quiz application is started, Flyway is used to run
the SQL commands in the database migration files that reside in the
`flyway/sql`-folder. If a database exists, Flyway checks that the schema
corresponds to the contents of the database migration files.

If you need new database tables or need to alter the schema, the correct
approach is to create a new migration file and start the application. Another
approach is to modify the existing migration file -- if you do this, the
migrations fail, however.

If you end up altering the migration files (or the schema in the database), you
can clean up the database (remove the existing database tables) by stopping the
containers and the related volumes -- with the database data -- with the command
`docker compose down`. When you launch the application again after this, the
database is newly created based on the migration files.

## Deno cache

When we launch a Deno application, Deno loads any dependencies that the
application uses. These dependencies are then stored to the local file system
for future use. The wsd-answer-question-quiz application uses the
`app-cache`-folder for storing the dependencies. If you need to clear the cache,
empty the contents of the folder.

## The project.env file

Database and Deno cache configurations are entered in the `project.env` file,
which Docker uses when starting the application. If you deploy the application,
you naturally do not wish to use the file in this repository. Instead, create a
new one that is -- as an example -- only available on the server where the
application is deployed.

## VSCode configurations

The application also comes with a few default VSCode settings. These settings
can be found in the `settings.json` file in the `.vscode` folder. By default, we
assume that you have the VSCode Deno plugin.

## E2E Tests with playwright

The wsd-answer-question-quiz application comes also with simple
[Playwright](https://playwright.dev/) configuration that provides an easy
approach for building end-to-end tests. Check out the folder `tests` within
`e2e-playwright` to get started.

To run E2E tests, launch the project using the following command:

```
docker compose run --entrypoint=npx e2e-playwright playwright test && docker compose rm -sf
```

Note! Once finished, this will also remove any changes to the database of your
local project.

What the e2e tests effectively do is that they start up a browser within the
docker container and examine the application programmatically based on the
tests.
