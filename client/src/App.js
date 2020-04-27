import React from 'react'
import Disclaimer from './components/Disclaimer'
import Options from './components/Options'
import Summary from './components/Summary'
import Tables from './components/Tables'

const App = (props) => {
	return (
		<div>
			<Disclaimer />
			<Options state={props.state.options} />
			<Summary totals={props.state.totals} />
			<Tables state={props.state.tables} />
		</div>
	)
}

export default App
