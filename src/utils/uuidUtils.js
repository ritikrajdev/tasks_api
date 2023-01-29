function isUuidV4(string) {
  const uuidRegexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
  return uuidRegexExp.test(string);
} 

module.exports = {
  isUuidV4,
};
