const DOMParser = require('xmldom').DOMParser;
const parser = new DOMParser();
// var document = parser.parseFromString('Your XML String', 'text/xml');

module.exports = {
  xml_str2json: (xmlDocStr) => {
    let xmlDoc = this.parseXmlString(xmlDocStr);
    if (xmlDoc != null)
      // return this.xml2json(xmlDoc);
      return xmlDoc;
    else
      return null;
  },

  parseXmlString: (xmlDocStr) => {
    return parser.parseFromString(xmlDocStr, "text/xml");
  }
}