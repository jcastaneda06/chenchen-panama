import { FC } from 'react'
import { Table as AntTable, TableProps } from 'antd'
import { Planilla } from '../types'

type Props<T> = {
  columns: TableProps<Planilla>['columns']
  dataSource: T[]
}

const Table: FC<Props<Planilla>> = (props) => {
  const { columns, dataSource } = props
  return (
    <AntTable
      columns={columns}
      dataSource={dataSource}
      scroll={{ x: true }}
      size='middle'
      pagination={{}}
      sortDirections={['ascend', 'descend']}
    />
  )
}

Table.displayName = 'Table'
export default Table
