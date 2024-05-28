import { StaffBody } from "./staff/staff-body";
import { Table } from "../../lib/table";
import { Search } from "../../lib/search";
import { useChest } from "../../app-chest";
import { useSalaryMutation, useUsersQuery } from "../aio-urql";
import QueryResult from "../../lib/query-result";

const Staff = () => {
  const {
    data: { search },
  } = useChest();

  const [{}, salary] = useSalaryMutation();

  const [usersRes] = useUsersQuery();

  if (usersRes.error || usersRes.fetching) {
    return <QueryResult response={usersRes} />;
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

  const tBody = <StaffBody searchItems={searchUsers} editItem={salary} />;

  return (
    <>
      <div className="my-2 mr-2 overflow-x-auto">
        <Table
          Search={<Search hasBtn={false} />}
          tHead={tHead}
          tBody={tBody}
          fetching={usersRes.fetching}
        />
      </div>
    </>
  );
};

export default Staff;
