__author__ = 'leonan'
import re
import ntpath
import linecache

class Arquivo:

    def __init__(self, diffCheck,repo):
        self.repo = repo
        self.caminhoDoArquivo = diffCheck.a_path
        self.diffObject = diffCheck

    def getLinhasModificadas(self):
        diffResult = self.diffObject.diff
        linhas = re.findall('@@ (.+?) @@', diffResult)
        linhas = [val.replace("+","").replace("-","") for val in linhas]
        linhas = [val.split(" ") for val in linhas]

        linhasSelecionadas = []

        for modificao in linhas:
            inicio = int(modificao[1].split(",")[0])+3
            fim = int(modificao[1].split(',')[1])-6+inicio
            linhasSelecionadas= linhasSelecionadas + range(inicio,fim)

        linhasParaRemover =[]
        for linha in linhasSelecionadas:
            x = linecache.getline(self.repo.working_dir+"/"+self.caminhoDoArquivo, linha)

            #remover iniciandos com import ou linhas vazias, ou definicoes de classe
            if x.startswith("import") \
                    or x.strip()=="" \
                    or x.startswith("public class") \
                    or x.startswith("class"):

                linhasParaRemover.append(linha)

        for remover in linhasParaRemover:
            linhasSelecionadas.remove(remover)

        return linhasSelecionadas

    def getNomeDaClasse(self):
        with open (self.repo.working_dir+"/"+self.caminhoDoArquivo, "r") as myfile:
            data=myfile.read().replace('\n', '')
            package = re.findall('package (.+?);', data)[0]
            className = ntpath.basename(self.caminhoDoArquivo).replace(".java","")
            return package+"."+className;
