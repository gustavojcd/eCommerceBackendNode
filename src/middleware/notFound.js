const notFound = ((req, res, next) => {
    res.status(404).json({ msg: 'Recurso no encontrado' })
});

export default notFound