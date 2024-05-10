// Form.tsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
interface FormData {
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

interface FormProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  tableData: FormData[];
  setTableData: React.Dispatch<React.SetStateAction<FormData[]>>;
  editIndex: number | null;
  setEditIndex: React.Dispatch<React.SetStateAction<number | null>>;
  paymentOptions: string[];
  handleSubmit: (e: React.FormEvent) => void;
  handleEdit: (index: number) => void;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
}
const Form: React.FC<FormProps> = ({
  formData,
  setFormData,
  tableData,
  setTableData,
  editIndex,
  handleSubmit,
  handleChange,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (editIndex !== null) {
      setFormData(tableData[editIndex]);
    }
  }, [editIndex, tableData, setFormData]);

  const handleNavigation = () => {
    // Navigate to the table view programmatically
    navigate("/table");
  };

  return (
    <div className="form-container">
      <form
        onSubmit={(e) => {
          handleSubmit(e);
          handleNavigation();
        }}
      >
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="phone">Phone</label>
          <PhoneInput
            country={"in"} // Set India as the default country
            value={formData.phone}
            onChange={(phone) =>
              setFormData((prevData) => ({ ...prevData, phone }))
            }
          />
        </div>

        <div>
          <label htmlFor="website">Website</label>
          <input
            type="text"
            id="website"
            name="website"
            value={formData.website}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="contactName">Contact Name</label>
          <input
            type="text"
            id="contactName"
            name="contactName"
            value={formData.contactName}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="contactPhone">Contact Phone</label>
          <PhoneInput
            country={"in"} // Set India as the default country
            value={formData.contactPhone}
            onChange={(contactPhone) =>
              setFormData((prevData) => ({ ...prevData, contactPhone }))
            }
          />
        </div>

        <div>
          <label htmlFor="contactEmail">Contact Email</label>
          <input
            type="email"
            id="contactEmail"
            name="contactEmail"
            value={formData.contactEmail}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="notes">Notes</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Type</label>
          <div>
            <input
              type="radio"
              id="smallBusiness"
              name="type"
              value="Small Business"
              checked={formData.type === "Small Business"}
              onChange={handleChange}
            />
            <label htmlFor="smallBusiness">Small Business</label>
          </div>
          <div>
            <input
              type="radio"
              id="enterprise"
              name="type"
              value="Enterprise"
              checked={formData.type === "Enterprise"}
              onChange={handleChange}
            />
            <label htmlFor="enterprise">Enterprise</label>
          </div>
          <div>
            <input
              type="radio"
              id="entrepreneur"
              name="type"
              value="Entrepreneur"
              checked={formData.type === "Entrepreneur"}
              onChange={handleChange}
            />
            <label htmlFor="entrepreneur">Entrepreneur</label>
          </div>
        </div>

        <div>
          <label>Category</label>
          <select
            id="categories"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="Clothes">Clothes</option>
            <option value="Toys">Toys</option>
            <option value="Groceries">Groceries</option>
            <option value="Electronics">Electronics</option>
            <option value="Digital">Digital</option>
          </select>
        </div>

        <div>
          <label htmlFor="commissionPercentage">Commission Percentage</label>
          <input
            type="number"
            id="commissionPercentage"
            name="commissionPercentage"
            value={formData.commissionPercentage}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="chooseDate">Choose Date</label>
          <input
            type="date"
            id="chooseDate"
            name="chooseDate"
            value={formData.chooseDate}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="logo">Logo Image</label>
          <input
            type="file"
            id="logo"
            name="logo"
            value={formData.logo}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Critical Account</label>
          <input
            type="checkbox"
            id="isCriticalAccount"
            name="isCriticalAccount"
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Payment Option:</label>
          <div>
            <input
              type="radio"
              id="cashOnDelivery"
              name="paymentOptions"
              value="Cash on Delivery"
              checked={formData.paymentOptions === "Cash on Delivery"}
              onChange={handleChange}
            />
            <label htmlFor="cashOnDelivery">Cash on Delivery</label>
          </div>
          <div>
            <input
              type="radio"
              id="upi"
              name="paymentOptions"
              value="UPI"
              checked={formData.paymentOptions === "UPI"}
              onChange={handleChange}
            />
            <label htmlFor="upi">UPI</label>
          </div>
          <div>
            <input
              type="radio"
              id="cardPayment"
              name="paymentOptions"
              value="Card Payment"
              checked={formData.paymentOptions === "Card Payment"}
              onChange={handleChange}
            />
            <label htmlFor="cardPayment">Card Payment</label>
          </div>
        </div>
        <button type="submit">
          {editIndex !== null ? "Update" : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Form;
