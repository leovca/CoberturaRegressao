__author__ = 'leonan'
import git
import sys
import json

class GitOptions:

    def getCommits(self,repoDir):
        repo = git.Repo(repoDir)
        #repo.git.pull()
        log = repo.git.log(['--pretty=format:%H+%cd','HEAD~25..HEAD']).split('\n')
        log_2 = []
        for commit in log:
            log_2.append(str(commit))

        return json.dumps(log_2)




gitOptions = GitOptions()


print gitOptions.getCommits(sys.argv[1])