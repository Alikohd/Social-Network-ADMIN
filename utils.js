import fs from "fs";

let users = loadUsersData();

function loadUsersData() {
    try {
        return JSON.parse(fs.readFileSync('users_data.json', 'utf-8'));
    } catch (error) {
        console.error('Error reading file:', error);
        return [];
    }
}

export function saveToFile(fileName) {
    fs.writeFileSync(fileName, JSON.stringify(users, null, 2));
}

export function getAllUsers() {
    return users;
}

export function getUser(req) {
    const user = users.find((user) => user.id === Number(req.params.userId));
    if (!user) console.log(`User with id ${req.params.userId} was not found`);
    return user;
}

function handleBirthdate(updatedUserData) {
    if (updatedUserData.birthdate) {
        updatedUserData.birthdate = new Date(updatedUserData.birthdate).toLocaleDateString('ru-RU');
    }
}

function updateUserData(userId, updatedUserData) {
    for (const prop in updatedUserData) {
        users[userId][prop] = updatedUserData[prop];
    }
}

export function editUser(req) {
    const userId = req.params.userId - 1;
    const updatedUserData = req.body;
    console.log('alive')
    handleBirthdate(updatedUserData);
    updateUserData(userId, updatedUserData);

    saveToFile('users_data.json');
}
