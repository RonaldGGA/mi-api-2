const express = require('express');
const { Pool } = require('pg');
const app = express()

const PORT = process.env.PORT || 3000

const db = new Pool({
    connectionString: process.env.DATABASE_URL,
})


app.use(express.json())

app.get("/productos", async (req, res) => {
    const resultado = await db.query("SELECT * FROM productos")
    res.json(resultado.rows)
})

app.post("/productos", async (req, res) => {
    const { nombre, precio } = req.body
    const resultado = await db.query("INSERT INTO productos (nombre, precio) VALUES ($1, $2) RETURNING *", [nombre, precio])
    res.json(resultado.rows[0])
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})