import { useEffect, useState } from "react";
import "./App.css";
import "./materialize.css";
import fetchCall from "./actions/fetch_call.tsx";

function App() {
  const [contacts, setContacts] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setTimeout(() => {
      fetchCall("https://jsonplaceholder.typicode.com/users", "GET", null).then(
        (result: any) => {
          setContacts(result);
          setFilteredData(result);
        }
      );
    }, 3000);

    return () => {};
  }, []);

  useEffect(() => {
    const filtered = contacts.filter((item) =>
      Object.values(item).some((value: any) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredData(filtered);
  }, [contacts, searchTerm]);

  return (
    <>
      {contacts && contacts.length === 0 && (
        <div className="spinner">
          <div className="double-bounce1"></div>
          <div className="double-bounce2"></div>
        </div>
      )}
      {contacts && contacts.length > 0 && (
        <>
          <input
            type="text"
            placeholder="Search your contacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <table className="centered striped highlight">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
              </tr>
            </thead>

            <tbody>
              {filteredData.map((contact: any) => (
                <tr key={contact.id}>
                  <td>{contact.id}</td>
                  <td>{contact.name}</td>
                  <td>{contact.username}</td>
                  <td>{contact.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
}

export default App;
