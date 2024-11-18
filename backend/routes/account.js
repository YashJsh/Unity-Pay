const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { Account } = require("../db");
const { authMiddleware } = require('../middleware')

router.get('/balance', authMiddleware, async function (req, res) {
    try {
        const account = await Account.findOne({
            userId: req.userId
        });
        if (!account) {
            return res.status(404).json({ error: 'Account not found' });
        }

        res.send({
            balance : account.balance
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
})



router.post('/transfer', authMiddleware, async function (req, res) {
    const session = await mongoose.startSession();
    session.startTransaction(); 

    const { amount, to } = req.body;

    const account = await Account.findOne({
        userId: req.userId
    }).session(session);

    if (!account || account.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        });
    }

    const toAccount = await Account.findOne({ userId: to }).session(session);

    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        });
    }

    await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
    await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

    await session.commitTransaction();
    res.json({
        message: "Transfer successful"
    });
})

module.exports = router;