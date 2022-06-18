import React, { Component } from 'react';
import '../molecule-sidebar/moleculeSidebar.scss';

function MoleculeSidebar() {
    return(
        <div class="sidebar">
          <div class="menu-item">
              <i class="fa-solid fa-city"></i>
              <span>Distributors</span>
          </div>
          <div class="menu-item">
              <i class="fa-solid fa-user-group"></i>
              <span>Customers</span>
          </div>
          <div class="menu-item">
              <i class="fa-solid fa-magnifying-glass"></i>
              <span>Search</span>
          </div>
        </div>
    )
}

export default MoleculeSidebar;
