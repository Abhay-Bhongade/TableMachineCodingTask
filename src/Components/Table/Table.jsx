import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTableData } from "../../rtk/features/tableSlice";

const Table = () => {
  const dispatch = useDispatch();
  const [fetchedData, setFetchedData] = useState([]);

  useEffect(() => {
    dispatch(fetchTableData());
  }, [dispatch]);

  const data = useSelector(state => state.tableSlice?.tableData?.data);
  useEffect(() => {
    setFetchedData(data || []);
  }, [data]);

  useEffect(() => {
    localStorage.setItem('tableData', JSON.stringify(fetchedData));
  }, [fetchedData]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('tableData'));
    if (storedData) {
      setFetchedData(storedData);
    }
  }, []);

  const handleEdit = (id) => {
    setFetchedData(prevState =>
      prevState.map(record =>
        record.id === id ? { ...record, editable: true } : record
      )
    );
  };

  const handleSave = (id) => {
    const recordToSave = fetchedData.find(record => record.id === id);
    const { first_name, last_name, email } = recordToSave;
    if (!first_name.trim() || !last_name.trim() || !email.trim()) {
      alert("First name, last name, and email fields cannot be empty.");
      return;
    }
    setFetchedData(prevState => {
      const updatedData = prevState.map(record =>
        record.id === id ? { ...record, editable: false } : record
      );
      return updatedData;
    });
  };
  
  

  const handleDelete = id => {
    setFetchedData(prevState =>
      prevState.filter(record => record.id !== id)
    );
  };

  const handleInputChange = (e, id, field) => {
    const value = e.target.value;
    setFetchedData(prevState =>
      prevState.map(record =>
        record.id === id ? { ...record, [field]: value } : record
      )
    );
  };

  return (
    <div>
      {fetchedData?.length === 0 ? (
        <div>No table data</div>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {fetchedData?.map(record => (
              <tr key={record.id}>
                <td>{record.id}</td>
                <td>
                  {record.editable ? (
                    <>
                      <input className="mx-2"
                        type="text"
                        value={record.first_name}
                        onChange={e => handleInputChange(e, record.id, 'first_name')}
                      />
                      <input
                        type="text"
                        value={record.last_name}
                        onChange={e => handleInputChange(e, record.id, 'last_name')}
                      />
                    </>
                  ) : (
                    `${record.first_name} ${record.last_name}`
                  )}
                </td>
                <td>
                  {record.editable ? (
                    <input
                      type="text"
                      value={record.email}
                      onChange={e => handleInputChange(e, record.id, 'email')}
                    />
                  ) : (
                    record.email
                  )}
                </td>
                <td>
                  {!record.editable ? (
                    <> <button className="btn btn-primary mr-2 mx-2" onClick={() => handleEdit(record.id)}>Edit</button>
                    <button className="btn btn-danger" onClick={() => handleDelete(record.id)}>Delete</button></>
                  ) : (
                    <>
                      <button className="btn btn-success mr-2" onClick={() => handleSave(record.id)}>Save</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Table;
