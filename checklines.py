import git
import re
import os
import ntpath

class Arquivo:    

    def __init__(self, diffCheck):
        self.caminhoDoArquivo = diffCheck.a_path
        self.diffObject = diffCheck

    

arquivosParaVerificacao=[]        
 
repo = git.Repo("~/Desktop/Monografia/AplicacaoTeste") 

x = repo.commit("439b7c2").tree
y  = repo.commit("10f0725cd99b3e676459625373fbf97422be9516").tree

#x = repo.commit("1543b6e").tree
#y  = repo.commit("439b7c283d08c5bda96718b598468970c00759c2").tree

#print x.author, "\n"
#print y.author, "\n"

dif = x.diff(other=y,create_patch=True)

for arquivo in dif:
    filename = ntpath.basename(arquivo.a_path)
    if(filename.endswith(".java")):
        arquivosParaVerificacao.append(Arquivo(arquivo))    
    
print arquivosParaVerificacao
#for z in dif:
    #print z, "\n"*5, "-"*10

b = dif[1].diff



#print "\n"*50




linhas = re.search('@@ (.+?) @@', b).group(1).replace("+","").replace("-","")


linha = linhas.split(" ")

a = [val.split(",") for val in linha]
#print a

#print "modificacao na linha %s"%(int(a[0][0])+3)
