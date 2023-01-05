const generateCode = (length) => {
  let code = "";
  let schema = "0123456789";

  for (let i = 0; i < length; i++) {
    let randomIndex = Math.floor(Math.random() * schema.length);
    code += schema.charAt(randomIndex);
  }

  return code;
};

module.exports = generateCode;
