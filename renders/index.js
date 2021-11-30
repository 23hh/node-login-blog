const express = require('express');
const {Posts} = require("../models/posts");
const router = express.Router();

router.get('/', (req, res, next) => {
    try{
        res.render("board");
    } catch (error) {
        res.render('error');
    }
});

router.get('/login', (req, res, next) => {
    try{
        res.render("login");
    } catch (error) {
        res.render('error');
    }
});

router.get('/sign', (req, res, next) => {
    try{
        res.render("sign");
    } catch (error) {
        res.render('error');
    }
});



router.get('/write', (req, res, next) => {
    try{
        res.render("write");
    } catch (error) {
        res.render('error');
    }
});

router.get('/posts/:postId', async (req, res, next) => {
    try{
        const {postId} = req.parmas;
        res.render("post", {Posts});
    } catch (error) {
        res.render('error');
    }
});

router.get('/modify/:postId', async (req, res, next) => {
    try{
        const {postId} = req.parmas;
        res.render("post", {Posts});
    } catch (error) {
        res.render('error');
    }
});

router.get('/error', (req, res, next) => {
    try{
        res.render("error");
    } catch (error) {
        res.sendStatus(404).send(
            {errorMessage: "페이지를 찾을 수 없습니다."}
        )
    }
});

module.exports = router;