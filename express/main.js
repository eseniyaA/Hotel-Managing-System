const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'password',
  database: 'db',
  multipleStatements: true,
});

connection.connect();

app.get(`/api/guests`, (req, res) => {
  connection.query('SELECT * FROM Guests', function (err, rows) {
    if (err) throw err;

    res.send(rows);
  });
});

app.get(`/api/guest/:id`, (req, res) => {
  const id = req.params.id;

  connection.query(`SELECT * FROM Guests WHERE id = '${id}'`, function (err, rows) {
    if (err) throw err;

    res.send(rows[0]);
  });
});

app.get(`/api/staff`, (req, res) => {
  connection.query('SELECT * FROM Staff', function (err, rows) {
    if (err) throw err;

    res.send(rows);
  });
});

app.get(`/api/rooms`, (req, res) => {
  connection.query('SELECT * FROM Rooms', function (err, rows) {
    if (err) throw err;

    res.send(rows);
  });
});

app.get(`/api/staff/:id`, (req, res) => {
  const id = req.params.id;

  connection.query(`SELECT * FROM Staff WHERE id = '${id}'`, function (err, rows) {
    if (err) throw err;

    res.send(rows);
  });
});

app.get(`/api/bookings`, (req, res) => {
  connection.query('SELECT * FROM Booking', function (err, rows) {
    if (err) throw err;

    res.send(rows);
  });
});

app.get(`/api/roomTypes`, (req, res) => {
  connection.query('SELECT * FROM Room_type', function (err, rows) {
    if (err) throw err;

    res.send(rows);
  });
});

app.get(`/api/description`, (req, res) => {
  connection.query('SELECT description FROM Administration', function (err, rows) {
    if (err) throw err;

    res.send(rows);
  });
});

app.get(`/api/positions`, (req, res) => {
  connection.query('SELECT * FROM Position', function (err, rows) {
    if (err) throw err;

    res.send(rows);
  });
});

app.get(`/api/tours`, (req, res) => {
  connection.query('SELECT * FROM Tours', function (err, rows) {
    if (err) throw err;

    res.send(rows);
  });
});

app.get(`/api/breakfasts`, (req, res) => {
  connection.query('SELECT * FROM Breakfasts', function (err, rows) {
    if (err) throw err;

    res.send(rows);
  });
});

app.get(`/api/booking-staff`, (req, res) => {
  connection.query('SELECT * FROM Staff_Booking', function (err, rows) {
    if (err) throw err;

    res.send(rows);
  });
});

app.get(`/api/booking-room`, (req, res) => {
  connection.query('SELECT * FROM Booking_Room', function (err, rows) {
    if (err) throw err;

    res.send(rows);
  });
});

app.get(`/api/booking-rooms/:id`, (req, res) => {
  const id = req.params.id;

  connection.query(`SELECT * FROM Booking_Room WHERE bookingId = '${id}'`, function (err, rows) {
    if (err) throw err;

    res.send(rows);
  });
});

app.get(`/api/booking-breakfast`, (req, res) => {
  connection.query('SELECT * FROM Booking_Breakfast', function (err, rows) {
    if (err) throw err;

    res.send(rows);
  });
});

app.get(`/api/guest-booking`, (req, res) => {
  connection.query('SELECT * FROM Guest_Booking', function (err, rows) {
    if (err) throw err;

    res.send(rows);
  });
});

app.get(`/api/guest-tour`, (req, res) => {
  connection.query('SELECT * FROM Guest_Tours', function (err, rows) {
    if (err) throw err;

    res.send(rows);
  });
});

app.get(`/api/guest-booking/:id`, (req, res) => {
  const id = req.params.id;

  connection.query(`SELECT * FROM Guest_Booking WHERE idBooking = '${id}'`, function (err, rows) {
    if (err) throw err;

    res.send(rows);
  });
});

