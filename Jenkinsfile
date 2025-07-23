pipeline {
  agent any

  environment {
    IMAGE_NAME = "wiki/frontend"
    TAG = "latest-${env.BUILD_NUMBER}"
  }

  stages {
    stage('Checkout') {
      steps {
        git branch: 'main', url: 'https://github.com/seuusuario/seu-frontend.git'
      }
    }

    stage('Build Docker Image') {
      steps {
        script {
           sh "docker build -t ${IMAGE_NAME}:${TAG} -f infra/Dockerfile ."
        }
      }
    }

    // Descomente se quiser aplicar o terraform automaticamente
    /*
    stage('Deploy via Terraform') {
      steps {
        dir('infra') { // caminho para o diretório onde está seu main.tf
          sh 'terraform init'
          sh 'terraform apply -auto-approve'
        }
      }
    }
    */
  }

  post {
    success {
      echo "Imagem '$IMAGE_NAME:$TAG' criada localmente com sucesso."
    }
    failure {
      echo "Falha ao construir imagem Docker."
    }
  }

}