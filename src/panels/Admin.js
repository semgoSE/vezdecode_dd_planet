import React, { useEffect, useMemo } from "react";
import { Panel } from "@vkontakte/vkui";
import { DataGrid } from '@material-ui/data-grid';
import EnhancedTable from "./Table";
const Admin = ({ id, appeals }) => {

    useEffect(() => {
        console.log(appeals)
    })
    const colums = [
        {field: "id", headerName: "ID", width: 20},
        {field: 'name', headerName: 'Имя', width: 70 },
        {field: 'text', headerName: 'Обращение', width: 200 },
        {field: "tel", headerName: "tel", width: 20},
        // { field: 'lastName', headerName: 'Last name', width: 130 },
    ];


 return(
     <Panel id={id}>
        {appeals && <div>
            <EnhancedTable rows={appeals} />
        </div>}
     </Panel>
 )
}

export default Admin;