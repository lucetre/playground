import { useState, useEffect } from 'react';

import { Link } from 'components';
import { userBackendService } from 'services';
import socketIOClient from "socket.io-client";

const socket = socketIOClient(process.env.BACKEND_SOCKET);

export default Index;

function Index() {
    const [users, setUsers] = useState(null);
    const [response, setResponse] = useState(new Date().toISOString());
    
    useEffect(() => {
        userBackendService.getAll().then(x => setUsers(x));
    }, [response]);
    
    useEffect(() => {
        socket.on("FromServer", data => {
            setResponse(data);
        });
    }, []);

    function deleteUser(id) {
        setUsers(users.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        userBackendService.delete(id).then(() => {
            socket.emit('FromClient', new Date().toISOString());
            setUsers(users => users.filter(x => x.id !== id));
        });
    }

    return (
        <div>
            <div className="container row">
                <div className="col-8">
                    <h1>Postgres Users</h1>
                </div>
                    
                <div className="col-4" style={{textAlign:"right"}}>
                    <Link href="/user-backend/add" className="btn btn-success">Add User</Link>
                </div>
            </div>
            
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '30%' }}>Username</th>
                        <th style={{ width: '30%' }}>Name</th>
                        <th style={{ width: '30%' }}>Email</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.map(user =>
                        <tr key={user.id}>
                            <td>{user.username}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link href={`/user-backend/edit/${user.id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                                <button onClick={() => deleteUser(user.id)} className="btn btn-sm btn-danger btn-delete-user" disabled={user.isDeleting}>
                                    {user.isDeleting 
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!users &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="spinner-border spinner-border-lg align-center"></div>
                            </td>
                        </tr>
                    }
                    {users && !users.length &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="p-2">No Users To Display</div>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}
