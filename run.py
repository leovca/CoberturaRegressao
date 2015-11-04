__author__ = 'leonan'

from checklines import GitCheck
from debug import Teste
import sys


appMainClass= "android.cin.ufpe.br.aplicacaoteste/android.cin.ufpe.br.aplicacaoteste.AtivityTeste"

repoDir = "~/Desktop/Monografia/AplicacaoTeste"
commitBase = "1543b6e5ab47332d82a0e7867a7d1f0ec3d884f9"
commitAlterado = "10f0725cd99b3e676459625373fbf97422be9516"



appMainClass = sys.argv[1]
repoDir = sys.argv[2]
commitBase = sys.argv[3]
commitAlterado = sys.argv[4]

arquivos = GitCheck().getArquivos(repoDir,commitBase,commitAlterado)

execucao = Teste(arquivos,appMainClass)
execucao.main()