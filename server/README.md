# Book API test


# Installation

## Requirements
- NodeJS
- npm

## Installing
```bash
git clone https://github.com/Monixia/book_api.git
cd book_api

npm install
```

# Usage


## Development with own DB

1. Set your database configuration in: `/api/server/src/config/config.js`
2. Install nodemon globally: `npm install -g nodemon`
3. Install sequelize cli globally `npm install -g sequelize-cli`
4. Run migration: 
```
sequelize db:migrate:undo:all 
sequelize db:migrate
```
5. Start up the server: `npm run dev`

```
this is the environment: development
Server is running on PORT 8080
```

6. Run test: `npm run test`


## Development with DB and server in docker

1. Create docker network: 
`docker network create book-test-net`
1. Run postgresql with docker in background:
`docker run 
--net book-test-net 
--rm 
--detach 
--interactive 
--name book_server_pg 
--env POSTGRES_DB=book 
postgres:11`
1. Run server in console
`docker run 
--net=book-test-net 
--rm
--name book-sever 
--volume ${PWD}:/app 
--workdir /app
--interactive
--tty
--publish 8080:8080 
node:latest
/bin/bash run-dev.sh`
1. Make requests to the server
1. Stop server (Ctrl+C in console)
1. Stop postgresql:
`docker container stop book_server_pg`
1. Remove docker network: 
`docker network rm book-test-net`

# REST API

The REST API to the book_api server

## Author 

### Get list of Author

#### Request

`GET /api/author/`

    curl -i -H 'Accept: application/json' http://localhost:8080/api/author/

#### Response

	HTTP/1.1 200 OK
	X-Powered-By: Express
	Content-Type: application/json; charset=utf-8
	Content-Length: 48
	Date: Mon, 23 Dec 2019 13:54:11 GMT
	Connection: keep-alive

```json
{ 
	"status":"success",
	"message":"No Author found"
}
```


### Create a new Author

#### Request

`POST /api/author/`

    curl -i --header "Content-Type: application/json" \
      --request POST \
      --data '{"name": "James Hadley Chase", "description": "An English writer"}' \
      http://localhost:8080/api/author

#### Response

	HTTP/1.1 201 Created
	X-Powered-By: Express
	Content-Type: application/json; charset=utf-8
	Content-Length: 167
	Date: Mon, 23 Dec 2019 13:56:12 GMT
	Connection: keep-alive

```json
{
	"status":"success",
	"message":"Author Added",
	"data":{
		"author_id":"c48b09ac-0e6e-4be9-acb0-a51d9b556368",
		"name":"James Hadley Chase",
		"description":"An English writer"
	}
}
```


### Get a specific Author

#### Request

`GET /api/author/:id`

    curl -i -H 'Accept: application/json' http://localhost:8080/api/author/c48b09ac-0e6e-4be9-acb0-a51d9b556368

#### Response

	HTTP/1.1 200 OK
	X-Powered-By: Express
	Content-Type: application/json; charset=utf-8
	Content-Length: 167
	Date: Mon, 23 Dec 2019 13:57:49 GMT
	Connection: keep-alive

```json
{
	"status":"success",
	"message":"Author Found",
	"data":{
		"author_id":"c48b09ac-0e6e-4be9-acb0-a51d9b556368",
		"name":"James Hadley Chase",
		"description":"An English writer"
	}
}
```


### Get list of Author

#### Request

`GET /api/author/`

    curl -i -H 'Accept: application/json' http://localhost:8080/api/author/

#### Response

	HTTP/1.1 200 OK
	X-Powered-By: Express
	Content-Type: application/json; charset=utf-8
	Content-Length: 173
	Date: Mon, 23 Dec 2019 13:59:16 GMT
	Connection: keep-alive

```json
{
	"status":"success",
	"message":"Authors Received",
	"data":[
		{
			"author_id":"c48b09ac-0e6e-4be9-acb0-a51d9b556368",
			"name":"James Hadley Chase",
			"description":"An English writer"
		}
	]
}
```


### Change a Authors's state

#### Request

`PUT /api/author/:id`

    curl -i --header "Content-Type: application/json" \
      --request PUT \
      --data '{"description":"Novelist"}' \
      http://localhost:8080/api/author/c48b09ac-0e6e-4be9-acb0-a51d9b556368

#### Response

	HTTP/1.1 200 OK
	X-Powered-By: Express
	Content-Type: application/json; charset=utf-8
	Content-Length: 81
	Date: Mon, 23 Dec 2019 14:00:37 GMT
	Connection: keep-alive

```json
{
	"status":"success",
	"message":"Author updated",
	"data":{
		"description":"Novelist"
	}
}
```


### Delete a Author

#### Request

`DELETE /api/author/:id`

    curl -i --header "Content-Type: application/json" \
      --request DELETE \
      http://localhost:8080/api/author/c48b09ac-0e6e-4be9-acb0-a51d9b556368

#### Response

	HTTP/1.1 200 OK
	X-Powered-By: Express
	Content-Type: application/json; charset=utf-8
	Content-Length: 45
	Date: Fri, 20 Dec 2019 17:25:35 GMT
	Connection: keep-alive

