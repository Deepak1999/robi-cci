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
                    // sh 'mv -v /opt/html/themanly /opt/html/themanly_$(date +%Y%m%d%H)/'
                    sh 'mv build /var/www/html/robicci'
                    // sh 'mv /opt/html/dist /opt/html/themanly'
                }
            }
        }
    }
}
