$(function() { 
    
    var urlX = 'http://priscila523.pythonanywhere.com/';
    function exibir_profissoes() {
        mostrar_conteudo('TabelaProfissoes')
        $.ajax({
            url: urlX + '/listar_profissoes',
            method: 'GET',
            dataType: 'json', 
            success: listar_profissoes, 
            error: function() {
                alert("erro ao ler dados, verifique o backend");
            }
        });
         
        function listar_profissoes (profissoes) {
            $('#corpoTabelaProfissoes').empty();
            mostrar_conteudo("cadastroProfissoes");      
            for (var i in profissoes) { 
                lin = '<tr id="linha_'+profissoes[i].id+'">' + 
                '<td>' + profissoes[i].nome + '</td>' + 
                '<td>' + profissoes[i].funcao + '</td>' + 
                '<td>' + profissoes[i].detalhe + '</td>' + 
                '<td>' + profissoes[i].caracteristica + '</td>' + 
                '<td><a href=# id="excluir_' + profissoes[i].id + '" ' + 
                  'class="excluir_profissao"><img src="img/excluir.png" height=20 width= 20'+
                  'alt="Excluir profissão" title="Excluir profissão" ></a>' + 
                '</td>' + 
                '</tr>';
                $('#corpoTabelaProfissoes').append(lin);
            }
        }
    }

    function mostrar_conteudo(identificador) {
        $("#cadastroProfissoes").addClass('d-none');
        $("#cadastroProfissionais").addClass('d-none');
        $("#cadastroCargos").addClass('d-none');
        $("#cadastroEmpresas").addClass('d-none');
        $("#conteudoInicial").addClass('d-none');
        $("#"+identificador).removeClass('d-none');      
    }

    $(document).on("click", "#linkListarProfissoes", function() {
        exibir_profissoes();
    });
    
    $(document).on("click", "#linkInicio", function() {
        mostrar_conteudo("conteudoInicial");
    });

    $(document).on("click", "#btIncluirProfissao", function() {
        nome = $("#campoNome").val();
        funcao = $("#campoFuncao").val();
        detalhe = $("#campoDetalhe").val();
        caracteristica = $("#campoCaracteristica").val();
        var dados = JSON.stringify({ nome: nome, funcao: funcao, detalhe: detalhe, caracteristica: caracteristica });
        $.ajax({
            url: urlX + '/incluir_profissao',
            type: 'POST',
            dataType: 'json', 
            contentType: 'application/json', 
            data: dados, 
            success: profissaoIncluida, 
            error: erroAoIncluir
        });
        function profissaoIncluida (retorno) {
            if (retorno.resultado == "ok") { 
                alert("Profissao incluída com sucesso!");
                $("#campoNome").val("");
                $("#campoFuncao").val("");
                $("#campoDetalhe").val("");
                $("#campoCaracteristica").val("");
            } else {
                alert(retorno.resultado + ":" + retorno.detalhes);
            }            
        }
        function erroAoIncluir (retorno) {
            alert("ERRO: "+retorno.resultado + ":" + retorno.detalhes);
        }
    });

    $('#modalIncluirProfissao').on('hide.bs.modal', function (e) {
        if (! $("#cadastroProfissoes").hasClass('d-none')) {
            exibir_profissoes();
        }
    });

    mostrar_conteudo("conteudoInicial");

    $(document).on("click", ".excluir_profissao", function() {
        var componente_clicado = $(this).attr('id'); 
        var nome_icone = "excluir_";
        var id_profissao = componente_clicado.substring(nome_icone.length);
        $.ajax({
            url: urlX + 'excluir_profissao/'+id_profissao,
            type: 'DELETE', 
            dataType: 'json', 
            success: profissaoExcluida, 
            error: erroAoExcluir
        });
        function profissaoExcluida (retorno) {
            if (retorno.resultado == "ok") { 
                $("#linha_" + id_profissao).fadeOut(1000, function(){
                    alert("Profissão removida com sucesso!");
                });
            } else {
                alert(retorno.resultado + ":" + retorno.detalhes);
            }            
        }
        function erroAoExcluir (retorno) {
            alert("erro ao excluir dados, verifique o backend: ");
        }
    });







    
    function exibir_profissionais() {
        mostrar_conteudo('TabelaProfissionais')
        $.ajax({
            url: urlX+'/listar_profissionais',
            method: 'GET',
            dataType: 'json', 
            success: listar, 
            error: function(problema) {
                alert("erro ao ler dados, verifique o backend: ");
            }
        });

        function listar (profissionais) {
            $('#corpoTabelaProfissionais').empty();
            mostrar_conteudo("cadastroProfissionais");      
            for (var i in profissionais) {
                lin = '<tr id="linha_'+profissionais[i].id+'">' + 
                '<td>' + profissionais[i].nome_profissional + '</td>' + 
                '<td>' + profissionais[i].profissao.nome + '</td>' + 
                '<td>' + profissionais[i].profissao.funcao + '</td>' + 
                '<td>' + profissionais[i].profissao.detalhe + '</td>' + 
                '<td>' + profissionais[i].profissao.caracteristica + '</td>' + 
                '<td><a href=# id="excluir_profissional_' + profissionais[i].id + '" ' + 
                  'class="excluir_profissional"><img src="img/excluir.png" height=20 width= 20'+
                  'alt="Excluir profissional" title="Excluir profissional" ></a>' + 
                '</td>' + 
                '</tr>';
                $('#corpoTabelaProfissionais').append(lin);
            }
        }
    }

    $(document).on("click", "#linkListarProfissionais", function() {
        exibir_profissionais();
    });

    $(document).on("click", "#linkInicio", function() {
        mostrar_conteudo("conteudoInicial");
    });

    function carregarCombo(combo_id, nome_classe) {
        $.ajax({
            url: urlX+'/listar/'+nome_classe,
            method: 'GET',
            dataType: 'json', 
            success: carregar, 
            error: function(problema) {
                alert("erro ao ler dados, verifique o backend: ");
            }
        });
        function carregar (dados) {
            $('#'+combo_id).empty();
            $('#loading_'+combo_id).removeClass('d-none');
            for (var i in dados) { 
                $('#'+combo_id).append(
                    $('<option></option>').attr("value", 
                        dados[i].id).text(dados[i].nome));
            }
            setTimeout(() => { 
                $('#loading_'+combo_id).addClass('d-none');
             }, 1000);
        }
    }
    
    $('#modalIncluirProfissional').on('shown.bs.modal', function (e) {
        carregarCombo("campoProfissaoId1", "Profissao");
    })
    
     $(document).on("click", "#btIncluirProfissional", function() {
        profissao_id = $("#campoProfissaoId1").val();
        nome_profissional = $("#campoProfissional").val();
        var dados = JSON.stringify({ nome_profissional: nome_profissional, profissao_id: profissao_id });
        $.ajax({
            url: urlX+'/incluir_profissional',
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json', 
            data: dados,
            success: dadosIncluidos, 
            error: erroAoIncluir
        });
        function dadosIncluidos (retorno) {
            if (retorno.resultado == "ok") { 
                alert("Dados incluídos com sucesso!");
                $("#campoProfissaoId1").val("");
                $("#campoProfissional").val("");
            } else {
                alert(retorno.resultado + ":" + retorno.detalhes);
            }            
        }
        function erroAoIncluir (retorno) {
            alert("erro ao incluir dados, verifique o backend: ");
        }
    });

    $('#modalIncluirProfissional').on('hide.bs.modal', function (e) {
        if (! $("#cadastroProfissionais").hasClass('d-none')) {
            exibir_profissionais();
        }
    });

    mostrar_conteudo("conteudoInicial");

    $(document).on("click", ".excluir_profissional", function() {
        var componente_clicado = $(this).attr('id'); 
        var nome_icone = "excluir_profissional_";
        var id_profissional = componente_clicado.substring(nome_icone.length);
        $.ajax({
            url: urlX+'excluir_profissional/'+id_profissional,
            type: 'DELETE', 
            dataType: 'json', 
            success: profissionalExcluida, 
            error: erroAoExcluir
        });
        function profissionalExcluida (retorno) {
            if (retorno.resultado == "ok") { 
                $("#linha_" + id_profissional).fadeOut(1000, function(){
                    alert("Profissional removido com sucesso!");
                });
            } else {
                alert(retorno.resultado + ":" + retorno.detalhes);
            }            
        }
        function erroAoExcluir (retorno) {
            alert("erro ao excluir dados, verifique o backend: ");
        }
    });













    function exibir_cargos() {
        mostrar_conteudo('TabelaCargos')
        $.ajax({
            url: urlX+'/listar_cargos',
            method: 'GET',
            dataType: 'json', 
            success: listar, 
            error: function(problema) {
                alert("erro ao ler dados, verifique o backend: ");
            }
        });

        function listar (cargos) {
            $('#corpoTabelaCargos').empty();
            mostrar_conteudo("cadastroCargos");      
            for (var i in cargos) {
                lin = '<tr id="linha_'+cargos[i].id+'">' + 
                '<td>' + cargos[i].nome_cargo + '</td>' + 
                '<td>' + cargos[i].salario + '</td>' +
                '<td>' + cargos[i].profissao.nome + '</td>' + 
                '<td>' + cargos[i].profissao.funcao + '</td>' + 
                '<td>' + cargos[i].profissao.detalhe + '</td>' + 
                '<td>' + cargos[i].profissao.caracteristica + '</td>' + 
                '<td><a href=# id="excluir_cargo_' + cargos[i].id + '" ' + 
                  'class="excluir_cargo"><img src="img/excluir.png" height=20 width= 20 '+
                  'alt="Excluir cargo" title="Excluir cargo"></a>' + 
                '</td>' + 
                '</tr>';
                $('#corpoTabelaCargos').append(lin);
            }
        }
    }

    $(document).on("click", "#linkListarCargos", function() {
        exibir_cargos();
    });

    $(document).on("click", "#linkInicio", function() {
        mostrar_conteudo("conteudoInicial");
    });

    function carregarCombo(combo_id, nome_classe) {
        $.ajax({
            url: urlX+'/listar/'+nome_classe,
            method: 'GET',
            dataType: 'json', 
            success: carregar, 
            error: function(problema) {
                alert("erro ao ler dados, verifique o backend: ");
            }
        });
        function carregar (dados) {
            $('#'+combo_id).empty();
            $('#loading_'+combo_id).removeClass('d-none');
            for (var i in dados) { 
                $('#'+combo_id).append(
                    $('<option></option>').attr("value", 
                        dados[i].id).text(dados[i].nome));
            }
            setTimeout(() => { 
                $('#loading_'+combo_id).addClass('d-none');
             }, 1000);
        }
    }
    
    $('#modalIncluirCargo').on('shown.bs.modal', function (e) {
        carregarCombo("campoProfissaoId2", "Profissao");
    })
    
     $(document).on("click", "#btIncluirCargo", function() {
        nome_cargo = $("#campoCargo").val();
        salario = $("#campoSalario").val();
        profissao_id2 = $("#campoProfissaoId2").val();
        var dados = JSON.stringify({ nome_cargo: nome_cargo, salario: salario, profissao_id: profissao_id2 });
        $.ajax({
            url: urlX+'/incluir_cargo',
            type: 'POST',
            dataType: 'json', 
            contentType: 'application/json', 
            data: dados, 
            success: dadosIncluidos, 
            error: erroAoIncluir
        });
        function dadosIncluidos (retorno) {
            if (retorno.resultado == "ok") { 
                alert("Dados incluídos com sucesso!");
                $("#campoCargo").val("");
                $("#campoSalario").val("");
                $("#campoProfissaoId2").val("");
            } else {
                alert(retorno.resultado + ":" + retorno.detalhes);
            }            
        }
        function erroAoIncluir (retorno) {
            alert("erro ao incluir dados, verifique o backend: ");
        }
    });

    mostrar_conteudo("conteudoInicial");

    $(document).on("click", ".excluir_cargo", function() {
        var componente_clicado = $(this).attr('id'); 
        var nome_icone = "excluir_cargo_";
        var id_cargo = componente_clicado.substring(nome_icone.length);
        $.ajax({
            url: urlX+'excluir_cargo/'+id_cargo,
            type: 'DELETE', 
            dataType: 'json', 
            success: cargoExcluida, 
            error: erroAoExcluir
        });
        function cargoExcluida (retorno) {
            if (retorno.resultado == "ok") { 
                $("#linha_" + id_cargo).fadeOut(1000, function(){
                    alert("Cargo removido com sucesso!");
                });
            } else {
                alert(retorno.resultado + ":" + retorno.detalhes);
            }            
        }
        function erroAoExcluir (retorno) {
            alert("erro ao excluir dados, verifique o backend: ");
        }
    });









    
    function exibir_empresas() {
        $.ajax({
            url: urlX+'/listar_empresas',
            method: 'GET',
            dataType: 'json', 
            success: listar, 
            error: function(problema) {
                alert("erro ao ler dados, verifique o backend: ");
            }
        });

        function listar (empresas) {
            $('#corpoTabelaEmpresas').empty();
            mostrar_conteudo("cadastroEmpresas");      
            for (var i in empresas) {
                lin = '<tr id="linha_'+empresas[i].id+'">' + 
                '<td>' + empresas[i].nome_empresa + '</td>' + 
                '<td>' + empresas[i].cargo.nome_cargo + '</td>' + 
                '<td>' + empresas[i].cargo.salario + '</td>' + 
                '<td><a href=# id="excluir_empresa_' + empresas[i].id + '" ' + 
                  'class="excluir_empresa"><img src="img/excluir.png" height=20 width= 20'+
                  'alt="Excluir empresa" title="Excluir empresa"></a>' + 
                '</td>' + 
                '</tr>';
                $('#corpoTabelaEmpresas').append(lin);
            }
        }
    }

    $(document).on("click", "#linkListarEmpresas", function() {
        exibir_empresas();
    });

    function carregarCombo(combo_id, nome_classe) {
        $.ajax({
            url: urlX+'/listar/'+nome_classe,
            method: 'GET',
            dataType: 'json', 
            success: carregar, 
            error: function(problema) {
                alert("erro ao ler dados, verifique o backend: ");
            }
        });
        function carregar (dados) {
            $('#'+combo_id).empty();
            $('#loading_'+combo_id).removeClass('d-none');
            for (var i in dados) { 
                $('#'+combo_id).append(
                    $('<option></option>').attr("value", 
                        dados[i].id).text(dados[i].nome_cargo));
            }
            setTimeout(() => { 
                $('#loading_'+combo_id).addClass('d-none');
             }, 1000);
        }
    }
    
    $('#modalIncluirEmpresa').on('shown.bs.modal', function (e) {
        carregarCombo("campoCargoId", "Cargo");
    })
    
     $(document).on("click", "#btIncluirEmpresa", function() {
        nome_empresa = $("#campoEmpresa").val();
        cargo_id = $("#campoCargoId").val();
        var dados = JSON.stringify({ nome_empresa: nome_empresa, cargo_id: cargo_id });
        $.ajax({
            url: urlX+'/incluir_empresa',
            type: 'POST',
            dataType: 'json', 
            contentType: 'application/json', 
            data: dados, 
            success: dadosIncluidos,
            error: erroAoIncluir
        });
        function dadosIncluidos (retorno) {
            if (retorno.resultado == "ok") { 
                alert("Dados incluídos com sucesso!");
                $("#campoEmpresa").val("");
                $("#campoCargoId").val("");
            } else {
                alert(retorno.resultado + ":" + retorno.detalhes);
            }            
        }
        function erroAoIncluir (retorno) {
            alert("erro ao incluir dados, verifique o backend: ");
        }
    });

    mostrar_conteudo("conteudoInicial");
    
    $(document).on("click", ".excluir_empresa", function() {
        var componente_clicado = $(this).attr('id'); 
        var nome_icone = "excluir_empresa_";
        var empresa_id = componente_clicado.substring(nome_icone.length);
        $.ajax({
            url: urlX+'excluir_empresa/'+empresa_id,
            type: 'DELETE', 
            dataType: 'json', 
            success: empresaExcluida, 
            error: erroAoExcluir
        });
        function empresaExcluida (retorno) {
            if (retorno.resultado == "ok") { 
                $("#linha_" + empresa_id).fadeOut(1000, function(){
                    alert("empresa removida com sucesso!");
                });
            } else {
                alert(retorno.resultado + ":" + retorno.detalhes);
            }            
        }
        function erroAoExcluir (retorno) {
            alert("erro ao excluir dados, verifique o backend: ");
        }
    });
    
});