import React, {useMemo} from 'react'
import { useTable, usePagination } from 'react-table'
import MOCK_DATA from "./MOCK_DATA.json"
import {COLUMNS} from "./columns"
import "./table.css"

export const BasicTable = () => {
    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => MOCK_DATA, [])

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        page,
        prepareRow,
        setPageSize,
        state,
    } = useTable({
        columns,
        data
    }, usePagination
    )

    const {pageSize} = state

    return (
        <>
        <table {...getTableProps()}>
            <thead>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps}>
                        {headerGroup.headers.map((column) => (
                            <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {page.map((row) => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map((cell) => {
                                return <td {...cell.getCellProps}>{cell.render("Cell")}</td>
                            })}
                        </tr>
                    )
                })}
                </tbody>
        </table>
        <select value={pageSize} onChange={e => {setPageSize(Number(e.target.value))}}>
            {
                [5, 10, 15, 20].map(pageSize => (
                    <option key={pageSize} value={pageSize}>
                        Show {pageSize} rows
                    </option>
                ))
            }
        </select>
      </>
  )
}
