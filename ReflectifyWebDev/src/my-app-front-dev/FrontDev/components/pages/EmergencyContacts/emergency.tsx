import React from 'react';
import './emergency.css'; 

const EmergencyContacts: React.FC = () => {
    return (
        <div className="emergency-contacts">
            <h1>🚨 Emergency Contacts</h1>
            <p>Contacts for emergency support</p>
            <h2>Accessible Contacts:</h2>
            <ul>
                <li>
                    <strong>Crisis Hotline:</strong> 
                    <a href="tel:988"> 988</a>
                </li>
                <li>
                    <strong>Medical Emergency:</strong> 
                    <a href="tel:911"> 911</a>
                </li>
                <li>
                    <strong>National Maternal Mental Health Hotline:</strong> 
                    <a href="tel:1-833-9-HELP4MOMS"> 1-833-9-HELP4MOMS (1-833-943-5746)</a>
                </li>
                <li>
                    <strong>Substance Abuse and Mental Health Services Administration's National Helpline:</strong> 
                    <a href="tel:1-800-662-HELP"> 1-800-662-HELP (1-800-662-4357)</a>
                </li>
            </ul>

            <h2>Local Hospitals:</h2>
            <ul>
                <li>
                    <strong>Our Lady of the Lake Regional Medical Center</strong><br />
                    Phone: <a href="tel:1-225-765-6565">1-225-765-6565</a><br />
                    Address: 5000 Hennessy Blvd, Baton Rouge, LA 70808
                </li>
                <li>
                    <strong>Ochsner Medical Center - Baton Rouge</strong><br />
                    Phone: <a href="tel:1-225-761-5200">1-225-761-5200</a><br />
                    Address: 9001 Summa Ave, Baton Rouge, LA 70809
                </li>
                <li>
                    <strong>BR General Medical Center</strong><br />
                    Phone: <a href="tel:1-225-763-4000">1-225-763-4000</a><br />
                    Address: 3600 Florida Blvd, Baton Rouge, LA 70806
                </li>
            </ul>
        </div>
    );
};

export default EmergencyContacts;