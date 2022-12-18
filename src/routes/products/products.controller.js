async function httpGetAllProductsStatic(req,res){
    return res.status(200).json({ msg: 'products testing route'});
}

async function httpGetAllProducts(req,res){
    return res.status(200).json({ msg: 'products route'});
}

module.exports = { httpGetAllProducts, httpGetAllProductsStatic };