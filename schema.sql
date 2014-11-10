SET SCHEMA farmville;

-- available plants
DROP TABLE plants;
CREATE COLUMN TABLE plants (id INTEGER, name VARCHAR(50));

INSERT INTO plants VALUES (1, 'Tomato');
INSERT INTO plants VALUES (2, 'Cucumber');
INSERT INTO plants VALUES (3, 'Sunflower');
INSERT INTO plants VALUES (4, 'Potato');
INSERT INTO plants VALUES (5, 'Lettuce');

-- recorded events
DROP TABLE events;
CREATE COLUMN TABLE events (id INTEGER, fieldId INTEGER, plant VARCHAR(50), event VARCHAR(50), time TIMESTAMP, value REAL);

INSERT INTO events VALUES (1, 1, 'Lettuce', 'Seed', '2014-11-08 15:30:0.0', NULL);
INSERT INTO events VALUES (2, 1, 'Lettuce', 'Water', '2014-11-08 15:35:0.0', 100);
INSERT INTO events VALUES (3, 1, 'Lettuce', 'Water', '2014-11-08 15:40:0.0', 100);
INSERT INTO events VALUES (4, 1, 'Lettuce', 'Temperature', '2014-11-08 15:40:0.0', 16.5);
INSERT INTO events VALUES (5, 1, 'Lettuce', 'Temperature', '2014-11-08 15:42:0.0', 16.7);
INSERT INTO events VALUES (6, 1, 'Lettuce', 'Temperature', '2014-11-08 15:44:0.0', 16.9);
INSERT INTO events VALUES (7, 1, 'Lettuce', 'Light', '2014-11-08 15:44:0.0', 1);
INSERT INTO events VALUES (8, 1, 'Lettuce', 'Light', '2014-11-08 15:44:0.0', 0);

-- supported event types
DROP TABLE event_type;
CREATE COLUMN TABLE event_type (id INTEGER, name VARCHAR(50), unit VARCHAR(10));

INSERT INTO event_type VALUES (1, 'Seed', '');
INSERT INTO event_type VALUES (2, 'Water', 'ml');
INSERT INTO event_type VALUES (3, 'Temperature', 'C');

-- field usage
DROP TABLE field;
CREATE COLUMN TABLE field (id INTEGER, x INTEGER, y INTEGER);

INSERT INTO field VALUES (1, 1, 1);

-- light status table for Arduino
DROP TABLE light;
CREATE COLUMN TABLE light (ison INTEGER);

INSERT INTO light VALUES (0);
