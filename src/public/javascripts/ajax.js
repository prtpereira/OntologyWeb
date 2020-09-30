$(function(){
    $("#intext").val("")

    $("#limpa").click(function(){
        $("#resultado").children().remove()
    })

    $("#novo").click(function(){
        $("#intext").val("")
    })

    $("#proc").click(function() {

        var textSource = {"intext": $("#intext").val()}
        $.ajax({
            type: 'POST',
            data: textSource,
            url: '/query2',
            dataType: 'JSON'

        }).done(function(response){
        var colunas = response.head.vars
            var html = "<table class='w3-table-all'>\n"
            html += "<tr>"
            for(var col in colunas)
                html += "<th>" + colunas[col] + "</th>"
            html += "</tr>\n"

            for (var key in response.results.bindings) {
                var linha = response.results.bindings[key]
                html += "<tr>"
                for(var col in colunas) {
                    if (colunas[col] in linha)
                      html += "<td>" + linha[colunas[col]].value + "</td>"
                    else
                      html += "<td>" + "null" + "</td>"
               }
            }
            html += "</tr>"
            html += "</table>"

            $("#resultado").append(html)
          })
      })

      $("#proc3").click(function() {

          var textSource3 = {"inNome": $("#inNome").val(), "inAno": $("#inAno").val()}
          $.ajax({
              type: 'POST',
              data: textSource3,
              url: '/inserir',
              dataType: 'JSON'

          }).done(function(response){

            $("#resultado3").append("<")
            $("#resultado3").append("http://owl.cs.manchester.ac.uk/tutorials/fhkbtutorial/fhkb_chapter_5.owl\#")
            $("#resultado3").append($("#inNome").val().replace(/ /g, "_"))
            $("#resultado3").append(">")
            $("#resultado3").append(" adicionado com sucesso!")

        })
    })


      var textSource2 = "SELECT ?Nome ?Nascimento WHERE { { ?f f5:name ?Nome } OPTIONAL { ?f f5:birthyear ?Nascimento}  .}"
      $.ajax({
          type: 'POST',
          data: textSource2,
          url: '/individuos',
          dataType: 'JSON'

      }).done(function(response){
      var colunas = response.head.vars
          var html = "<table class='w3-table-all'>\n"
          html += "<tr>"
          for(var col in colunas)
              html += "<th>" + colunas[col] + "</th>"
          html += "</tr>\n"

          for (var key in response.results.bindings) {
              var linha = response.results.bindings[key]
              html += "<tr>"
              for(var col in colunas) {
                  if (colunas[col] in linha)
                    html += "<td>" + linha[colunas[col]].value + "</td>"
                  else
                    html += "<td>" + "null" + "</td>"
             }
          }
          html += "</tr>"
          html += "</table>"

          $("#resultado2").append(html)
      })
})
