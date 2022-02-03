import fastify from 'fastify'
import * as dotenv from 'dotenv'
import pino from 'pino'
import { PrismaClient } from '@prisma/client'
import { UserAttribute } from './config/userModel'
import {hashText} from './utils/hashGenerator'
import { successResponse, errorResponse } from './utils/responses'
import { STATUS_CODE } from './helpers/contants'
import { generateConfirmationCode } from './utils/confirmationCodeGenerator'

dotenv.config();
const server = fastify({
  logger: pino({
    level: 'info',
  })
});

const prisma = new PrismaClient();
const Port = 


server.get('/', async (req, rep) => {
  return 'get request';
});

// Regisgter user
server.post<{Body: UserAttribute}>('/user', {}, async (req, rep) => {
  try {
    const { fullName, email, password, dob } = req.body;

    // hash Password
    const hashedPassword = await hashText(password);

    const dateOfB = new Date(dob);
    const confirmationCode = generateConfirmationCode();

    const result = await prisma.user.create({
      data: {
        fullName: fullName,
        email: email,
        dob: dateOfB,
        password: hashedPassword,
        confirmationCode: confirmationCode
      }
    });

    return successResponse(rep, result, 'Successfully registered user');
  } catch(err:any) {
    req.log.error(err);
    return errorResponse(rep);
  }
})



// Activate account
server.put('/user/activate', async (req, rep) => {
  try {

  } catch(err) {
    req.log.error(err);
    return errorResponse(rep);
  }
})

// Reset Password

// const PORT = process.env.APP_PORT;

const start = async(port:number) => {
  try {
    await server.listen(port)
  }
  catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

// server.listen(PORT, (err, address) => {
//   if(err) {
//     console.log(err);
//     process.exit(1);
//   }
//   console.log(`Server started at ${address}`);
// });

start(3000);

