pipeline {
  agent any

  environment {
    IMAGE_NAME = "wiki/frontend"
    TAG = "latest"
  }

  stages {
    stage('Build Docker Image') {
      steps {
        script {
            def customImage = docker.build("${IMAGE_NAME}:${TAG}")
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
      echo "Imagem '$IMAGE_NAME:$TAG-$env.BUILD_NUMBER' criada localmente com sucesso."
    }
    failure {
      echo "Falha ao construir imagem Docker."
    }
  }

}