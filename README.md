# HarryPotter App (Expo)

Aplicativo mobile/web com tema Harry Potter, autenticação com Firebase, navegação por abas e consumo de API externa para livros, personagens, feitiços e casas.

## Analise tecnica do projeto

### Stack principal

- Expo SDK 55 (`expo` ~55.0.25)
- React 19 + React Native 0.83
- Expo Router (roteamento baseado em arquivos)
- TypeScript em modo `strict`
- React Native Paper (tema e componentes de UI)
- Firebase Auth (login/cadastro)
- AsyncStorage (sessao, favoritos e cache da API)

### Arquitetura (resumo)

- `src/app`: rotas e layouts do Expo Router
- `src/app/(auth)`: telas de login e cadastro
- `src/app/(tabs)`: abas principais (Home, Explorador, Configuracoes)
- `src/contexts/auth-context.tsx`: estado de autenticacao e sessao
- `src/contexts/harry-api-contexto.tsx`: consumo e cache da API Harry Potter
- `src/contexts/favorites-context.tsx`: persistencia de favoritos
- `src/firebase.ts`: inicializacao do Firebase com variaveis `EXPO_PUBLIC_*`

### Dependencias externas e conectividade

- Firebase Authentication
- API publica: `https://potterapi-fedeperin.vercel.app/pt`
- O app precisa de internet para login/cadastro e para primeira carga dos dados da API.

## Requisitos tecnicos

### Ambiente local

- Node.js LTS (recomendado: 20+)
- npm (lockfile ja incluso no projeto)
- Expo CLI via `npx`

### Para executar em dispositivos/emuladores

- Android Studio (emulador Android)
- Xcode (simulador iOS, somente macOS)
- Expo Go (opcional, para testes rapidos)

### Configuracao obrigatoria

Este projeto depende de variaveis de ambiente para o Firebase.

1. Crie um arquivo `.env` na raiz do projeto com base em `.env.exemplo`.
2. Preencha os valores reais do seu projeto Firebase.

Exemplo de variaveis esperadas:

```env
EXPO_PUBLIC_FIREBASE_API_KEY=...
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=...
EXPO_PUBLIC_FIREBASE_DATABASE_URL=...
EXPO_PUBLIC_FIREBASE_PROJECT_ID=...
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=...
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
EXPO_PUBLIC_FIREBASE_APP_ID=...
EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID=...
```

Observacao: `app.json` referencia `./google-services.json` em `android.googleServicesFile`. Esse arquivo e necessario para builds Android nativas (prebuild/dev build/release).

## Como iniciar o projeto

1. Instale as dependencias:

```bash
npm install
```

2. Crie e configure o `.env` (a partir de `.env.exemplo`).

3. Inicie o servidor de desenvolvimento:

```bash
npm run start
```

4. Execute no alvo desejado:

```bash
npm run android
npm run ios
npm run web
```

## Scripts disponiveis

- `npm run start`: inicia o Expo
- `npm run android`: abre no Android
- `npm run ios`: abre no iOS
- `npm run web`: abre no navegador
- `npm run lint`: executa lint com Expo/ESLint
- `npm run reset-project`: script utilitario para resetar estrutura de `src/app`

## Notas de desenvolvimento

- O roteamento inicial e controlado por sessao no layout raiz (`src/app/_layout.tsx`).
- Sessao e favoritos sao persistidos no AsyncStorage.
- Dados da API sao cacheados localmente apos a primeira carga.

## Documentacao recomendada

Como o projeto esta no Expo SDK 55, prefira a documentacao versionada:

- https://docs.expo.dev/versions/v55.0.0/
