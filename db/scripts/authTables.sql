CREATE TABLE oauth_access_tokens (
  id VARCHAR(100) PRIMARY KEY,
  user_id VARCHAR(100) NOT NULL,
  client_id VARCHAR(100) NOT NULL,
  expiresAt DATETIME NOT NULL,
  scope VARCHAR(2000),
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
ALTER TABLE `car_api`.`oauth_access_tokens` ADD INDEX `user_id` (`user_id`) USING BTREE,
ALTER TABLE `car_api`.`oauth_access_tokens` ADD INDEX `client_id` (`client_id`) USING BTREE,
ALTER TABLE `car_api`.`oauth_access_tokens` ADD INDEX `expiresAt` (`expiresAt`) USING BTREE,
ALTER TABLE `car_api`.`oauth_access_tokens` ADD INDEX `scope` (`scope`) USING BTREE,

CREATE TABLE oauth_client (
  id VARCHAR(100) PRIMARY KEY,
  secret VARCHAR(100) NOT NULL,
  redirect_uri VARCHAR(2000),
  grant_types VARCHAR(2000) NOT NULL,
  scope VARCHAR(2000),
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL
);
ALTER TABLE `car_api`.`oauth_client` ADD INDEX `secret` (`secret`) USING BTREE,
ALTER TABLE `car_api`.`oauth_client` ADD INDEX `redirect_uri` (`redirect_uri`) USING BTREE,
ALTER TABLE `car_api`.`oauth_client` ADD INDEX `grant_types` (`grant_types`) USING BTREE,
ALTER TABLE `car_api`.`oauth_client` ADD INDEX `scope` (`scope`) USING BTREE;

CREATE TABLE oauth_refresh_tokens (
  id VARCHAR(100) PRIMARY KEY,
  access_token_id VARCHAR(100) NOT NULL,
  expiresAt DATETIME NOT NULL,
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL,
  FOREIGN KEY (access_token_id) REFERENCES oauth_access_tokens(id) ON DELETE CASCADE
);
ALTER TABLE `car_api`.`oauth_refresh_tokens` ADD INDEX `expiresAt` (`expiresAt`) USING BTREE,
ALTER TABLE `car_api`.`oauth_refresh_tokens` ADD INDEX `access_token_id` (`access_token_id`) USING BTREE;

CREATE TABLE `car_api`.`user` (
  id VARCHAR(100) PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL,
	deleted BOOLEAN NULL,
	deletedAt DATETIME NULL,
);
ALTER TABLE `car_api`.`user` ADD INDEX `email` (`email`) USING BTREE,
ALTER TABLE `car_api`.`user` ADD INDEX `password` (`password`) USING BTREE;