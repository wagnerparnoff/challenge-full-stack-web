## Para execução do projeto - ✨✨

BackEnd - Entre nas pastas backend/src e execute o comando node index.js

```sh
cd backend/src
npm i
node index.js
```

FrontEnd - entre na pasta frontend e execute npm run dev

```sh
cd frontend
npm i
npm run dev
```


### Decisão da arquitetura utilizada
MSC - MODEL SERVICE CONTROLLER

Além de ser uma arquitetura bastante comum e utilizada em APIs, também consigo abstrair as diferentes camadas (preocupações) dentro da minha aplicação
Sendo que o model contém a estrutura de dados, Service contém a lógica de negócios e as os operações sobre esses dados quem faz é o Controller.

Outra vantagem também é separar a lógica para fazer reutilização de código.

Testabilidade: Com a separação clara entre modelo, serviço e controlador, é mais fácil testar cada componente isoladamente. Facilita a escrita de testes unitários e de integração, o que contribui para a qualidade do software.

Escalabilidade: Ao organizar o código em camadas distintas, é mais fácil escalar partes específicas do seu aplicativo conforme necessário. Por exemplo, você pode escalar horizontalmente o serviço responsável por lidar com requisições de alto tráfego sem afetar outras partes do sistema.

Manutenção: A separação de responsabilidades torna o código mais fácil de entender e dar manutenção. Quando você precisa fazer alterações em uma parte específica do seu aplicativo, pode fazê-lo sem afetar outras partes do sistema.

### Lista de bibliotecas de terceiros utilizadas
"bcryptjs": "^2.4.3",
"cors": "^2.8.5",
"express": "^4.18.3",
"express-validator": "^7.0.1",
"jsonwebtoken": "^9.0.2",
"mysql": "^2.18.1",
"mysql2": "^3.9.2",
"nodemon": "^3.1.0",
"sequelize": "^6.37.1"

### O que você melhoraria se tivesse mais tempo
Criaria mais divisão das funções para ter mais reusabilidade.
Colocaria uma documentação mais completa através do swagger.
Melhoraria as validações também separando por classes de uso.

### Quais requisitos obrigatórios que não foram entregues
Todos foram entregues