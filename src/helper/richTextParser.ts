// blocks
const blockRegex = /\[([a-zA-Z0-9_-]+)\]([\s\S]*?)\[\/\1\]/g;

// token
const tokenRegex = /!\{([a-zA-Z0-9_-]+):\s*(\{.*?\})\}/g;

export default function parseRichText(text: string) {
  const matches = [...text.matchAll(tokenRegex)];

  for (const match of matches) {
    const fullMatch = match[0]; // O texto inteiro do token: !{image: {...}}
    const componentType = match[1]; // O tipo do componente: "image", "button"
    const jsonString = match[2]; // A string JSON: '{ "src": "/img.png", ... }'

    console.log(`Texto inteiro: ${fullMatch}`);
    console.log('Tipo:', componentType);
    console.log('Props (string):', jsonString);

    try {
      const props = JSON.parse(jsonString);
      console.log('Props (objeto):', props);
    } catch (err) {
      console.error('Erro no JSON:', err);
    }
  }
}
