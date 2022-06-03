exports.createProduct = (req, res, next) => {
        res.json(
            {
                message: 'Create Product Success !',
                data: {
                    id: 1,
                    name: 'Sari Gandum',
                    price: 1000,
                }
            }
        );
        next();
}

exports.getAllProduct = (req, res, next) => {
    res.json(
        {
            message: 'Get All Product Success !',
            data: [
                {
                    id: 1,
                    name: 'Sari Gandum',
                    price: 1000,
                }
            ]
        }
    );
    next();
}