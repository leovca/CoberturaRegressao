import pexpect
import re
import checklines
import time

class Teste:
    appDebugPort = 8700;
    linhas = []
    paradas = []
    jdb = None
    processPid = None

    debug = False;

    def __init__(self,arquivos,appMainClass):
        self.arquivos = arquivos;
        self.appMainClass = appMainClass;

    def main(self):
        self.iniciarApp()
        self.bind()
        if self.debug: print "Iniciando debug\n","*"*10,"\n"
        self.definirBreakPoints();
        self.executar()
        self.relatorio()

    def bind(self):
        pexpect.run("adb -d forward tcp:%s jdwp:%s"%(self.appDebugPort,self.processPid))
        if self.debug: print "adb -d forward tcp:%s jdwp:%s"%(self.appDebugPort,self.processPid),"\n"
        self.jdb = pexpect.spawn('jdb -attach localhost:%s'%(self.appDebugPort))
        if self.debug:'jdb -attach localhost:%s'%(self.appDebugPort),"\n"

    def iniciarApp(self):
        pexpect.run('adb -d shell am start -D -n "%s"'%(self.appMainClass))
        if self.debug:print 'adb -d shell am start -D -n "%s"'%(self.appMainClass),"\n"
        package = self.appMainClass.split("/")[0]
        retorno = pexpect.run("adb shell ps | grep %s" %(package))
        if self.debug:print "adb shell ps | grep %s "%(package),"\n"
        retorno = retorno.split()
        self.processPid = retorno[1]
        if self.debug:print "PID: %s"%(self.processPid),"\n"

    def relatorio(self):

        paradas = []
        for arquivo in self.arquivos:
            paradas+=self.arquivos[arquivo].getBreakPoints()

        breakpointsFaltantes = [val for val  in self.linhas if val not in paradas]


        if self.debug:print "Debug Finalizado\n"
        if self.debug:print "*"*10,"\n";
        if self.debug:print "Linhas esperadas:"
        if self.debug:print self.linhas, "\n"
        if self.debug:print "Linhas alcancadas:"
        if self.debug:print paradas, "\n"

        if len(breakpointsFaltantes)==0:
            if self.debug:print "Cobertura de 100% dos breakpoints"
        elif len(breakpointsFaltantes)>0:
            if self.debug: print "Cobertura de %s dos breakpoints"%(100*(len(self.linhas)-len(breakpointsFaltantes))/len(self.linhas)),"\n","Breakpoints nao cobertos:",breakpointsFaltantes

        if(self.debug==False):
            coverage = (100*(len(self.linhas)-len(breakpointsFaltantes))/len(self.linhas))
            print "{'coverage': %s,'esperadas': %s,'alcancadas': %s,'faltantes': %s}"%(coverage,self.linhas,paradas,breakpointsFaltantes)
            #print (100*(len(self.linhas)-len(breakpointsFaltantes))/len(self.linhas))

    def definirBreakPoints(self):
        if self.debug:print "Definindo breakpoints\n","*"*10,"\n"

        for arquivo in self.arquivos:
            if self.debug:print self.arquivos[arquivo].getNomeDaClasse(),":",self.arquivos[arquivo].getLinhasModificadas(),"\n"
            self.linhas+=(self.arquivos[arquivo].getEsperadas())
            for linha in self.arquivos[arquivo].getLinhasModificadas():
                self.jdb.expect(">",timeout=10)
                self.jdb.sendline("stop in %s:%s"%(self.arquivos[arquivo].getNomeDaClasse(),linha));
                self.jdb.expect("Deferring breakpoint*",timeout=10)


    def executar(self):
        self.jdb.expect(">",timeout=10)
        #self.jdb.sendline("run");
            
        while True:
            ex = self.jdb.expect(["Breakpoint hit: *","The application exited","The application has been disconnected"],timeout=100)
            if ex==0:
                output = self.jdb.readline().strip();
                lineNumber = re.search('line=(.+?) bci', output).group(1)
                className = re.search('", (.+?) ()', output).group(1)

                for arquivo in self.arquivos:
                    if arquivo in output:
                        self.arquivos[arquivo].addParada(lineNumber)
                        if self.debug:print "Breakpoint: %s:%s"%(arquivo,lineNumber)

                #self.paradas.append(int(lineNumber))
                self.jdb.sendline("cont")
                # Remove o breakpoint
                self.jdb.sendline('clear %s:%s' % (arquivo, lineNumber))
            else:
                return
