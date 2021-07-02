import app from './app';
import { url } from './config/db';
import { MongoClient } from 'mongodb';
import contactsController from './contactsController';

function createContacts() {
    let contacts = [];
    for (let i = 0; i < 10; i++) {
        contacts.push({
            name: `person ${i}`,
            email: `person${i}@server.com`
        })
    }
    return contacts;
}

MongoClient.connect(url, { useUnifiedTopology: true }, async (e, client) => {
    if (e) return console.error(e);

    const db = client.db("contact-list");
    const collection = db.collection('contacts');

    let contacts = await collection.find().toArray();
    if (contacts.length === 0) await collection.insertMany(createContacts());

    // routes

    const controller = contactsController(collection);

    app.get("/", (req, res) => res.send("hello world"));

    app.post("/contact", async (req, res) => {
        let body = req.body;
        let contacts = await controller.createContact(body);
        res.send(contacts);
    });

    app.get("/contacts", async (req, res) => {
        let contacts = await controller.getContactsList();
        res.send(contacts);
    });

    app.put("/contact/:id", async (req, res) => {
        let contactId = req.params.id;
        let body = req.body;
        let contact = await controller.updateContact(contactId, body);
        res.send(contact);
    });

    app.delete("/contact/:id", async (req, res) => {
        let contactId = req.params.id;
        let contacts = await controller.deleteContact(contactId);
        res.send(contacts);
    });

});

app.listen(8000, () => console.log("server running on port 8000"));