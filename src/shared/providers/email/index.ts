import nodemailer from 'nodemailer';

type ItemType = 'order' | 'item';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'vintagevibescontato@gmail.com',
    pass: process.env.SMTP_KEY,
  },
});

// Função para enviar email
export async function sendEmail(
  receiverEmail: string,
  receiverName: string,
  exchangedItem: string,
  type: ItemType,
) {
  try {
    const info = await transporter.sendMail({
      from: '"📀 Vintage Vibes 📀" <vintagevibescontato@gmail.com>',
      to: receiverEmail,
      subject: 'Vintage Vibes - Troca Autorizada',
      text: `Olá ${receiverName}, troca autorizada para ${
        type === 'order'
          ? `o pedido: #${exchangedItem}`
          : `o item: ${exchangedItem}`
      }
        Por favor, siga as instruções abaixo para proceder com a troca:
        Embale o produto de forma segura.
        Inclua uma cópia da nota fiscal dentro da embalagem.
        Envie o produto para o seguinte endereço:
        Rua Camarões, Mogi das Cruzes - São Paulo
        CEP 09845-609

        Assim que recebermos o produto devolvido e confirmarmos seu estado, procederemos com o envio dos créditos para que você ganhe desconto de valor equivalente ao produto trocado.
        Se precisar de qualquer assistência adicional, não hesite em nos contatar respondendo a este e-mail.

        Atenciosamente,

        Equipe Vintage Vibes.`,
      html: `<p>Olá ${receiverName}, troca autorizada para ${
        type === 'order'
          ? `o pedido: #${exchangedItem}`
          : `o item: ${exchangedItem}`
      }</p>
        <p>Por favor, siga as instruções abaixo para proceder com a troca:</p>
        <br>
        <ol>
          <li>Embale o produto de forma segura.</li>
          <li>Inclua uma cópia da nota fiscal dentro da embalagem.</li>
          <li>Envie o produto para o seguinte endereço:<br>Rua Camarões, Mogi das Cruzes - São Paulo<br>CEP 09845-609</li>
        </ol>
        <br>
        <p>Assim que recebermos o produto devolvido e confirmarmos seu estado, procederemos com o reembolso em créditos para que você ganhe desconto de valor equivalente ao produto trocado. Se precisar de qualquer assistência adicional, não hesite em nos contatar respondendo a este e-mail.</p>
        <br>
        <p>Atenciosamente,</p>
        <br>
        <p>Equipe Vintage Vibes.</p>`,
    });

    console.log('Email enviado:', info.messageId);
  } catch (error) {
    console.error('Erro ao enviar email:', error);
  }
}
