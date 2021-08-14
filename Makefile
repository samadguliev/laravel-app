#!/usr/bin/make
# Makefile readme (ru): <http://linux.yaroslavl.ru/docs/prog/gnu_make_3-79_russian_manual.html>
# Makefile readme (en): <https://www.gnu.org/software/make/manual/html_node/index.html#SEC_Contents>

# [ -f (pwd)/.env ] && include .env || include .env.example;
COPY_ENV := $(shell [ -f .env ] || cp .env.example .env)

include .env
export

MYSQL_CONTAINER_NAME := $(shell docker ps --filter name=mysql --format {{.Names}})

SHELL = /bin/sh

docker_bin := $(shell command -v docker 2> /dev/null)
docker_compose_bin := $(shell command -v docker-compose 2> /dev/null)

.DEFAULT_GOAL := help

# This will output the help for each task. thanks to https://marmelab.com/blog/2016/02/29/auto-documented-makefile.html
help: ## Show this help
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)
	@echo "\n  Allowed for overriding next properties:\n\n\
		Usage example:\n\
		make up"

# --- [ Application ] -------------------------------------------------------------------------------------------------

 init: restore-first app-composer-install key-generate storage-link db-migrate app-npm-install app-npm-dev ## init project

# --- [ MySQL ] -------------------------------------------------------------------------------------------------

restore-first: create-database

create-database:
	docker exec -it $(MYSQL_CONTAINER_NAME) sh -c "echo 'CREATE DATABASE IF NOT EXISTS laravel CHARACTER SET utf8 COLLATE utf8_unicode_ci;' | mysql -u root -p$(DB_ROOT_PASSWORD)"

# --- [ Docker ] -------------------------------------------------------------------------------------------------

build: ## rebuild all containers
	$(docker_compose_bin) build

up: build ## rebuild and up all containers
	$(docker_compose_bin) up -d --remove-orphans

down: ## down all containers
	$(docker_compose_bin) down

restart: build down up ## rebuild and restart all containers

stop: ## stop all containers
	@$(docker_bin) ps -aq | xargs $(docker_bin) stop

app-composer-install:
	@cd ./ && composer install

app-composer:
	@cd ./ && composer update

app-npm-install:
	@cd ./ && npm install

app-npm-dev:
	@cd ./ && npm run dev

# --- [ Laravel ] -------------------------------------------------------------------------------------------------

key-generate:
	$(docker_compose_bin) exec app php artisan key:generate

storage-link:
	$(docker_compose_bin) exec app php artisan storage:link

db-migrate:
	$(docker_compose_bin) exec app php artisan migrate


# --- [ Documentation ] -------------------------------------------------------------------------------------------------

doc-generate:
	$(docker_compose_bin) exec app php artisan l5-swagger:generate
