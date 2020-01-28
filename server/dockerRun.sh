docker container stop book_server_pg
docker network rm book-test-net

docker network create book-test-net
docker run --net book-test-net --rm --detach --interactive --name book_server_pg --env POSTGRES_DB=book postgres:11
docker run --net=book-test-net --rm --name book-sever --volume ${PWD}:/app --workdir /app --interactive --tty --publish 8080:8080 node:latest /bin/bash run-dev.sh