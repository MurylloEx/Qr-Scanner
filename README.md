# Qr-Scanner-Service

### 1. Como gerar a biblioteca:

```
ng new projeto-angular --create-application=false && cd projeto-angular
ng g library nome-biblioteca
```

### 2. Compilando a biblioteca:

```
ng build nome-biblioteca --prod
ng lint nome-biblioteca
```

### 3. Liberando biblioteca pro NPM:

```
npm publish @rebase-team/nome-biblioteca --access public
```

### 4. Instalando a biblioteca:

```
npm install --save @rebase-team/nome-biblioteca
```
