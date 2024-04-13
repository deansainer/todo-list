const PORT = process.env.PORT ?? 8000
const express = require('express')
const app = express()
const cors = require('cors')
const TodosRouter = require('./routes/TodosRouter')

app.use(cors())
app.use(express.json())
app.use('/api', TodosRouter);

app.listen(PORT, () => console.log(`server running on port ${PORT}`))