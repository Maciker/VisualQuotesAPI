const express = require('express')
const app = express()

let quotes = [
    {
        "id": 1,
        "quote": "Knowledge is Power",
        "author": "Francis Bacon",
        "visual": "https://cdn.midjourney.com/6cf63138-02f2-4b6f-b682-38ab2e52dac0/0_2.webp",
        "prompt": "knowledge is power, in minimalist style"
    },
    {
        "id": 2,
        "quote": "Unax talking with the moon",
        "author": "Francis Bacon",
        "visual": "https://cdn.midjourney.com/69bd4e55-6fa9-48e6-81d9-cc1525feada5/0_0.webp",
        "prompt": "a two years blonde kid, with short hair, talking with the moon"
    },
]

app.get('/', (request, response) => {
    response.send('<h1>Visual Quotes API</h1>')
})

app.get('/api/quotes', (resquest, response) => {
    response.json(quotes)
})

app.get('/api/quotes/:id', (request, response) => {
    const id = Number(request.params.id)
    const quote = quotes.find( quote => quote.id === id)
    if (quote) {
        response.json(quote)
    } else {
        response.status(404).end()
    }
})

const PORT = 8001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})