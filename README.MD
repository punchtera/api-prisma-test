# Api Prisma

This is a basic layout for creating an api using prisma orm and typescript.

- url for pgadmin browser __<http://localhost:5050/browser/>__

- execute `start:db` for running docker-compose up.
- if one might should be connecting to this instance first time, it is necesary to get the host from docker.
- if one needs to use pgadmin, it is necesary to copy the container id to fetch the IPAddress.
- execute `docker ps`.
- copy the id from the postgres image.
- execute `docker inspect {postgres_container_id} | grep IPAddress`.
- set the IPAddress in the host value || set the host value as the container_name from the docker-compose.yml file
    e.g `pg_container`.
