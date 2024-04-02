const { create, Client } = require('@open-wa/wa-automate');

// Initialize WhatsApp client
create().then(client => start(client));

// Function to start the bot
async function start(client) {
  // Listen for QR code
  client.onStateChanged(state => {
    if (state === 'CONFLICT' || state === 'UNLAUNCHED') client.forceRefocus();
  });

  // Listen for QR code and authenticate
  client.onMessage(async message => {
    if (message.body === 'Hi') {
      // Respond to 'Hi' message
      client.sendText(message.from, 'Hello! Please wait while I authenticate.');
      // Get QR code
      const qrCode = await client.getQrCode();
      // Send QR code image to user
      client.sendImage(message.from, qrCode, 'qr-code.png', 'Scan the QR code to authenticate.');
    }
  });
}
