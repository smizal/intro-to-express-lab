const express = require('express')

const app = express()

// 1. Be Polite, Greet the User
app.get('/greetings/:name', (req, res) => {
  res.send(
    `Hello there, ${req.params.name}!, What a delight it is to see you once more.`
  )
})

// 2. Rolling the Dice
app.get('/roll/:number', (req, res) => {
  const params = parseInt(req.params.number)
  if (params) {
    const randomNumber = Math.floor(Math.random() * params)
    res.send(`You rolled a ${randomNumber}`)
  } else {
    res.send(`You must specify a number.`)
  }
})

// 3. I Want THAT One!
app.get('/collectibles/:index', (req, res) => {
  const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
  ]

  const idx = parseInt(req.params.index)
  if (idx >= collectibles.length) {
    res.send(`This item is not yet in stock. Check back soon!`)
  } else {
    res.send(
      `So, you want the ${collectibles[idx].name}? For ${collectibles[idx].price}, it can be yours!`
    )
  }
})

// 4. Filter Shoes by Query Parameters
app.get('/shoes', (req, res) => {
  const shoes = [
    { name: 'Birkenstocks', price: 50, type: 'sandal' },
    { name: 'Air Jordans', price: 500, type: 'sneaker' },
    { name: 'Air Mahomeses', price: 501, type: 'sneaker' },
    { name: 'Utility Boots', price: 20, type: 'boot' },
    { name: 'Velcro Sandals', price: 15, type: 'sandal' },
    { name: 'Jet Boots', price: 1000, type: 'boot' },
    { name: 'Fifty-Inch Heels', price: 175, type: 'heel' }
  ]

  const minPrice = req.query['min-price']
  const maxPrice = req.query['max-price']
  const type = req.query['type']

  let filteredShoes = shoes
  if (Object.keys(req.query).length) {
    let tempList = []
    if (minPrice) {
      tempList = filteredShoes.filter((shoe) => {
        return shoe.price >= minPrice
      })
      filteredShoes = tempList
    }

    if (maxPrice) {
      tempList = filteredShoes.filter((shoe) => {
        return shoe.price <= maxPrice
      })
      filteredShoes = tempList
    }
    if (type) {
      tempList = filteredShoes.filter((shoe) => {
        return shoe.type == type
      })
      filteredShoes = tempList
    }
  }

  let body = ''
  filteredShoes.forEach((shoe, idx) => {
    body +=
      '<div>' +
      idx +
      '- Name: ' +
      shoe.name +
      ' | price: ' +
      shoe.price +
      ' | type: ' +
      shoe.type +
      '</div>'
  })
  res.send(body)
  /*  let filteredList = shoes.filter((shoe) => {
    return minPrice && minPrice <= shoe.price
  })
  console.log(filteredList) */
})

app.listen(3000, () => {
  console.log('Listening on port 3000')
})
