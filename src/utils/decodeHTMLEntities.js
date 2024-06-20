export function decodeHTMLEntities(text) {
    const entities = {
      '&mdash;': '—',
      '&lt;': '<',
      '&gt;': '>',
      '&amp;': '&',
      '&quot;': '"',
      '&apos;': "'"
      // Puedes añadir más entidades según sea necesario
    };
    return text.replace(/&[a-z]+;/g, match => entities[match] || match);
  }
  