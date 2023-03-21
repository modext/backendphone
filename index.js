const express = require('express')
const morgan = require("morgan");

const app = express ()

app.use(express.json())
// app.use(morgan('tiny'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

let persons = [
  {
    id: 1,
    name:"Arto Hellas",
    number: "040-123456"
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number:"39-44-5323523"
  },
  {
    id: 3,
    name: "Dan Abramov",
    number:"12-43-234345"
  },
  {
    id: 4,
    name:"Mary Poppendick",
    number: "39-23-6423122"
  }
]

app.get('/api/persons',(req , res )=>{
  res.json(persons)
})
app.get('/info',(req , res )=>{
    const  currentTime1 = new Date();
    res.send(`Phonebook has info for ${persons.length} people.\n${currentTime1}`)
})

app.get('/api/persons/:id', (req, res)=>{
    const id = Number(req.params.id)
    const person = persons.find(person=>
        person.id === id 
)
    if (person){
        res.json(person)
    }else {
        res.status(404).send(`Phone number with id ${id} not found.`)
    }
})
app.delete('/api/persons/:id', (req, res)=>{
    const id = Number(req.params.id)
    persons = persons.filter(person=>
        person.id !== id 
)
    res.status(204).end()
})

app.post('/api/persons', (req, res)=>{
    

    const generatedId =()=>{
        let randId =  Math.floor(Math.random() * 50) +1
        let checkId = persons.some(p =>p.id !== randId)
        return checkId ? randId : generatedId()
        }

    const body = req.body

    persa = persons.some(person=>
        person.name === body.name )

    if (!body.name || !body.number) {
        return res.status(400).json({
            error: "name  or number  missing"
        })
    } 
    if (persa) {return res.status(400).json({
        error: 'name must be unique'
    })}


    const person = {
        name : body.name,
        number : body.number,
        id: generatedId()
    }
    persons = persons.concat(person)
    console.log (person)
    res.json (person)
})
morgan.token('body', (req, res) => JSON.stringify(req.body));

const PORT = 3001;
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});