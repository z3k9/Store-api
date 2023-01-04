const Product = require('../../models/products.mongo');

async function httpGetAllProductsStatic(req,res){
    const search = 'ab'
    const products = await Product.find({ 
        name: { $regex: search, $options: 'i'}
    });
    return res.status(200).json({ products, nbhits: products.length });
}

async function httpGetAllProducts(req,res){
    const { featured,company,name,sort,fields, numericFilters} = req.query;
    const queryObject = {};
    // if featured is true, set up a new property in queryObject with value of true
    if(featured){
        queryObject.featured = featured === 'true' ? true : false;
    }
    if(company){
        queryObject.company = company;
    }
    if(name){
        queryObject.name = {$regex: name, $options: 'i'};
    }
    if(numericFilters){
        const operatorMap = {
            '>' : '$gt', 
            '>=' : '$gte',
            '<' : '$lt',
            '<=' : '$lte',
            '=' :'$eq'
        };
        const regEx = /\b(<|>|>=|<=|=)\b/g;
        let filters = numericFilters.replace(regEx, (match)=>{ 
            '-${operatorMap[match]}-'
        });
        // price-$gt-40 ||||| field, operator, value
        const options = ['price', 'rating'];
        filters = filters.split(',').forEach(item => {
            const [field, operator, value] = item.split('-');
            if (options.includes(field)){
                queryObject[field] = {[operator]: Number(value)}
            }
        });
    }
    let result = Product.find(queryObject);
    if(sort){
        const sortList = sort.split(',').join(' ');
        result = result.sort(sortList)
    }else{
        result = result.sort('createdAt');
    }
    if(fields){
        const fieldsList = fields.split(',').join(" ");
        result = result.select(fieldsList);
    }
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page -1 ) * limit;

    result = result.skip(skip).limit(limit);
    // mongoose queries are not promises. 
    const products = await result;
    return res.status(200).json({ products, nbHits: products.length });
}

module.exports = { httpGetAllProducts, httpGetAllProductsStatic };