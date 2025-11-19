import { useMemo, useState, type SVGProps } from 'react';
import { Code2, Link, MessageCircle } from 'lucide-react';

const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ?? 'https://generador-qr-backend.vercel.app/api'
).replace(/\/$/, '');

const APP_SIGNATURE = 'JECT';

const WhatsappIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" {...props}>
    <path
      fill="currentColor"
      d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"
    />
  </svg>
);

const LinkedInIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" {...props}>
    <path
      fill="currentColor"
      d="M20.452 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.447-2.136 2.942v5.664H9.356V9h3.414v1.561h.047c.476-.9 1.637-1.852 3.366-1.852 3.595 0 4.258 2.368 4.258 5.451v6.292zM5.337 7.433a2.063 2.063 0 11.001-4.126 2.063 2.063 0 01-.001 4.126zm-1.777 13.019h3.554V9H3.56v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.225.792 24 1.771 24h20.451C23.2 24 24 23.225 24 22.271V1.729C24 .774 23.2 0 22.222 0z"
    />
  </svg>
);

const GitHubIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" {...props}>
    <path
      fill="currentColor"
      d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.016-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.758-1.333-1.758-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.776.418-1.305.762-1.605-2.665-.305-5.466-1.335-5.466-5.931 0-1.31.468-2.381 1.235-3.221-.123-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23a11.52 11.52 0 013.003-.404c1.02.005 2.047.138 3.003.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.233 1.911 1.233 3.221 0 4.609-2.804 5.624-5.475 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .321.218.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
    />
  </svg>
);

type GeneratorType = 'url' | 'whatsapp' | 'share';

