from config import *

class Profissao(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(254))
    funcao = db.Column(db.String(254))
    detalhe = db.Column(db.String(254))
    caracteristica = db.Column(db.String(254))

    def __str__(self):
        return "[id="+str(self.id)+ "], " + self.nome + \
            ", " + self.funcao + ", " + self.detalhe + \
            ", " + self.caracteristica

    def json(self):
        return ({
            "id": self.id,
            "nome": self.nome,
            "funcao": self.funcao,
            "detalhe": self.detalhe,
            "caracteristica": self.caracteristica
        })

class Cargo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome_cargo = db.Column(db.String(254)) 
    salario = db.Column(db.Integer())

    profissao_id = db.Column(db.Integer, db.ForeignKey(Profissao.id))
    profissao = db.relationship("Profissao")

    def __str__(self): 
        return  self.nome_cargo +  \
            ", " + str(self.salario) 

    def json(self):
        return {
            "id":self.id,
            "nome_cargo":self.nome_cargo,
            "salario": self.salario,
            "profissao_id":self.profissao_id,
            "profissao":self.profissao.json() 
        }

class Profissional(db.Model):
    id = db.Column(db.Integer, primary_key=True) 
    nome_profissional = db.Column(db.String(254)) 

    profissao_id = db.Column(db.Integer, db.ForeignKey(Profissao.id))
    profissao = db.relationship("Profissao")

    def __str__(self): 
        return  self.nome_profissional +  \
            ", " + str(self.profissao) 

    def json(self):
        return {
            "id":self.id,
            "nome_profissional":self.nome_profissional,
            "profissao_id":self.profissao_id,
            "profissao":self.profissao.json() 
        }

class Empresa(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome_empresa = db.Column(db.String(254)) 
    
    cargo_id = db.Column(db.Integer, db.ForeignKey(Cargo.id), nullable=False)
    cargo = db.relationship("Cargo")

    def __str__(self): 
        return  self.nome_empresa +  \
            ", " + str(self.cargo) 

    def json(self):
        return {
            "id":self.id,
            "nome_empresa":self.nome_empresa,
            "cargo_id":self.cargo_id,
            "cargo":self.cargo.json() 
        }
