module.exports.NotFound = (req,res) => {
    res.status(404).send("API not Found!");
}