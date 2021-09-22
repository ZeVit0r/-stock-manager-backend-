import Product from "../models/Product";

class ProductController {
    // retorna os items pela forma pedida pelo front, podendo ser paginados e items pesquisados
    async index(req, res){
        // pega as constantes page e name de req.query usando destructing
        // a constante name armazena o nome que o usuário esta pesquisando
        const {page, name} = req.query

        // armazena todos os produtos na constante products
        const product = await Product.findAll();

        // verifica se a constante name é valida
        if(!!name && name != ''){
            // filtra todos os elementos que tem o 'name' fazendo parte da string
            const filterName = product.filter((element)=>{
                return element.name.toLowerCase().includes(name.toLowerCase() )
            })
            const quantity = filterName.length

            let pagination
            // filtra os items deixando eles paginados
            if(!!page){
                pagination = filterName.filter((element, index)=>{
                  return ((index<page*7 && index>=(page-1)*7) ? element : '')
                })
            }else {
                return res.json({
                items:filterName,
                quantity:quantity})
            }
            return res.json({
                items:pagination,
                quantity:quantity})
        }else {

            const quantity = product.length
    
            let pagination
    
            if(!!page){
                pagination = product.filter((element, index)=>{
                  return ((index<page*7 && index>=(page-1)*7) ? element : '')
                })
            }else {
                return res.json({
                items:product,
                quantity:quantity})
            }
            return res.json({
                items:pagination,
                quantity:quantity})

        }

    }
    // cria um novo item/produto
    async store(req, res) {
        const { name, purchase, sale, amount, category, provide } = (req.body);

        const product = await Product.create({ name, purchase, sale, amount, category, provide })

        return res.json(product);
    }
    // atualiza um item/produto
    async update(req, res) {
        const {productId} = req.query
        const { name, purchase, sale, amount, category, provide } = req.body;

        const product = await Product.findByPk(productId);

        if(!product){
            return res.status(400).json({error: 'product not found'})
        }

        !!name ? product.name=name : product.name=product.name
        !!purchase ? product.purchase=purchase : product.purchase=product.purchase
        !!sale ? product.sale=sale : product.sale=product.sale
        !!amount ? product.amount=amount : product.amount=product.amount
        !!category ? product.category=category : product.category=product.category
        !!provide ? product.provide=provide : product.provide=product.provide

        const updateProduct = await product.save()

        return res.json(updateProduct)
        
    }
    // deleta um item/produto
    async delete(req, res) {
        const {productId} = req.query
        const product = await Product.findByPk(productId);

        if(!product){
            return res.status(400).json({error: 'product not found'})
        }

        await Product.destroy({ where: { id: productId }});
        return res.json({})
    }
}

export default new ProductController();
