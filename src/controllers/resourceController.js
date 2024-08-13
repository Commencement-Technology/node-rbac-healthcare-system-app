exports.viewResource = (req, res) => {
  res.json({ message: "You have access to view this resource." });
};

exports.editResource = (req, res) => {
  res.json({ message: "You have access to edit this resource." });
};

exports.deleteResource = (req, res) => {
  res.json({ message: "You have access to delete this resource." });
};
