import React from "react";
import { MDBDataTable } from 'mdbreact';
import { Form, Button } from "react-bootstrap"

class TableFans extends React.Component {
    constructor() {
        super()
        this.state = {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Username',
                    field: 'username',
                    sort: 'asc'
                },
                {
                    label: 'Status',
                    field: 'status',
                    sort: 'asc'
                },
                {
                    label: 'Post-Count',
                    field: 'postCount',
                    sort: 'asc'
                },
                {
                    label: 'URL',
                    field: 'url',
                    sort: 'asc'
                }
            ],
            rows: [

            ],
            data: {}
        }
    }

    componentDidMount() {
        console.log('hola')
        fetch('http://instacount:8080/api/fan')
            .then(response => response.json())
            .then((myJson) => {


                let rows = myJson.fans.map((row) => {
                    return ({
                        id: row.id,
                        username: row.username,
                        status: row.status,
                        postCount: row.postCount,
                        url: [<a href={row.url} target="_blank" rel="noopener noreferrer">{row.url}</a>]

                    })
                });

                console.log('---')
                this.setState({
                    data: {
                        columns: this.state.columns,
                        rows: rows
                    },
                    rows: rows
                })
            })
    }


    render() {

        console.log('Render')
        console.log(this.state.data)
        console.log(this.state.rows)
        return (
            <div>
                <MDBDataTable
                    striped
                    bordered
                    data={this.state.data}
                />
                <div style={{border: "2px outset whitesmoke", padding: "1em"}}>
                    <div className="row">
                        <div className="col">
                            <h1>Eliminar Usuarios</h1>
                            <p>Elimina los usuarios con estado none, que tengan máximo n cantidad de likes</p>   
                        </div>
                    </div>
                                
                    <br style={{borderWidth: "2px"}}/>       
                    <div className="row">
                        <div className="col-3">
                            <Form>
                                <Form.Group controlId="formFansDelete">
                                    <Form.Label>Número máximo de likes</Form.Label>
                                    <Form.Control type="text" placeholder="Digite número" />
                                </Form.Group>
                                <Button variant="danger" type="submit">
                                    ELiminar
                                </Button>
                            </Form>
                        </div>
                    </div>
                </div>

            </div>
        )
    }

}

export default TableFans;