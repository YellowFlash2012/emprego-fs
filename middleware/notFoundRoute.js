

const notFoundRoute = (req, res) => {
    res.status(404).send("Route doesn't exist!")
}

export default notFoundRoute