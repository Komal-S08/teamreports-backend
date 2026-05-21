CREATE TABLE teams (
    id SERIAL PRIMARY KEY,
    team_name VARCHAR(100) NOT NULL
);

CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    employee_name VARCHAR(100),
    email VARCHAR(100),
    team_id INT REFERENCES teams(id)
);

CREATE TABLE reports (
    id SERIAL PRIMARY KEY,
    employee_id INT REFERENCES employees(id),
    report_name VARCHAR(255),
    s3_url TEXT,
    status VARCHAR(50) DEFAULT 'PENDING',
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
