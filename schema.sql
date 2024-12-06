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

CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    is_superuser BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE journal_entries (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES auth_user (id) ON DELETE CASCADE
);

CREATE TABLE habits (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    habit_name VARCHAR(100) NOT NULL,
    start_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES auth_user (id) ON DELETE CASCADE
);

CREATE TABLE habit_log (
    id SERIAL PRIMARY KEY,
    habit_id INTEGER NOT NULL,
    log_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status BOOLEAN NOT NULL DEFAULT TRUE,
    FOREIGN KEY (habit_id) REFERENCES habits (id) ON DELETE CASCADE
);

CREATE TABLE friends (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    friend_id INTEGER NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES auth_user (id) ON DELETE CASCADE,
    FOREIGN KEY (friend_id) REFERENCES auth_user (id) ON DELETE CASCADE
);

CREATE TABLE community_challenges (
    id SERIAL PRIMARY KEY,
    challenge_name VARCHAR(100) NOT NULL,
    description TEXT,
    start_date TIMESTAMP,
    end_date TIMESTAMP
);

CREATE TABLE user_challenges (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    challenge_id INTEGER NOT NULL,
    progress INTEGER DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES auth_user (id) ON DELETE CASCADE,
    FOREIGN KEY (challenge_id) REFERENCES community_challenges (id) ON DELETE CASCADE
);

CREATE TABLE wellness_resources (
    id SERIAL PRIMARY KEY,
    resource_type VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    url VARCHAR(2083),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE expert_contacts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    expertise VARCHAR(100),
    contact_info VARCHAR(255)
);

CREATE TABLE emergency_contacts (
    id SERIAL PRIMARY KEY,
    contact_name VARCHAR(100) NOT NULL,
    contact_type VARCHAR(50) NOT NULL,
    contact_info VARCHAR(255) NOT NULL,
    description TEXT
);

CREATE TABLE self_care_prompts (
    id SERIAL PRIMARY KEY,
    prompt_text VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_preferences (
    user_id INTEGER PRIMARY KEY,
    theme ENUM('light', 'dark') DEFAULT 'light',
    receive_notifications BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (user_id) REFERENCES auth_user (id) ON DELETE CASCADE
);

CREATE INDEX idx_mood_question_category ON mood_question (category);
CREATE INDEX idx_mood_response_user ON mood_response (user_id);
CREATE INDEX idx_mood_response_question ON mood_response (question_id);
CREATE INDEX idx_mood_log_user ON mood_log (user_id);
CREATE INDEX idx_mood_log_log_date ON mood_log (log_date);
