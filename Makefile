init-start:
	make start

start:
	docker-compose up -d --build

stop:
	docker-compose down

restart:
	make stop
	make start