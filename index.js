const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())
morgan.token('body', (request, response) => JSON.stringify(request.body))
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body - :req[content-length]'));
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

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

app.delete('/api/quotes/:id', (request, response) => {
    const id = Number(request.params.id)
    quotes = quotes.filter( quote => quote.id !== id)

    response.status(204).end()
})

const generateId = () => {
    return (Math.max(...quotes.map(quote => quote.id)) +1)
}

const getInfoFromRequest = (request, response, value) => {
    if (request.body[value]) {
        return request.body[value]
    } else {
        return response.status(400).json({
            error: `${value} missing`
        })
    }
}

app.post('/api/quotes', (request, response) => {
    const quote =     {
        id: generateId(),
        quote: getInfoFromRequest(request, response, 'quote'),
        author: getInfoFromRequest(request, response, 'author'),
        visual: getInfoFromRequest(request, response, 'visual'),
        prompt: getInfoFromRequest(request, response, 'prompt')
    }

    quotes = quotes.concat(quote)

    response.json(quote)
})

app.use(unknownEndpoint)

const PORT = 8001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

module.exports = app