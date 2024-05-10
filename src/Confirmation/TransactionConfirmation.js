import React, { useContext } from 'react';
import { Link,Navigate} from 'react-router-dom';
import { PaymentContext,NameContext,NumberContext,EmailContext,ServiceContext,ModeContext} from '../App';

import './index.css'
import { SiTicktick } from "react-icons/si";

import { FaLongArrowAltLeft } from "react-icons/fa";

const TransactionConfirmation = () => {
  // const { transactionId, name, address } = useParams();

  // const navigate = useNavigate()


  const [paymentId] = useContext(PaymentContext)


  const [name] = useContext(NameContext)

  const [number] = useContext(NumberContext)

  const [email] = useContext(EmailContext)

  const [service] = useContext(ServiceContext)


  const [mode] = useContext(ModeContext) 

  const date = new Date()

 const TimeOfPayment = date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear()+'-'+date.getHours()+':'+date.getMinutes() 


 if(paymentId === ''){

  return <Navigate to='/'/>

 }

  return (
    <div className='confirmation-container'>
      {/* <div className='logo-container'>

        <img src={Logo} className='logo-image'/>
        <h1 className='logo-text'>Homaid</h1>

      </div> */}
      <SiTicktick className='right-tick'/>
      <h1 className='service-heading'>Service Booked Successfully !</h1>

      <h3 className='transaction-heading'><span>{name}</span></h3>


      <div className='transaction-details-container'>

      
      <p>Transaction Id : <span>{paymentId}</span> </p>
      <p>Number : <span>{number}</span></p>
      <p>Email : <span>{email}</span></p>
      <p>Service Type : <span>{service}</span></p>
      <p>Time Of Payment : <span>{TimeOfPayment}</span> <span></span></p>
      <p>Payment Method : <span>{mode}</span></p>
    
      </div>

      <div className='redirect-container'>

        <Link className='link' to='/'>

          <div className='arrow-container'>
           < FaLongArrowAltLeft className='arrow-icon'/>
           
           <p>Home Page</p> 

          </div>
           
           
           </Link>

      </div>
    </div>
  );
};

export default TransactionConfirmation;