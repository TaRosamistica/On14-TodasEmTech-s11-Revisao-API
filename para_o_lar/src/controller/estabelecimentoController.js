const models = require ('../models/estabelecimentos.json');

const getAll = (req, res) => {
//ao inves de criar 3 consts ela jogou em chaves: 
    const {pagamento, bairro, delivery} = req.query

    let filtrados = models // models é o json
     
    // filtro por pagamento
     if (pagamento) {
         filtrados = filtrados.filter(estabelecimento => {
             return estabelecimento.pagamento.includes(pagamento)
         })
     }

     //filtro por bairro
     if(bairro){
        filtrados = filtrados.filter(estabelecimento =>{
            return estabelecimento.bairro == bairro
        }) 
     }
     //filtro por delivery
     if(delivery){
         filtrados = filtrados.filter(estabelecimento => {
             return estabelecimento.delivery == (delivery == 'true' ? true : false)
         })
     }
    res.status(200).send(filtrados)
}

const getId = (req, res) => {
    const idSolicitado = req.params.id 
    //const { id } = req.params (outra forma de escrever)
    const found = models.find(estabelecimento => estabelecimento.id == idSolicitado)

    if (found == undefined){
        res.status(404).send({message: 'Estabelecimento não encontrado'})
    }
    res.status(200).send(found)
}
const cadastrar = (req, res) => {
    let  body = req.body
    //para cadastrar novo estabelecimento, precisamos criar uma const e configurar todos os objetos do noss json
    const novoEstabelecimento = {
        id:(models.length) +1,
        likes: body.likes,
        nome: body.nome,
        categoria: body.categoria,
        endereço: body.endereço,
        bairro: body.bairro,
        cidade:body.cidade,
        telefone:body.telefone,
        pagamento: body.pagamento,
        delivery: body.delivery
    }
    //criando campos obrigatórios ao cadastrar 
    if(!body.nome || !body.pagamento || !body.cidade){
       return res.status(400).send({message: "Preencha todos os campos obrigatórios"})
    }

    if(body.telefone.length > 15){
        return res.status(400).send({menssage: "Número de telefone inválido"})
    }





    models.push(novoEstabelecimento) //empurrar para o json o novo cadastro
res.status(201).send(novoEstabelecimento)
}
 
const like = (req, res) => {
        const { id } = req.params //const id = re.params.id 

        const found = models.find(estabelecimento => estabelecimento.id == id)//filtrando por id
       
        if (found == undefined){
        res.status(404).send({message: 'Estabelecimento não encontrado'})
    }

        found.likes +=1//filtrar por like e a cada clique incrementa +1 

        res.status(200).send(found)
    }

 const deslike = (req, res) => {
     const { id } = req.params

     const found = models.find(estabelecimento => estabelecimento.id == id)

     if(found == undefined){
         res.status(404).send({message: 'Estabelecimento não encontrado'})

     }

     found.deslikes += 1
     res.status(200).send(found)
 }   

const removeEstabelecimento = (req, res)=>{
    const id = req.params.id

    const found = models.find(estabelecimento => estabelecimento.id == id)

    if(found == undefined){
        res.status(404).send({message: 'Estabelecimento não encontrado'})
    }

    const index = models.indexOf(found)

    models.splice(index, 1)

    res.status(200).send({message: 'Estabelecimento deletado'})

}


const atualizacao = (req, res) => {
    const idRequest = req.params.id
    const bodyRequest = req.body

    const found = models.find(estabelecimento => estabelecimento.id == idRequest)

    if(found == undefined){
        res.status(404).send({message: 'Estabelecimento não encontrado'})
    }

    bodyRequest.id = idRequest

    Object.keys(found).forEach((chave) =>{
        if(bodyRequest[chave] == undefined){
            found [chave] = found [chave]
        } else {
            found[chave] = bodyRequest[chave]
        }

    })
    // const { nome, categoria, endereco, numero, bairro, cidade, telefone, pagamento, delivery} = req.body
    // //found é o id filtrado. nome será o que vem do body 
    
    // found.nome = nome || found.nome //ou vai ser o nome q o usuário passar ou permanece o mesmo
    // found.categoria = categoria || found.categoria
    // found.endereco = endereco || found.endereco
    // found.numero = numero || found.numero
    // found.bairro = bairro || found.bairro
    // found.cidade = cidade || found.cidade
    // found.telefone = telefone || found.telefone
    // found.pagamento = pagamento || found.pagamento
    // found.delivery = delivery || found.delivery
    
    res.status(200).send(found)
    
}

module.exports = {
    getAll,
    getId,
    cadastrar,
    like,
    deslike,
    removeEstabelecimento,
    atualizacao
}