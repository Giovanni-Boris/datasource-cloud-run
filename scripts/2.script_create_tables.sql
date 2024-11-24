CREATE TABLE ecommerce.PRODUCT (
    ID             BIGSERIAL PRIMARY KEY,
    CODIGO         VARCHAR(255) NOT NULL UNIQUE,
    NOMBRE         VARCHAR(255) NOT NULL,
    DESCRIPCION    TEXT,
    CANTIDAD       INTEGER NOT NULL,
    PRECIO_UNITARIO NUMERIC(10, 2) NOT NULL,
    CATEGORIA      VARCHAR(255) NOT NULL
);


CREATE TABLE ecommerce.USER (
    ID BIGSERIAL PRIMARY KEY, -- Identificador único para cada usuario
    USERNAME VARCHAR(255) NOT NULL UNIQUE, -- Nombre de usuario único
    PASSWORD VARCHAR(255) NOT NULL, -- Contraseña almacenada cifrada
    EMAIL VARCHAR(255) -- Correo electrónico opcional
);