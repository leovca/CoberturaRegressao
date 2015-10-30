import pexpect
import re
import checklines

class Teste:
    appDebugPort = 8700;
    linhas = []
    paradas = []
    jdb = None
    processPid = None

    def __init__(self,arquivos,appMainClass):
        self.arquivos = arquivos;
        self.appMainClass = appMainClass;

    def main(self):
        self.iniciarApp()
        self.bind()
        print "Iniciando debug\n","*"*10,"\n"  
        self.definirBreakPoints();
        self.executar()
        self.relatorio()

    def bind(self):
        
        pexpect.run("adb -d forward tcp:%s jdwp:%s"%(self.appDebugPort,self.processPid))
        #print "adb -d forward tcp:%s jdwp:%s"%(self.appDebugPort,self.processPid),"\n"
        self.jdb = pexpect.spawn('jdb -attach localhost:%s'%(self.appDebugPort))
        #print 'jdb -attach localhost:%s'%(self.appDebugPort),"\n"

    def iniciarApp(self):
        pexpect.run('adb -d shell am start -D -n "%s"'%(self.appMainClass))
        #print 'adb -d shell am start -D -n "%s"'%(self.appMainClass),"\n"
        package = self.appMainClass.split("/")[0]
        retorno = pexpect.run("adb shell ps %s"%(package))
        #print "adb shell ps %s"%(package),"\n"
        retorno = retorno.split(' ')
        self.processPid = int(retorno[35])
        #print "PID: %s"%(self.processPid),"\n"

    def relatorio(self):
        print "Debug Finalizado\n"
        print "*"*10,"\n";
        print "Linhas esperadas:"
        print self.linhas, "\n"
        print "Linhas alcancadas:"
        print self.paradas, "\n"    
        breakpointsFaltantes = [val for val  in self.linhas if val not in self.paradas]
        if len(breakpointsFaltantes)==0:
            print "Cobertura de 100% dos breakpoints"
        elif len(breakpointsFaltantes)>0:
            print "Cobertura de %s dos breakpoints"%(100*(len(self.linhas)-len(breakpointsFaltantes))/len(self.linhas)),"\n","Breakpoints nao cobertos:",breakpointsFaltantes

    def definirBreakPoints(self):
        print "Definindo breakpoints\n","*"*10,"\n"

        for arquivo in self.arquivos:
            print arquivo.getLinhasModificadas(),"\n"
            self.linhas = arquivo.getLinhasModificadas()
            for linha in arquivo.getLinhasModificadas():
                self.jdb.expect(">")
                self.jdb.sendline("stop in %s:%s"%(arquivo.getNomeDaClasse(),linha));
                self.jdb.expect("Deferring breakpoint*")


    def executar(self):
        self.jdb.expect(">")    
        #self.jdb.sendline("run");
            
        while True:
            ex = self.jdb.expect(["Breakpoint hit: *","The application exited","The application has been disconnected"])
            if ex==0:
                output = self.jdb.readline().strip();
                lineNumber = re.search('line=(.+?) bci', output).group(1)
                print "Breakpoint: %s"%(lineNumber)
                self.paradas.append(int(lineNumber))
                self.jdb.sendline("cont")
            else:
                return