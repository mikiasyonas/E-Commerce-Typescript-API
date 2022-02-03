import fastify from 'fastify'
import * as dotenv from 'dotenv'
import pino from 'pino'
import { PrismaClient } from '@prisma/client'
import { UserAttribute, UserParamAttribute, UserActivateAttribute, UserPassResetAttribute } from './config/userModel'
import { PreferenceAttribute } from './config/preferenceModel'
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

    return successResponse(rep, 'Successfully registered user', result);
  } catch(err:any) {
    req.log.error(err);
    return errorResponse(rep);
  }
})



// Activate account
server.put<
  {
    Params: UserParamAttribute,
    Body: UserActivateAttribute
  }
  >('/user/activate/:id', {}, async (req, rep) => {
  try {
    const id = req.params.id;
    const { confirmationCode } = req.body;
    const user = await prisma.user.findFirst({
      where: { id: Number(id) }
    });

    if(user) {
      if(user.confirmationCode != confirmationCode) {
        return errorResponse(rep, STATUS_CODE.BAD_REQUEST, 'Incorrect Confirmation Code Entered');
      }

      const updatedUser = await prisma.user.update({
        where: { id: Number(id) },
        data: { activated: true }
      });
      
      return successResponse(rep, "User account activated successfully!");
    } else {
      return errorResponse(rep);
    }
  } catch(err) {
    req.log.error(err);
    return errorResponse(rep);
  }
})

// Request Password Reset
server.put<
  {
    Params: UserPassResetAttribute,
  }
>('/user/request-password-reset/:email', {}, async(req, rep) => {
  try {
    const email = req.params.email;
    const code = generateConfirmationCode();

    const updatedUser = await prisma.user.update({
      where: { email: email },
      data: { passwordResetCode: code }
    });

    // send the password reset code to email

    return successResponse(rep, 'Password reset confirmation sent!');
  } catch(err) {
    req.log.error(err);
    return errorResponse(rep);
  }
})

// Reset Password
server.put<
{
  Params: UserPassResetAttribute,
  Body: UserPassResetAttribute
}>('/user/reset-password/:email', {}, async (req, rep) => {
  try {
    const email = req.params.email;
    const code = req.body.passwordResetCode;
    const password = req.body.password;

    const user = await prisma.user.findFirst({
      where: { email: email }
    });

    const hashedPassword = await hashText(password);
    if(user) {
      if(user.passwordResetCode != code) {
        return errorResponse(rep, STATUS_CODE.BAD_REQUEST, 'Incorrect confirmation code entered!');
      }

      const updatedUser = await prisma.user.update({
        where: { email: email },
        data: { password: hashedPassword}
      });

      return successResponse(rep, 'Password changed successfully');
    } else {
      console.log('err')
      return errorResponse(rep);
    }
  } catch(err) {
    req.log.error(err);
    return errorResponse(rep);
  }
});

// Add user preference
server.post<{
  Body: PreferenceAttribute
}>('/user-preference', {}, async(req, rep) => {
  try {
    const userId = req.body.userId;
    const preferenceId = req.body.preferenceId;
  
    const userPreference = await prisma.usersPreferences.create({
      data: {
        userId: userId,
        preferenceId: preferenceId,
      }
    });
  
    return successResponse(rep, 'Successfully created user preference', userPreference);
  } catch(err) {
    return errorResponse(rep);
  }
});

// Add preference
server.post<{
  Body: PreferenceAttribute
}>('/preference', {}, async(req, rep) => {
  try {
    const name = req.body.name;

    const preference = await prisma.preference.create({
      data: {
        name: name
      }
    });

    return successResponse(rep, 'Successfully created a preference', preference);
  } catch(err) {
    return errorResponse(err);
  }
});

// User info
server.get<{
  Params: UserParamAttribute
}>('/user-info/:id', {}, async(req, rep) => {
  try {
    const id = req.params.id;
    const user = await prisma.user.findFirst({
      where: { id: Number(id) },
      include: { preferences:true }
    });
    return successResponse(rep, 'User information', user);
  } catch(err) {
    return errorResponse(rep);
  }
});

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

