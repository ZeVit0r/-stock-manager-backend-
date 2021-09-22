import Product from "../models/Product";

class ReportController {
  // retorna um array de objetos no qual tem a categoria a quantidade em estoque e o total de produtos
  async indexCategories(req, res){

    const product = await Product.findAll();
    const categoriesName = [] // array que armazena o nome de todas as categorias que existem na aplicação
    const categories = [] // array que armazena cada categoria com a quantidade de estoque e produtos
        
    product.forEach((product)=>{
      if(categoriesName.indexOf(product.category.toLowerCase())===-1){
        categoriesName.push(product.category.toLowerCase())
      }
    })

    for(let i in categoriesName){
      const temp = {
        category: categoriesName[i],
        amountTotal: 0, 
        productsTotal: 0,
      }
      for(let j of product){
        if(categoriesName[i] === j.category.toLowerCase()){
          temp.amountTotal=temp.amountTotal+j.amount
          temp.productsTotal++
        }
      }
      categories.push(temp)
    }



    return res.json({
      category: categories,
    })
  }
  // retorna os produtos que estão faltando em estoque
  async indexProducts(req, res){
    const product = await Product.findAll();
    const missingProducts = product.filter((elem)=>{
      return (elem.amount===0)
    })



    return res.json({
      missingProducts: missingProducts,
    })
  }
  // retorna os fornecedores que possuem produtos faltando em estoque
  async indexProvides(req, res){

    const product = await Product.findAll();
    const providesName = [] // array que armazena o nome de todas os fornecedores que existem na aplicação
    const provides = [] // array que armazena cada fornecedor que tem produtos faltando
        
    product.forEach((product)=>{
      if(product.amount ===0 && providesName.indexOf(product.provide.toLowerCase())===-1){
        providesName.push(product.provide.toLowerCase())
      }
    })

    for(let i in providesName){
      const temp = {
        provide: providesName[i],
        products: []
      }
      for(let j of product){
        if(providesName[i] === j.provide.toLowerCase() && j.amount===0){
          temp.products.push(j)
        }
      }
      provides.push(temp)
    }



    return res.json({
      provides: provides,
    })
  }
}

export default new ReportController();
