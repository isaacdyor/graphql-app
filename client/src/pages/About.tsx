import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';


const AboutPage: React.FC = () => {

	const [message, setMessage] = useState('');
	const { id } = useParams();

	useEffect(() => {
		if (id) {
			setMessage('The number is ' + id);
		} else {
			setMessage('No number was provided');
		}
	}, []);

	return (
		<div>
			<p>This is the about page.</p>
			<p>{message}</p>
		</div>
	);
}

export default AboutPage