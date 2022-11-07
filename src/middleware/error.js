const handleError = ((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ msg: 'Ocurrio un error interno del Servidor' });
});

module.exports = handleError