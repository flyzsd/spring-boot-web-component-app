CREATE TABLE IF NOT EXISTS oauth2_user
(
    id          VARCHAR(255) NOT NULL PRIMARY KEY,
    json_data   LONGTEXT     NOT NULL,
    modified_by VARCHAR(255) NOT NULL,
    modified_on TIMESTAMP    NOT NULL,
    deleted_on  TIMESTAMP    NULL,
    version     BIGINT UNSIGNED
) ENGINE = InnoDB
  CHARSET = utf8;