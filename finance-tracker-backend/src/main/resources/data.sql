

INSERT INTO person (first_name, last_name, email, birthday) VALUES
('Dave', 'Doe', 'dave.doe@example.com', '1985-06-15'),
('Jane', 'Smith', 'jane.smith@example.com', '1990-03-22'),
('Alice', 'Johnson', 'alice.johnson@example.com', '1978-11-05'),
('Bob', 'Brown', 'bob.brown@example.com', '1988-07-12'),
('Carol', 'White', 'carol.white@example.com', '1992-01-18'),
('Eve', 'Black', 'eve.black@example.com', '1983-09-25'),
('Frank', 'Green', 'frank.green@example.com', '1995-02-14'),
('Grace', 'Blue', 'grace.blue@example.com', '1980-06-30'),
('Hank', 'Yellow', 'hank.yellow@example.com', '1987-11-11'),
('Ivy', 'Orange', 'ivy.orange@example.com', '1991-03-03'),
('Jack', 'Purple', 'jack.purple@example.com', '1986-05-05'),
('Kate', 'Pink', 'kate.pink@example.com', '1993-08-08');

INSERT INTO user_credentials (id, username, password) VALUES
(1, 'dave', '$2a$12$zpBzRM2wSwn.EFsf/1m1NOsNoNIM9pnJJIh4IkaIUjx65j78R2y2G'),
(2, 'jane', '$2a$12$UftxPc31GT4RN8grCLgclucYYunzH5lsg0HfPwnYNcCBkRM4Ufvgy'),
(3, 'alicejohnson', 'hashed_password_3'),
(4, 'bobbrown', 'hashed_password_4'),
(5, 'carolwhite', 'hashed_password_5'),
(6, 'eveblack', 'hashed_password_6'),
(7, 'frankgreen', 'hashed_password_7'),
(8, 'graceblue', 'hashed_password_8'),
(9, 'hankyellow', 'hashed_password_9'),
(10, 'ivyorange', 'hashed_password_10'),
(11, 'jackpurple', 'hashed_password_11'),
(12, 'katepink', 'hashed_password_12');

INSERT INTO user_role (user_id, role) VALUES
(1, 'USER'),
(2, 'USER'),
(3, 'USER'),
(4, 'USER'), (5, 'USER'), (6, 'USER'), (7, 'USER'), (8, 'USER'),
(9, 'USER'), (10, 'USER'), (11, 'USER'), (12, 'USER');

INSERT INTO account (name, balance, owner_id, auto_categorization) VALUES
('personal account', 500, 1, true),
('family account', 300, 1, true),
('Vacation Fund', 1000, 1, true),
('Project X', 750, 1, true),
('Emergency Fund', 2000, 1, false);

INSERT INTO user_account (user_id, account_id, role) VALUES
(1, 1, 'EDITOR'),
(1, 2, 'EDITOR'),
(1, 3, 'EDITOR'),
(1, 4, 'EDITOR'),
(1, 5, 'EDITOR'),
(2, 5, 'EDITOR');


INSERT INTO transaction_category (name, account_id) VALUES
('Utilities', 1),
('Health', 1),
('Dining', 1);

INSERT INTO transaction (name, description, amount, transaction_category_id, account_id, user_id, transaction_date) VALUES
('Electricity Bill', 'November electricity', -80.00, 1, 1, 1, '2025-11-11'),
('Water Bill', 'Monthly water usage', -35.00, 1, 1, 1, '2025-11-12'),
('Gym Membership', 'Monthly subscription', 50.00, 1, 2, 1, '2025-11-07'),
('Dinner with Friends', 'Italian restaurant', -60.00, 3, 1, 1, '2025-11-09'),
('Pharmacy', 'Prescription medication', 25.00, 2, 1, 1, '2025-11-06'),
('Coffee', 'Morning coffee', 4.50, 3, 1, 1, '2025-11-10'),
('Internet Bill', 'Monthly internet', -55.00, 1, 1, 1, '2025-11-05'),
('Dentist Visit', 'Routine dental cleaning', 120.00, 2, 1, 1, '2025-11-03');

INSERT INTO account_invitation (inviter_id, invitee_id, account_id, status, role, created_at)
VALUES
-- Personal account (1)
(1, 2, 1, 'PENDING', 'EDITOR', '2025-12-01 10:00:00'),
(1, 2, 2, 'PENDING', 'EDITOR', '2025-12-01 10:05:00'),
(1, 3, 1, 'ACCEPTED', 'EDITOR','2025-12-01 09:30:00'),
(1, 3, 2, 'ACCEPTED', 'EDITOR', '2025-12-01 09:45:00'),
(3, 1, 1, 'PENDING', 'EDITOR', '2025-12-01 11:00:00'),
(1, 4, 1, 'PENDING', 'EDITOR', '2025-12-01 12:00:00'),
(1, 5, 1, 'PENDING', 'EDITOR', '2025-12-01 12:30:00'),
(1, 6, 1, 'PENDING', 'EDITOR', '2025-12-01 13:00:00'),
(7, 1, 1, 'PENDING', 'EDITOR', '2025-12-01 14:00:00'),

-- Family account (2)
(1, 2, 2, 'ACCEPTED', 'EDITOR', '2025-12-01 09:50:00'),
(3, 1, 2, 'PENDING', 'EDITOR', '2025-12-01 11:30:00'),
(1, 4, 2, 'PENDING', 'EDITOR', '2025-12-01 12:15:00'),

-- Vacation Fund (3)
(1, 5, 3, 'PENDING', 'EDITOR', '2025-12-01 13:30:00'),
(6, 1, 3, 'REJECTED', 'EDITOR', '2025-12-01 14:00:00'),
(1, 7, 3, 'PENDING', 'EDITOR', '2025-12-01 14:30:00'),
(1, 8, 3, 'PENDING', 'EDITOR', '2025-12-01 15:00:00'),

-- Project X (4)
(1, 9, 4, 'PENDING', 'EDITOR', '2025-12-01 15:30:00'),
(1, 10, 4, 'PENDING', 'EDITOR', '2025-12-01 16:00:00'),
(1, 11, 4, 'REJECTED', 'EDITOR', '2025-12-01 16:30:00'),

-- Emergency Fund (5)
(1, 12, 5, 'PENDING', 'EDITOR', '2025-12-01 17:00:00'),
(1, 8, 5, 'PENDING', 'EDITOR', '2025-12-01 17:30:00'),
(1, 6, 5, 'PENDING', 'EDITOR', '2025-12-01 18:00:00');
