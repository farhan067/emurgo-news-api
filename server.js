import express from "express"
import axios from "axios"
import NodeCache from "node-cache"
import dotenv from "dotenv"

dotenv.config()
const app = express()
const cache = new NodeCache({ stdTTL: 300 })

const BASE_URL = "https://gnews.io/api/v4"
const API_KEY = process.env.GNEWS_API_KEY

async function fetchFromGNews(endpoint, params) {
    const key = `${endpoint}_${JSON.stringify(params)}`
    if (cache.has(key)) return cache.get(key)

    const { data } = await axios.get(`${BASE_URL}/${endpoint}`, { params })
    cache.set(key, data)
    return data
}

app.get("/articles", async (req, res) => {
    try {
        const { q = "latest", max = 10 } = req.query;
        const data = await fetchFromGNews("search", {
            q,
            max,
            token: API_KEY
        })
        res.json(data)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

app.get("/search", async (req, res) => {
    try {
        const { title, author } = req.query
        const query = title || author
        const data = await fetchFromGNews("search", {
            q: query,
            token: API_KEY
        })
        res.json(data)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

app.listen(process.env.PORT, () =>
    console.log(`Server running on port ${process.env.PORT}`)
)
