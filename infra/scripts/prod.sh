cat .env.production > .env

echo "
REACT_APP_BRANCH_NAME=$1
REACT_APP_BUILD_NUMBER=$2
REACT_APP_BUILD_DATE=\"$(date +"%Y-%m-%d %H:%M:%S")\"
" >> .env

echo "Variáveis de produção definidas"
cat .env