import React from "react";
import { Link } from "react-router-dom";
import footer from "../../../assets/images/footer.png";


const Footer = () => {
  return (
    <footer
      style={{
        background: `url(${footer})`,
        backgroundSize: "cover",
      }}
      className="p-10"
    >
      <div className="footer">
        <div>
          <span className="footer-title">Address</span>
           <h4> House#15-19, Block-E, Avenue-5 </h4>
           <h4> Rupatoli Notun Abasik</h4>  
           <h4> Rupatoli, Barisal-8200</h4> 
        
        </div>
        <div>
          <span className="footer-title">For More Info</span>
        
          <Link to="/" className="link link-hover">
            Contact Us
          </Link>
          <Link to="/" className="link link-hover">
            Career
          </Link>
          <Link to="/" className="link link-hover">
            About Us
          </Link>
        </div>
        <div>
          
           <span className="footer-title">Legal</span>
                    <Link to="/" className="link link-hover">Terms of use</Link>
                    <Link to="/" className="link link-hover">Privacy policy</Link>
                    <Link to="/" className="link link-hover">Cookie policy</Link> 
        </div>
      </div>
      <div className="text-center mt-32">
        <p>Copyright © 2024 - All right reserved by Health Connect Ltd</p>
      </div>
    </footer>
  );
};

export default Footer;
