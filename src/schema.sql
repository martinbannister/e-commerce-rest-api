CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS addresses (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    address_line_1 VARCHAR(255) NOT NULL,
    address_line_2 VARCHAR(255),
    city VARCHAR(255) NOT NULL,
    state VARCHAR(255),
    postal_code VARCHAR(255) NOT NULL,
    country VARCHAR(255) NOT NULL,
    phone_number VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TYPE order_status AS ENUM ('placed', 'paid', 'packed', 'shipped', 'delivered', 'finished', 'returned', 'cancelled');

CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    address_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    order_status order_status,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (address_id) REFERENCES addresses(id)
);

CREATE TABLE IF NOT EXISTS order_details (
    order_id INTEGER,
    product_sku_id INTEGER,
    quantity INTEGER,
    price INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (order_id, product_sku_id),
    FOREIGN KEY (order_id) REFERENCES orders(id)
);
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS subcategories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    category_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL ,
    description TEXT,
    image_url VARCHAR(255),
    subcategory_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (subcategory_id) REFERENCES subcategories(id)
);

CREATE TABLE IF NOT EXISTS products_sku (
    id SERIAL PRIMARY KEY,
    product_id INTEGER,
    stock_quantity INTEGER,
    price INTEGER,
    FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE IF NOT EXISTS product_attributes (
    id SERIAL PRIMARY KEY,
    sku_id INTEGER,
    attribute_name VARCHAR(255),
    attribute_value VARCHAR(255),
    FOREIGN KEY (sku_id) REFERENCES products_sku(id)
);





CREATE TABLE IF NOT EXISTS cart (
    user_id INTEGER,
    product_sku_id INTEGER,
    quantity INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, product_sku_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (product_sku_id) REFERENCES products_sku(id)
);

CREATE TABLE IF NOT EXISTS wishlist (
    name VARCHAR(255),
    user_id INTEGER,
    product_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (name, user_id, product_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE INDEX IF NOT EXISTS idx_wishlist_user_id ON wishlist(user_id, product_id);
CREATE INDEX IF NOT EXISTS idx_order_details_order_id ON order_details(order_id, product_sku_id);
CREATE INDEX IF NOT EXISTS idx_cart_user_id ON cart(user_id, product_sku_id);