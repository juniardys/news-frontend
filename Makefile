init-start:
	make start

start:
	docker-compose up -d

stop:
	docker-compose stop

restart:
	make stop
	make start

build:
	docker-compose up -d --build

rebuild:
	make down
	make build

down:
	docker-compose down