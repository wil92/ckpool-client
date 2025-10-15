const fs = require('fs');
const path = require('path');

const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    const poolLogsPath = process.env.POOL_LOGS_PATH || '/var/log/ckpool';
    const poolStatsPath = path.join(poolLogsPath, 'pool');
    const usersStatsPath = path.join(poolLogsPath, 'users');

    const poolStatsFile = path.join(poolStatsPath, 'pool.status');
    const poolStats = fs.readFileSync(poolStatsFile, 'utf8');

    const lines = poolStats.split('\n');
    const usersStats = JSON.parse(lines[0]);
    const hashRateStats = JSON.parse(lines[1]);

    const users = [];

    fs.readdirSync(usersStatsPath).forEach((file) => {
        const user = JSON.parse(fs.readFileSync(path.join(usersStatsPath, file), 'utf8'));
        user.id = file;
        users.push(user);
    });

    res.render('index', {title: 'CKPool Client', usersStats, hashRateStats, users});
});

module.exports = router;
