import express from 'express'
import {
    editUser,
    getAllUsers,
    getUser,
} from "./utils.js";
import {getAllNews, getNews} from "./news_utils.js";


export const router = express.Router()

router.get('/users', (req, res) => {
    res.json(getAllUsers());
});

router.get('/users/:userId', (req, res) => {
    res.json(getUser(req));
})

router.patch('/users/:userId', (req, res) => {
    editUser(req)
    res.header('Access-Control-Allow-Origin', '*')
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    res.status(200).end();
})

router.get('/news', (req, res) => {
    res.json(getAllNews());
})

router.get('/news/:userId', (req, res) => {
    res.json(getNews(req));
})


