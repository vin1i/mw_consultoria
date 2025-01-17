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



// Rota para redirecionar crawlers para as meta tags dinâmicas
app.get('/imoveis/:id', async (req, res) => {
  const { id } = req.params;
 
  try {
    const docRef = db.collection('properties').doc(id);
    const docSnap = await docRef.get();

    if (docSnap.exists) {
      const property = docSnap.data();
      const images = property.imagens || [];
      const { id} = req.params;
      if( !/^\d+$/.test(id) ) {
        return res.status(400).send( 'ID inválido!')
      }
      // Renderiza o EJS com as meta tags dinâmicas
      console.log("Id do imóvel", id);
      res.render('property', {
        title: property.titulo,
        description: property.descricao,
        images: images,
        url: `https://mwconsultoriaimobiliaria.com.br/imoveis/${id}`,
      });
    } else {
      res.status(404).send('Imóvel não encontrado!');
    }
  } catch (error) {
    console.error('Erro ao acessar o Firestore:', error);
    res.status(500).send('Erro interno do servidor');
  } 
});


// Rota para obter e renderizar o imóvel
app.get('/properties/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Buscando o imóvel na coleção 'properties' do Firestore
    const docRef = db.collection('properties').doc(id);
    const docSnap = await docRef.get();

    if (docSnap.exists) {
      const property = docSnap.data();

      // Verifique se 'imagens' está presente nos dados e se é um array
      const images = property.imagens || [];
      
      // Renderizando a página com EJS
      res.render('property', {
        title: property.titulo,          // Certifique-se que o nome do campo é correto
        description: property.descricao, // Certifique-se que o nome do campo é correto
        images: images,                  // Imagens armazenadas no Firestore
        url: `https://mwconsultoriaimobiliaria.com.br/imoveis/${id}`  // URL personalizada para o imóvel
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
