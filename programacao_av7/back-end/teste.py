from profissao import *
import os

if __name__ == "__main__":

    if os.path.exists(arquivobd):
        os.remove(arquivobd)

    db.create_all()

    p1 = Profissao(nome = "Arquitetura e Urbanismo", funcao = "construcao civil", 
    detalhe = "desenvolve para estetica e estrutural de projetos civis", 
    caracteristica = "pode assinar predios de ate 4 andares sem engenheiro civil")
    p2 = Profissao(nome = "Engenharia Civil", funcao = "construcao civil", 
    detalhe = "constroi pontes, barragens, etc", 
    caracteristica = "esta envolvido com projeto maiores")
    p3 = Profissao(nome = "Medico Veterinario", funcao = "cuidado de animais", 
    detalhe = "cuida de todos os tipos de animais, variando pela expecializacao", 
    caracteristica = "existem varias areas na medicina veterinaria")
    p4 = Profissao(nome = "Administracao", funcao = "administra negacios", 
    detalhe = "planejar, organizar, dirigir e controlar", 
    caracteristica = "traz lucro, evita desperdicio e reduz custos")

    db.session.add(p1)
    db.session.add(p2)
    db.session.add(p3)
    db.session.add(p4)
    db.session.commit()
    
    print(p1.json())
    print("\n")
    print(p2.json())
    print("\n")
    print(p3.json())
    print("\n")
    print(p4.json())
    print("\n")

    
    c1 = Cargo(nome_cargo="Arquitetura e Urbanismo", 
        salario = 4823, profissao = p1)
    db.session.add(c1)
    db.session.commit()
    print(f"Cargo cadastrada: {c1}" + "\n")
    print(f"Cargo cadastrada em json: {c1.json()}" + "\n"+"\n")
    

    e1 = Empresa(nome_empresa="Arquitetura e Engenharia Civil de Pomerode", 
        cargo = c1)
    db.session.add(e1)
    db.session.commit()
    print(f"Empresa cadastrada: {e1}" + "\n")
    print(f"Empresa cadastrada em json: {e1.json()}" + "\n"+"\n")
    
    pr1 = Profissional(nome_profissional="Priscila Lemke",
        profissao = p1)
    db.session.add(pr1)
    db.session.commit()
    print(f"Profissional 1: {pr1}"+"\n")
    print(f"Profissional 1 (em json): {pr1.json()}")
    