app.get(`/api/statistics-rooms`, (req, res) => {
  connection.query(
    'SELECT Room_type.type, price, COUNT(*) AS Frequency FROM Room_type, Rooms, Booking_Room WHERE Room_type.id = Rooms.typeId AND Rooms.id = Booking_Room.roomId GROUP BY Room_type.type, price ORDER BY COUNT(*) DESC LIMIT 1;',
    function (err, rows) {
      if (err) throw err;

      res.send(rows);
    }
  );
});

app.post('/api/guests', (req, res) => {
  connection.query(
    `INSERT INTO Guests (firstName, lastName) VALUES ('${req.body.firstName}', '${req.body.lastName}')`,
    function (err, rows) {
      if (err) throw err;

      res.send({ id: rows.insertId, ...req.body });

      console.log('Number of records inserted: ' + rows.affectedRows);
    }
  );
});

app.post('/api/breakfasts', (req, res) => {
  connection.query(
    `INSERT INTO Breakfasts (menu, price) VALUES ('${req.body.menu}', '${req.body.price}')`,
    function (err, rows) {
      if (err) throw err;

      res.send(req.body);

      console.log('Number of records inserted: ' + rows.affectedRows);
    }
  );
});

app.post('/api/staff', (req, res) => {
  connection.query(
    `INSERT INTO Staff (firstName, lastName, rating, positionId, salary) VALUES ('${req.body.firstName}', '${req.body.lastName}', '4', '${req.body.positionId}', '${req.body.salary}')`,
    function (err, rows) {
      if (err) throw err;

      res.send(req.body);

      console.log('Number of records inserted: ' + rows.affectedRows);
    }
  );
});

app.post('/api/booking', (req, res) => {
  const booking = `INSERT INTO db.Booking (arrivalDate, departureDate, bill) VALUES ('${req.body.arrivalDate}', '${req.body.departureDate}', '${req.body.bill}')`;

  connection.query(booking, function (err, rows) {
    if (err) throw err;

    const bookingId = rows.insertId;

    if (!bookingId) throw new Error('no bookingId');

    const bookingRoom = req.body.rooms
      .map((id) => `INSERT INTO db.Booking_Room (bookingId, roomId) VALUES ('${bookingId}', '${id}')`)
      .join(';');

    connection.query(bookingRoom, function (err1, rows1) {
      if (err1) throw err1;

      res.send({ id: bookingId, ...req.body });
    });

    console.log('Number of records inserted: ' + rows.affectedRows);
  });
});

app.post('/api/booking-guest', (req, res) => {
  const bookingGuest = `INSERT INTO Guest_Booking (idBooking, idGuest) VALUES ('${req.body.idBooking}', '${req.body.idGuest}')`;

  connection.query(bookingGuest, function (err, rows) {
    if (err) throw err;

    res.send(req.body);

    console.log('Number of records inserted: ' + rows.affectedRows);
  });
});

app.post('/api/guest-tour', (req, res) => {
  const guestTour = `INSERT INTO Guest_Tours (tourId, guestId) VALUES ('${req.body.tourId}', '${req.body.guestId}')`;

  connection.query(guestTour, function (err, rows) {
    if (err) throw err;

    res.send(req.body);

    console.log('Number of records inserted: ' + rows.affectedRows);
  });
});

app.post('/api/booking-room', (req, res) => {
  connection.query(
    `INSERT INTO db.Booking_Room (bookingId, roomId) VALUES ('${req.body.bookingId}', '${req.body.roomId}')`,
    function (err, rows) {
      if (err) throw err;

      res.send(req.body);

      console.log('Number of records inserted: ' + rows.affectedRows);
    }
  );
});

app.post('/api/booking-staff', (req, res) => {
  connection.query(
    `INSERT INTO db.Staff_Booking (bookingId, staffId) VALUES ('${req.body.bookingId}', '${req.body.staffId}')`,
    function (err, rows) {
      if (err) throw err;

      res.send(req.body);

      console.log('Number of records inserted: ' + rows.affectedRows);
    }
  );
});

