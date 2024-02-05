# Culqi Backend

## Descripcion

Reto backend de Culqi. Creacion de token a partir de tarjeta de credito.

## Prerequisito

- Node.js (v14 or later)
- MongoDB (running locally or accessible)

### 1. **Clonar el repositorio:**

   ```bash
   git clone https://github.com/your-username/culqi-backend.git
  ```

### 2. Instalar dependencias

Entrar a la carpeta del proyecto ```cd culqi-backend``` y correr:
```bash
npm install
```

### 3. Conectarse a MongoDB
Crear un archivo ```.env``` y colocar ```URI="mongodb+srv://<USERNAME>:<PASSWORD>@culqi.irspdjt.mongodb.net/?retryWrites=true&w=majority"```
* Recuerda cambiar <USERNAME> por tu usuario de mongoDB y <PASSWORD> por tu contraseña

## Correr servidor

### Correr en ambiente local
```bash
npm start
```
La aplicacion estara corriendo en: ```http://localhost:3456```

### Correr la aplicacion con Swagger
```bash
npm run generate-swagger
```
La aplicacion estara corriendo en: ```http://localhost:3456/api-docs```

## Probar servidor
### 1. Endpoint Create Token
url: ```POST /api/cards/create-token```
input:
```json
{
  "card_number": number,
  "cvv": number,
  "expiration_month": String,
  "expiration_year": String,
  "email": String
}
```
Respuesta: 
```json
{
"token": "generated-token"
}
```

### 2. Get Card Data
url: ```GET /api/cards/get-card-data```
input: Request Header
```json
Authorization: "pk_test_grj1856QLB9gN"
```
Respuesta:
```json
{
  "cardNumber": "136848674242",
  "expirationMonth": "12",
  "expirationYear": "2025",
  "email": "user@example.com"
}
```

## Jest Tests

### Correr pruebas unitarias: 
```bash
npm test
```

### 1 Crear Token (Éxito):
* Descripción: Valida que una solicitud válida con información de tarjeta correcta cree un token exitosamente.
* Entrada: Detalles de tarjeta válidos.
* Resultado Esperado: Estado HTTP 201 y el cuerpo de la respuesta contiene una propiedad "token".

### 2 Formato de Correo Electrónico Inválido:
* Descripción: Asegura que la solicitud falle cuando se proporciona un formato de correo electrónico no válido.
* Entrada: Formato de correo electrónico no válido.
* Resultado Esperado: Estado HTTP 400.

### 3 CVV Inválido (Más de 4 dígitos):
* Descripción: Verifica que la solicitud falle cuando el CVV tiene más de 4 dígitos.
* Entrada: CVV con 6 dígitos.
* Resultado Esperado: Estado HTTP 400.

### 4 CVV Inválido (Menos de 3 dígitos):
* Descripción: Comprueba que la solicitud falle cuando el CVV tiene menos de 3 dígitos.
* Entrada: CVV con 2 dígitos.
* Resultado Esperado: Estado HTTP 400.

### 5 Mes de Vencimiento Inválido (Más de 12):
* Descripción: Prueba que la solicitud falle cuando el mes de vencimiento es mayor que 12.
* Entrada: Mes de vencimiento establecido en "32".
* Resultado Esperado: Estado HTTP 400.

### 6 Mes de Vencimiento Inválido (Menos de 1):
* Descripción: Valida que la solicitud falle cuando el mes de vencimiento es menor que 1.
* Entrada: Mes de vencimiento establecido en "0".
* Resultado Esperado: Estado HTTP 400.

### 7 Año de Vencimiento Inválido (Más de 5 años en el futuro):
* Descripción: Asegura que la solicitud falle cuando el año de vencimiento es más de 5 años en el futuro.
* Entrada: Año de vencimiento establecido en "2060".
* Resultado Esperado: Estado HTTP 400.

### 8 Año de Vencimiento Inválido (Menos que el año actual):
* Descripción: Verifica que la solicitud falle cuando el año de vencimiento está en el pasado.
* Entrada: Año de vencimiento establecido en "2012".
* Resultado Esperado: Estado HTTP 400.

### 9 Número de Tarjeta Inválido:
* Descripción: Verifica que la solicitud falle cuando se proporciona un número de tarjeta no válido.
* Entrada: Número de tarjeta no válido.
* Resultado Esperado: Estado HTTP 400.


## Desplegar backend en AWS Lamda
Url de despliegue ```https://tny49djx1e.execute-api.us-east-1.amazonaws.com/dev```
Si se quiere desplegar en su propia lamda: ```serverless deploy```

## Nota al Final

Por convencion todo el codigo y comentarios dentro del mismo estan en ingles.
