require('dotenv').config();  // Carrega as variáveis de ambiente do arquivo .env

const express = require("express");
const admin = require("firebase-admin");
const cors = require('cors');
const prerender = require('prerender-node');
const path = require('path');

const app = express();
app.use(cors());

// Inicializar o Prerender
app.use(prerender);

// Obtendo a chave do Firebase a partir da variável de ambiente
const firebaseCredentials = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

// Inicializando o Firebase Admin com as credenciais do ambiente
admin.initializeApp({
  credential: admin.credential.cert(firebaseCredentials),
  databaseURL: "https://mwconsultoria-e14e4.firebaseio.com",
});

const db = admin.firestore();

// Definindo a coleção de imóveis
const propertyCollection = db.collection("properties");

// Endpoint para pegar as informações do imóvel por ID
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
      valorVenda: propertyData.vl_preco || 0,
      valorLocacao: propertyData.vl_locacao || 0,
      endereco: propertyData.ds_localizacao || "Endereço não informado",
      imagens: propertyData.imagens || [],
      vlCondominio: propertyData.vlCondominio || 0,
      vlIptu: propertyData.vlIptu || 0,
      quartos: propertyData.nr_quartos || 0,
      suites: propertyData.nr_suites || 0,
      banheiros: propertyData.nr_banheiros || 0,
      vagas: propertyData.nr_vagas_garagem || 0,
      metrosQuadrados: propertyData.nr_tamanho || 0,
      videos: propertyData.videos || [],
      disponibilidade: propertyData.st_disponibilidade || "Indefinido",
    };

    // Formatação de meta tags para o Open Graph (link preview)
    const metaTitle = property.titulo;
    const metaDescription = property.descricao.substring(0, 150);
    const metaImage = property.imagens[0] || "https://via.placeholder.com/300x200?text=Sem+Imagem";
    const metaUrl = `https://www.mwconsultoriaimobiliaria.com.br/imoveis/${id}`;

    // Renderizar as meta tags no HTML
    const html = `
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="${metaDescription}">
        <meta property="og:title" content="${metaTitle}">
        <meta property="og:description" content="${metaDescription}">
        <meta property="og:image" content="${metaImage}">
        <meta property="og:url" content="${metaUrl}">
        <title>${metaTitle}</title>
      </head>
      <body>
        <h1>${property.titulo}</h1>
        <p>${property.descricao}</p>
        <img src="${metaImage}" alt="${metaTitle}">
        <!-- Outras informações do imóvel aqui -->
      </body>
      </html>
    `;

    res.send(html);

  } catch (error) {
    console.error("Erro ao buscar imóvel:", error.message);
    res.status(500).send({ message: "Erro ao buscar imóvel.", error: error.message });
  }
});

// Porta de execução
const port = process.env.PORT || 5000;  // Usando a variável de ambiente PORT ou 5000 como fallback
app.listen(port, () => {
  console.log(`Backend rodando na porta ${port}`);
});
