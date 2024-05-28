import jsonfile from "jsonfile";
import path from "path";
const file = path.join(__dirname, "tables.json");

const shuffle = (str: string, minLen: number, maxLen: number) => {
  const len = Math.floor(Math.random() * (maxLen - minLen + 1)) + minLen;
  const start = Math.floor(Math.random() * (str.length - len));

  const shuffled = str
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");
  return shuffled.substring(start, start + len);
};

export const createId = (table: string): string => {
  let tables = jsonfile.readFileSync(file);
  const tableId = tables[table] + 1;
  tables[table] = tableId;
  jsonfile.writeFile(file, tables, (err) => {
    if (err) {
      console.log(err);
    }
  });
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  const salt = shuffle(chars, 2, 5);
  return tableId + salt;
};