app.post('/api/booking-breakfast', (req, res) => {
  connection.query(
    `INSERT INTO db.Booking_Breakfast (bookingId, breakfastId) VALUES ('${req.body.bookingId}', '${req.body.breakfastId}')`,
    function (err, rows) {
      if (err) throw err;

      res.send({ id: rows.insertId, ...req.body });

      console.log('Number of records inserted: ' + rows.affectedRows);
    }
  );
});

app.post('/api/tours', (req, res) => {
  connection.query(
    `INSERT INTO Tours (title, commonAmount, amountOfGuests, description, price) VALUES ('${req.body.title}', '${req.body.commonAmount}', '${req.body.amountOfGuests}', '${req.body.description}', '${req.body.price}')`,
    function (err, rows) {
      if (err) throw err;

      res.send(req.body);
      console.log(rows);
      console.log('Number of records inserted: ' + rows.affectedRows);
    }
  );
});

app.patch('/api/staff', (req, res) => {
  connection.query(
    `UPDATE Staff SET firstName = '${req.body.firstName}', lastName = '${req.body.lastName}', positionId = '${req.body.positionId}', salary = '${req.body.salary}' WHERE (id = '${req.body.id}');`,
    function (err, rows) {
      if (err) throw err;

      res.send(req.body);

      console.log('Number of records updated: ' + rows.affectedRows);
    }
  );
});

app.patch('/api/breakfast', (req, res) => {
  connection.query(
    `UPDATE Breakfasts SET menu = '${req.body.menu}', price = '${req.body.price}' WHERE (id = '${req.body.id}');`,
    function (err, rows) {
      if (err) throw err;

      res.send(req.body);

      console.log('Number of records updated: ' + rows.affectedRows);
    }
  );
});

app.patch('/api/tour', (req, res) => {
  connection.query(
    `UPDATE Tours SET title = '${req.body.title}', commonAmount = '${req.body.commonAmount}', amountOfGuests = '${req.body.amountOfGuests}', description = '${req.body.description}', price = '${req.body.price}' WHERE (id = '${req.body.id}');`,
    function (err, rows) {
      if (err) throw err;

      res.send(req.body);

      console.log('Number of records updated: ' + rows.affectedRows);
    }
  );
});

app.patch('/api/administration', (req, res) => {
  connection.query(
    `UPDATE Administration SET description = '${req.body.description}' WHERE (id = '1');`,
    function (err, rows) {
      if (err) throw err;

      res.send(req.body);

      console.log('Number of records updated: ' + rows.affectedRows);
    }
  );
});

app.patch('/api/booking-staff', (req, res) => {
  connection.query(
    `UPDATE Staff_Booking SET staffId = '${req.body.staffId}' WHERE (bookingId = '${req.body.bookingId}');`,
    function (err, rows) {
      if (err) throw err;

      res.send(req.body);

      console.log('Number of records updated: ' + rows.affectedRows);
    }
  );
});

app.delete('/api/staff', (req, res) => {
  connection.query(`DELETE FROM Staff WHERE (id = '${req.body.id}');`, function (err, rows) {
    if (err) throw err;

    res.send(true);

    console.log('Number of records deleted: ' + rows.affectedRows);
  });
});

app.delete('/api/breakfast', (req, res) => {
  connection.query(`DELETE FROM Breakfasts WHERE (id = '${req.body.id}');`, function (err, rows) {
    if (err) throw err;

    res.send(true);

    console.log('Number of records deleted: ' + rows.affectedRows);
  });
});

app.delete('/api/tour', (req, res) => {
  connection.query(`DELETE FROM Tours WHERE (id = '${req.body.id}');`, function (err, rows) {
    if (err) throw err;

    res.send(true);

    console.log('Number of records deleted: ' + rows.affectedRows);
  });
});

app.delete('/api/booking-room', (req, res) => {
  connection.query(`DELETE FROM Booking_Room WHERE (id = '${req.body.id}');`, function (err, rows) {
    if (err) throw err;

    res.send(true);

    console.log('Number of records deleted: ' + rows.affectedRows);
  });
});
