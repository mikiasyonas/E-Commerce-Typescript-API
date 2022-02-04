# Ecommerce API build with typescript fastify posgresql database backed with prisma ORM

The entire application is contained within the `index.ts` file.

## Install

    npm install

## Build the app

    npm run build

## Run the server

    npm run start:dev

    or

    npm run start:prod

# REST API

The REST API to the example app is described below.

## Get list of Things

### Request

`GET /`

    curl -i -H 'Accept: application/json' http://localhost:3000/

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: text/html
    Content-Length: 2

    get request

## User Registration

### Request

`POST /user/`

    curl -i -H 'Accept: application/json' -d http://localhost:3000/user

### Response

    HTTP/1.1 201 Created
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 201 Created
    Connection: close
    Content-Type: application/json
    Location: /thing/1
    Content-Length: 36

    {
      "success": true,
      "message": "Successfully registered user",
      "data": {
          "id": 7,
          "fullName": "sample2",
          "email": "sample2@email.com",
          "password": "$2b$10$hvj77cO4QhTOQxU/r6ryZ.Wr4VGlLoBxTAKbVbXG/K.maZkJ9kUP2",
          "activated": false,
          "confirmationCode": "657382",
          "passwordResetCode": null,
          "role": "user",
          "dob": "1998-12-02T21:00:00.000Z"
      }
    }

## User account activation

### Request

`PU /user/activate/id`

    curl -i -H 'Accept: application/json' http://localhost:3000/user/activate/2

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 36

    {
      "success": true,
      "message": "User account activated successfully!",
      "data": {}
    }

## Request password reset

### Request

`PUT /user/request-password-reset/email`

    curl -i -H 'Accept: application/json' localhost:3000/user/request-password-reset/sample@email.com

### Response

    HTTP/1.1 200
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 35

    {
      "success": true,
      "message": "Password reset confirmation sent!",
      "data": {}
    }

## Reset password

### Request

`PUT /reset-password/sample@email.com/`

    curl -i -H 'Accept: application/json' -d 'localhost:3000/user/reset-password/sample@email.com

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:31 GMT
    Status: 201 OK
    Content-Type: application/json
    Content-Length: 35

    {
      "success": true,
      "message": "Password changed successfully",
      "data": {}
    }

