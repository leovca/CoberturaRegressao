__author__ = 'leonan'

import arquivo
import Configuracoes
import random
import hashlib
import os
import time

class JDBUtils:

    def gerarArquivoIni(self,arquivos, destino):
        #if debug:print "Gerando Breakpoints breakpoints\n","*"*10,"\n"

        if not os.path.exists("sessions"):
            os.makedirs("sessions")

        md5Generator = hashlib.md5()
        md5Generator.update("%s%s"%(time.time(),random.randrange(1,100000)))
        dirName = md5Generator.hexdigest()

        os.makedirs("sessions/"+dirName)

        jdbFile = open("sessions/%s/jdb.ini"%(dirName),'w')

        for arquivo in arquivos:
            #if self.debug:print self.arquivos[arquivo].getNomeDaClasse(),":",self.arquivos[arquivo].getLinhasModificadas(),"\n"
            #self.linhas+=(self.arquivos[arquivo].getEsperadas())
            for linha in arquivos[arquivo].getLinhasModificadas():
                jdbFile.write("stop in %s:%s\n"%(arquivos[arquivo].getNomeDaClasse(),linha))
                #self.jdb.expect(">",timeout=10)
                #self.jdb.sendline("stop in %s:%s"%(self.arquivos[arquivo].getNomeDaClasse(),linha));
                #self.jdb.expect("Deferring breakpoint*",timeout=10)

        jdbFile.close()
        return  "sessions/%s"%(dirName)