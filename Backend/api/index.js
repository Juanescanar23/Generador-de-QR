import express from "express";
import cors from "cors";
import QRCode from "qrcode";
import { fileURLToPath } from "url";

const app = express();

const DEFAULT_ALLOWED_ORIGINS = [
  "https://generador-qr-frontend1.vercel.app",
  "http://localhost:5173",
];

const allowedOrigins = (process.env.ALLOWED_ORIGINS ?? DEFAULT_ALLOWED_ORIGINS.join(","))
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Origen no permitido por CORS"));
    },
  })
);
app.use(express.json());

// Ruta de prueba
app.get('/api', (req, res) => {
  res.json({ message: 'API QR funcionando' });
});

// Endpoint para generar código QR con CORS habilitado
const generateQRHandler = async (req, res) => {
  const rawUrl = typeof req.body.url === "string" ? req.body.url.trim() : "";

  if (!rawUrl) {
    return res.status(400).json({ error: "URL es requerida" });
  }

  try {
    const qrCodeImage = await QRCode.toDataURL(rawUrl);
    res.json({ qrCode: qrCodeImage });
  } catch (error) {
    console.error("Error generando el QR:", error);
    res.status(500).json({ error: "Error generando el código QR" });
  }
};

// Aplicamos el middleware allowCors al handler
app.post("/api/generate-qr", generateQRHandler);

// Manejo de errores
app.use((err, req, res, next) => {
  if (err?.message === "Origen no permitido por CORS") {
    return res.status(403).json({ error: err.message });
  }

  console.error(err?.stack || err);
  res.status(500).json({ error: 'Algo salió mal!' });
});

const PORT = process.env.PORT || 3800;
const isDirectRun = process.argv[1] === fileURLToPath(import.meta.url);

if (isDirectRun) {
  app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
  });
}

export default app; 
