import { ObjectID } from 'mongodb';

const contactsController = (collection) => {

  const getContactsList = async () => {
    let contacts = await collection.find().toArray();
    return contacts;
  }

  const createContact = async (contact) => {
    await collection.insertOne(contact);
    let contacts = await collection.find().toArray();
    return contacts;
  }

  const updateContact = async (contactId, updates) => {
    await collection.updateOne({ _id: ObjectID(contactId) }, {
      $set: updates
    });
    let contact = await collection.findOne({ _id: ObjectID(contactId) });
    return contact;
  }

  const deleteContact = async (contactId) => {
    await collection.deleteOne({ _id: ObjectID(contactId) });
    let contacts = await collection.find().toArray();
    return contacts;
  }

  const controller = {
    getContactsList,
    createContact,
    updateContact,
    deleteContact
  }

  return controller;
}

export default contactsController;