const getRequestBody = (req) => {
  return new Promise((resolve, reject) => {
    const methods = ['POST', 'PUT', 'PATCH'];

    if (!methods.includes(req.method)) {
      resolve({});
      return;
    }

    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => resolve(body));
    req.on('error', (err) => reject(err));
  });
};

module.exports = {
  getRequestBody,
};
