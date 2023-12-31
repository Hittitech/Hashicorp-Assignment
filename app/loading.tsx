import Skeleton from 'react-loading-skeleton';
import { Table, TableColumnHeaderCell } from '@radix-ui/themes';

const IssueLoadingPage = () => {
  const issues=[1,2,3,4,5];
  return (
    <div>
      <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
            <TableColumnHeaderCell>Issue</TableColumnHeaderCell>
            <TableColumnHeaderCell className='hidden md:table-cell'>Status</TableColumnHeaderCell>
            <TableColumnHeaderCell className='hidden md:table-cell'>Created</TableColumnHeaderCell>
          </Table.Row>

        </Table.Header>
        <Table.Body>
          {issues.map((issue)=>(
            <Table.Row key={issue}>
              <Table.Cell><Skeleton/>
              <div className='block md:hidden lowercase'><Skeleton/>

              </div>
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell'><Skeleton/></Table.Cell>
              <Table.Cell className='hidden md:table-cell'><Skeleton/></Table.Cell>

            </Table.Row>
          ))}
        

        </Table.Body>

      </Table.Root>
    </div>
  )
}

export default IssueLoadingPage