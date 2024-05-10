/* UPDATE links
I just searched a bit and it seems to be possible with sql
let me compose a query for that and check

SET position = (case when id = 1 then 'position1'
                     when id = 2 then 'position2'
                     when id = 3 then 'position3'
                end)
WHERE id in (1, 2, 3)

This is how it would look like in sql
this will help you to make only 1 query to database
only case here - we don't have a support for case when in drizzle, but we have magical sql template that may help here

db.update(linksTable).set({ position: sql`<here will go case-when statement>` }).where(inArray(linksTable.id, [1, 2, 3]))

so the only thing left is to properly build case-when statement
done, let me share a small example for that

const inputs: NewPosition[] = [
    {
      id: 1,
      position: 10,
    },
    {
      id: 2,
      position: 11,
    },
    {
      id: 3,
      position: 12,
    },
  ];
  
  const sqlChunks: SQL[] = [];
  const ids: number[] = []
  
  sqlChunks.push(sql`(case`)
  for (const input of inputs) {
      sqlChunks.push(sql`when id = ${input.id} then ${input.position}`)
      ids.push(input.id)
  }
  sqlChunks.push(sql`end)`)
  
  
  const finalSql: SQL = sql.join(sqlChunks, sql.raw(" "));
  
  const res = await db.update(linksTable).set({position: finalSql}).where(inArray(linksTable.id, ids)); */
