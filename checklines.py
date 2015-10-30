import git

import os
import ntpath
from arquivo import Arquivo;


class GitCheck:

    def getArquivos(self,repoDir,commitBase,commitAltareado):
        arquivosParaVerificacao=[]
        repo = git.Repo(repoDir)
        base = repo.commit(commitBase).tree
        alterado  = repo.commit(commitAltareado).tree
        diff = base.diff(other=alterado,create_patch=True)
        for arquivo in diff:
            filename = ntpath.basename(arquivo.a_path)
            if(filename.endswith(".java")):
                arquivosParaVerificacao.append(Arquivo(arquivo,repo))
        return arquivosParaVerificacao

#print GitCheck().getArquivos("~/Desktop/Monografia/AplicacaoTeste","439b7c2","10f0725cd99b3e676459625373fbf97422be9516")
