<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Base de Datos

- Nombre: njs_challenge_db
- Tipo: MySQL
- Host: localhost
- Puerto: 3306
- Username: root
- Contraseña: "" (ninguna)

**Nota:** La base de datos debe crearse y TypeORM se encargará de crear y actualizar la tabla.

# Endpoints

Todos los endpoints se definen a partir de la ruta http://localhost:3000.

## POST /productos

Tipo de objeto esperado:

- Nombre del producto: cadena de al menos 4 caracteres, máximo 150 (debe ser único en la base de datos).
- Precio del producto: número entero positivo.
- Descripción: cadena de al menos 8 caracteres, máximo 255.

Los campos no son opcionales, son obligatorios. Ejemplo de solicitud:

```json
{
  "nombre": "Nombre del producto",
  "precio": 999,
  "descripcion": "Esta es una buena descripción"
}
GET /productos
Parámetros opcionales para paginación. Ejemplo de URL: /productos?page=1&limit=2. Ambos page y limit deben establecerse como números enteros para funcionar. Si se usa solo /productos, se devolverán todos los objetos almacenados en la base de datos.

GET /productos/:id
Parámetro obligatorio: id. Retorna el objeto especificado si existe, de lo contrario, devuelve una excepción HTTP.

PUT /productos/:id
Parámetros opcionales: Se pueden omitir cualquier campo, pero al menos uno debe enviarse o se generará una excepción de solicitud incorrecta. El nombre no debe existir en la base de datos, ya que debe ser único (a menos que sea el mismo nombre antes de la operación).

{
  "nombre": "Nombre del producto",
  "precio": 999,
  "descripcion": "Esta es una buena descripción"
}


DELETE /productos/:id
El id no es opcional. Este endpoint se encarga de eliminar la tupla con el id especificado de la base de datos. Si no se envía un id válido, se generará una excepción.

Readme emprolijado utilizando chatGPT.