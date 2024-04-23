import { useRef, useState, useEffect, useCallback } from "react";
import { UseQueryArgs, UseQueryResponse, useQuery } from "urql";

export const useLazyQuery: <T>(
  args: Omit<UseQueryArgs, "variables" | "pause">
) => UseQueryResponse<T> = (args) => {
  const firstUpdate = useRef(true);
  const [variables, setVariables] = useState();

  const [result, refetch] = useQuery({
    ...args,
    variables,
    pause: true,
  });

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    refetch();
  }, [variables]);

  const makeRequest = useCallback((reqVariables: any) => {
    setVariables(reqVariables);
  }, []);

  return [result, makeRequest];
};
