import fs from "fs";
import { getAllUsers, getUser } from "./utils.js";

let news;

export const getFromFile = () => {
    try {
        news = JSON.parse(fs.readFileSync('news_data.json', 'utf-8'));
    } catch (error) {
        console.error('Error reading file:', error);
        news = [];
    }
};

function filterNewsByUserId(userId) {
    return news.filter((item) => {
        if (item.userId === userId) {
            const user = getUserById(userId);
            item.userName = user.name;
            return true;
        }
        return false;
    });
}

function getUserById(userId) {
    return getAllUsers().find((user) => user.id === Number(userId));
}

function addNewsUsername(newsItem, users) {
    const user = users.find((user) => user.id === Number(newsItem.userId));
    newsItem.userName = user ? user.name : 'Unknown';
    return newsItem;
}


export function getNews(req) {
    getFromFile();
    const user = getUser(req);
    return filterNewsByUserId(user.id);
}

export function getAllNews() {
    getFromFile();
    const users = getAllUsers();
    return news.map((item) => addNewsUsername(item, users));
}