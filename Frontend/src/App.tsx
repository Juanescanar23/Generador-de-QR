import { type ChangeEvent, type ReactNode, useEffect, useMemo, useState, type SVGProps } from 'react';
import { ChevronDown, Code2, Link, MessageCircle } from 'lucide-react';
import QRCodeStyling from 'qr-code-styling';
import { COUNTRY_OPTIONS, type CountryOption } from './countries';

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

type FrameStyle = 'none' | 'soft-card' | 'badge' | 'scooter';
type PatternStyle = 'rounded' | 'dots' | 'classy' | 'rounded-square' | 'square';
type CornerStyle = 'square' | 'dot' | 'extra-rounded';

type DesignOptions = {
  frameStyle: FrameStyle;
  frameText: string;
  frameColor: string;
  frameUseGradient: boolean;
  frameGradientStart: string;
  frameGradientEnd: string;
  frameBgColor: string;
  frameBgUseGradient: boolean;
  frameBgGradientStart: string;
  frameBgGradientEnd: string;
  frameTextColor: string;
  patternStyle: PatternStyle;
  patternColor: string;
  patternUseGradient: boolean;
  patternGradientStart: string;
  patternGradientEnd: string;
  patternBgColor: string;
  patternBgTransparent: boolean;
  cornerStyle: CornerStyle;
  cornerOuterColor: string;
  cornerInnerColor: string;
  logoDataUrl: string;
  logoSize: number;
};

const DEFAULT_DESIGN_OPTIONS: DesignOptions = {
  frameStyle: 'soft-card',
  frameText: '¡Escanéame!',
  frameColor: '#111827',
  frameUseGradient: false,
  frameGradientStart: '#6366f1',
  frameGradientEnd: '#8b5cf6',
  frameBgColor: '#ffffff',
  frameBgUseGradient: false,
  frameBgGradientStart: '#ffffff',
  frameBgGradientEnd: '#f3f4f6',
  frameTextColor: '#111827',
  patternStyle: 'rounded',
  patternColor: '#111827',
  patternUseGradient: false,
  patternGradientStart: '#111827',
  patternGradientEnd: '#6366f1',
  patternBgColor: '#ffffff',
  patternBgTransparent: false,
  cornerStyle: 'extra-rounded',
  cornerOuterColor: '#111827',
  cornerInnerColor: '#111827',
  logoDataUrl: '',
  logoSize: 0.22,
};

const FRAME_OPTIONS: Array<{ id: FrameStyle; label: string; description: string }> = [
  { id: 'none', label: 'Libre', description: 'Solo el QR sin decoraciones' },
  { id: 'soft-card', label: 'Tarjeta', description: 'Marco redondeado con texto' },
  { id: 'badge', label: 'Badge', description: 'Marco con acento lateral' },
  { id: 'scooter', label: 'Scooter', description: 'Perfecto para envíos y delivery' },
];

const PATTERN_OPTIONS: Array<{ id: PatternStyle; label: string }> = [
  { id: 'rounded', label: 'Ondas suaves' },
  { id: 'dots', label: 'Puntos' },
  { id: 'classy', label: 'Clásico' },
  { id: 'rounded-square', label: 'Pixel suave' },
  { id: 'square', label: 'Cuadrado' },
];

const CORNER_OPTIONS: Array<{ id: CornerStyle; label: string }> = [
  { id: 'extra-rounded', label: 'Bubble' },
  { id: 'dot', label: 'Puntos' },
  { id: 'square', label: 'Clásico' },
];

