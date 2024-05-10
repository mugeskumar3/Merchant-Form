import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

interface Merchant {
  [x: string]: any;
  name: string;
  email: string;
  phone: string;
  website: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  notes: string;
  type: string;
  category: string;
  commissionPercentage: number;
  chooseDate: string;
  logo: string;
  isCriticalAccount: boolean;
  paymentOptions: string;
}

interface TableProps {
  data: Merchant[];
  onDataChange:
    | React.Dispatch<React.SetStateAction<Merchant[]>>
    | ((data: Merchant[]) => void);
  onEdit: (index: number) => void;
  editIndex: number | null;
}

const Table: React.FC<TableProps> = ({
  data,
  onDataChange,
  onEdit,
  editIndex,
}) => {
  const navigate = useNavigate();

  const handleEdit = (index: number) => {
    onEdit(index);
    // Navigate to the form view programmatically
    navigate("/");
  };

  const handleDelete = (index: number) => {
    // Use the delete API endpoint to remove the data from the server
    const idToDelete = data[index]._id;
    axios
      .delete(`http://localhost:5000/api/data/${idToDelete}`)
      .then((response) => {
        console.log("Data deleted successfully:", response.data);
        const updatedData = [...data];
        updatedData.splice(index, 1);
        onDataChange(updatedData); // Update the state immediately
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
      });
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Website</th>
          <th>Contact Name</th>
          <th>Contact Email</th>
          <th>Contact Phone</th>
          <th>Notes</th>
          <th>Type</th>
          <th>Category</th>
          <th>Commission Percentage</th>
          <th>Choose Date</th>
          <th>Logo</th>
          <th>Critical Account</th>
          <th>Payment Options</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{item.phone}</td>
            <td>{item.website}</td>
            <td>{item.contactName}</td>
            <td>{item.contactEmail}</td>
            <td>{item.contactPhone}</td>
            <td>{item.notes}</td>
            <td>{item.type}</td>
            <td>{item.category}</td>
            <td>{item.commissionPercentage}</td>
            <td>
              {item.chooseDate
                ? new Date(item.chooseDate).toLocaleDateString()
                : ""}
            </td>
            <td>
              {item.logo && (
                <img
                  src={item.logo}
                  alt={`Logo for ${item.name}`}
                  style={{ width: "50px", height: "50px" }}
                />
              )}
            </td>
            <td>{item.isCriticalAccount.toString()}</td>
            <td>{item.paymentOptions}</td>
            <td>
              <button onClick={() => handleEdit(index)}>Edit</button>
              <button onClick={() => handleDelete(index)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
