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

                    // Check if the robicci folder exists before trying to move it
                    sh '''
                        if [ -d /var/www/html/robicci ]; then
                            sudo mv -v /var/www/html/robicci /var/www/html/robicci_$(date +%Y%m%d%H)
                        else
                            echo "Directory /var/www/html/robicci does not exist, skipping move."
                        fi
                    '''

                    // Ensure robicci directory is cleaned up
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
