const request = require('supertest')
const express = require('express')
const { Pool } = require('pg')

jest.mock('pg', () => {
    const mockQuery = jest.fn()
    return {
        Pool: jest.fn(() => ({
            query: mockQuery
        }))
    }
})

const app = require('./index')

describe('API de productos', () => {
    test('GET /productos devuelve 200', async () => {
        const { Pool } = require('pg')
        const mockPool = new Pool()
        mockPool.query.mockResolvedValue({ rows: [] })

        const res = await request(app).get('/productos')
        expect(res.statusCode).toBe(200)
    })

    test('GET /salud devuelve ok', async () => {
        const res = await request(app).get('/salud')
        expect(res.statusCode).toBe(200)
        expect(res.body.estado).toBe('mal')
    })

})

