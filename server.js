const WebSocket = require('ws'); // On inclus la lib websocket dans le script

const wss = new WebSocket.Server({ port: 9999 }); // On lance le serveur qui écoutera sur le port 9999

let clients = []; // La liste des clients qui se connectent à la discussion

/*
  En soit on constate qu'un serveur = une discussion, discussion à laquelle se greffe plusieurs utilisateur.
  Donc c'est une discussion de groupe. On va voir plus loin comment.
*/

wss.on('connection', function connection(ws) {
  clients.push(ws); // On a une nouvelle connexion, un nouvel utilisateur en soit.
  console.log("Client connected...!"); // Juste un log qui confirme la connexion.
  ws.on('message', function incoming(message) { // On bind l'événement au client, lorsqu'il reçoit un 'message'
    console.log('received: %s', message); // On affiche sur la console du serveur (le terminal) ce message
    clients.forEach((client) => { // Pour chaque clients connectés.
      client.send(message+""); // On envoie le message reçu.
      /*
        Ex : clients : 1, 2, 3
        1 envoie : bonjour
        1,2,3 vont recevoir : bonjour
        côté client on injecte pas directement le message dans le chat,
        comme ça pour l'exemple de 1 qui envoie bonjour, on a la confirmation
        que 1 a envoyé bonjour puisqu'il reçoit son propre message.
      */
    });
  });

  ws.send('Bienvenue sur le chat Gekkode!'); // Confirmation de connexion au chat.
});

console.log('Server started on port 9999'); // commentaire dans le terminal pour confirmer l'up du server.
