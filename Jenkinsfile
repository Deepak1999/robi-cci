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
                    // List contents of the /var/www/html directory for debugging
                    sh 'ls -lrth /var/www/html'

                    // Move existing robicci folder to backup with timestamp
                    sh 'sudo mv -v /var/www/html/robicci /var/www/html/robicci_$(date +%Y%m%d%H)'

                    // Ensure the robicci directory is cleaned up properly
                    sh 'sudo rm -rf /var/www/html/robicci/.* /var/www/html/robicci/*'

                    // Remove the existing build folder if it exists
                    sh 'sudo rm -rf /var/www/html/build'

                    // Move the newly built directory to /var/www/html
                    sh 'sudo mv build /var/www/html/'

                    // Rename the build folder to robicci
                    sh 'sudo mv /var/www/html/build /var/www/html/robicci'

                    // Restart the nginx service to apply the changes
                    sh 'sudo service nginx restart'
                }
            }
        }
    }
}
