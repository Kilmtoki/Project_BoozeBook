import React, { useState } from 'react';
import QrRum from './images/QrRum.png';
import { useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu';


function PaymentPage() {
  useEffect(() => {
    const token = localStorage.getItem('token')
    fetch("http://localhost:3333/authen", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+token 
      },
  })
    .then((response) => response.json())
    .then((data) => {
      if(data.status === 'ok'){
        //alert('authen sucess')
      } else {
        alert('authen failed')
        localStorage.removeItem('token');
        window.location = '/login'
      }
  
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  }, [])
  const [email, setEmail] = useState('');
  const [bankAccount, setBankAccount] = useState('');
  const [paymentNumber, setPaymentNumber] = useState('');
  const [paymentTime, setPaymentTime] = useState('');
  const [tableNumber, settableNumber] = useState('');

  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem('token');
    window.location = '/login'
  }
  const handleBoozeBook = (event) => {
    event.preventDefault();
    window.location = '/Album'
  }
  const handleChangeEmail = e => {
    setEmail(e.target.value);
  }
  const handleChangeBank = e => {
    setBankAccount(e.target.value); 
  }
  const handleChangeNumber = e => {
    setPaymentNumber(e.target.value); 
  }
  const handleChangeTime = e => {
    setPaymentTime(e.target.value);  
  }
  const handleChangeTable = e => {
    settableNumber(e.target.value); 
  }

  
  const handleSubmit= e =>  {
    e.preventDefault();
    if(email===''||bankAccount===''||paymentNumber===''||paymentTime===''||tableNumber===''){
        alert('กรุณากรอกข้อมูลให้ครบถ้วน')
    }
    else if(bankAccount==='NULL'){
        alert('กรุณากรอกเลือกช่องทางการชำระเงิน')
    }
    else if(tableNumber>12||tableNumber<1){
      alert('กรุณากรอกหมายเลขโต๊ะให้ถูกต้อง')
  }
    else{
        const data = new FormData(e.currentTarget);
        console.log({
          email: data.get('email'),
          bankAccount : data.get('bankAccount'),
          paymentNumber : data.get('paymentNumber'),
          paymentTime : data.get('paymentTime'),
          tableNumber : data.get('tableNumber')
        });
        const jsonData = {
            email: data.get('email'),
            bankAccount : data.get('bankAccount'),
            paymentNumber : data.get('paymentNumber'),
            paymentTime : data.get('paymentTime'),
            tableNumber : data.get('tableNumber')
        }
        fetch("http://localhost:3333/payment", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(jsonData),
        })
          .then((response) => response.json())
          .then((data) => {
            if(data.status === 'ok'){
              alert('ชำระเงินสำเร็จ')
              window.location = '/Album'
            } else {
              alert('ชำระเงินล้มเหลว')
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
    }
  };

  return (
    <div >
       <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="default" style={{ backgroundColor: "#000000" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 ,color:"#ffffff"}}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 ,color: "#ffffff"  }}  onClick={handleBoozeBook}>
                BoozeBook
          </Typography>
          <Button color="inherit" sx={{ color: "#ffffff" }} onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
    <br></br>
    <div className='App'>
    <Typography variant="h6" component="div" sx={{ flexGrow: 1 ,color: "#000000"  }}>
              <h3>วิธีการชำระเงิน</h3>
              1. สแกน QR Code ด้างล่างและโอนเงินตามจำนวนที่ท่านสั่งซื้อ
    </Typography>
            <img src={QrRum} alt="logo"/>
    <Typography variant="h6" component="div" sx={{ flexGrow: 1 ,color: "#000000"  }}>
              2. ทำการยืนยันการชำระเงินหลังจากการโอนเงินเพื่อรับบัตรจอง
    </Typography>
    </div>
    <br></br>
    <div className='App'>
    <Typography variant="h6" component="div" sx={{ flexGrow: 1 ,color: "#000000"  }}>
              <h3>วิธียืนยันการชำระเงิน</h3>
              กรุณากรอกข้อมูลดังต่อไปนี้ให้ครบถ้วน
    </Typography>
    <br></br>
    <form onSubmit={handleSubmit}>
      <div className='App2'>
            <h4>ชำระเงินผ่านทาง</h4>
            <select div className='Input2' name="bankAccount" value={bankAccount} onChange={handleChangeBank}>
            <optgroup label="ธนาคาร">
                <option value="NULL" >
                    กรุณาเลือกวิธีการชำระเงิน
                </option>
                <option value="ธนาคารกรุงเทพ">ธนาคารกรุงเทพ</option>
                <option value="ธนาคารกสิกรไทย">ธนาคารกสิกรไทย</option>
                <option value="ธนาคารกรุงไทย">ธนาคารกรุงไทย</option>
                <option value="ธนาคารไทยพาณิชย์">ธนาคารไทยพาณิชย์</option>
                <option value="ธนาคารออมสิน">ธนาคารออมสิน</option>
            </optgroup>
            <optgroup label="PromptPay">
                <option value="promptpay">PromptPay</option>
            </optgroup>
            </select>
            </div>
        <br></br>
        <div div className='App2'>
        <h4>หมายเลขบัญชี</h4>
            <input
            className='Input'
                name="paymentNumber" 
                value = {paymentNumber}
                onChange = {handleChangeNumber}
            />
        </div>
        <div div className='App2'>
        <br></br>
         <h4>เวลาที่ชำระเงิน</h4>
            <input
                type="datetime-local" 
                id="paymentDate"
                className='Input'
                name="paymentTime"
                value={paymentTime} 
                onChange={handleChangeTime} 
            />
  
        </div>
        <br></br>
        <div div className='App2'>
        <h4>อีเมล</h4>
            <input
                className='Input'
                name="email"
                value={email} 
                onChange={handleChangeEmail}
            />
        </div>
        <div div className='App2'>
        <br></br>
        <h4> หมายเลขโต๊ะ</h4>
            <input
                className='Input'
                name="tableNumber"
                value={tableNumber} 
                onChange={handleChangeTable} 
            />
        </div>
        <div className='Center'><button className='bt1'>ยืนยันการชำระเงิน</button></div>
      </form> 
        <Typography variant="h7" component="div" sx={{ flexGrow: 1 ,color: "#bf0a30"  }}>
      **หากทำการยืนยันแล้วระบบจะทำการส่งบัตรไปที่อีเมลของท่านและหากต้องการจองโต๊ะเพิ่มกรุณาทำการสั่งซื้อใหม่**
      </Typography>
    </div>
    <br></br>
    </div>
  );
}

export default PaymentPage;
