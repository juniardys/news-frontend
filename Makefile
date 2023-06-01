init-start:
	docker-compose up -d --build

start:
	docker-compose up -d

stop:
	docker-compose stop

restart:
	docker-compose stop
	docker-compose up -d

build:
	docker-compose up -d --build

rebuild:
	docker-compose down
	docker-compose up -d --build

down:
	docker-compose down
