type User = {
    username: string;
    password: string;
};

// Shared in-memory store for registered users
const users: User[] = [];

// Add a new user to the store
export const addUser = (username: string, password: string) => {
    users.push({ username, password });
};

// Find a user by username and password
export const findUser = (username: string, password: string) => {
    return users.find(user => user.username === username && user.password === password);
};

// Check if a user exists by username
export const isUserExists = (username: string) => {
    return users.some(user => user.username === username);
};
