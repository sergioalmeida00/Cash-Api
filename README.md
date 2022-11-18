# Cash API

## 🔥 Tecnologias

- NodeJs (16)
- Prisma
- Express
- Jsonwebtoken
- Bcryptjs
- Jest - (Teste Unitario)

## 🚀 ****Start****

1. [`https://github.com/sergioalmeida00/Cash-Api.git`](https://github.com/sergioalmeida00/Cash-Api.git)
2. Alterar o `.ENV.EXAMPLE` para `.ENV` e substituir as informações pela credenciais do devido banco
    1. `POSTGRES_USER`
    2. `POSTGRES_PASSWORD`
    3. `POSTGRES_PORT`
    4. `POSTGRES_DB`
3. Adicionar a informação `SECRET` no `.ENV`
4. Rodar o comando `yarn`
5. `yarn prisma migrate dev`
6. `yarn prisma db seed`
7. Start Aplicação `yarn dev`
8. Test Unitarios `yarn test`

## **Rotas**

- Rotas da aplicação
    - `POST - http://localhost:3131/user/create`
        - A rota recebe `username` e `password` dentro do corpo da requisição, salva o usuário e cria uma determinada conta com o saldo de 100, retornando statusCode 201.
        
        ```json
        //SEND EXAMPLE
        {
        	"username":"johndoe",
        	"password":"Abc12345"
        }
        ```
        
    
    - `POST - http://localhost:3131/auth/user`
        - A rota recebe `username` e `password` no corpo da requisição e retorna os dados do usuário autenticado junto à um token JWT.
        
        ```tsx
        //SEND EXAMPLE
        {
        	"username":"johndoe",
        	"password":"Abc12345"
        }
        ```
        
        ```json
        //RETURN EXAMPLE
        {
        	"user": {
        		"id": "556e4f56-d140-4fbe-bd5d-9deeaafbe730",
        		"username": "johndoe"
        	},
        	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFtYW5kYSIsImFjY291bnRfaWQiOiI1NmY3YzgyZS00YzZiLTQzNjQtYWNkMC05MjUzMjg3N2EwODUiLCJpYXQiOjE2Njg3MzIxODgsImV4cCI6MTY2ODgxODU4OCwic3ViIjoiNTU2ZTRmNTYtZDE0MC00ZmJlLWJkNWQtOWRlZWFhZmJlNzMwIn0.4CEEeeMoAEHSuHZexD4r0Rpc8PwLucliAFHMTXxu8z8"
        }
        ```
        
    
    - `POST - http://localhost:3131/transaction/create`
        - A rota recebe um token JWT pelo header, junto com a informação do  `username` destino e o valor da transferência `amount` no corpo da requisição, registra a operação diminuindo o saldo da conta do usuário logado que realizou a transferência e adicionar o valor na conta do usuário destino retorna as informações da transferência criado com status `201`.
        
        ```json
        //SEND EXAMPLE
        {
        	"username":"userdestino",
        	"amount":40
        }
        ```
        
        ```json
        //RETURN EXAMPLE
        {
        	"id": "d5231275-9e1d-4838-8ad6-d868ceb7a9c5",
        	"value": 140,
        	"created_at": "2022-11-18T00:43:50.830Z",
        	"credited_account_id": "e0df4083-a6b0-430f-b7a4-a5b5e7a6dd6e",
        	"debited_account_id": "56f7c82e-4c6b-4364-acd0-92532877a085"
        }
        ```
        
    - `GET - [http://localhost:3131/account/balance](http://localhost:3131/account/balance)`
        - A rota recebe um token JWT pelo header da requisição e retorna o saldo total pertinente ao usuário do TOKEN propriedade `balance`.
        
        ```json
        //RETURN EXAMPLE
        {
        	"id": "e0df4083-a6b0-430f-b7a4-a5b5e7a6dd6e",
        	"balance": 60
        }
        ```
        
    - `GET - [http://localhost:3131/transaction/period/list](http://localhost:3131/transaction/period/list)`
        - A rota recebe um TOKEN JWT pelo header, e no body a informação do período que deseja fazer a busca `dateStart` e `dateEnd` , assim retornando uma lista com todas as operações *cash-out ou*  *cash-in* pertinente ao usuário do TOKEN no determinado período informado.
        
        ```json
        //SEND EXAMPLE
        {
        	"dateStart":"2022-11-01",
        	"dateEnd":"2022-11-17"
        }
        ```
        
        ```json
        //RETURN EXAMPLE
        [
        	{
        		"type_transaction": "DEBIT",
        		"id": "4493dea4-61c4-45ab-b0b5-1da3a304a205",
        		"value": 40,
        		"credited_account_id": "56f7c82e-4c6b-4364-acd0-92532877a085",
        		"debited_account_id": "e0df4083-a6b0-430f-b7a4-a5b5e7a6dd6e",
        		"username": "userdestino"
        	},
        	{
        		"type_transaction": "CREDIT",
        		"id": "901afc7f-41dc-4078-bc8e-c7e64c12d841",
        		"value": 10,
        		"credited_account_id": "56f7c82e-4c6b-4364-acd0-92532877a085",
        		"debited_account_id": "e0df4083-a6b0-430f-b7a4-a5b5e7a6dd6e",
        		"username": "johndoe"
        	}
        ]
        ```
        
    - `GET - [http://localhost:3131/transaction/list](http://localhost:3131/transaction/list)`
        - A rota recebe um TOKEN JWT pelo header, assim retornando uma lista com todas as operações realizadas apenas pelo usuário do TOKEN.
        
        ```json
        //RETURN EXAMPLE
        [
        	{
        		"id": "4493dea4-61c4-45ab-b0b5-1da3a304a205",
        		"value": 40,
        		"created_at": "2022-11-16T08:31:05.905Z",
        		"credited_account_id": "56f7c82e-4c6b-4364-acd0-92532877a085",
        		"debited_account_id": "e0df4083-a6b0-430f-b7a4-a5b5e7a6dd6e",
        		"AccountDebited": {
        			"User": {
        				"username": "johndoe"
        			}
        		},
        		"AccountCredited": {
        			"User": {
        				"username": "userdestino"
        			}
        		}
        	}
        ]
        ```