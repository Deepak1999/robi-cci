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

                    // Backup the existing robicci directory if it exists
                    sh '''
                        if [ -d /var/www/html/robicci ]; then
                            echo "Backing up previous build..."
                            sudo mv /var/www/html/robicci /var/www/html/robicci_$(date +%Y%m%d%H%M%S)
                        else
                            echo "No previous build found, skipping backup."
                        fi
                    '''

                    // Ensure robicci directory is cleaned up properly
                    sh 'sudo rm -rf /var/www/html/robicci/.* /var/www/html/robicci/* || true'

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
