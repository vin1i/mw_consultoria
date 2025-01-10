require('dotenv').config();
const express = require("express");
const admin = require("firebase-admin");
const prerender = require('prerender-node'); // Importa o middleware
const cors = require('cors');

const app = express();
app.use(cors());

// Configura o middleware do Prerender.io
app.use(prerender.set('prerenderToken', process.env.PRERENDER_TOKEN));

// Inicializando o Firebase Admin
const firebaseCredentials = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
  credential: admin.credential.cert(firebaseCredentials),
  databaseURL: process.env.FIREBASE_DATABASE_URL || "https://mwconsultoria-e14e4.firebaseio.com",
});

const db = admin.firestore();
const propertyCollection = db.collection("properties");

// Endpoint para informações de imóveis
app.get("/imoveis/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const docRef = propertyCollection.doc(id);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      return res.status(404).send({ message: "Imóvel não encontrado" });
    }

    const propertyData = docSnap.data();
    const property = {
      titulo: propertyData.nm_titulo || "Imóvel disponível",
      descricao: propertyData.ds_descricao || "Descrição não disponível",
      imagens: propertyData.imagens || [],
      endereco: propertyData.ds_localizacao || "Endereço não informado",
    };

    const metaTitle = property.titulo;
    const metaDescription = property.descricao.substring(0, 150);
    const metaImage = property.imagens[0] || "https://via.placeholder.com/300x200?text=Sem+Imagem";
    const metaUrl = `https://www.mwconsultoriaimobiliaria.com.br/imoveis/${id}`;

    const html = `<!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="${metaDescription}">
        <meta property="og:title" content="${metaTitle}">
        <meta property="og:description" content="${metaDescription}">
        <meta property="og:image" content="${metaImage}">
        <meta property="og:url" content="${metaUrl}">
        <meta property="og:type" content="website">
        <title>${metaTitle}</title>
      </head>
      <body>
        <h1>${property.titulo}</h1>
        <p>${property.descricao}</p>
        <img src="${metaImage}" alt="${metaTitle}">
      </body>
      </html>`;

    res.send(html);
  } catch (error) {
    console.error("Erro ao buscar imóvel:", error.message);
    res.status(500).send({ message: "Erro ao buscar imóvel.", error: error.message });
  }
});

// Configuração da rota de fallback (404)
app.use((req, res) => {
  res.status(404).send({ message: "Rota não encontrada" });
});

// Porta de execução
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Backend rodando na porta ${port}`);
});
