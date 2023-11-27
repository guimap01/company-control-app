# company-control-app

## Rodando o projeto
* Certifique-se de ter NODEJS na versão 16 instalado.
Na raiz do projeto rode o script abaixo para realizar a instalação de todos os pacotes necessarios

```
yarn install
```
* Para o banco de dados será necessario ter docker instalado para conseguir criar um container com uma imagem PostgresSQL que sera necessario para rodar a aplicação.
  Rode o script abaixo para criar um container com uma imagem PostgresSQL
```
docker run --name company -e POSTGRES_PASSWORD=password -p 5433:5432 -d postgres
```

* Com o container rodando e os pacotes já instalados navegue até a pasta `backend` e rode o script abaixo, este script ira criar todas as tabelas necessarias para a aplicação
```
npx prisma migrate dev
```
* Agora com tudo já com o banco de dados com todas as tabelas navegue para a pasta `employees` e rode o script abaixo
```
yarn build
```
* Realize o mesmo para a pasta ```stock```
* Por fim para iniciar as aplicações retorne para a raiz do repositorio e rode o script abaixo
```
yarn dev
```

* Para facilitar o uso da aplicação a rota de criação de usuários esta publica, então para criar um usuário admin e ter acesso a aplicação rode o script abaixo
```curl
curl --request POST \
  --url http://localhost:3001/users \
  --header 'Content-Type: application/json' \
  --header 'User-Agent: insomnia/8.3.0' \
  --data '{
	"email": "admin@gmail.com",
	"name": "Admin",
	"password": "123456",
	"role": "ADMIN"
}'
```

Agora basta abrir seu browser e navegar para `http://localhost:5000` e realizar login com o email: `admin@gmail.com` e a senha `123456`
