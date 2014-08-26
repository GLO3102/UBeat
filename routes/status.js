exports.getStatus = function (req, res) {
    res.status(200).send({
        status: 'online'
    });
};