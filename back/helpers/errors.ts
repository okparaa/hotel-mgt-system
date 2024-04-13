import { ApolloServerErrorCode } from "@apollo/server/errors";
import { GraphQLError } from "graphql";

export type ErrorType = {
  errorCode: ApolloServerErrorCode | string;
  errorStatus: number;
};

export const ErrorTypes = {
  BAD_USER_INPUT: {
    errorCode: ApolloServerErrorCode.BAD_USER_INPUT,
    errorStatus: 400,
  },
  BAD_REQUEST: {
    errorCode: ApolloServerErrorCode.BAD_REQUEST,
    errorStatus: 400,
  },
  NOT_FOUND: {
    errorCode: "NOT_FOUND",
    errorStatus: 404,
  },
  UNAUTHENTICATED: {
    errorCode: "UNAUTHENTICATED",
    errorStatus: 401,
  },
  ALREADY_EXISTS: {
    errorCode: "ALREADY_EXISTS",
    errorStatus: 400,
  },
  DATABASE_UPDATE_ERROR: {
    errorCode: "DATABASE_UPDATE_ERROR",
    errorStatus: 400,
  },
  INTERNAL_SERVER_ERROR: {
    errorCode: ApolloServerErrorCode.INTERNAL_SERVER_ERROR,
    errorStatus: 500,
  },
};

export const getErrors = (inner: any) => {
  const map = new Map();
  return inner.map((err: any) => {
    if (map.has(err.path)) {
      return false;
    }
    const error = [err.path, err.message];
    map.set(err.path, 1);
    return error;
  });
};

const throwError = (errorMessage: string, errorType: ErrorType, info: any) => {
  throw new GraphQLError(errorMessage, {
    extensions: {
      code: errorType.errorCode,
      info,
    },
  });
};
export default throwError;
