import React, { Component } from "react";
import { Link } from "react-router-dom";
import Modal from 'react-responsive-modal';
import logo from './images/logo.png';
class Header extends Component {
	
	render() {
		return (
			<header>
				<nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
					<div className="container">


						<ul className="navbar-nav mr-auto">
                        <Link className="navbar-brand" to="/" >
                                Accueil
                            </Link>
							<li className="nav-item active" style={{listStyleType: 'none'}}>
								<Link className="nav-link" to="/add-employee">
								My list 
									<span className="sr-only" />
								</Link>
							</li>
						</ul>
                        <img src={logo} alt="logo" className="logo" />

					</div>
					
					
				</nav>
			</header>
		);
	}
}

export default Header;
