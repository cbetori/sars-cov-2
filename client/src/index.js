import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import 'react-virtualized/styles.css'
import State from './State'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
	<React.StrictMode>
		<State />
	</React.StrictMode>,
	document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
