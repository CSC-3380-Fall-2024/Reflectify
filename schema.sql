CREATE TABLE mood_question (
    id SERIAL PRIMARY KEY,
    question_text VARCHAR(255) NOT NULL,
    options JSON NOT NULL,
    category VARCHAR(50) NOT NULL
);

CREATE TABLE mood_response (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    question_id INTEGER NOT NULL,
    answer VARCHAR(50) NOT NULL,
    response_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES auth_user (id) ON DELETE CASCADE,
    FOREIGN KEY (question_id) REFERENCES mood_question (id) ON DELETE CASCADE
);

CREATE TABLE mood_log (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    score FLOAT NOT NULL,
    log_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES auth_user (id) ON DELETE CASCADE
);
