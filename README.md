<p align="center">
  <a href="https://configuradornesher.com"><img src="https://uploads-ssl.webflow.com/6363b36f2772371bf7f4fa81/6363cd1446143a0a78be29b3_logo%20simplexr%201.png" alt="logo da cozinhas nesher" border="0"></a>
  <h1 align='center'>Configurador Nesher - Servidor de Arquivos</h1>
</p>


## Descrição

Microserviço dedicado a atuar como um servidor de arquivos para o configurador nesher, excluindo a necessidade desse de continuar sendo um monólito client-server hospedado em uma máquina EC2, melhorando a escalabilidade, estabilidade e desempenho da aplicação ao separar as duas frentes da aplicação. Utiliza NestJS como framework de API REST, prisma e postgresql para armazenar dados de arquivos da plataforma configurador nesher e o Amazon S3 para armazenar arquivos.

## Instalação de dependências

```bash
$ yarn install
```

## Configuração de Banco de Dados
É necessário a criação de um banco de dados PostgreSQL para que a aplicação seja utilizada corretamente. Ao criá-lo, deve se inserir no arquivo .env ou na configuração de variáveis de ambiente de acordo com o serviço de deploy utilizado, na variável *DATABASE_URL*, a URI de conexão com o banco de dados, seguindo o formato a seguir:
```
DATABASE_URL = postgresql://usuário:senha@servidor:porta/nome_do_banco
```

## Configuração do Prisma ORM
Para configurar nosso Object Relational Mapper, neste projeto o **Prisma** que permitirá que a aplicação envie queries para nosso banco de dados configurarado no passo anterior, deve-se seguir a seguinte sequência de passos:

#### Lançar o esquema de dados no banco
Para que o ORM funcione corretamente e nosso banco seja populado com dados integros, deve-se lançar o esquema do mesmo no banco. Para isso deve-se usar o comando
```
$ yarn prisma migrate deploy
```
esse comando lançará todo o esquema atual de dados no banco, a partir da pasta _./prisma/migrations_ do projeto. Se tudo der certo, uma mensagem confirmado o sucesso da operação
será exibida no terminal.

#### Gerar o Prisma Client
para que a aplicação consiga se comunicar com o banco, é necessário um **Prisma Client** que deve ser recriado a cada mudança no esquema de dados da aplicação e no primeiro deploy. Para isto basta rodar o comando:
```
$ yarn prisma generate
```
se o prisma client for gerado corretamente, uma mensagem confirmando o sucesso da operação será exibida no terminal.

## Variáveis de Ambiente
#### PORT
Variável de ambiente que define a porta a ser usada para lançar o servidor. Se não for populada, a aplicação usará a porta 3000 por padrão. 
Importante: Em serviços como Heroku e Render, a porta é definida automaticamente e a variável não deve ser populada.
```
#exemplo
PORT = 5000
```


#### AWS_ACCESS_KEY_ID
id da chave de acesso do usuário IAM que é autenticado pela biblioteca **@aws-sdk/auth**, permitindo que a aplicação tenha acesso aos buckets s3 da bugaboo studio. dado extremamente sensível.
```
# exemplo
AWS_ACCESS_KEY_ID = 3128736-121387123-121212
```

#### AWS_SECRET_ACCESS_KEY
chave de acesso secreta do usuário IAM que é autenticado pela biblioteca **@aws-sdk/auth**, permitindo que a aplicação tenha acesso aos buckets s3 da bugaboo studio. dado extremamente sensível.
```
# exemplo
AWS_SECRET_ACCESS_KEY = a1e-5rt-675
```

#### AWS_REGION
Região em que está o bucket AWS utilizado pelo servidor de arquivos. Recomenda-se us-east-1 pelos custos reduzidos.
```
# exemplo
AWS_REGION = us-east-1
```

#### S3_BUCKET
Nome do bucket que será acessado pelo @aws-sdk/s3, garantindo um upload e download de arquivos rápido e integro.
```
# exemplo
S3_BUCKET = bucket_exemplo
```

#### BUCKET_URL
url base dos arquivos do bucket da amazon s3, usado para montagem das urls que serão devolvidas e usadas pela api. pode ser montado a partir das variáveis S3_BUCKET e AWS_REGION
```
# exemplo
BUCKET_URL = https://bucket_exemplo.s3.us-east-1.amazonaws.com/ 
ou
BUCKET_URL = https://${S3_BUCKET}.s3.${AWS_REGION}.amazonaws.com/ 
```

## Rodando a aplicação
Depois de todas as configurações acima feitas e das variáveis de ambiente devidamente populadas, é hora de rodar a aplicação localmente ou fazer deploy. Use os comandos abaixo:

```bash
# desenvolvimento
$ yarn run start

# desenvolvimento com atualizações em tempo real e console de debug
$ yarn run start:dev

# produção
$ yarn run start:prod
```
## Migrações
Ao fazer alguma alteração no esquema de dados , modificando o arquivo _schema.prisma_, as alterações só serão refletidas no banco de dados se uma **migração** for feita, que informa ao postgresql através de uma query SQL gerada automaticamente pelo **Prisma** quais alterações devem ser feitas nas tabelas e colunas. Os comandos de migração em geral começam com: 
```bash
$ yarn prisma migrate
```
Sua utilização e argumentos mudam de acordo com o contexto em que a migração está sendo feita ou implantada.

