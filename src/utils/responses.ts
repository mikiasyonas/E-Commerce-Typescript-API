import { STATUS_CODE } from "../helpers/contants"

export function successResponse (rep:any, payload:any, message:string) {
  const response = {
    success: true,
    message: message,
    data: payload,
  }
  rep.code(STATUS_CODE.OK).send(response);
}

export function errorResponse(rep:any, code:number = STATUS_CODE.INTERNAL_SERVER, message:string = "Internal Server Error!") {
  const response = {
    success: false,
    message: message,
  }
  rep.code(code).send(response);
}