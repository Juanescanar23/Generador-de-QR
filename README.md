# Generador de Código QR (Frontend + Backend)

Aplicación full-stack que permite generar códigos QR de enlaces o números de WhatsApp con mensajes predefinidos. Incluye una pestaña “Compartir link” para crear enlaces `wa.me` listos para copiar y enviar. Se compone de un backend en Express que expone un endpoint `/api/generate-qr` y un frontend en React + Vite que consume dicho endpoint y permite descargar la imagen resultante.

## Stack principal

- **Frontend:** React 18 + TypeScript, Vite 5, Tailwind CSS 3, Icons Lucide.
- **Backend:** Node.js 18+, Express 4, CORS, biblioteca `qrcode`.
- **Tooling:** ESLint 9 con `@typescript-eslint`, PNPM/NPM para dependencias, Vercel (sugerido) para despliegue serverless del backend.

## Estructura de carpetas

```
GENERADOR-QR-main/
├── Backend/         # API REST (Express)
│   ├── api/index.js # Punto de entrada para Vercel o node serverless
│   ├── server.js    # Variante local simplificada (opcional)
│   ├── index.js     # Script CLI para generar un QR desde terminal
│   └── .env.example
├── Frontend/        # SPA React + Vite
│   ├── src/
│   ├── public/
│   └── .env.example
└── README.md
```

## Variables de entorno

### Backend (`Backend/.env`)

```env
ALLOWED_ORIGINS=https://generador-qr-frontend1.vercel.app,http://localhost:5173
SAMPLE_QR_URL=https://ejemplo.com
PORT=3800
```

- `ALLOWED_ORIGINS`: lista separada por comas de orígenes autorizados por CORS. Agrega `http://localhost:5173` y `http://127.0.0.1:5173` para desarrollo local.
- `SAMPLE_QR_URL`: URL por defecto usada por `Backend/index.js` cuando se genera un QR desde CLI.
- `PORT`: puerto para `npm run dev`.

### Frontend (`Frontend/.env`)

```env
VITE_API_BASE_URL=http://localhost:3800/api
```

- Cambia el valor al dominio del backend desplegado (por ejemplo, Vercel) cuando publiques la app.

## Instalación y ejecución local

> Requisitos: Node.js 18+, NPM 10 o PNPM 10 (el proyecto incluye `pnpm-lock`, pero puede usarse NPM sin problemas).

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/Juanescanar23/Generador-de-QR.git
   cd Generador-de-QR
   ```

2. **Configurar backend**
   ```bash
   cd Backend
   cp .env.example .env   # edita según sea necesario
   npm install
   npm run dev            # inicia en http://localhost:3800
   ```

3. **Configurar frontend** (en otra terminal)
   ```bash
   cd Frontend
   cp .env.example .env   # ajusta VITE_API_BASE_URL
   npm install
   npm run dev            # abre http://localhost:5173
   ```

4. **Probar**
   - Abre `http://localhost:5173`.
   - Ingresa una URL o número de WhatsApp, genera el QR y descárgalo.

## Scripts útiles

| Ubicación  | Comando             | Descripción                                      |
|------------|---------------------|--------------------------------------------------|
| Backend    | `npm run dev`       | Inicia la API con `api/index.js`.               |
| Backend    | `npm run start`     | Igual que dev (útil en despliegue).             |
| Backend    | `node index.js`     | Genera un QR directo a `qrcode.png`.            |
| Frontend   | `npm run dev`       | Servidor Vite con HMR.                          |
| Frontend   | `npm run build`     | Empaqueta la SPA para producción.               |
| Frontend   | `npm run preview`   | Servir la build para verificación.              |
| Frontend   | `npm run lint`      | Ejecuta ESLint + TypeScript.                    |

## Flujo de funcionamiento

1. El usuario ingresa una URL o número de WhatsApp (se limpia y valida en `App.tsx`).
2. En la pestaña “Compartir link” se genera además un enlace `https://wa.me/...` copiable sin necesidad de QR.
3. El frontend envía la petición `POST` a `${VITE_API_BASE_URL}/generate-qr`.
4. El backend valida el cuerpo, genera un `data:image/png;base64` usando `qrcode` y lo devuelve.
5. El frontend muestra el QR, permite descargar la imagen y copiar (si aplica) el enlace directo de WhatsApp.

## Despliegue en Vercel

1. **Backend**: la carpeta `Backend` ya contiene `vercel.json` apuntando a `api/index.js`. Basta con conectarla a Vercel, configurar `ALLOWED_ORIGINS` y desplegar.
2. **Frontend**: genera la build (`npm run build`) y sube `Frontend/dist` a cualquier hosting estático (Vercel, Netlify, etc.) o usa Vercel conectando la carpeta Frontend.
3. Actualiza `VITE_API_BASE_URL` en producción para que apunte al endpoint público (`https://tu-app.vercel.app/api`).

## Preparar el repositorio para GitHub

Dentro de la carpeta raíz:

```bash
git init
git add .
git commit -m "feat: primera versión documentada"
git branch -M main
git remote add origin git@github.com:Juanescanar23/Generador-de-QR.git
git push -u origin main
```

> Si prefieres HTTPS, reemplaza la URL del remoto por `https://github.com/Juanescanar23/Generador-de-QR.git`. Asegúrate de tener tus credenciales configuradas antes del push.

## Próximos pasos sugeridos

- Añadir pruebas automatizadas (por ejemplo, tests E2E con Playwright) para validar generación y descarga.
- Incorporar almacenamiento de historial de QR o analíticas básicas.
- Internacionalización para soportar múltiples idiomas.
