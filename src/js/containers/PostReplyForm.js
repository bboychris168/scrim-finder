import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import {sendPostReply, cancelPostReply} from "../actions/PostReplyActions";
import Card from "../components/Card";
import SubmitButton from "../components/SubmitButton";
import Button from '../components/Button';
import '../../styles/containers/PostReplyForm.css';


class PostReplyForm extends Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e) {
		alert('Not yet implemented');
		// this.props.sendPostReply(/* form data */);
		e.preventDefault();
	}

	render() {
		const {teamName, maps, handleCancel} = this.props;
		return (
			<Card className="card" title={"Replying to " + teamName}>
				<form className="post-reply-form" onSubmit={this.handleSubmit}>
					<h4>What map do you want to play?</h4>
					<select>
						{maps.map(mapName => (
							<option key={mapName} value={mapName}>{mapName}</option>
						))}
					</select>
					<h4>Add a message (optional)</h4>
					<textarea placeholder="Your message"/>
					<div className="post-reply-form__btn-wrapper">
						<SubmitButton className="btn" label="Send"/>
					</div>
					<div className="post-reply-form__btn-wrapper">
						<Button className="btn" label="Cancel" onClick={handleCancel}/>
					</div>
				</form>
			</Card>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		sendPostReply,
		handleCancel: cancelPostReply
	}, dispatch);
}

PostReplyForm.propTypes = {
	teamName: PropTypes.string,
	maps: PropTypes.array.isRequired
};

export default connect(null, mapDispatchToProps)(PostReplyForm);