```json
{
	"status":"success",
	"message":"Author deleted"
}
```



## Book 

### Get list of Book

#### Request

`GET /api/book/`

    curl -i -H 'Accept: application/json' http://localhost:8080/api/book/

#### Response

	HTTP/1.1 200 OK
	X-Powered-By: Express
	Content-Type: application/json; charset=utf-8
	Content-Length: 46
	Date: Mon, 23 Dec 2019 14:05:49 GMT
	Connection: keep-alive

```json
{ 
	"status":"success",
	"message":"No Book found"
}
```


### Create a new Book

#### Request

`POST /api/book/`

    curl -i --header "Content-Type: application/json" \
      --request POST \
      --data '{"title":"The World in My Pocket","genre": "Thriller","rating": 4,"description":"The World in My Pocket is a 1959 thriller novel by the British writer James Hadley Chase","author_id": "c48b09ac-0e6e-4be9-acb0-a51d9b556368"}' \
      http://localhost:8080/api/book

#### Response

	HTTP/1.1 201 Created
	X-Powered-By: Express
	Content-Type: application/json; charset=utf-8
	Content-Length: 320
	Date: Mon, 23 Dec 2019 14:08:18 GMT
	Connection: keep-alive


```json
{
	"status":"success",
	"message":"Book Added",
	"data":{
		"book_id":"be8244d6-5d71-4206-9deb-abff748fc445",
		"title":"The World in My Pocket",
		"genre":"Thriller",
		"rating":4,
		"description":"The World in My Pocket is a 1959 thriller novel by the British writer James Hadley Chase",
		"author_id":"c48b09ac-0e6e-4be9-acb0-a51d9b556368"
	}
}
```


### Get a specific Book

#### Request

`GET /api/book/:id`

    curl -i -H 'Accept: application/json' http://localhost:8080/api/book/be8244d6-5d71-4206-9deb-abff748fc445

#### Response

	HTTP/1.1 200 OK
	X-Powered-By: Express
	Content-Type: application/json; charset=utf-8
	Content-Length: 435
	Date: Mon, 23 Dec 2019 14:09:45 GMT
	Connection: keep-alive

```json
{
	"status":"success",
	"message":"Book Found",
	"data":{
		"book_id":"be8244d6-5d71-4206-9deb-abff748fc445",
		"title":"The World in My Pocket",
		"description":"The World in My Pocket is a 1959 thriller novel by the British writer James Hadley Chase",
		"genre":"Thriller",
		"rating":4,
		"author_id":"c48b09ac-0e6e-4be9-acb0-a51d9b556368",
		"author":{
			"author_id":"c48b09ac-0e6e-4be9-acb0-a51d9b556368",
			"name":"James Hadley Chase",
			"description":"Novelist"
		}
	}
}
```


### Get list of Book

#### Request

`GET /api/book/`

    curl -i -H 'Accept: application/json' http://localhost:8080/api/book/

#### Response

	HTTP/1.1 200 OK
	X-Powered-By: Express
	Content-Type: application/json; charset=utf-8
	Content-Length: 441
	Date: Mon, 23 Dec 2019 14:10:52 GMT
	Connection: keep-alive


```json
{
	"status":"success",
	"message":"Books Received",
	"data":[
		{
			"book_id":"be8244d6-5d71-4206-9deb-abff748fc445",
			"title":"The World in My Pocket",
			"description":"The World in My Pocket is a 1959 thriller novel by the British writer James Hadley Chase",
			"genre":"Thriller",
			"rating":4,
			"author_id":"c48b09ac-0e6e-4be9-acb0-a51d9b556368",
			"author":{
				"author_id":"c48b09ac-0e6e-4be9-acb0-a51d9b556368",
				"name":"James Hadley Chase",
				"description":"Novelist"
			}
		}
	]
}
```


### Change a Books's state

#### Request

`PUT /api/book/:id`

    curl -i --header "Content-Type: application/json" \
      --request PUT \
      --data '{"description":"Publication date - 1959"}' \
      http://localhost:8080/api/book/be8244d6-5d71-4206-9deb-abff748fc445

#### Response

	HTTP/1.1 200 OK
	X-Powered-By: Express
	Content-Type: application/json; charset=utf-8
	Content-Length: 94
	Date: Mon, 23 Dec 2019 14:12:22 GMT
	Connection: keep-alive


```json
{
	"status":"success",
	"message":"Book updated",
	"data":{
		"description":"Publication date - 1959"
	}
}
```


### Delete a Book

#### Request

`DELETE /api/book/:id`

    curl -i --header "Content-Type: application/json" \
      --request DELETE \
      http://localhost:8080/api/book/be8244d6-5d71-4206-9deb-abff748fc445

#### Response

	HTTP/1.1 200 OK
	X-Powered-By: Express
	Content-Type: application/json; charset=utf-8
	Content-Length: 45
	Date: Fri, 20 Dec 2019 17:25:35 GMT
	Connection: keep-alive

```json
{
	"status":"success",
	"message":"Book deleted"
}
```

