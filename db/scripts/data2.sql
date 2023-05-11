-- Tabla schedule
INSERT INTO car_api.schedule (hour, createdAt, updatedAt) VALUES
('10:00:00', NOW(), NOW()),
('14:30:00', NOW(), NOW());

-- Tabla car_category
INSERT INTO car_api.car_category (name, createdAt, updatedAt) VALUES
('Sedan', NOW(), NOW()),
('SUV', NOW(), NOW());

-- Tabla maker
INSERT INTO car_api.maker (name, logo, createdAt, updatedAt) VALUES
('Toyota', 'https://example.com/toyota.png', NOW(), NOW()),
('Ford', 'https://example.com/ford.png', NOW(), NOW());

-- Tabla color
INSERT INTO car_api.color (name, createdAt, updatedAt) VALUES
('Red', NOW(), NOW()),
('Blue', NOW(), NOW());

-- Tabla price
INSERT INTO car_api.price (concept, percentage, createdAt, updatedAt) VALUES
('Taxes', 16, NOW(), NOW()),
('Shipping', 8, NOW(), NOW());

-- Tabla car_condition
INSERT INTO car_api.car_condition (type, createdAt, updatedAt) VALUES
('New', NOW(), NOW()),
('Used', NOW(), NOW());

-- Tabla transmission
INSERT INTO car_api.transmission (type, createdAt, updatedAt) VALUES
('Automatic', NOW(), NOW()),
('Manual', NOW(), NOW());

-- Tabla state
INSERT INTO car_api.state (name, createdAt, updatedAt) VALUES
('California', NOW(), NOW()),
('Texas', NOW(), NOW());

-- Tabla postal_code
INSERT INTO car_api.postal_code (code, createdAt, updatedAt) VALUES
('90210', NOW(), NOW()),
('77001', NOW(), NOW());