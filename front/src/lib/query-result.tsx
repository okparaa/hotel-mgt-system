import { UseQueryState } from "urql";
import { Exact } from "../components/aio-urql";

type QueryResultProps = {
  response: UseQueryState<
    any,
    Exact<{
      [key: string]: any;
    }>
  >;
};
const QueryResult = ({ response }: QueryResultProps) => {
  return (
    <div className="flex justify-center items-center h-[400px] mr-16">
      {response.error && JSON.stringify(response.error)}
      {response.fetching && (
        <svg
          width="50"
          height="50"
          viewBox="0 0 24 24"
          fill="#e879f9"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            class="loading"
            d="M12,23a9.63,9.63,0,0,1-8-9.5,9.51,9.51,0,0,1,6.79-9.1A1.66,1.66,0,0,0,12,2.81h0a1.67,1.67,0,0,0-1.94-1.64A11,11,0,0,0,12,23Z"
          />
        </svg>
      )}
    </div>
  );
};

export default QueryResult;
