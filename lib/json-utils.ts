export const formatJSON = (json: string): string => {
  try {
    const parsed = JSON.parse(json);
    return JSON.stringify(parsed, null, 2);
  } catch (error) {
    throw new Error('Invalid JSON');
  }
};

export const minifyJSON = (json: string): string => {
  try {
    const parsed = JSON.parse(json);
    return JSON.stringify(parsed);
  } catch (error) {
    throw new Error('Invalid JSON');
  }
};

export const validateJSON = (json: string): boolean => {
  try {
    JSON.parse(json);
    return true;
  } catch (error) {
    return false;
  }
};

export const xmlToJSON = (xml: string): object => {
  // Basic XML to JSON conversion
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xml, "text/xml");
  
  function xmlToObj(node: Element): any {
    const obj: any = {};
    
    if (node.hasChildNodes()) {
      for (const child of Array.from(node.children)) {
        const name = child.nodeName;
        
        if (obj[name]) {
          if (!Array.isArray(obj[name])) {
            obj[name] = [obj[name]];
          }
          obj[name].push(xmlToObj(child));
        } else {
          obj[name] = xmlToObj(child);
        }
      }
      return obj;
    } else {
      return node.textContent;
    }
  }
  
  return xmlToObj(xmlDoc.documentElement);
};

export const csvToJSON = (csv: string): object[] => {
  const lines = csv.split('\n');
  const headers = lines[0].split(',').map(header => header.trim());
  const result = [];

  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;
    const obj: any = {};
    const currentLine = lines[i].split(',');

    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentLine[j].trim();
    }
    result.push(obj);
  }

  return result;
};

export const tsvToJSON = (tsv: string): object[] => {
  const lines = tsv.split('\n');
  const headers = lines[0].split('\t').map(header => header.trim());
  const result = [];

  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;
    const obj: any = {};
    const currentLine = lines[i].split('\t');

    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentLine[j].trim();
    }
    result.push(obj);
  }

  return result;
};

export const jsonToXML = (json: object): string => {
  function objToXML(obj: any): string {
    let xml = '';
    
    for (const prop in obj) {
      if (Array.isArray(obj[prop])) {
        for (const item of obj[prop]) {
          xml += `<${prop}>${typeof item === 'object' ? objToXML(item) : item}</${prop}>`;
        }
      } else if (typeof obj[prop] === 'object') {
        xml += `<${prop}>${objToXML(obj[prop])}</${prop}>`;
      } else {
        xml += `<${prop}>${obj[prop]}</${prop}>`;
      }
    }
    
    return xml;
  }
  
  return `<?xml version="1.0" encoding="UTF-8"?>\n<root>${objToXML(json)}</root>`;
};

export const jsonToCSV = (json: object[]): string => {
  if (!Array.isArray(json) || json.length === 0) return '';
  
  const headers = Object.keys(json[0]);
  const csvRows = [headers.join(',')];
  
  for (const row of json) {
    const values = headers.map(header => {
      const val = (row as any)[header];
      return `"${val}"`;
    });
    csvRows.push(values.join(','));
  }
  
  return csvRows.join('\n');
};

export const jsonToTSV = (json: object[]): string => {
  if (!Array.isArray(json) || json.length === 0) return '';
  
  const headers = Object.keys(json[0]);
  const tsvRows = [headers.join('\t')];
  
  for (const row of json) {
    const values = headers.map(header => {
      const val = (row as any)[header];
      return `${val}`;
    });
    tsvRows.push(values.join('\t'));
  }
  
  return tsvRows.join('\n');
};