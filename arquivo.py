__author__ = 'leonan'
import re
import ntpath
import linecache

class Arquivo:

    def __init__(self, diffCheck,repo):
        self.repo = repo
        self.caminhoDoArquivo = diffCheck.a_path
        self.diffObject = diffCheck
        self.linhasAlcancadas = []

    def getLinhasModificadas(self):
        diffResult = self.diffObject.diff
        linhas = re.findall('@@ (.+?) @@', diffResult)
        linhas = [val.replace("+","").replace("-","") for val in linhas]
        linhas = [val.split(" ") for val in linhas]

        linhasSelecionadas = []
        for modificao in linhas:
            inicio = int(modificao[1].split(",")[0])

            if ',' in modificao[1]:
                fim = int(modificao[1].split(',')[1])+inicio-1
            else:
                fim = inicio

            linhasSelecionadas= linhasSelecionadas + range(inicio,fim+1)

            #print "inicio: ",inicio, "fim: ",fim

        linhasParaRemover =[]
        for linha in linhasSelecionadas:
            x = linecache.getline(self.repo.working_dir+"/"+self.caminhoDoArquivo, linha)

            #remover iniciandos com import ou linhas vazias, ou definicoes de classe
            if self.__excluirLinha(x):
                linhasParaRemover.append(linha)
            #else:
               #print self.getNomeDaClasse(),":",linha," - ",  x

        for remover in linhasParaRemover:
            linhasSelecionadas.remove(remover)

        return linhasSelecionadas

    def getNomeDaClasse(self):
        with open (self.repo.working_dir+"/"+self.caminhoDoArquivo, "r") as myfile:
            data=myfile.read().replace('\n', '')
            package = re.findall('package (.+?);', data)[0]
            className = ntpath.basename(self.caminhoDoArquivo).replace(".java","")
            return package+"."+className;

    def addParada(self,linha):
        self.linhasAlcancadas.append(linha)

    def getBreakPoints(self):
        breakponts = []
        for var in self.linhasAlcancadas:
            breakponts.append(str(self.getNomeDaClasse()+":"+str(var)))

        return breakponts

    def getEsperadas(self):
        esperadas = []
        for var in self.getLinhasModificadas():
            esperadas.append((str(self.getNomeDaClasse()+":"+str(var))))

        return esperadas

    def __excluirLinha(self,linha):
        return      linha.strip().startswith("import") \
                    or linha.strip().startswith("package") \
                    or linha.strip()=="" \
                    or linha.strip().startswith("public class") \
                    or linha.strip().startswith("class") \
                    or linha.strip()=="}" or linha.strip()=="{" \
                    or linha.strip().startswith("/**") or linha.strip().startswith("*") \
                    or linha.strip().startswith("@")