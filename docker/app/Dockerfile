FROM composer:2.0.8 as composer

COPY ./composer.* /app/

RUN set -xe \
    && composer install --no-dev --no-interaction --no-ansi --no-suggest --prefer-dist  \
        --no-autoloader --no-scripts
COPY . /app/
RUN composer dump

FROM php:8.0.0-fpm-alpine


RUN apk add --no-cache --virtual .buildDeps \
        $PHPIZE_DEPS \
    && apk add --no-cache \
        libpng-dev \
        libjpeg-turbo \
        oniguruma-dev \
        libzip-dev \
    && pecl install redis-5.3.2 \
    && docker-php-ext-enable redis \
    && docker-php-ext-install pdo_mysql mbstring zip exif pcntl gd \
    && apk del --no-cache -f .buildDeps


COPY --from=composer --chown=www-data:www-data /app /var/www/html

RUN chmod 755 /var/www
RUN apk add shadow && usermod -u 1000 www-data && groupmod -g 1000 www-data
