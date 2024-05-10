import React, { useContext, useState} from 'react';


import { NameContext,NumberContext,EmailContext,ServiceContext,ModeContext} from './App';


const ServiceForm = () => {
    
  const [formData, setFormData] = useState({
    customerName: '',
    address: '',
    contactNumber: '',
    emailAddress: '',
    communicationMethod: '',
    serviceType: '',
    appointmentDateTime: '',
    paymentMethod: '',
    
termsAgreed: false
  });
  const [paymentSuccess, setPaymentSuccess] = useState(false);


  const [name,setName] = useContext(NameContext)

  const [number,setNumber] = useContext(NumberContext)

  const [email,setEmail] = useContext(EmailContext)

  const [service,setService] = useContext(ServiceContext)


  const [mode,setMode] = useContext(ModeContext)
  

  setName(formData.customerName)
  setNumber(formData.contactNumber)
  setEmail(formData.emailAddress)
  setService(formData.serviceType)

  setMode(formData.paymentMethod)

  const handleChange = (e) => {
    const { name, value,type,checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setFormData(prevState => ({
      ...prevState,
      [name]: val
    }));


  };

  const handleContactChange = (index, e) => {
    const { name, value } = e.target;
    const updatedContacts = [...formData.emergencyContacts];
    updatedContacts[index] = { ...updatedContacts[index], [name]: value };
    setFormData(prevState => ({
      ...prevState,
      emergencyContacts: updatedContacts
    }));
  };

  const addContact = () => {
    setFormData(prevState => ({
      ...prevState,
      emergencyContacts: [...prevState.emergencyContacts, { name: '', phoneNumber: '' }]
    }));
  };

  

  
  
  // const handleSubmit = async (e) => {
  //   e.preventDefault();



  //   try {
  //       // Simulate API call to book and pay
  //       const response = await fetch("http://localhost:5000/order", {
  //           method: "POST",
  //           body: JSON.stringify(formData),
  //           headers: {
  //               "Content-Type": "application/json",
  //           },
  //       });
  //       if (response.ok) {
  //           // Payment successful, redirect to confirmation page
  //           window.location.href = '/confirmation'; // Change this to your confirmation page URL
  //       } else {
  //           // Handle payment error
  //           alert('Payment failed. Please try again.');
  //       }
  //   } catch (error) {
  //       // Handle API call error
  //       console.error('Error:', error);
  //       alert('Something went wrong. Please try again later.');
  //   }
  // };


  return (
    <form  className='form-container'>
      <label className='individual-field'>
        Customer Name:
        <input style={{marginLeft:'20px'}} type="text" name="customerName" value={formData.customerName} onChange={handleChange} />
      </label>
      <label className='individual-field'>
        Address:
        <input style={{marginLeft:'20px'}} type="text" name="address" value={formData.address} onChange={handleChange} />
      </label>
      <label className='individual-field'>
        Contact Number:
        <input type="tel" style={{marginLeft:'20px'}} name="contactNumber" value={formData.contactNumber} onChange={handleChange} />
      </label>
      <label className='individual-field'>
        Email Address:
        <input style={{marginLeft:'20px'}} type="email" name="emailAddress" value={formData.emailAddress} onChange={handleChange} />
      </label>
      <label className='individual-field'>
        Preferred Communication Method:
        <select style={{marginLeft:'20px'}} name="communicationMethod" value={formData.communicationMethod} onChange={handleChange}>
          <option value="">Select...</option>
          <option value="Phone">Phone</option>
          <option value="Email">Email</option>
          <option value="SMS">SMS</option>
          {/* Add more options as needed */}
        </select>
      </label>
      <label className='individual-field'>
        Service Type:
        <select style={{marginLeft:'20px'}} name="serviceType" value={formData.serviceType} onChange={handleChange}>
          <option value="">Select...</option>
          <option value="Cleaning">Cleaning</option>
          <option value="Cooking">Cooking</option>
          <option value="Caregiving">Caregiving</option>
          {/* Add more options as needed */}
        </select>
      </label>
      <label className='individual-field'>
        Appointment Time:
        <select style={{marginLeft:'20px'}} name="appointmentDateTime" value={formData.appointmentDateTime} onChange={handleChange}>
          <option value="">Select...</option>
          <option value="09:00 AM">09:00 AM</option>
          <option value="10:00 AM">10:00 AM</option>
          <option value="11:00 AM">11:00 AM</option>
          {/* Add more options as needed */}
        </select>
      </label>
      <label className='individual-field'>
        Payment Method:
        <select style={{marginLeft:'20px'}} name="paymentMethod" value={formData.paymentMethod} onChange={handleChange}>
          <option value="">Select...</option>
          <option value="Credit Card">Credit Card</option>
          <option value="Debit Card">Debit Card</option>
          <option value="PayPal">PayPal</option>
          <option value="Bank Transfer">Bank Transfer</option>
          {/* Add more options as needed */}
        </select>
      </label>
      <label className='individual-field'>
        <input
          type="checkbox"
          name="termsAgreed"
          checked={formData.termsAgreed}
          onChange={handleChange} 
        />
        I agree to the terms and conditions
      </label>
      {/* <button type="submit">Book and Pay</button> */}
    </form>
  );
};

export default ServiceForm;