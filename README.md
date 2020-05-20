# Let's Do It World Open Data API


## Prerequisites

1. [Node.js](https://nodejs.org/en/).
2. Create `.env` file in project root directory with parameters explained in [.env configuration](#env)
or, you can check out example file `.env.example`
3. [PostgreSQL database](https://www.postgresql.org/).
    - Run following `.sql` files
        - `api/db/users.sql`
        - `api/db/brute.sql`

## <a name="env"></a>.env configuration

```BASH
DB_HOST=change_this_host (DNS or IP of the database server)
DB_PASSWORD=change_this_password (password for the database user)
JWT_SECRET=change_this_secret (secret for JWT authentication)
```

Optionally you can set following parameters 

```BASH
DB_USER=change_this_username (name of the database user, default: ldiw)
DB_NAME=change_this_db_name (name of the database to connect, default: trash)
DB_PORT=change_this_port (port of the database, default: 5432)

PORT=change_port (port where to run the API, default: 3000)
INTERFACE=change_interface (interface to serve the api on: default 0.0.0.0)
```

For Trashout import to work, set for one instance following parameter

```BASH
TRASHOUT_REQ_DELAY= Cron expression when to run import.
```

## How to run

1. `npm install`
2. `npm run start-dev`


## how to deploy to azure virtual machine
To manually deploy to Azure look at [manual_deploy_to_live.txt](/docs/manual_deploy_to_live.txt)