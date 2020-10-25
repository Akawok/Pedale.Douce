CREATE DATABASE pedale_douce;

USE pedale_douce;

CREATE TABLE availabilities(
    `availability_id` INT AUTO_INCREMENT PRIMARY KEY,
    `availability` VARCHAR(50) NOT NULL
);

CREATE TABLE stations(
    `station_id` INT AUTO_INCREMENT PRIMARY KEY,
    `station_name` VARCHAR(255) NOT NULL,
    `position_x` INT NOT NULL,
    `position_y` INT NOT NULL
);

CREATE TABLE terminals(
    `terminal_id` INT AUTO_INCREMENT PRIMARY KEY,
    `station_id` INT NOT NULL,
    `availability_id` INT NOT NULL,
    `terminal_nb` INT NOT NULL,
    CONSTRAINT fk_station_id
    FOREIGN KEY(`station_id`) REFERENCES stations(`station_id`)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
    CONSTRAINT fk_terminals_availability_id
    FOREIGN KEY(`availability_id`) REFERENCES availabilities(`availability_id`)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

CREATE TABLE reservation_nb(
    `reservation_nb_id` INT AUTO_INCREMENT PRIMARY KEY,
    `reservation_nb` VARCHAR(255)
);

CREATE TABLE bikes(
    `bike_id` INT AUTO_INCREMENT PRIMARY KEY,
    `serial_nb` VARCHAR(255) NOT NULL,
    `terminal_id` INT,
    `availability_id` INT NOT NULL,
    `reservation_nb_id` INT,
    CONSTRAINT fk_bike_terminal_id
    FOREIGN KEY(`terminal_id`) REFERENCES terminals(`terminal_id`)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
    CONSTRAINT fk_bike_availability_id
    FOREIGN KEY(`availability_id`) REFERENCES availabilities(`availability_id`)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
    CONSTRAINT fk_reservationNB_bike_id
    FOREIGN KEY(`reservation_nb_id`) REFERENCES reservation_nb(`reservation_nb_id`)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

CREATE TABLE users_datas(
    `user_id` INT AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(50) NOT NULL,
    `user_password` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(50) NOT NULL,
    `first_name` VARCHAR(50) NOT NULL,
    `mail_address`VARCHAR(50) NOT NULL,
    `bike_id` INT,
    CONSTRAINT fk_user_bike_id
    FOREIGN KEY(`bike_id`) REFERENCES bikes(`bike_id`)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

CREATE TABLE departure_station(
    `departure_station_id` INT AUTO_INCREMENT PRIMARY KEY,
    `station_id` INT NOT NULL,
    `terminal_id` INT NOT NULL,
    `bike_id` INT NOT NULL,
    `reservation_nb_id` INT NOT NULL,
    CONSTRAINT fk_departure_station_id
    FOREIGN KEY(`station_id`) REFERENCES stations(`station_id`)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
    CONSTRAINT fk_departure_terminal_id
    FOREIGN KEY(`terminal_id`) REFERENCES terminals(`terminal_id`)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
    CONSTRAINT fk_departure_bike_id
    FOREIGN KEY(`bike_id`) REFERENCES bikes(`bike_id`)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
    CONSTRAINT fk_reservationNB_dep_id
    FOREIGN KEY(`reservation_nb_id`) REFERENCES reservation_nb(`reservation_nb_id`)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

CREATE TABLE arrival_station(
    `arrival_station_id` INT AUTO_INCREMENT PRIMARY KEY,
    `station_id` INT NOT NULL,
    `terminal_id` INT NOT NULL,
    `bike_id` INT NOT NULL,
    `reservation_nb_id` INT NOT NULL,
    CONSTRAINT fk_arrival_station_id
    FOREIGN KEY(`station_id`) REFERENCES stations(`station_id`)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
    CONSTRAINT fk_arrival_terminal_id
    FOREIGN KEY(`terminal_id`) REFERENCES terminals(`terminal_id`)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
    CONSTRAINT fk_arrival_bike_id
    FOREIGN KEY(`bike_id`) REFERENCES bikes(`bike_id`)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
    CONSTRAINT fk_reservationNB_arr_id
    FOREIGN KEY(`reservation_nb_id`) REFERENCES reservation_nb(`reservation_nb_id`)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

CREATE TABLE reservations_history(
    `reservations_history_id` INT AUTO_INCREMENT PRIMARY KEY,
    `departure_station_id` INT NOT NULL,
    `arrival_station_id` INT NOT NULL,
    CONSTRAINT fk_history_departure_id
    FOREIGN KEY(`departure_station_id`) REFERENCES departure_station(`departure_station_id`)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
    CONSTRAINT fk_history_arrival_id
    FOREIGN KEY(`arrival_station_id`) REFERENCES arrival_station(`arrival_station_id`)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);


CREATE TABLE credit_cards(
    `credit_card_id` INT AUTO_INCREMENT PRIMARY KEY,
    `credit_card_nb` VARCHAR(255),
    `user_id` INT NOT NULL,
    CONSTRAINT fk_user_card_id
    FOREIGN KEY(`user_id`) REFERENCES users_datas(`user_id`)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);


CREATE TABLE bills(
    `bill_id` INT AUTO_INCREMENT PRIMARY KEY,
    `credit_card_id` INT NOT NULL,
    `bill_value` INT NOT NULL,
    CONSTRAINT fk_bill_card_id
    FOREIGN KEY(`credit_card_id`) REFERENCES credit_cards(`credit_card_id`)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

source datas.sql;