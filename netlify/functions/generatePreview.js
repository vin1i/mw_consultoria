const firebase = require('firebase/app');
require('firebase/firestore');
const { parse } = require('querystring');

// Configuração do Firebase (mesmo arquivo de configuração que você já usou no front-end)
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // caso já tenha uma instância inicializada
}

const db = firebase.firestore();

exports.handler = async (event, context) => {
  try {
    const { id } = event.queryStringParameters;  // Pega o ID do imóvel da query string (ex: /imoveis/{id})

    // Busca os dados do imóvel no Firebase
    const propertyRef = db.collection('imoveis').doc(id);
    const doc = await propertyRef.get();

    if (!doc.exists) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Imóvel não encontrado' }),
      };
    }

    const propertyData = doc.data();
    const title = propertyData.titulo || "Imóvel Disponível";
    const description = (propertyData.descricao || "Descrição não disponível").substring(0, 150);
    const image = propertyData.imagens && propertyData.imagens.length > 0 ? propertyData.imagens[0] : "https://via.placeholder.com/300x200?text=Sem+Imagem";
    const url = `https://www.seusite.com/imoveis/${id}`;

    // Geração das metatags Open Graph
    const metaTags = `
      <meta property="og:title" content="${title}" />
      <meta property="og:description" content="${description}" />
      <meta property="og:image" content="${image}" />
      <meta property="og:url" content="${url}" />
      <meta property="og:type" content="website" />
    `;

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/html',
      },
      body: `<html><head>${metaTags}</head><body></body></html>`,
    };
  } catch (error) {
    console.error('Erro ao gerar metatags:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Erro ao gerar metatags' }),
    };
  }
};
