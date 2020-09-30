
var express = require('express')
var router = express.Router()

const SparqlClient = require('sparql-client-2');
const SPARQL = SparqlClient.SPARQL;

const endpoint = 'http://127.0.0.1:7200/repositories/bd4'
const myupdateEndpoint = 'http://127.0.0.1:7200/repositories/bd4/statements'

var client = new SparqlClient( endpoint, {updateEndpoint: myupdateEndpoint,
                                          defaultParameters: {format: 'json'}})
        .register({
            rdfs: "http://www.w3.org/2000/01/rdf-schema#",
            rdf: "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
            f2: "http://owl.cs.manchester.ac.uk/tutorials/fhkbtutorial/fhkb_chapter_2.owl#",
            f5: "http://owl.cs.manchester.ac.uk/tutorials/fhkbtutorial/fhkb_chapter_5.owl#"

})



// ------------------Tratamento dos pedidos-------





// search guys from sparql query
router.get('/query', function(req, res, next) {
    res.render('queryInput')
})

router.post('/query2', function(req, res, next){

    var query = req.body.intext

    client.query(query)
        .execute()
        .then(function (qres) {
            console.log('\n\n\n')
            console.log(JSON.stringify(qres))
            res.json(qres)
        })
        .catch(function (error) {
            console.log('ERRO: ' + error)
    })
})





//get all guys
router.get('/individuos', function(req, res, next){
    res.render('individuos')
})

router.post('/individuos', function(req, res, next){

    var query = "SELECT ?Nome ?Nascimento WHERE { { ?f f5:name ?Nome } OPTIONAL { ?f f5:birthyear ?Nascimento }  .}"

    client.query(query)
        .execute()
        .then(function (qres) {
            console.log('\n\n\n')
            console.log(JSON.stringify(qres))
            res.json(qres)
        })
        .catch(function (error) {
            console.log('ERRO: ' + error)
    })
})





//get guy from IDss
router.get('/individuos/:id', function(req, res, next){

    var query = "SELECT ?s ?ano WHERE { { ?s f5:name \"" + req.params.id + "\"} OPTIONAL { ?s f5:birthyear ?ano}  .}"

    client.query(query)
        .execute()
        .then(function (qres) {
            console.log('\n\n\n')
            console.log(JSON.stringify(qres))

            res.render('individuos_id', {res:qres})
            res.json(qres)
        })
        .catch(function (error) {
            console.log('ERRO: ' + error)
    })
})





//insert individual in the DB
router.get('/inserir', function(req, res, next) {
    res.render('inserir')
})

router.post('/inserir', function(req, res, next){

    var nomeCaixa = req.body.inNome
    var anoCaixa = req.body.inAno
    var guyIri = "<http://owl.cs.manchester.ac.uk/tutorials/fhkbtutorial/fhkb_chapter_5.owl#" + nomeCaixa.replace(/ /g, "_") + ">"

    var query = "INSERT DATA { " + guyIri + " f5:name \"" + nomeCaixa + "\" ; f5:birthyear " + anoCaixa + " }"

    client.query(query)
        .execute()
        .then(function (qres) {
            res.json(qres)
        })
        .catch(function (error) {
            console.log('ERRO: ' + error)
    })
})


module.exports = router;
