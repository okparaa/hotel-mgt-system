import { useMutation, useQuery } from "@apollo/client";
import { GET_USERS, SALARY } from "../queries/users-queries";
import { SEARCH } from "../queries/locals";
import { TStaffBody } from "./partials/t-staff-body";
import { Table } from "../../lib/table";
import { Search } from "../../lib/search";
import Loading from "../../lib/loading";

const Staff = () => {
  const {
    data: { search },
  } = useQuery(SEARCH);

  const [salary] = useMutation(SALARY, {
    update: (cache, { data }) => {
      cache.updateQuery({ query: GET_USERS }, ({ users }: any) => ({
        users: users.map((user: any) => {
          if (user.id === data?.salary?.id)
            return { ...user, salary: data?.salary?.salary };
          return user;
        }),
      }));
    },
  });

  const { data, loading } = useQuery(GET_USERS);
  if (loading || !data) return <Loading />;

  const { users } = data;

  const tHead = (
    <tr>
      <th className="w-44">name</th>
      <th className="w-44 hidden lg:table-cell">Phone</th>
      <th className="hidden xl:table-cell">email</th>
      <th className="w-44 text-base">Salary</th>
      <th className="w-32">Section</th>
    </tr>
  );

  const searchUsers = users?.filter((user: any) => {
    const str = Object.values(user).join(" ").toLowerCase();
    const searche = search || "";
    return str.includes(searche.toLowerCase());
  });

  const tBody = <TStaffBody searchItems={searchUsers} editItem={salary} />;

  return (
    <>
      <div className="my-2 mr-2 overflow-x-auto">
        <Table
          Searche={<Search hasBtn={false} />}
          tHead={tHead}
          tBody={tBody}
          loading={loading}
        />
      </div>
    </>
  );
};

export default Staff;
