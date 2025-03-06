type User = {
    username: string;
    password: string;
};

// Check if the global "users" array exists, otherwise initialize it
const globalAny: any = global; // TypeScript workaround
globalAny.users = globalAny.users || [];

// Use the global "users" array for storage
const users: User[] = globalAny.users;

// Add a new user to the store
export const addUser = (username: string, password: string) => {
    users.push({ username, password });
    console.log("User added:", { username, password });
    console.log("Current users array after registration:", users);
};

// Find a user by username and password
export const findUser = (username: string, password: string) => {
    console.log("Searching for user:", { username, password });
    console.log("Current users array during login:", users);
    return users.find(user => user.username === username && user.password === password);
};

// Check if a user exists by username
export const isUserExists = (username: string) => {
    return users.some(user => user.username === username);
};
