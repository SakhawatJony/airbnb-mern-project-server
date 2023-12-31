const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()
const port = process.env.PORT||5000;

// MIDLEWARE

app.use(cors());
app.use(express.json());


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tw8naco.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {serverApi: {version: ServerApiVersion.v1,strict: true,deprecationErrors: true, }});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const categoryCollection = client.db("airbnbMernDb").collection("category");
    app.get('/category', async (req, res) => {
        const result = await categoryCollection.find().toArray();

        res.send(result);
        
    });
 
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
     }
}
run().catch(console.dir);

app.get('/',(req,res)=>{
    res.send('airbnb-mern-project-server is sitting')
})

app.listen(port,()=>{
console.log(`airbnb-mern-project-server is sitting on port${port}`)

})