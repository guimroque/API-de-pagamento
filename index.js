const express = require('express');
const mercadoPago = require('mercadopago');
const { Console } = require('console');
const app = express();

mercadoPago.configure({
    sendbox: true, //seta como teste, o false diria que o projeto ja está funcionando
    access_token: 'TEST-5479853260404955-072711-1d444b3b776d0098560f9b18cc793787-545010129'
})

app.get('/', (req, res) =>{
    res.send('Oi Guilherme')
})

//banco de dados:
    //-> id// codigo(item.id) // status // cliente
var id = ""+ Date.now();
var emailPagadador = 'guilherme@gmail.com';

app.get('/pagar', async (req, res) =>{
    var dados = {
        items:[
            item = {
                id: id,//gerando data e passando em Ms
                title: "3 games",
                quantity: 1,
                currency_id: 'BRL',//configurando moeda
                unit_price: parseFloat(30)//preço precisa ser dado em um float
            }
        ],
        payer:{//informações do pagador
            email: emailPagadador,
        },
        external_reference: id,
    }
    try{
        var pagamento = await mercadoPago.preferences.create(dados);
        console.log(pagamento);
        return res.redirect(pagamento.body.init_point);

    }catch(err){
        return res.send(err.message);
    }
    
});


app.listen(3000, (req, res)=>{
    console.log('Servidor rodando!');
});