function App() {
  const [url, setUrl] = useState('');
  const [whatsappMessage, setWhatsappMessage] = useState('');
  const [qrCodeImage, setQrCodeImage] = useState('');
  const [shareLink, setShareLink] = useState('');
  const [copyMessage, setCopyMessage] = useState('');
  const [shareStatus, setShareStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState<GeneratorType>('url'); // 'url', 'whatsapp' o 'share'
  const currentYear = new Date().getFullYear();
  const appVersion = useMemo(() => {
    const backendVersion = import.meta.env.VITE_BACKEND_VERSION;
    return backendVersion ?? '1.0.0';
  }, []);

  const handleTypeChange = (newType: GeneratorType) => {
    setType(newType);
    setShareLink('');
    setCopyMessage('');
  };

  const generateQRCode = async () => {
    const trimmedInput = url.trim();

    if (!trimmedInput) {
      const label =
        type === 'url'
          ? 'Ingresa una URL válida.'
          : 'Ingresa un número válido con código de país.';
      alert(label);
      return;
    }

    let finalUrl = trimmedInput;
    if (type === 'whatsapp' || type === 'share') {
      const cleanNumber = trimmedInput.replace(/[^\d]/g, '');

      if (cleanNumber.length < 8) {
        alert('Por favor ingresa un número con formato internacional (al menos 8 dígitos).');
        return;
      }

      const trimmedMessage = whatsappMessage.trim();
      const encodedMessage = trimmedMessage ? encodeURIComponent(trimmedMessage) : '';
      finalUrl = `https://wa.me/${cleanNumber}${encodedMessage ? `?text=${encodedMessage}` : ''}`;
    }

    if (type === 'share') {
      setShareLink(finalUrl);
      setCopyMessage('');
    } else {
      setShareLink('');
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/generate-qr`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: finalUrl })
      });

      const data = await response.json();

      if (response.ok) {
        setQrCodeImage(data.qrCode);
      } else {
        alert('Error: ' + data.error);
      }
    } catch (error) {
      console.error('Error al generar el QR:', error);
      alert('Hubo un problema al generar el código QR');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyShareLink = async () => {
    if (!shareLink) return;

    try {
      await navigator.clipboard.writeText(shareLink);
      setCopyMessage('Enlace copiado');
      setTimeout(() => setCopyMessage(''), 2000);
    } catch (error) {
      console.error('Error al copiar el enlace:', error);
      setCopyMessage('No se pudo copiar');
      setTimeout(() => setCopyMessage(''), 2000);
    }
  };

  const handleDownloadQR = () => {
    if (!qrCodeImage) return;

    const a = document.createElement('a');
    a.href = qrCodeImage;
    a.download = 'qrcode.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleShareQR = async () => {
    if (!qrCodeImage) return;

    try {
      const response = await fetch(qrCodeImage);
      const blob = await response.blob();
      const files = [
        new File([blob], 'qrcode.png', {
          type: 'image/png',
        }),
      ];

      if (navigator.canShare?.({ files })) {
        await navigator.share({
          title: 'Código QR generado',
          text: 'Comparte este código QR o el enlace wa.me listo para usar.',
          files,
        });
        setShareStatus('Código QR compartido');
      } else {
        window.open(
          `https://wa.me/?text=${encodeURIComponent('Mira este QR: ' + (shareLink || ''))}`,
          '_blank'
        );
        setShareStatus('Se abrió WhatsApp Web para compartir');
      }
    } catch (error) {
      console.error('No se pudo compartir el QR:', error);
      setShareStatus('No se pudo compartir el QR');
    } finally {
      setTimeout(() => setShareStatus(''), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="text-center mb-6 sm:mb-8 lg:mb-12 space-y-3 sm:space-y-4">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 flex items-center justify-center gap-2 flex-wrap">
            <Code2 className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-blue-600" />
            <span className="whitespace-nowrap">Generador de Código QR</span>
          </h1>
          <p className="text-sm sm:text-base text-gray-600 px-4 max-w-2xl mx-auto">
            Elige si quieres un QR clásico, un QR con mensaje de WhatsApp o solo el enlace <code className="bg-gray-100 px-1 py-0.5 rounded text-xs sm:text-sm">wa.me</code> listo para copiar.
            Todo se crea en segundos y no necesitas registrarte.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600 px-4">
            <div className="inline-flex items-center gap-2 bg-white shadow-sm rounded-full px-4 py-2 border border-gray-100 w-full sm:w-auto justify-center">
              <span className="font-semibold text-blue-600">1.</span>
              <span>Selecciona URL, WhatsApp o Compartir link</span>
            </div>
            <div className="inline-flex items-center gap-2 bg-white shadow-sm rounded-full px-4 py-2 border border-gray-100 w-full sm:w-auto justify-center">
              <span className="font-semibold text-blue-600">2.</span>
              <span>Ingresa la dirección o número y mensaje</span>
            </div>
            <div className="inline-flex items-center gap-2 bg-white shadow-sm rounded-full px-4 py-2 border border-gray-100 w-full sm:w-auto justify-center">
              <span className="font-semibold text-blue-600">3.</span>
              <span>Genera, copia el link y descarga el QR</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {/* Input Section */}
          <div className="bg-white p-4 sm:p-5 lg:p-6 rounded-lg shadow-md">
            <div className="space-y-4">
              {/* Tipo de QR */}
              <div className="flex gap-2 sm:gap-4 mb-4">
                <button
                  onClick={() => handleTypeChange('url')}
                  className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-md text-sm sm:text-base flex-1 sm:flex-none justify-center ${
                    type === 'url' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  <Link className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span>URL</span>
                </button>
                <button
                  onClick={() => handleTypeChange('whatsapp')}
                  className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-md text-sm sm:text-base flex-1 sm:flex-none justify-center ${
                    type === 'whatsapp' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span>WhatsApp</span>
                </button>
                <button
                  onClick={() => handleTypeChange('share')}
                  className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-md text-sm sm:text-base flex-1 sm:flex-none justify-center ${
                    type === 'share' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  <WhatsappIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span>Compartir link</span>
                </button>
              </div>

              <label className="block text-sm font-medium text-gray-700">
                {type === 'url' ? 'URL de la página' : 'Número de WhatsApp'}
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  {type === 'url' ? (
                    <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
                  ) : type === 'share' ? (
                    <WhatsappIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
                  ) : (
                    <MessageCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
                  )}
                  <input
                    type={type === 'url' ? 'url' : 'tel'}
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder={type === 'url' ? 'https://ejemplo.com' : '51999999999'}
                    className="pl-9 sm:pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 sm:p-2.5 text-sm sm:text-base border"
                  />
                </div>
              </div>

              {/* Campo de mensaje para WhatsApp */}
              {type !== 'url' && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Mensaje (opcional)
                  </label>
                  <textarea
                    value={whatsappMessage}
                    onChange={(e) => setWhatsappMessage(e.target.value)}
                    placeholder="Escribe un mensaje que se enviará automáticamente..."
                    className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 sm:p-2.5 border text-sm sm:text-base"
                    rows={3}
                  />
                </div>
              )}

              <div className="mt-4">
                <button
                  onClick={generateQRCode}
                  disabled={loading}
                  className={`w-full px-4 py-2.5 sm:py-2 text-sm sm:text-base ${
                    loading
                      ? 'bg-gray-400'
                      : type === 'url'
                        ? 'bg-blue-600 hover:bg-blue-700'
                        : type === 'whatsapp'
                          ? 'bg-green-600 hover:bg-green-700'
                          : 'bg-purple-600 hover:bg-purple-700'
                  } text-white rounded-md transition-colors disabled:cursor-not-allowed`}
                >
                  {loading ? 'Generando...' : type === 'share' ? 'Generar enlace + QR' : 'Generar QR'}
                </button>
              </div>
            </div>
          </div>

          {/* QR Display Section */}
          <div className="bg-white p-4 sm:p-5 lg:p-6 rounded-lg shadow-md">
            <div className="mb-4">
              <h3 className="text-base sm:text-lg font-medium text-gray-900">Código QR Generado</h3>
            </div>
            {type === 'share' && (
              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-2">Enlace directo listo para compartir</p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    readOnly
                    value={shareLink}
                    placeholder="Genera un enlace para copiarlo aquí"
                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 p-2 text-sm sm:text-base border"
                  />
                  <button
                    onClick={handleCopyShareLink}
                    disabled={!shareLink}
                    className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors disabled:bg-gray-300 disabled:text-gray-500"
                  >
                    Copiar enlace
                  </button>
                </div>
                {copyMessage && (
                  <p className="text-xs text-green-600 mt-1">
                    {copyMessage}
                  </p>
                )}
              </div>
            )}
            {qrCodeImage ? (
              <div className="text-center space-y-4">
                <img 
                  src={qrCodeImage} 
                  alt="Código QR" 
                  className="mx-auto my-4 w-full max-w-[180px] sm:max-w-[200px] lg:max-w-[250px] h-auto" 
                />
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={handleDownloadQR}
                    className="w-full sm:w-auto px-4 py-2.5 sm:py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors text-sm sm:text-base"
                  >
                    Descargar QR
                  </button>
                  <button
                    onClick={handleShareQR}
                    className="w-full sm:w-auto px-4 py-2.5 sm:py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm sm:text-base"
                  >
                    Compartir QR
                  </button>
                </div>
                {shareStatus && (
                  <p className="text-xs text-green-600">{shareStatus}</p>
                )}
              </div>
            ) : (
              <p className="text-center text-gray-500 text-sm sm:text-base py-8 sm:py-12">No hay código QR generado.</p>
            )}
          </div>
        </div>
        </div>
      </main>
      <footer className="mt-auto bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between text-sm">
          <div className="text-center md:text-left space-y-1">
            <p className="font-semibold">Versión {appVersion} · {APP_SIGNATURE}</p>
            <p className="text-xs sm:text-sm text-white/80">© {currentYear} · Made in Colombia</p>
          </div>
          <div className="text-center text-xs sm:text-sm text-white/90">
            <p>Todos los derechos reservados.</p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://linkedin.com/in/juanescanar/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-white text-[#0A66C2] px-4 py-2 rounded-full text-sm font-semibold transition-transform hover:scale-[1.02]"
            >
              <LinkedInIcon className="h-4 w-4" />
              LinkedIn
            </a>
            <a
              href="https://github.com/Juanescanar23/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-white text-gray-900 px-4 py-2 rounded-full text-sm font-semibold transition-transform hover:scale-[1.02]"
            >
              <GitHubIcon className="h-4 w-4" />
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
