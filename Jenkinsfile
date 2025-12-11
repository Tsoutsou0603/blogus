pipeline {
    agent any
    stages {
        stage('Build & Test') {
            steps {
                dir('blogus') {
                    sh 'docker compose down --remove-orphans || true'
                    sh 'docker compose build --no-cache'
                    sh 'docker compose up -d'
                    sh 'sleep 20'
                    sh 'curl -f http://localhost || exit 1'
                    sh 'curl -f http://localhost:3000/posts || exit 1'
                    echo "BLOGUS fonctionne parfaitement !"
                }
            }
            post {
                always {
                    dir('blogus') {
                        sh 'docker compose down || true'
                    }
                }
            }
        }
    }
}
