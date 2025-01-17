const express = require('express');
const path = require('path');
const admin = require('firebase-admin');
const dotenv = require('dotenv');
const cors = require('cors'); // Importando o pacote CORS
require('dotenv').config();

// Carregando variáveis de ambiente do arquivo .env
dotenv.config();

// Inicializando o Firebase Admin SDK com variáveis de ambiente
const serviceAccount = {
  "type": "service_account",
  "project_id": process.env.FIREBASE_PROJECT_ID,
  "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID,
  "private_key": process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  "client_email": process.env.FIREBASE_CLIENT_EMAIL,
  "client_id": process.env.FIREBASE_CLIENT_ID,
  "auth_uri":  process.env.FIREBASE_AUTH_URI,
  "token_uri":  process.env.FIREBASE_TOKEN_URI,
  "auth_provider_x509_cert_url": process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  "client_x509_cert_url": process.env.FIREBASE_CLIENT_X509_CERT_URL
};

// Inicializando o Firebase Admin com a chave do serviço
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`, // Usando a variável para o URL
});

const db = admin.firestore();

const app = express();

// Configuração do motor de template EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Usando o CORS para permitir requisições de outras origens
const corsOptions = {
  origin: 'https://c5af-2804-5180-2305-21dc-514-51f4-2dbe-51a2.ngrok-free.app', // Substitua com a URL do seu frontend
  methods: ['GET', 'POST'],
};
app.use(cors(corsOptions)); // Habilita o CORS para o servidor

// Serve arquivos estáticos (para imagens, CSS, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Rota para obter e renderizar o imóvel
app.get('/properties/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const docRef = db.collection('properties').doc(id);
    const docSnap = await docRef.get();

    if (docSnap.exists) {
      const property = docSnap.data();
      const images = property.imagens || [];

      // Renderizar a página EJS com as informações do imóvel
      res.render('property', {
        title: property.titulo,
        description: property.descricao,
        images: images,
        url: `https://mwconsultoriaimobiliaria.com.br/properties/${id}`,
      });
    } else {
      res.status(404).send('Imóvel não encontrado!');
    }
  } catch (error) {
    console.error("Erro ao acessar o Firestore: ", error);
    res.status(500).send('Erro ao acessar o Firestore');
  }
});



// Iniciando o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
