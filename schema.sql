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

CREATE TABLE mood_questions (
    question_id INT AUTO_INCREMENT PRIMARY KEY,
    question_text VARCHAR(255) NOT NULL,
    options JSON NOT NULL,
    category VARCHAR(50)
);

CREATE TABLE mood_responses (
    response_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    question_id INT,
    answer VARCHAR(50),
    response_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (question_id) REFERENCES mood_questions(question_id) ON DELETE CASCADE
);

CREATE TABLE mood_logs (
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    score FLOAT,
    log_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE journal_entries (
    entry_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE habits (
    habit_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    habit_name VARCHAR(100) NOT NULL,
    description TEXT,
    goal_count INT DEFAULT 1,
    unit VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE habit_logs (
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    habit_id INT,
    user_id INT,
    completed_on DATE NOT NULL,
    streak INT DEFAULT 0,
    FOREIGN KEY (habit_id) REFERENCES habits(habit_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE friends (
    friend_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    friend_user_id INT,
    status ENUM('requested', 'accepted', 'blocked') DEFAULT 'requested',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (friend_user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE community_challenges (
    challenge_id INT AUTO_INCREMENT PRIMARY KEY,
    challenge_name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE user_challenges (
    user_challenge_id INT AUTO_INCREMENT PRIMARY KEY,
    challenge_id INT,
    user_id INT,
    status ENUM('ongoing', 'completed', 'failed') DEFAULT 'ongoing',
    start_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (challenge_id) REFERENCES community_challenges(challenge_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
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
    user_id INT,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (forum_id) REFERENCES community_forums(forum_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE emergency_contacts (
    contact_id INT AUTO_INCREMENT PRIMARY KEY,
    contact_name VARCHAR(100) NOT NULL,
    contact_description TEXT NOT NULL,
    phone_number VARCHAR(20)
);
