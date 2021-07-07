import React, { useState, useEffect, useRef } from "react";
import bitimg from "../Images/bitcoin.jpg"
import "./css/style.css"

const Tradee = () => {

const [price, setPrice] = useState(89);
const [vol, setVol] = useState(null);
const [press, setPress] = useState(false);
const [pressed, setPressed] = useState(false);

    let initialRender = useRef(true);
    const cssStyle = {
        color : "red"
    }
    if (price[4] > 0) {
        cssStyle.color = "green";
    }



useEffect(()=>{
if(initialRender.current){
    
    initialRender.current = false ;
    
}
else {
    const ws = require('isomorphic-ws')
const w = new ws('wss://api-pub.bitfinex.com/ws/2')

w.onopen = function open() {
    console.log('connected');
    w.send(msg);
  };

w.onmessage = function message (msgg) {
        //   console.log("msggg", msgg);
        var a = JSON.parse(msgg.data);
        // var a = JSON.stringify(msgg.data);
          console.log("a", a);
          console.log("typeof a", typeof a);
    
          console.log("typeof a[1]", typeof a[1]);
    
          if((typeof a[1] === "object" )) {
            var c= a[1];
            if(c.length === 10)
            {
            console.log("c",c)
            console.log("c.length",c.length)
            console.log("c[0]",c[0])
            console.log("c[0]",c[1])
            console.log("c[0]",c[2])
            console.log("c[0]",c[3])
            console.log("c[0]",c[4].toFixed(0))
            console.log("c[0]",c[5].toFixed(4))
            console.log("c[0]",c[6])
            console.log("c[0]",c[7])
            console.log("c[0]",c[8])
            console.log("c[0]",c[9])
            
             setPrice(c);
    
            var d = c[0] * c[7];
            console.log("d",d)
            var e = d.toFixed(0);
            console.log("e",e)
            setVol(e);
    
    }  
    }
    }
  
 


let msg = JSON.stringify({ 
  event: 'subscribe', 
  channel: 'ticker', 
  symbol: 'tBTCUSD',
})

    setPressed(true);
}

}, [press]);



return (
        <>
        <div className="bigdiv">
        <div className="all">
                <figure className="hide">
                    <img src ={bitimg} alt="bitcoin" />
                </figure>
                <div className="symbol hide">
                    <h3>BTC/USD</h3>
                    <h4><span>{price[0]}</span></h4>
                </div>
                <div className="symbol hide">
                    <h3>VOL <span>{vol}</span> </h3>
                    <h4 style = {cssStyle}>{price[4]}<i></i>({price[5] * 100})%</h4>
                </div>
                <div className="symbol hide">
                    <h4>LOW <span>{price[9]}</span></h4>
                    <h4>HIGH <span>{price[8]}</span></h4>
                </div>
                <div className="symbol button">
                   <button onClick={()=>{setPress(true)}}>connect</button>
                
                </div>
        </div>
                
        </div>
        
        </>
    )
}
export default Tradee;