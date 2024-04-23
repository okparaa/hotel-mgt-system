import { TStaffBody } from "./partials/t-staff-body";
import { Table } from "../../lib/table";
import { Search } from "../../lib/search";
import { useChest } from "../../state-mgr/app-chest";
import { useSalaryMutation, useUsersQuery } from "../aio-urql";
import QueryResult from "../../lib/query-result";

const Staff = () => {
  const {
    data: { search },
  } = useChest();

  const [{}, salary] = useSalaryMutation();

  const [usersRes] = useUsersQuery();

  if (usersRes.error || usersRes.fetching) {
    return <QueryResult result={usersRes} />;
  }

  const tHead = (
    <tr>
      <th className="w-44">name</th>
      <th className="w-44 hidden lg:table-cell">Phone</th>
      <th className="hidden xl:table-cell">email</th>
      <th className="w-44 text-base">Salary</th>
      <th className="w-32">Section</th>
    </tr>
  );

  const searchUsers = usersRes.data?.users?.filter((user) => {
    const str = (user && Object.values(user).join(" ").toLowerCase()) || "";
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
          fetching={usersRes.fetching}
        />
      </div>
    </>
  );
};

export default Staff;
