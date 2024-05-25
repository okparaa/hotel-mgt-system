import {
  CombinedError,
  Operation,
  OperationResult,
  TypedDocumentNode,
  gql,
} from "@urql/preact";
import { jwtDecode } from "jwt-decode";

const REFRESH_TOKEN_MUTATION = gql`
  mutation RefreshCredentials($user: UserTokenInput!) {
    refreshToken(user: $user) {
      id
      token
    }
  }
`;

export let initialized = new Date().getTime();

const TOKEN_KEY = "token";
const REFRESH_TOKEN_KEY = "rtoken";

export interface AuthState {
  token: string;
  refreshToken: string;
}

export const saveAuthState = ({ token, refreshToken }: AuthState) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
};

export const getToken = () => {
  if (typeof window === "undefined") return;
  return localStorage.getItem(TOKEN_KEY);
};

export const getRefreshToken = () => {
  if (typeof window === "undefined") return;
  return localStorage.getItem(REFRESH_TOKEN_KEY);
};

export const clearAuthState = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

type RefreshCredentialsInput = {
  refreshToken: string;
};

type GetAuthInput = {
  authState: AuthState;
  mutate<AuthState, Variables = RefreshCredentialsInput>(
    query: TypedDocumentNode<AuthState, Variables>,
    variables: Variables
  ): Promise<OperationResult<AuthState, {}>>;
};

export async function getAuth({ authState, mutate }: GetAuthInput) {
  if (!authState) {
    const token = getToken();
    const refreshToken = getRefreshToken();

    if (token && refreshToken) {
      return { token, refreshToken };
    }

    return null;
  }

  const result = await mutate(REFRESH_TOKEN_MUTATION, {
    refreshToken: authState.refreshToken,
  });

  if (result.data?.refreshCredentials) {
    saveAuthState(result.data.refreshCredentials);

    initialized = new Date().getTime();
    return result.data.refreshCredentials;
  }

  // This is where auth has gone wrong and we need to clean up and redirect to a login page
  clearAuthState();
  window.location.reload();

  return null;
}

export async function refreshAuth() {}

type DidAuthErrorInput = {
  error: CombinedError;
  authState: AuthState | null;
};

export function didAuthError({ error }: DidAuthErrorInput) {
  return error.graphQLErrors.some((e) => e.extensions?.code === "UNAUTHORIZED");
}

type WillAuthErrorInput = {
  operation: Operation<any, any>;
  authState: AuthState | null;
};

export function willAuthError({ operation, authState }: WillAuthErrorInput) {
  if (!authState) {
    return !(
      operation.kind === "mutation" &&
      operation.query.definitions.some((definition) => {
        return (
          definition.kind === "OperationDefinition" &&
          definition.selectionSet.selections.some((node) => {
            return (
              node.kind === "Field" &&
              (node.name.value === "login" || node.name.value === "register")
            );
          })
        );
      })
    );
  } else {
    const decoded = jwtDecode<{ exp: number }>(getToken() as string);
    const isExpiring = decoded.exp * 1000 - new Date().getTime() <= 5000;
    return operation.kind === "query" && isExpiring;
  }
}
