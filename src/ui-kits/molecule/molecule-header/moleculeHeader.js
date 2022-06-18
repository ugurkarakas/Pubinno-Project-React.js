import React, { Component } from 'react';
import '../molecule-header/moleculeHeader.scss';
import logo from '../../../assets/img/pubinnoLogo.png';

function MoleculeHeader() {
    return(
        <div class="header">
          <div class="head-partial">
           <img src={logo}/>
           <div class="head-menu">
           <i class="fa-solid fa-user"></i>
           <i class="fa-solid fa-bars"></i>
           </div>
         </div>
         <div class="navigation">
          <div class="navigation-text"><b>Pubinno</b><i class="fa-solid fa-angle-right"></i><span>Pubinno Test</span></div>
         </div>
        </div>
    )
}

export default MoleculeHeader;
