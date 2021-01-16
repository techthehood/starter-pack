const express = require('express')
  const app = express()
  const port = 3000

  app.get('/', (req, res) => res.send('Hello World!'))

  app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

// setup a simple express server
//[express | docs](https://inspectatech.github.io/notes/?path=/docs/nodejs-express-express-notes--page)
