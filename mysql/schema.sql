CREATE TABLE mood_question (
    id SERIAL PRIMARY KEY,
    question_text VARCHAR(255) NOT NULL,
    options JSON NOT NULL,
    category VARCHAR(50) NOT NULL
);

CREATE TABLE mood_response (
    id SERIAL PRIMARY KEY,
    question_id INTEGER NOT NULL,
    answer VARCHAR(50) NOT NULL,
    response_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id) REFERENCES auth_user (id) ON DELETE CASCADE,
    FOREIGN KEY (question_id) REFERENCES mood_question (id) ON DELETE CASCADE
);

CREATE TABLE mood_log (
    id SERIAL PRIMARY KEY,
    score FLOAT NOT NULL,
    log_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id) REFERENCES auth_user (id) ON DELETE CASCADE
);

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    is_superuser BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE mood_questions (
    question_id INT AUTO_INCREMENT PRIMARY KEY,
    question_text VARCHAR(255) NOT NULL,
    options JSON NOT NULL,
    category VARCHAR(50)
);

CREATE TABLE mood_responses (
    response_id INT AUTO_INCREMENT PRIMARY KEY,
    id INT,
    question_id INT,
    answer VARCHAR(50),
    response_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (question_id) REFERENCES mood_questions(question_id) ON DELETE CASCADE
);

CREATE TABLE mood_logs (
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    id INT,
    score FLOAT,
    log_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE journal_entries (
    entry_id INT AUTO_INCREMENT PRIMARY KEY,
    id INT,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE habits (
    habit_id INT AUTO_INCREMENT PRIMARY KEY,
    id INT,
    habit_name VARCHAR(100) NOT NULL,
    description TEXT,
    goal_count INT DEFAULT 1,
    unit VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE habit_logs (
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    habit_id INT,
    id INT,
    completed_on DATE NOT NULL,
    streak INT DEFAULT 0,
    FOREIGN KEY (habit_id) REFERENCES habits(habit_id) ON DELETE CASCADE,
    FOREIGN KEY (id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE friends (
    friend_id INT AUTO_INCREMENT PRIMARY KEY,
    id INT,
    friend_user_id INT,
    status ENUM('requested', 'accepted', 'blocked') DEFAULT 'requested',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (friend_user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE community_challenges (
    challenge_id INT AUTO_INCREMENT PRIMARY KEY,
    challenge_name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE user_challenges (
    user_challenge_id INT AUTO_INCREMENT PRIMARY KEY,
    challenge_id INT,
    id INT,
    status ENUM('ongoing', 'completed', 'failed') DEFAULT 'ongoing',
    start_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (challenge_id) REFERENCES community_challenges(challenge_id) ON DELETE CASCADE,
    FOREIGN KEY (id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE wellness_resources (
    resource_id INT AUTO_INCREMENT PRIMARY KEY,
    resource_title VARCHAR(150) NOT NULL,
    resource_type ENUM('article', 'guide', 'program') NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE expert_contacts (
    contact_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    expertise VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    phone VARCHAR(20)
);

CREATE TABLE community_forums (
    forum_id INT AUTO_INCREMENT PRIMARY KEY,
    forum_name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE forum_posts (
    post_id INT AUTO_INCREMENT PRIMARY KEY,
    forum_id INT,
    id INT,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (forum_id) REFERENCES community_forums(forum_id) ON DELETE CASCADE,
    FOREIGN KEY (id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE emergency_contacts (
    contact_id INT AUTO_INCREMENT PRIMARY KEY,
    contact_name VARCHAR(100) NOT NULL,
    contact_description TEXT NOT NULL,
    phone_number VARCHAR(20)
);

CREATE TABLE habit_streak (
    id SERIAL PRIMARY KEY,
    habit_id INTEGER NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    longest_streak INTEGER DEFAULT 0,
    current_streak INTEGER DEFAULT 0,
    FOREIGN KEY (habit_id) REFERENCES habit (id) ON DELETE CASCADE
);

CREATE TABLE mood_habit_correlation (
    id SERIAL PRIMARY KEY,
    mood_log_id INTEGER NOT NULL,
    habit_id INTEGER NOT NULL,
    correlation_score FLOAT,
    FOREIGN KEY (mood_log_id) REFERENCES mood_log (id) ON DELETE CASCADE,
    FOREIGN KEY (habit_id) REFERENCES habit (id) ON DELETE CASCADE
);

CREATE TABLE emergency_contact_log (
    log_id SERIAL PRIMARY KEY,
    id INTEGER NOT NULL,
    contact_id INTEGER NOT NULL,
    accessed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (contact_id) REFERENCES emergency_contacts(contact_id) ON DELETE CASCADE
);

CREATE INDEX idx_habit_streak_habit ON habit_streak (habit_id);
CREATE INDEX idx_mood_habit_mood_log ON mood_habit_correlation (mood_log_id);
CREATE INDEX idx_mood_habit_habit ON mood_habit_correlation (habit_id);
CREATE INDEX idx_journal_entries_user ON journal_entries (id);
CREATE INDEX idx_friends_user ON friends (id);
CREATE INDEX idx_user_challenges_user ON user_challenges (id);
CREATE INDEX idx_forum_posts_user ON forum_posts (id);
