pipeline {
    agent any
    triggers {
        pollSCM 'H * * * *'
    }
    stages {
        stage('Prebuild') {
                steps {
                   script{
                        echo 'Pulling WMS-UI Development branch. ' + env.BRANCH_NAME
                        sh 'npm install'
                   }
                }
        }
        stage('Build') {
            steps {
               script{
                    sh 'npm run build'
               }
            }
        }
        stage('Deploy') {
            steps {
                script{
                    sh'ls -lrth'
                    sh 'mv -v  /var/www/html/robicci  /var/www/html/robicci_$(date +%Y%m%d%H)/'
                    sh 'mv build /var/www/html/'
                    sh 'mv /var/www/html/build  /var/www/html/robicci'
                }
            }
        }
    }
}
