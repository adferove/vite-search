
import  { useEffect, useState } from 'react';
import "./App.css"; 
import fetchCall from "./actions/fetch_call.tsx";

function App() {


  const [contacts, setContacts] = useState([]);

    useEffect(() => {
      fetchCall(fetch,'https://jsonplaceholder.typicode.com/users','get', null)
        .then((result:any) => {
          setContacts(result);
        });
  
      return () => {
      };
    }, []);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Key</th>
            <th>Value</th>
            <th>Reveal</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
        {contacts.map((contact: any) => (
          <tr key={contact.id}>
            <td>{contact.id}</td>
            <td>{contact.name}</td>
            <td>{contact.username}</td>
            <td>{contact.email}</td>
          </tr>
        ))}
        </tbody>
      </table>

      {/* <div className="spinner">
  <div className="double-bounce1"></div>
  <div className="double-bounce2"></div>
</div> */}
    </>
  );
}

export default App;
