pipeline {
    agent any
    triggers {
        pollSCM 'H * * * *'
    }
    stages {
        stage('Prebuild') {
            steps {
                script {
                    echo 'Pulling WMS-UI Development branch. ' + env.BRANCH_NAME
                    sh 'npm install'
                }
            }
        }
        stage('Build') {
            steps {
                script {
                    sh 'npm run build'
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    sh 'ls -lrth /var/www/html'
                    
                    sh '''
                        if [ -d /var/www/html/robicci ]; then
                            echo "Backing up previous build..."
                            sudo mv /var/www/html/robicci /var/www/html/robicci_$(date +%Y%m%d%H%M%S)
                        else
                            echo "No previous build found, skipping backup."
                        fi
                    '''
                    sh 'sudo rm -rf /var/www/html/robicci/.* /var/www/html/robicci/* || true'
                    sh 'sudo rm -rf /var/www/html/build'
                    sh 'sudo mv build /var/www/html/'
                    sh 'sudo mv /var/www/html/build /var/www/html/robicci'
                    sh 'sudo service nginx restart'
                }
            }
        }
    }
}
