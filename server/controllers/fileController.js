const sendFile = (req, res) => {
  res.sendFile(req.filePath);
};

module.exports = sendFile;