const SCOOTER_PATH =
  'M5.5 16.5h2.2l1-2.8h6.1l1.1 2.8h1.6a3 3 0 110 2h-1.3a3 3 0 11-5.6 0H8.7a3 3 0 11-5.6 0H2v-2h1.6l.9-2.4a3 3 0 012.8-2h2.8L16 6.5h3.4L20.9 9h-3.6l-2.2 3.7h-6.4l-.6 1.8h-3z';

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
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<CountryOption>(
    COUNTRY_OPTIONS.find((c) => c.code === 'CO') ?? COUNTRY_OPTIONS[0]
  );
  const [lastGeneratedValue, setLastGeneratedValue] = useState('');
  const [designOptions, setDesignOptions] = useState<DesignOptions>(DEFAULT_DESIGN_OPTIONS);
  const [styledQrImage, setStyledQrImage] = useState('');
  const [designLoading, setDesignLoading] = useState(false);
  const [countrySearch, setCountrySearch] = useState('');
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [accordionOpen, setAccordionOpen] = useState<Record<string, boolean>>({
    frame: true,
    pattern: true,
    corners: true,
    logo: false,
  });
  const currentYear = new Date().getFullYear();
  const appVersion = useMemo(() => {
    const backendVersion = import.meta.env.VITE_BACKEND_VERSION;
    return backendVersion ?? '1.0.0';
  }, []);
  const displayedQrImage = styledQrImage || qrCodeImage;

  const filteredCountries = useMemo(() => {
    const term = countrySearch.trim().toLowerCase();
    if (!term) return COUNTRY_OPTIONS;
    return COUNTRY_OPTIONS.filter((country) =>
      country.name.toLowerCase().includes(term) ||
      country.dialCode.toLowerCase().includes(term) ||
      country.code.toLowerCase().includes(term)
    );
  }, [countrySearch]);

  const updateDesign = (updates: Partial<DesignOptions>) => {
    setDesignOptions((prev) => ({ ...prev, ...updates }));
  };

  const toggleSection = (key: keyof typeof accordionOpen) => {
    setAccordionOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleTypeChange = (newType: GeneratorType) => {
    setType(newType);
    setShareLink('');
    setCopyMessage('');
  };

  const handleCountrySelect = (country: CountryOption) => {
    setSelectedCountry(country);
    setIsCountryOpen(false);
    setCountrySearch('');
  };

  const generateQRCode = async () => {
    const trimmedInput = (type === 'url' ? url : phoneNumber).trim();

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
      const dialDigits = selectedCountry.dialCode.replace(/[^\d]/g, '');
      const localNumber = cleanNumber.startsWith(dialDigits)
        ? cleanNumber.slice(dialDigits.length)
        : cleanNumber;

      if (localNumber.length < 6) {
        alert('Por favor ingresa un número válido (al menos 6 dígitos sin incluir el código).');
        return;
      }

      const finalNumber = `${dialDigits}${localNumber}`;
      const trimmedMessage = whatsappMessage.trim();
      const encodedMessage = trimmedMessage ? encodeURIComponent(trimmedMessage) : '';
      finalUrl = `https://wa.me/${finalNumber}${encodedMessage ? `?text=${encodedMessage}` : ''}`;
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
        setLastGeneratedValue(finalUrl);
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
    if (!displayedQrImage) return;

    const a = document.createElement('a');
    a.href = displayedQrImage;
    a.download = 'qrcode.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleShareQR = async () => {
    if (!displayedQrImage) return;

    try {
      const response = await fetch(displayedQrImage);
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
        const fallbackLink = shareLink || lastGeneratedValue || '';
        window.open(
          `https://wa.me/?text=${encodeURIComponent('Mira este QR: ' + fallbackLink)}`,
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

  const handleLogoUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 1024 * 1024) {
      alert('El logo debe pesar menos de 1 MB.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      updateDesign({ logoDataUrl: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  const clearLogo = () => updateDesign({ logoDataUrl: '' });

  useEffect(() => {
    if (!lastGeneratedValue) {
      setStyledQrImage('');
      return;
    }

    let isActive = true;

    const generateStyledQr = async () => {
      setDesignLoading(true);
      try {
        const qr = new QRCodeStyling({
          width: 480,
          height: 480,
          data: lastGeneratedValue,
          qrOptions: {
            errorCorrectionLevel: 'H',
            typeNumber: 0,
          },
          dotsOptions: {
            type: designOptions.patternStyle,
            color: designOptions.patternUseGradient ? undefined : designOptions.patternColor,
            gradient: designOptions.patternUseGradient
              ? {
                  type: 'linear',
                  rotation: 0,
                  colorStops: [
                    { offset: 0, color: designOptions.patternGradientStart },
                    { offset: 1, color: designOptions.patternGradientEnd },
                  ],
                }
              : undefined,
          },
          cornersSquareOptions: {
            type: designOptions.cornerStyle,
            color: designOptions.cornerOuterColor,
          },
          cornersDotOptions: {
            type: designOptions.cornerStyle === 'square' ? 'square' : 'dot',
            color: designOptions.cornerInnerColor,
          },
          backgroundOptions: {
            color: designOptions.patternBgTransparent ? 'rgba(0,0,0,0)' : designOptions.patternBgColor,
          },
          imageOptions: designOptions.logoDataUrl
            ? {
                crossOrigin: 'anonymous',
                hideBackgroundDots: false,
                image: designOptions.logoDataUrl,
                margin: 8,
                imageSize: designOptions.logoSize,
              }
            : undefined,
        });

        const rawData = await qr.getRawData('png');
        if (!rawData) {
          if (isActive) setStyledQrImage(qrCodeImage);
          return;
        }

        const base64 = await blobToDataUrl(rawData as Blob);
        const framed = await applyFrameToQr(base64, designOptions);
        if (isActive) {
          setStyledQrImage(framed);
        }
      } catch (error) {
        console.error('Error aplicando estilos al QR:', error);
        if (isActive) {
          setStyledQrImage(qrCodeImage);
        }
      } finally {
        if (isActive) {
          setDesignLoading(false);
        }
      }
    };

    generateStyledQr();

    return () => {
      isActive = false;
    };
  }, [designOptions, lastGeneratedValue, qrCodeImage]);

  const DesignerSection = ({
    id,
    title,
    description,
    children,
    open,
    onToggle,
  }: {
    id: string;
    title: string;
    description: string;
    children: ReactNode;
    open: boolean;
    onToggle: (key: keyof typeof accordionOpen) => void;
  }) => (
    <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-[0_4px_20px_rgba(15,23,42,0.05)]">
      <button
        type="button"
        onClick={() => onToggle(id as keyof typeof accordionOpen)}
        className="w-full px-5 py-4 flex items-center justify-between"
      >
        <div>
          <p className="text-sm font-semibold text-gray-900">{title}</p>
          <p className="text-xs text-gray-500">{description}</p>
        </div>
        <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform ${open ? '' : 'rotate-180'}`} />
      </button>
      <div
        className={`transition-all duration-300 ${
          open ? 'max-h-[1200px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-5 pb-5 border-t border-gray-100 space-y-4">{children}</div>
      </div>
    </div>
  );

  const ColorController = ({
    label,
    value,
    onChange,
    gradientEnabled,
    onToggleGradient,
    gradientStart,
    gradientEnd,
    onChangeGradientStart,
    onChangeGradientEnd,
  }: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    gradientEnabled?: boolean;
    onToggleGradient?: (checked: boolean) => void;
    gradientStart?: string;
    gradientEnd?: string;
    onChangeGradientStart?: (value: string) => void;
    onChangeGradientEnd?: (value: string) => void;
  }) => (
    <div className="bg-gray-50 rounded-xl p-4">
      <div className="flex items-center justify-between text-xs font-semibold text-gray-500">
        <span>{label}</span>
        {onToggleGradient && (
          <label className="flex items-center gap-2 text-gray-500">
            <input
              type="checkbox"
              checked={Boolean(gradientEnabled)}
              onChange={(e) => onToggleGradient(e.target.checked)}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            Gradiente
          </label>
        )}
      </div>
      <div className="mt-3">
        <ColorSwatch value={value} onChange={onChange} />
      </div>
      {gradientEnabled && gradientStart && gradientEnd && onChangeGradientStart && onChangeGradientEnd && (
        <div className="mt-3 grid grid-cols-2 gap-3">
          <ColorSwatch
            label="Inicio"
            value={gradientStart}
            onChange={onChangeGradientStart}
          />
          <ColorSwatch
            label="Fin"
            value={gradientEnd}
            onChange={onChangeGradientEnd}
          />
        </div>
      )}
    </div>
  );

  const ColorSwatch = ({
    label,
    value,
    onChange,
  }: {
    label?: string;
    value: string;
    onChange: (value: string) => void;
  }) => (
    <div>
      {label && <span className="text-xs uppercase tracking-wide text-gray-500">{label}</span>}
      <div className="flex items-center gap-3 mt-2">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-10 w-14 rounded border border-gray-200 bg-white"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 rounded-lg border border-gray-200 p-2 text-sm font-mono focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
    </div>
  );

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
                {type === 'url' ? 'URL de la página' : 'Número de teléfono'}
              </label>
              {type === 'url' ? (
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
                    <input
                      type="url"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="https://ejemplo.com"
                      className="pl-9 sm:pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 sm:p-2.5 text-sm sm:text-base border"
                    />
                  </div>
                </div>
              ) : (
                <div className="flex gap-2">
                  <div className="relative flex w-full items-stretch rounded-md border border-gray-300 bg-white shadow-sm focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 overflow-visible">
                    <button
                      type="button"
                      onClick={() => setIsCountryOpen((prev) => !prev)}
                      className="flex items-center gap-2 pl-3 pr-8 text-base sm:text-lg font-semibold text-gray-800 focus:outline-none"
                    >
                      <span className="text-xl" aria-hidden="true">{selectedCountry.flag}</span>
                      <span>{selectedCountry.dialCode}</span>
                      <ChevronDown className="pointer-events-none absolute left-16 sm:left-20 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                    </button>
                    <div className="w-px bg-gray-200" />
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="3001234567"
                      className="flex-1 border-0 bg-transparent text-sm sm:text-base focus:outline-none focus:ring-0 px-3"
                    />

                    {isCountryOpen && (
                      <div className="absolute left-0 top-full mt-1 w-72 sm:w-80 bg-white border border-gray-200 rounded-md shadow-lg z-20">
                        <div className="p-2 border-b border-gray-100">
                          <input
                            type="text"
                            value={countrySearch}
                            onChange={(e) => setCountrySearch(e.target.value)}
                            placeholder="Busca país o código"
                            className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div className="max-h-64 overflow-y-auto">
                          {filteredCountries.length === 0 && (
                            <p className="px-3 py-2 text-sm text-gray-500">No se encontraron resultados</p>
                          )}
                          {filteredCountries.map((country) => (
                            <button
                              key={country.code}
                              type="button"
                              onClick={() => handleCountrySelect(country)}
                              className="w-full flex items-center justify-between px-3 py-2 text-sm hover:bg-gray-50 transition"
                            >
                              <span className="flex items-center gap-2 text-gray-800">
                                <span className="text-lg" aria-hidden="true">{country.flag}</span>
                                <span>{country.name}</span>
                              </span>
                              <span className="text-gray-600 font-medium">{country.dialCode}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

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
            {displayedQrImage ? (
              <div className="text-center space-y-4">
                <img 
                  src={displayedQrImage} 
                  alt="Código QR" 
                  className="mx-auto my-4 w-full max-w-[180px] sm:max-w-[200px] lg:max-w-[250px] h-auto rounded-xl shadow-sm" 
                />
                {designLoading && (
                  <p className="text-xs text-gray-500">Actualizando diseño...</p>
                )}
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

        {displayedQrImage && (
          <section className="mt-10">
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm">
              <div className="px-6 py-5 border-b border-gray-100 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-widest text-indigo-500 font-semibold">Paso 3</p>
                  <h2 className="text-xl font-bold text-gray-900">Diseña tu código QR</h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Personaliza el marco, los colores y añade un logo para que destaque en tus campañas.
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs bg-slate-100 rounded-full px-4 py-1 text-slate-600">
                  <span className="h-2 w-2 rounded-full bg-green-500 inline-block" />
                  Vista previa en tiempo real
                </div>
              </div>
              <div className="p-6 flex flex-col lg:flex-row gap-8">
                <div className="flex-1 space-y-4">
                  <DesignerSection
                    id="frame"
                    title="Marco"
                    description="Los marcos ayudan a destacar tu QR y añadir mensajes claros."
                    open={accordionOpen.frame}
                    onToggle={toggleSection}
                  >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {FRAME_OPTIONS.map((frame) => (
                        <button
                          key={frame.id}
                          onClick={() => updateDesign({ frameStyle: frame.id })}
                          className={`border rounded-xl p-3 text-left text-sm transition ${
                            designOptions.frameStyle === frame.id
                              ? 'border-indigo-500 bg-indigo-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-inner">
                              {frame.id === 'scooter' ? '🛵' : frame.id === 'badge' ? '⭐' : frame.id === 'soft-card' ? '🪪' : '⬜️'}
                            </span>
                            <div>
                              <p className="font-semibold text-gray-900">{frame.label}</p>
                              <p className="text-xs text-gray-500">{frame.description}</p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>

                    <div className="mt-4 space-y-4">
                      <div>
                        <label className="text-xs font-semibold text-gray-500">Texto del marco</label>
                        <input
                          type="text"
                          maxLength={40}
                          value={designOptions.frameText}
                          onChange={(e) => updateDesign({ frameText: e.target.value })}
                          className="mt-2 w-full rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 text-sm p-2.5"
                          placeholder="¡Escanéame!"
                        />
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <ColorController
                          label="Color del marco"
                          value={designOptions.frameColor}
                          onChange={(value) => updateDesign({ frameColor: value })}
                          gradientEnabled={designOptions.frameUseGradient}
                          onToggleGradient={(checked) => updateDesign({ frameUseGradient: checked })}
                          gradientStart={designOptions.frameGradientStart}
                          gradientEnd={designOptions.frameGradientEnd}
                          onChangeGradientStart={(value) => updateDesign({ frameGradientStart: value })}
                          onChangeGradientEnd={(value) => updateDesign({ frameGradientEnd: value })}
                        />
                        <ColorController
                          label="Color del fondo del marco"
                          value={designOptions.frameBgColor}
                          onChange={(value) => updateDesign({ frameBgColor: value })}
                          gradientEnabled={designOptions.frameBgUseGradient}
                          onToggleGradient={(checked) => updateDesign({ frameBgUseGradient: checked })}
                          gradientStart={designOptions.frameBgGradientStart}
                          gradientEnd={designOptions.frameBgGradientEnd}
                          onChangeGradientStart={(value) => updateDesign({ frameBgGradientStart: value })}
                          onChangeGradientEnd={(value) => updateDesign({ frameBgGradientEnd: value })}
                        />
                      </div>
                      <ColorController
                        label="Color del texto del marco"
                        value={designOptions.frameTextColor}
                        onChange={(value) => updateDesign({ frameTextColor: value })}
                      />
                    </div>
                  </DesignerSection>

                  <DesignerSection
                    id="pattern"
                    title="Patrón del código QR"
                    description="Elige el estilo del patrón y personaliza los colores."
                    open={accordionOpen.pattern}
                    onToggle={toggleSection}
                  >
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                      {PATTERN_OPTIONS.map((pattern) => (
                        <button
                          key={pattern.id}
                          onClick={() => updateDesign({ patternStyle: pattern.id })}
                          className={`p-3 rounded-xl border text-sm ${
                            designOptions.patternStyle === pattern.id
                              ? 'border-indigo-500 bg-indigo-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-900">{pattern.label}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 mt-4">
                      <ColorController
                        label="Color del patrón"
                        value={designOptions.patternColor}
                        onChange={(value) => updateDesign({ patternColor: value })}
                        gradientEnabled={designOptions.patternUseGradient}
                        onToggleGradient={(checked) => updateDesign({ patternUseGradient: checked })}
                        gradientStart={designOptions.patternGradientStart}
                        gradientEnd={designOptions.patternGradientEnd}
                        onChangeGradientStart={(value) => updateDesign({ patternGradientStart: value })}
                        onChangeGradientEnd={(value) => updateDesign({ patternGradientEnd: value })}
                      />
                      <div className="bg-gray-50 rounded-xl p-4">
                        <div className="flex items-center justify-between text-xs text-gray-500 font-semibold">
                          <span>Color del fondo del patrón</span>
                          <label className="inline-flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={designOptions.patternBgTransparent}
                              onChange={(e) => updateDesign({ patternBgTransparent: e.target.checked })}
                              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            Transparente
                          </label>
                        </div>
                        {!designOptions.patternBgTransparent && (
                          <div className="mt-3">
                            <ColorSwatch
                              value={designOptions.patternBgColor}
                              onChange={(value) => updateDesign({ patternBgColor: value })}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </DesignerSection>

                  <DesignerSection
                    id="corners"
                    title="Esquinas del QR"
                    description="Ajusta el estilo y los colores de los puntos de detección."
                    open={accordionOpen.corners}
                    onToggle={toggleSection}
                  >
                    <div className="flex flex-wrap gap-3">
                      {CORNER_OPTIONS.map((corner) => (
                        <button
                          key={corner.id}
                          onClick={() => updateDesign({ cornerStyle: corner.id })}
                          className={`px-4 py-2 rounded-full border text-sm ${
                            designOptions.cornerStyle === corner.id
                              ? 'border-indigo-500 text-indigo-600'
                              : 'border-gray-200 text-gray-600 hover:border-gray-300'
                          }`}
                        >
                          {corner.label}
                        </button>
                      ))}
                    </div>
                    <div className="mt-4 grid md:grid-cols-2 gap-4">
                      <ColorController
                        label="Color exterior"
                        value={designOptions.cornerOuterColor}
                        onChange={(value) => updateDesign({ cornerOuterColor: value })}
                      />
                      <ColorController
                        label="Color interior"
                        value={designOptions.cornerInnerColor}
                        onChange={(value) => updateDesign({ cornerInnerColor: value })}
                      />
                    </div>
                  </DesignerSection>

                  <DesignerSection
                    id="logo"
                    title="Añadir logo"
                    description="Haz único tu código QR cargando tu logo o icono."
                    open={accordionOpen.logo}
                    onToggle={toggleSection}
                  >
                    <div className="space-y-4">
                      <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center text-sm text-gray-500 hover:border-indigo-400 transition cursor-pointer">
                        <input type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} />
                        {designOptions.logoDataUrl ? (
                          <>
                            <img src={designOptions.logoDataUrl} alt="Logo cargado" className="h-20 w-20 object-contain mb-3" />
                            <span className="font-semibold text-gray-900">Actualizar logo</span>
                          </>
                        ) : (
                          <>
                            <span className="text-3xl mb-2">➕</span>
                            <span>Sube tu logo (máx. 1MB)</span>
                          </>
                        )}
                      </label>
                      {designOptions.logoDataUrl && (
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between bg-gray-50 rounded-xl p-4">
                          <div>
                            <p className="text-sm font-semibold text-gray-700">Tamaño del logo</p>
                            <p className="text-xs text-gray-500">Ajusta qué tanto ocupa dentro del QR.</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <input
                              type="range"
                              min="0.15"
                              max="0.35"
                              step="0.01"
                              value={designOptions.logoSize}
                              onChange={(e) => updateDesign({ logoSize: Number(e.target.value) })}
                              className="w-full sm:w-48 accent-indigo-600"
                            />
                            <button
                              type="button"
                              onClick={clearLogo}
                              className="text-xs text-gray-500 hover:text-red-500"
                            >
                              Quitar
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </DesignerSection>
                </div>

                <div className="lg:w-1/3">
                  <PhonePreview image={displayedQrImage} loading={designLoading} />
                </div>
              </div>
            </div>
          </section>
        )}
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
type PaintOptions = {
  color: string;
  useGradient?: boolean;
  gradientStart?: string;
  gradientEnd?: string;
};

const blobToDataUrl = (blob: Blob): Promise<string> =>
  new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.readAsDataURL(blob);
  });

const getPaintStyle = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  paint: PaintOptions
) => {
  if (paint.useGradient) {
    const gradient = ctx.createLinearGradient(x, y, x + width, y);
    gradient.addColorStop(0, paint.gradientStart ?? paint.color);
    gradient.addColorStop(1, paint.gradientEnd ?? paint.color);
    return gradient;
  }
  return paint.color;
};

const drawRoundedRect = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
  fill: PaintOptions,
  stroke?: PaintOptions
) => {
  const r = Math.min(radius, width / 2, height / 2);
  const path = new Path2D();
  path.moveTo(x + r, y);
  path.lineTo(x + width - r, y);
  path.quadraticCurveTo(x + width, y, x + width, y + r);
  path.lineTo(x + width, y + height - r);
  path.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  path.lineTo(x + r, y + height);
  path.quadraticCurveTo(x, y + height, x, y + height - r);
  path.lineTo(x, y + r);
  path.quadraticCurveTo(x, y, x + r, y);
  path.closePath();

  ctx.save();
  ctx.fillStyle = getPaintStyle(ctx, x, y, width, height, fill);
  ctx.fill(path);
  if (stroke) {
    ctx.lineWidth = 6;
    ctx.strokeStyle = getPaintStyle(ctx, x, y, width, height, stroke);
    ctx.stroke(path);
  }
  ctx.restore();
};

const drawScooter = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  color: string
) => {
  ctx.save();
  ctx.translate(x, y);
  const scale = width / 24;
  ctx.scale(scale, scale);
  ctx.fillStyle = color;
  const path = new Path2D(SCOOTER_PATH);
  ctx.fill(path);
  ctx.restore();
};

const applyFrameToQr = (qrDataUrl: string, design: DesignOptions): Promise<string> =>
  new Promise((resolve) => {
    if (design.frameStyle === 'none') {
      resolve(qrDataUrl);
      return;
    }

    const image = new Image();
    image.src = qrDataUrl;
    image.onload = () => {
      const baseSize = 420;
      const horizontalPadding = 90;
      const topPadding = 70;
      const bottomPadding = 140;
      const canvasWidth = baseSize + horizontalPadding * 2;
      const canvasHeight =
        baseSize +
        topPadding +
        bottomPadding +
        (design.frameStyle === 'scooter' ? 80 : 0);

      const canvas = document.createElement('canvas');
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        resolve(qrDataUrl);
        return;
      }

      ctx.fillStyle = '#f5f5f5';
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      const frameX = (canvasWidth - (baseSize + 80)) / 2;
      const frameY = 40;
      const frameWidth = baseSize + 80;
      const frameHeight = baseSize + 120;

      drawRoundedRect(
        ctx,
        frameX,
        frameY,
        frameWidth,
        frameHeight,
        40,
        {
          color: design.frameBgColor,
          useGradient: design.frameBgUseGradient,
          gradientStart: design.frameBgGradientStart,
          gradientEnd: design.frameBgGradientEnd,
        },
        {
          color: design.frameColor,
          useGradient: design.frameUseGradient,
          gradientStart: design.frameGradientStart,
          gradientEnd: design.frameGradientEnd,
        }
      );

      if (design.frameStyle === 'badge') {
        ctx.fillStyle = design.frameColor;
        ctx.fillRect(frameX, frameY, 14, frameHeight);
      }

      const qrX = (canvasWidth - baseSize) / 2;
      const qrY = frameY + 30;
      ctx.drawImage(image, qrX, qrY, baseSize, baseSize);

      if (design.frameText) {
        ctx.font = '600 32px "Inter", sans-serif';
        ctx.fillStyle = design.frameTextColor;
        ctx.textAlign = 'center';
        ctx.fillText(
          design.frameText,
          canvasWidth / 2,
          qrY + baseSize + 60
        );
      }

      if (design.frameStyle === 'scooter') {
        drawScooter(ctx, canvasWidth / 2 - 120, qrY + baseSize + 40, 200, design.frameColor);
      }

      resolve(canvas.toDataURL('image/png'));
    };
    image.onerror = () => resolve(qrDataUrl);
  });

const PhonePreview = ({ image, loading }: { image: string; loading: boolean }) => (
  <div className="relative bg-slate-900 text-white rounded-[32px] p-6 shadow-2xl border border-slate-800">
    <div className="absolute inset-x-24 -top-2 h-2 rounded-full bg-white/30" />
    <div className="rounded-[26px] bg-black/20 border border-white/10 p-4">
      <div className="rounded-[24px] bg-white/90 p-4 min-h-[320px] flex items-center justify-center">
        {image ? (
          <img
            src={image}
            alt="Vista previa del QR"
            className="max-w-full rounded-2xl shadow-lg"
          />
        ) : (
          <p className="text-center text-sm text-gray-500">Genera tu QR para ver la vista previa</p>
        )}
      </div>
      <div className="mt-4 text-center">
        {loading ? (
          <p className="text-xs text-emerald-300 animate-pulse">Actualizando estilo...</p>
        ) : (
          <p className="text-xs text-white/70">Muestra aproximada de cómo se verá en tu campaña</p>
        )}
      </div>
    </div>
  </div>
);

export default App;
