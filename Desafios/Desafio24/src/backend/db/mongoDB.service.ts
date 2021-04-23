const { MongoClient } = require("mongodb");
 
// Replace the following with your Atlas connection string                                                                                                                                        
const url = "mongodb+srv://agustin:central2015@cluster0.5w5mk.mongodb.net/ecommerce?retryWrites=true&w=majority";
const client = new MongoClient(url);
 
 // The database to use
 const dbName = "ecommerce";
                      
 async function run() {
    try {
         await client.connect();
         console.log("Connected correctly to server");
         const db = client.db(dbName);
         // Use the collection "people"
         const col = db.collection("people");
         // Construct a document                                                                                                                                                              
         let personDocument = {
             "name": { "first": "Alan", "last": "Turing" },
             "birth": new Date(1912, 5, 23), // June 23, 1912                                                                                                                                 
             "death": new Date(1954, 5, 7),  // June 7, 1954                                                                                                                                  
             "contribs": [ "Turing machine", "Turing test", "Turingery" ],
             "views": 1250000
         }
         // Insert a single document, wait for promise so we can read it back
         const p = await col.insertOne(personDocument);
         // Find one document
         const myDoc = await col.findOne();
         // Print to the console
         console.log(myDoc);
        } catch (err) {
         console.log(err.stack);
     }
 
     finally {
        await client.close();
    }
}

async function write(collectionName, fileToAdd) {
    try {
         await client.connect();
         const db = client.db(dbName);

         // Use the collection
         const col = db.collection(collectionName);

         // Insert a single document, wait for promise so we can read it back
         const p = await col.insertOne(fileToAdd);
        } catch (err) {
         console.log(err.stack);
     }

     finally {
        await client.close();
    }
} 

async function read(collectionName) {
    try {
         await client.connect();
         const db = client.db(dbName);

         // Use the collection
         const col = db.collection(collectionName);
         
         return await col.findOne()

        } catch (err) {
         console.log(err.stack);
     }
 
     finally {
        await client.close();
    }
}

async function readOne(collectionName, query) {
    try {
         await client.connect();
         const db = client.db(dbName);

         // Use the collection
         const col = db.collection(collectionName);
         
         return await col.findOne(query)

        } catch (err) {
         console.log(err.stack);
     }
 
     finally {
        await client.close();
    }
}

async function deleteOne(collectionName, query) {
    try {
         await client.connect();
         const db = client.db(dbName);

         // Use the collection
         const col = db.collection(collectionName);
         
         return await col.deleteOne(query)

        } catch (err) {
         console.log(err.stack);
     }
 
     finally {
        await client.close();
    }
}

async function updateOne(collectionName, id, setThis, toThis) {
    try {
         await client.connect();
         const db = client.db(dbName);

         // Use the collection
         const col = db.collection(collectionName);
        
         let updateDoc = {}
         let filter = { id: id }

         switch(setThis){
            case 'description':
                updateDoc = {
                    $set: {
                        description: toThis,
                    },
                }
                break
            case 'name':
                updateDoc = {
                    $set: {
                        name: toThis,
                    },
                }
                break
            case 'code':
                updateDoc = {
                    $set: {
                        code: toThis,
                    },
                }
                break
            case 'price':
                updateDoc = {
                    $set: {
                        price: toThis,
                    },
                }
                break
            case 'stock':
                updateDoc = {
                    $set: {
                        stock: toThis,
                    },
                }
                break   
        }


        return await col.updateOne(filter, updateDoc)

        } catch (err) {
         console.log(err.stack);
     }
 
     finally {
        await client.close();
    }
}

export {write, read, readOne, deleteOne, updateOne}
