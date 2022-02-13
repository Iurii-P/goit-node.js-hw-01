const fs = require("fs/promises");
const { randomUUID } = require("crypto");
const path = require("path");

const contactsPath = path.join(__dirname, "/db/contacts.json");
console.log("file path of contacts.json :", contactsPath);

const readContent = async () => {
	const content = await fs.readFile(contactsPath, "utf-8");
	const result = JSON.parse(content);
	return result;
};

async function listContacts() {
	return await readContent();
}

async function getContactById(contactId) {
	const contacts = await readContent();
	const result = contacts.find((contact) => contact.id === contactId);
	if (!result) {
		return null;
	}
	return result;
}

async function removeContact(contactId) {
	const contacts = await listContacts();
	const idC = contacts.findIndex((item) => item.id === contactId);
	if (idC === -1) {
		return null;
	}
	const updateListContacts = contacts.filter((_, index) => index !== idC);
	await fs.writeFile(contactsPath, JSON.stringify(updateListContacts, null, 2));
	return contacts[idC];
}

async function addContact(name, email, phone) {
	const contacts = await readContent();
	const newContact = { id: randomUUID(), name, email, phone };
	contacts.push(newContact);
	await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
	return newContact;
}

module.exports = { addContact, removeContact, getContactById, listContacts };
