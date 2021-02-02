from config import *
from profissao import Profissao, Profissional, Cargo, Empresa

@app.route("/")
def inicio():
    return 'Sistema para cadastrar profissões. '+\
        '<a href="/listar_profissoes">Listar Profissões</a>'

@app.route("/listar_profissoes")
def listar_profissoes():
    profissoes = db.session.query(Profissao).all()
    profissoes_em_json = [ x.json() for x in profissoes]
    resposta = jsonify(profissoes_em_json)
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta 
    
@app.route("/incluir_profissao", methods=['post'])
def incluir_profissao():
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"})
    dados = request.get_json() 
    try:
      nova = Profissao(**dados) 
      db.session.add(nova) 
      db.session.commit() 
    except Exception as e:
      resposta = jsonify({"resultado":"erro", "detalhes":str(e)})
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta 

@app.route("/excluir_profissao/<int:profissao_id>", methods=['DELETE'])
def excluir_profissao(profissao_id):
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"})
    try:
        Profissao.query.filter(Profissao.id == profissao_id).delete()
        db.session.commit()
    except Exception as e:
        resposta = jsonify({"resultado":"erro", "detalhes":str(e)})
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta 

@app.route("/listar/<string:classe>")
def listar(classe):
    dados = None
    if classe == "Profissao":
      dados = db.session.query(Profissao).all()
    elif classe == "Profissional":
      dados = db.session.query(Profissional).all()
    elif classe == "Cargo":
      dados = db.session.query(Cargo).all()
    elif classe == "Empresa":
      dados = db.session.query(Empresa).all()
    lista_jsons = [ x.json() for x in dados ]
    resposta = jsonify(lista_jsons)
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta

@app.route("/listar_profissionais")
def listar_profissionais():
    profissionais = db.session.query(Profissional).all()
    profissionais_em_json = [ x.json() for x in profissionais]
    resposta = jsonify(profissionais_em_json)
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta 
    
@app.route("/incluir_profissional", methods=['post'])
def incluir_profissional():
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"})
    dados = request.get_json() 
    try:
      nova = Profissional(**dados) 
      db.session.add(nova) 
      db.session.commit() 
    except Exception as e:
      resposta = jsonify({"resultado":"erro", "detalhes":str(e)})
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta 

@app.route("/excluir_profissional/<int:profissional_id>", methods=['DELETE'])
def excluir_profissional(profissional_id):
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"})
    try:
        Profissional.query.filter(Profissional.id == profissional_id).delete()
        db.session.commit()
    except Exception as e:
        resposta = jsonify({"resultado":"erro", "detalhes":str(e)})
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta 
    
    
@app.route("/listar_cargos")
def listar_cargos():
    cargos = db.session.query(Cargo).all()
    cargos_em_json = [ x.json() for x in cargos]
    resposta = jsonify(cargos_em_json)
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta 
    
@app.route("/incluir_cargo", methods=['post'])
def incluir_cargo():
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"})
    dados = request.get_json() 
    try:
      nova = Cargo(**dados) 
      db.session.add(nova) 
      db.session.commit() 
    except Exception as e:
      resposta = jsonify({"resultado":"erro", "detalhes":str(e)})
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta 

@app.route("/excluir_cargo/<int:cargo_id>", methods=['DELETE'])
def excluir_cargo(cargo_id):
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"})
    try:
        Cargo.query.filter(Cargo.id == cargo_id).delete()
        db.session.commit()
    except Exception as e:
        resposta = jsonify({"resultado":"erro", "detalhes":str(e)})
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta 
    


@app.route("/listar_empresas")
def listar_empresas():
    empresas = db.session.query(Empresa).all()
    empresas_em_json = [ x.json() for x in empresas]
    resposta = jsonify(empresas_em_json)
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta 
    
@app.route("/incluir_empresa", methods=['post'])
def incluir_empresa():
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"})
    dados = request.get_json() 
    try:
      nova = Empresa(**dados) 
      db.session.add(nova) 
      db.session.commit() 
    except Exception as e:
      resposta = jsonify({"resultado":"erro", "detalhes":str(e)})
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta 

@app.route("/excluir_empresa/<int:empresa_id>", methods=['DELETE'])
def excluir_empresa(empresa_id):
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"})
    try:
        Empresa.query.filter(Empresa.id == empresa_id).delete()
        db.session.commit()
    except Exception as e:
        resposta = jsonify({"resultado":"erro", "detalhes":str(e)})
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta 




app.run(debug=True)