### IMPORTANTE!
Migrações são operações extremamente delicadas e com potencial para causar perca em massa de dados ou impedir que a aplicação seja implantada corretamente. E de suma importancia que o desenvolvedor mais senior da equipe seja responsável por manter a integridade das migrações, revisando e implantando todas e impedindo que migrações falhas cheguem no banco de dados de produção.

### Criar migrações em ambientes de desenvolvimento
Quando um desenvolvedor faz alterações no esquema de dados dentro do seu ambiente de desenvolvimento local, ele deve usar o seguinte comando:
```bash
$ yarn prisma migrate dev -m "descritivo_da_migração
```
Dessa forma, uma migração será criada e aplicada no banco de dados local da sua máquina. A migração ficará na pasta _./prisma/migrations_, em uma subpasta nomeada de acordo com o descritivo da migração.

Essa operação só deve ser usada para criar as migrações e implantar elas pela primeira vez.

Esse comando precisa criar um _shadow database_ para que possa criar e implantar a migração e portanto é inadequado para o uso em servidores na nuvem como Heroku Postgres e Amazon RDS. Sempre crie e teste suas migrações em um banco local com permissões completas e apenas implante as migrações nos bancos em nuvem.

<a href="https://www.prisma.io/docs/orm/prisma-migrate/understanding-prisma-migrate/shadow-database">_leia sobre shadow databases na documentação do prisma_</a>


### Implantar migrações
Quando um desenvolvedor precisa implantar uma série de migrações já criadas em seu banco local, ou nos bancos na nuvem de stage e produção, ele deve usar o comando:
```bash
$ yarn prisma migrate deploy
```
esse comando implantará todas as migrações da pasta migrations em um banco de dados. É a forma mais adequada e a boa prática para inserir mudanças nos bancos de dado de produção e em nuvem, mas necessita que as migrações já tenham sido criadas e existam na pasta _./prisma/migrations_.

Após a implantação das migrações, sempre gere novamente o cliente prisma com:
```bash
$ yarn prisma generate
```

### Ambientes não ideais
caso o desenvolvimento de novas features que exijam mudança no esquema de dados necessitem ser desenvolvidas em condições não ideais de permissão do banco de dados, e as migrações não possam ser criadas através do comando _"yarn prisma migrate dev"_ para serem implantadas posteriormente, deve-se usar o comando
```bash
$ yarn prisma db_push
```
esse comando lançará o esquema de dados de forma forçada em qualquer banco, mas é uma prática não ideal, pois não gera migrações que podem ser rastreadas e versionadas pela gestão de projeto e liderança técnica, criando alterações sem rastro. Deve ser usado apenas em último caso.

### Rebasing
Em alguns casos, devido a uma má gestão das migrações, pode acontecer uma desincronização das migrações do banco de dados local e em nuvem, impedindo que novas migrações sejam criadas e implantadas. Infelizmente, a unica forma de corrigir esse problema é através do **rebase**, que perderá todas as migrações feitas até então.

Para começar o processo de rebasing é necessário deletar todas as migrações criadas até então. Depois, rodar o comando:

```bash
$ npx prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma --script > prisma/migrations/0_init/migration.sql
```
isso criará uma migração zero, que será considerada a inicial para todos os efeitos.

agora, para implantá-la, rode o comando:

```bash
$ npx prisma migrate resolve --applied 0_init
```
As migrações serão resetadas e o esquema estará sincronizado e integro novamente. Não há risco de perca de dados, mas todas as migrações anteriores serão perdidas, levando a um prejuizo de gestão de projeto e rastreabilidade de mudanças no banco de dados.

### a tabela _migrations_
O prisma cria no banco de dados uma tabela chamada _migrations_, onde armazena todas as migrações feitas. O ORM usa as informações dessa tabela para aplicar suas migrações. Alguns erros menores, como tentar criar um novo campo obrigatório em uma tabela populada sem definir um valor padrão, podem impedir que a migração seja completa, deixando a aplicação desincronizada e seu deploy e funcionamento prejudicado. Para tirar essas migrações da fila, e lançar uma nova corrigida, basta deletar a coluna criada para essa migração na tabela _migrations_ e lançar uma nova corrigindo a questão. A migração não integra será ignorada, o que fará com as migrações corretas voltem a ser aplicadas e a aplicação possa ser sincronizada novamente.


### geração de client e deploy de migrações automatico em produção
Caso uma aplicação esteja em ciclo de desenvolvimento ativo, ainda recebendo features com mudanças de dados frequentemente, mas já esteja em produção, o ideal é que a implantação das migrações e geração do cliente prisma sejam feitos de forma automática. Para isso, no package.json da aplicação, mude o script de lançamento em produção de 
```bash
$ yarn start:prod
```
para
```bash
$ yarn prisma migrate deploy && yarn prisma generate && yarn start:prod 
```
esses comandos juntos garantirão que todas as migrações na fila sejam aplicadas, o cliente prisma seja gerado, e só então a aplicação implantada. 
É importante que quando a aplicação alcançar um estágio de apenas manutenção, o comando de implantação em produção seja retornado para seu valor original, resultado em uma execução mais rápida.


## Documentação da API
A documentação desta API foi criada usando a bibliteca @nest/swagger, respeitando os padrões openAPI 3.0.

Para ler a documentação, basta rodar a aplicação e acessar o caminho
https://url-da-api/swagger
ou
http://localhost:PORT/swagger

## Créditos
Desenvolvido por:

**David Facó** - Desenvolvedor Back End pleno

**Bruno Bastos** - Desenvolvedor Fullstack pleno
