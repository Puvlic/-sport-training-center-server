const db = require('../db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {validationResult} = require('express-validator')
const {secret} = require('../config')

const generateAccessToken = (id, roles) => {
    const payload = {
        id: id,
        role: roles,
    }
    return jwt.sign(payload, secret, {expiresIn: "24h"})
}

class UserController {
    async registration (req, res) {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()) {
                return res.status(400).json({message: 'Ошибка при регистрации', errors})
            }
            const {name, surname, patronymic, gender, date_of_birth, username, password, phone_number} = req.body
            const user = await db.query(`SELECT * FROM users WHERE username = $1`, [username])
            if (user.rows.length !== 0) {
                console.log(user.rows)
                return res.status(400).json({message: 'Пользователь уже существует'})
            }
            const hashPassword = bcrypt.hashSync(password, 7)
            const new_user = await db.query('INSERT INTO users (name, surname, patronymic, gender, date_of_birth, role, username, password, phone_number) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
                                            [name, surname, patronymic, gender, date_of_birth, 1, username, hashPassword, phone_number])
            res.json(new_user.rows[0])
        } catch (e) {
            console.log(e)
            return res.status(400).json({message: "Registration error"})
        }
    }

    async login (req, res) {
        try {
            const {username, password} = req.body
            const user = await db.query(`SELECT * FROM users WHERE username = $1`, [username])
            if (user.rows.length === 0) {
                return res.status(400).json({message: `Пользователь '${username}' не существует`})
            }
            const validPassword = bcrypt.compareSync(password, user.rows[0].password)
            if (!validPassword) {
                return res.status(400).json({message: `Введен неверный пароль`})
            }

            const token = generateAccessToken(user.rows[0].id, "user")

            return res.json(token)
        } catch (e) {
            console.log(e)
            res.status(400).json({message: "Login error"})
        }
    }

    async updateUser (req, res) {
        try {
            const {id, name, surname, patronymic, gender, date_of_birth, phone_number} = req.body
            const updatedUser = await db.query(`UPDATE users SET name = $2, surname = $3, patronymic = $4, gender = $5, date_of_birth = $6, phone_number = $7 WHERE id = $1 RETURNING *`, [id, name, surname, patronymic, gender, date_of_birth, phone_number])
            res.json(updatedUser.rows[0])
        } catch (e) {
            console.log(e)
        }
    }

    async getUser (req, res) {
        try {
            const id = req.params.id
            const user = await db.query(`SELECT * FROM users WHERE id = $1`, [id])
            res.json(user.rows[0])
        } catch (e) {
        }
    }

    async getAllUsers (req, res) {
        try {
            const users = await db.query(`SELECT * FROM users`)
            res.json(users.rows)
        } catch (e) {}
    }
}

module.exports = new UserController()