pipeline {
  agent any

  environment {
    IMAGE_NAME = "wiki/frontend"
    TAG = "latest-${env.BUILD_NUMBER}"
  }

  stages {
    stage ('Clone Repository') {
        checkout scm
    }

    stage ('Set Env') {
        if (env.BRANCH_NAME =~ /(main)/) {
            sh "docker build -t ${IMAGE_NAME}:${TAG} ."
        }
    }

    stage('Build Docker Image') {
      steps {
        script {
          sh "docker build -t $IMAGE_NAME:$TAG ."
        }
      }
    }

   stage ('Build container') {
        if (env.BRANCH_NAME =~ /(main)/) {
            dockerImage = docker.build(IMAGE, "-f infra/Dockerfile .")
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