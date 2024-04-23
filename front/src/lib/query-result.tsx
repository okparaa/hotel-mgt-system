import Loading from "./loading";

const QueryResult = (result: any) => {
  return (
    <div className="flex justify-center items-center h-[530px] -ml-[10px]">
      {JSON.stringify(result.error)}
      {result.error && <Loading />}
    </div>
  );
};

export default QueryResult;
