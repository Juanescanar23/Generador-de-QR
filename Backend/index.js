import QRCode from "qrcode";

const data = process.env.SAMPLE_QR_URL ?? "https://ejemplo.com";

QRCode.toFile("qrcode.png", data, (err) => {
  if (err) {
    console.error("Error al generar el codigo QR:", err);
  } else {
    console.log("Codigo QR generado correctamente");
  }
});
