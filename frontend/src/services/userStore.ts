import bcrypt from "bcrypt";

type User = {
    username: string;
    passwordHash: string; // Store hashed passwords instead of plain text
};

// Check if the global "users" array exists, otherwise initialize it
const globalAny: any = global;
globalAny.users = globalAny.users || [];
const users: User[] = globalAny.users;

const SALT_ROUNDS = 10;

// Add a new user to the store with a hashed password
export const addUser = async (username: string, password: string) => {
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    users.push({ username, passwordHash });
    console.log("User added:", { username, passwordHash });
    console.log("Current users array after registration:", users);
};

// Find a user by username and validate the password
export const findUser = async (username: string, password: string) => {
    console.log("Searching for user:", { username });
    console.log("Current users array during login:", users);

    const user = users.find(user => user.username === username);
    if (user && await bcrypt.compare(password, user.passwordHash)) {
        console.log("Password match found for user:", username);
        return user;
    }
    console.log("No matching user or password mismatch");
    return null;
};

// Check if a user exists by username
export const isUserExists = (username: string) => {
    return users.some(user => user.username === username);
};
