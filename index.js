const express = require("express")
const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(express.json()); // Parse JSON body

app.listen(PORT, ()=>{
    console.log(`Server running on ${PORT}`);
})

const drugs = [
    { id: 1, name: "Amoxicillin", category: "Antibiotic", dosageMg: 500, isPrescriptionOnly: true, stock: 120, manufacturer: "Pfizer" },
    { id: 2, name: "Paracetamol", category: "Analgesic", dosageMg: 1000, isPrescriptionOnly: false, stock: 200, manufacturer: "GSK" },
    { id: 3, name: "Ibuprofen", category: "Analgesic", dosageMg: 400, isPrescriptionOnly: false, stock: 150, manufacturer: "Bayer" },
    { id: 4, name: "Chloroquine", category: "Antimalarial", dosageMg: 250, isPrescriptionOnly: true, stock: 80, manufacturer: "Sanofi" },
    { id: 5, name: "Ciprofloxacin", category: "Antibiotic", dosageMg: 500, isPrescriptionOnly: true, stock: 70, manufacturer: "Pfizer" },
    { id: 6, name: "Loratadine", category: "Antihistamine", dosageMg: 10, isPrescriptionOnly: false, stock: 160, manufacturer: "Novartis" },
    { id: 7, name: "Metformin", category: "Antidiabetic", dosageMg: 850, isPrescriptionOnly: true, stock: 140, manufacturer: "Teva" },
    { id: 8, name: "Artemether", category: "Antimalarial", dosageMg: 20, isPrescriptionOnly: true, stock: 60, manufacturer: "Roche" },
    { id: 9, name: "Aspirin", category: "Analgesic", dosageMg: 300, isPrescriptionOnly: false, stock: 180, manufacturer: "Bayer" },
    { id: 10, name: "Omeprazole", category: "Antacid", dosageMg: 20, isPrescriptionOnly: true, stock: 90, manufacturer: "AstraZeneca" },
    { id: 11, name: "Azithromycin", category: "Antibiotic", dosageMg: 250, isPrescriptionOnly: true, stock: 50, manufacturer: "Pfizer" },
    { id: 12, name: "Cetirizine", category: "Antihistamine", dosageMg: 10, isPrescriptionOnly: false, stock: 110, manufacturer: "Novartis" },
    { id: 13, name: "Insulin", category: "Antidiabetic", dosageMg: 100, isPrescriptionOnly: true, stock: 30, manufacturer: "Novo Nordisk" },
    { id: 14, name: "Artemisinin", category: "Antimalarial", dosageMg: 100, isPrescriptionOnly: true, stock: 50, manufacturer: "GSK" },
    { id: 15, name: "Codeine", category: "Analgesic", dosageMg: 30, isPrescriptionOnly: true, stock: 20, manufacturer: "Teva" },
    { id: 16, name: "Vitamin C", category: "Supplement", dosageMg: 500, isPrescriptionOnly: false, stock: 300, manufacturer: "Nature’s Bounty" },
    { id: 17, name: "Ranitidine", category: "Antacid", dosageMg: 150, isPrescriptionOnly: false, stock: 90, manufacturer: "Sanofi" },
    { id: 18, name: "Doxycycline", category: "Antibiotic", dosageMg: 100, isPrescriptionOnly: true, stock: 40, manufacturer: "Pfizer" },
    { id: 19, name: "Tramadol", category: "Analgesic", dosageMg: 50, isPrescriptionOnly: true, stock: 45, manufacturer: "Teva" },
    { id: 20, name: "Folic Acid", category: "Supplement", dosageMg: 5, isPrescriptionOnly: false, stock: 250, manufacturer: "Nature’s Bounty" }
];

app.get("/", (req, res)=>{
    res.json({message: "Welcome to Careerex Server"})
}) 

// 1. Get all drugs that are antibiotics.
app.get("/drugs/antibiotics", (req, res) => {
    const antibiotics = drugs.filter((each) => {
        return each.category.toLowerCase() === "antibiotic"
    })
    res.json(antibiotics)
})

// 2. Return an array of drug names in lowercase.
app.get("/drugs/names", (req, res) => {
    const drugnames = drugs.map((each) => {
        return each.name.toLowerCase()
    })
    res.json(drugnames)
})

// 3. Write a function that accepts a category and returns all drugs under that category.
app.post("/drugs/by-category", (req, res) => {
    // const category = resq.body.category

    const { category } = req.body

    if(!category){
        return res.json({Message: "Please enter a category..."})
    }

    const drugCategorized = drugs.filter((each) => {
        return each.category == category
    })

    res.json(drugCategorized)
})

// 4. Log each drug’s name and its manufacturer.
app.get("/drugs/names-manufacturer", (req, res)=>{
    const drugNamesAndManufacturers = drugs.map((each)=>{
        return {
            drunName: each.name,
            manufacturer: each.manufacturer
        }
    })

    res.json(drugNamesAndManufacturers)
})

// 5. Return all drugs that require a prescription.
app.get("/drugs/prescription", (req, res)=>{
    const prescribeDrug = drugs.filter((each)=>{
        return each.isPrescriptionOnly == true
    })

    res.json(prescribeDrug)
})

// 9. Write a function that takes a manufacturer name and returns how many drugs are from that company.
app.post("/drugs/manufacturer-count", (req, res)=>{
    const { manufacturer } = req.body

    if(!manufacturer){
        return res.status(400).json({message: "Please add a manufacturer"})
    }

    const manufacturerCount = drugs.filter((each)=>{
        return each.manufacturer == manufacturer
    })

    res.status(200).json({
        message: "Success",
        count: manufacturerCount.length, manufacturerCount
    })
})

// Status Codes
/**
 * 100, 101 ------ Informational Status code 
 * 
 * 200 ------ If it is successful
 * 
 * 201 ----- If it is successful and something was created or added into a database, you use 201. All the status codes that falls within 200 is used when something is successful
 * 
 * 300, 301 ----- Either a page, files or resuorces has moved somewhere. Is for redirect, something has been moved somewhere. It is a redirect and moved resources
 * 
 * 400: --- Bad request from the user. When a user make a bad request you return him back with status code of 400.
 * 
 * 401: ----- The user did not signin of did not authuenicated
 * 
 * 404: --- What they are looking does not exist

* 500: ----- Any issue coming from your server (Backend). i.e. server error

** After you add a status code it is very important you add a message 

*** As a backend developer there are two important things you must do.
1. CRUD => Create, Read, Update and Delete something from the database.

2. Authentication: Register a user, Login a user, Forgot password, Reset password and Send them an Email. 

******************
DATABASE
Two types of Database:
1. Relational database: Are those databases that save its data in a table. e.g. MySQL, Postgres. They works with tables and every tables has rows and columns. One user data will be in one row and another is second row etc.

2. Non Relational Database: E.g. Mango 
Mango Database is a non relational database because it doesn't save data in a table rather it saves in a document. e.g. a notebook, you open the first page and write the information the user, you open the second page and write the details of the second user. No two users must be written in the same page. You use a doucument for every user. And all these users you put the documents together and it becomes a collection.

********
Is there any Database to use?

** If you are working on an application that you knows everything about it, you should go MySQL or PostGress But if it is a database that the software application can grow at any time go for Mongo database. Mango Database can easily grow with any project.
Stooped: 20:00
**/

