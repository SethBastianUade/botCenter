const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');


// Crear un cliente de WhatsApp con autenticación local
const client = new Client({
    authStrategy: new LocalAuth()
});

// Generar QR para vincular el bot con tu cuenta de WhatsApp
client.on('qr', qr => {
    console.log("Escanea este código QR en WhatsApp Web para iniciar el bot:");
    qrcode.generate(qr, { small: true });
});

// Confirmar que el bot está listo
client.on('ready', () => {
    console.log('✅ Bot de WhatsApp está listo y funcionando!');
});

// Manejar los mensajes entrantes
client.on('message', message => {
    console.log(`📩 Mensaje recibido de ${message.from}: ${message.body}`);

    if (message.body.toLowerCase() === 'hola') {
        message.reply("¡Hola, soy Bot Center! ¿Cómo te puedo ayudar? 🥋");
    } else if (message.body.toLowerCase() === 'horarios') {
        message.reply('Las clases son de Lunes, Miercoles y Viernes de 9:30 a 22:00 hrs. y Martes y Jueves de 15:00 a 21:00 hrs. Podes chequear la planilla de horarios en nuestra pagina web! https://clubcenterfa.com');
    } else if (message.body.toLowerCase() === 'precios' || message.body.toLowerCase() === 'disciplinas') {
        message.reply(`
Disciplinas disponibles:
- Boxeo
- Kickboxing
- Muay Thai
- Jiu-Jitsu brasileño
- MMAs

💰 Aranceles mensuales:
- Una actividad (de lunes a viernes) : $46.900
- Lunes, miércoles y viernes : $42.900
- Martes y jueves : $38.900
- Pase libre con 2 actividades : $49.900 (¡combina como quieras!)

`);
    } else {
        message.reply('No entiendo tu consulta. Puedes preguntar por "horarios", "precios" o "disciplinas".');
    }
});

// Iniciar el cliente
client.initialize();
