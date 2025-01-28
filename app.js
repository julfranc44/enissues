const express = require('express');
const app = express();
const port = 3000;

// Configurer EJS comme moteur de template
app.set('view engine', 'ejs');
app.set('views', './views');

// Middleware pour parser les données du formulaire
app.use(express.urlencoded({ extended: true }));

// Stockage des tickets en mémoire (pour cet exemple)
let tickets = [];

// Route pour afficher le formulaire et la liste des tickets
app.get('/', (req, res) => {
    res.render('index', { tickets });
});

// Route pour créer un nouveau ticket
app.post('/submit', (req, res) => {
    const { name, email, message } = req.body;
    const newTicket = {
        id: Date.now(), // ID unique basé sur le timestamp
        name,
        email,
        message,
    };
    tickets.push(newTicket);
    res.redirect('/');
});

// Route pour supprimer un ticket
app.post('/delete/:id', (req, res) => {
    const ticketId = parseInt(req.params.id, 10);
    tickets = tickets.filter(ticket => ticket.id !== ticketId);
    res.redirect('/');
});

// Route pour afficher le formulaire de modification
app.get('/edit/:id', (req, res) => {
    const ticketId = parseInt(req.params.id, 10);
    const ticket = tickets.find(ticket => ticket.id === ticketId);
    res.render('edit', { ticket });
});

// Route pour mettre à jour un ticket
app.post('/update/:id', (req, res) => {
    const ticketId = parseInt(req.params.id, 10);
    const { name, email, message } = req.body;
    const ticketIndex = tickets.findIndex(ticket => ticket.id === ticketId);
    if (ticketIndex !== -1) {
        tickets[ticketIndex] = { ...tickets[ticketIndex], name, email, message };
    }
    res.redirect('/');
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});