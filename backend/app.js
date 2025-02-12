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
  origin: ['https://mwconsultoriaimobiliaria.com.br', 'http://localhost:3000', ' https://7de2-2804-5180-2305-21dc-b143-6a6a-4c9f-6572.ngrok-free.app/'], // Permitindo múltiplos domínios
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'], // Pode adicionar mais cabeçalhos aqui, caso necessário
  credentials: false, // Se você estiver usando cookies ou cabeçalhos de autenticação
};



app.use(cors(corsOptions)); // Configuração do CORS

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Serve arquivos estáticos (para imagens, CSS, etc.)
app.use(express.static(path.join(__dirname, 'public')));


// Rota para redirecionar crawlers para as meta tags dinâmicas
app.get('/imoveis/:id', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://mwconsultoriaimobiliaria.com.br'); // Corrigindo a origem para evitar problemas CORS
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

 const { id } = req.params;
 const userAgent = req.headers['user-agent'] || ''; // Obtém o User-Agent
 const isCrawler = /bot|crawl|spider|slurp|facebook|twitter|whatsapp|google/i.test(userAgent); // Detectando crawlers

 try {
   const docRef = db.collection('properties').doc(id);
   const docSnap = await docRef.get();

   if (docSnap.exists) {
     const property = docSnap.data();
     const images = property.imagens || []; // Certificando-se de que as imagens estão sendo extraídas corretamente

     // Se for um crawler, renderiza a página com as meta tags dinâmicas
     if (isCrawler) {
       res.render('property', {
         title: property.titulo,                // Passando o título do imóvel
         description: property.descricao,       // Passando a descrição
         images: images,                        // Passando as imagens (importante que a URL da imagem seja completa)
         url: `https://mwconsultoriaimobiliaria.com.br/imoveis/${id}`, // URL completa do imóvel
       });
     } else {
        // Para o frontend React, envia uma resposta JSON ou redireciona
        res.json({
          title: property.titulo,
          description: property.descricao,
          images: images, // Certificando-se de que as imagens estão sendo passadas corretamente
          url: `https://mwconsultoriaimobiliaria.com.br/imoveis/${id}`,
        });
      }
    } else {
      res.status(404).send('Imóvel não encontrado!');
    }
  } catch (error) {
    console.error('Erro ao acessar o Firestore: ', error);
    res.status(500).send('Erro ao acessar o Firestore');
  }
});

// Rota para pré-visualização das meta tags dinâmicas para crawlers
// Rota para pré-visualização das meta tags dinâmicas para crawlers
app.get('/og-preview/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const docRef = db.collection('properties').doc(id);
    const docSnap = await docRef.get();

    if (docSnap.exists) {
      const property = docSnap.data();
      const images = property.imagens || [];

      // Renderiza a página com EJS para crawlers
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

// Rota para obter e renderizar o imóvel (página normal)
app.get('/properties/:id',  async (req, res) => {
  const { id } = req.params;

  try {
    const docRef = db.collection('properties').doc(id);
    const docSnap = await docRef.get();

    if (docSnap.exists) {
      const property = docSnap.data();
      const images = property.imagens || [];

      // Renderizando a página normal para usuários (não crawlers)
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
    console.error("Erro ao acessar o Firestore: ", error);
    res.status(500).send('Erro ao acessar o Firestore');
  }
});

// Iniciando o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
