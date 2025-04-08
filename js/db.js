// js/db.js

// Initialize tables in localStorage if they don't exist
function initDB() {
  if (!localStorage.getItem('clients')) {
    localStorage.setItem('clients', JSON.stringify([]));
  }
  if (!localStorage.getItem('freelancers')) {
    localStorage.setItem('freelancers', JSON.stringify([]));
  }
  if (!localStorage.getItem('jobs')) {
    localStorage.setItem('jobs', JSON.stringify([]));
  }
  if (!localStorage.getItem('proposals')) {
    localStorage.setItem('proposals', JSON.stringify([]));
  }
}

// Insert a new record into a table (e.g., 'clients' or 'freelancers')
function insertRecord(table, record) {
  const records = JSON.parse(localStorage.getItem(table)) || [];
  record.id = Date.now();
  records.push(record);
  localStorage.setItem(table, JSON.stringify(records));
  return record;
}

// Retrieve all records from a table
function fetchRecords(table) {
  return JSON.parse(localStorage.getItem(table)) || [];
}

// Find a record in a table by a specific key and value
function findRecord(table, key, value) {
  const records = fetchRecords(table);
  return records.find(record => record[key] === value);
}

// Update a record in a table by id with updatedData
function updateRecord(table, id, updatedData) {
  let records = fetchRecords(table);
  records = records.map(record => {
    if (record.id === id) {
      return { ...record, ...updatedData };
    }
    return record;
  });
  localStorage.setItem(table, JSON.stringify(records));
}

// Initialize DB on load
initDB();
