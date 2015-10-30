import pexpect
import re

class Teste:
    linhas = [33]
    paradas = []
    jdb = None
    processPid = None

    def main(self):
        self.iniciarApp()
        self.bind()
        print "Iniciando debug\n","*"*10,"\n"  
        self.definirBreakPoints();
        self.executar()
        self.relatorio()

    def bind(self):
        
        pexpect.run("adb -d forward tcp:8700 jdwp:%s"%(self.processPid))
        self.jdb = pexpect.spawn('jdb -attach localhost:8700')

    def iniciarApp(self):
        pexpect.run('adb -d shell am start -D -n "com.example.leonan.myapplication/com.example.leonan.myapplication.MainActivity"')
        retorno = pexpect.run('adb shell ps com.example')
        retorno = retorno.split(' ')
        self.processPid = int(retorno[35])
        print "PID: %s"%(self.processPid),"\n"

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
            print "Cobertura de %s % dos breakpoints"%(100*(len(self.linhas)-len(breakpointsFaltantes))/len(self.linhas)),"\n","Breakpoints nao cobertos:",breakpointsFaltantes

    def definirBreakPoints(self):
        print "Definindo breakpoints\n","*"*10,"\n"
        for linha in self.linhas:
            self.jdb.expect(">")
            self.jdb.sendline("stop in com.example.leonan.myapplication.MainActivity:%s"%(linha));
            self.jdb.expect("Deferring breakpoint com.example.leonan.myapplication.MainActivity:%s."%(linha))

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

    
x = Teste()
print x.main()
