# News API
A simple Express.js API that wraps GNews API for fetching and searching articles.

## Run locally
1. `npm install`
2. Create `.env` with `GNEWS_API_KEY` and `PORT`
3. `node server.js`

## Endpoints
- `/articles?q=keyword&max=10`
- `/search?title=term` or `/search?author=name`

## Caching
Uses in-memory cache to reduce API calls.
