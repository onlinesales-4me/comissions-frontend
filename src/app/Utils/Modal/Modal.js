import React from 'react';
import PropTypes from 'prop-types';

class Modal extends React.Component {

	render() {
		if(!this.props.show) {
			return null;
		}

	    return (
	      	<div style={{height: "100vh", width: "100vw", position: "fixed", top: "0", left: "0", zIndex: "99", backgroundColor: 'rgba(0,0,0,0.3)', display: 'flex', justifyContent: 'center', alignItems: 'center'}} onClick={() => this.props.onClose(false)}>
	        	<div style={{borderRadius: '5px', backgroundColor: 'white', borderRadius: "5px", minWidth: "50vw", maxWidth: "90vw", minHeight: "300px", maxHeight: "80vh", padding: "30px 30px 30px 30px", zIndex: "100", overflowY: "auto"}} onClick={(e) => {e.stopPropagation()}}>
	        		<div style={{width: "100%", height: "10px"}}>
	        			<span className="on-hover" style={{float: "right", color: '#010033'}} onClick={() => this.props.onClose(false)}>X</span>
	        		</div>
	        		<div className={"font-18"} style={{width: "100%", height: "20px", display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "3px solid #d2d2e4", color: 'white'}}>
                        <h2>{this.props.titulo}</h2>
                    </div>
                    <br/>
	          		{this.props.children}
	        	</div>
	      	</div>
	    );
	  }
}

Modal.propTypes = {
  	onClose: PropTypes.func.isRequired,
  	show: PropTypes.bool,
  	children: PropTypes.node
};

export default Modal;