import React, { useState } from 'react'
import Select from 'antd/es/select'
import Switch from 'antd/es/switch'
import dayjs from 'dayjs'
import DatePicker from './DatePicker'

const Options = (props) => {
	const defaultProvinceValue = 'Select a state/province'
	const [provinceText, provinceTextSet] = useState(defaultProvinceValue)
	const defaultCountryValue = 'Select a Country'
	const [countryText, countryTextSet] = useState(defaultCountryValue)

	//Used to handle theme. Simply changes href of link component in index.html
	//There should be a better way of handle apart from fully reloading css
	let changeTheme = () => {
		let curValue = document.getElementById('theme').href
		curValue = curValue.split('/')[3]
		if (curValue === 'antd.css') {
			document.getElementById('theme').href = 'antd.dark.css'
			document
				.getElementsByTagName('body')[0]
				.style.setProperty('--scrolltrack', '#141414')
			document
				.getElementsByTagName('body')[0]
				.style.setProperty('--border-color', '#303030')
		} else {
			document.getElementById('theme').href = 'antd.css'
			document
				.getElementsByTagName('body')[0]
				.style.setProperty('--scrolltrack', 'white')
			document
				.getElementsByTagName('body')[0]
				.style.setProperty('--border-color', '#f0f0f0')
		}
	}

	function onSearch() {}
	let countries = props.state.countryList.map((e, i) => {
		return (
			<Select.Option key={i} value={e}>
				{e}
			</Select.Option>
		)
	})

	let states = props.state.stateList.map((e, i) => {
		let result = []
		if (e.country === props.state.countryValue) {
			result.push(
				<Select.Option key={i} value={e.province}>
					{e.province}
				</Select.Option>
			)
		}
		return result
	})

	let handleDateChange = (e, s) => {
		let y = dayjs(s).format('YYYY-MM-DD')
		props.state.dateValueSet(y)
	}

	let changeCountryStateValue = (e, type) => {
		if (type === 'country') {
			if (e === 'All') {
				props.state.stateValueSet(undefined)
				props.state.countryValueSet(undefined)
				countryTextSet(defaultCountryValue)
				provinceTextSet(defaultProvinceValue)
			} else {
				props.state.countryValueSet(e)
				countryTextSet(e)
				props.state.stateValueSet(undefined)
				provinceTextSet(defaultProvinceValue)
			}
		} else {
			if (e === 'All') {
				props.state.stateValueSet(undefined)
				provinceTextSet(defaultProvinceValue)
			} else {
				props.state.stateValueSet(e)
				provinceTextSet(e)
			}
		}
	}

	return (
		<div id='options'>
			<div id='options-theme'>
				<Switch onChange={() => changeTheme()} />
				Light/Dark
			</div>
			<DatePicker
				theme='dark'
				picker='date'
				defaultValue={dayjs(props.state.dateValue, 'YYYY-MM-DD')}
				onChange={(e, s) => handleDateChange(e, s)}
				format={'YYYY-MM-DD'}
				className='options-inputs'
			/>
			<Select
				showSearch
				optionFilterProp='children'
				onSearch={onSearch}
				value={countryText}
				className='options-inputs'
				onChange={(e) => changeCountryStateValue(e, 'country')}
			>
				<Select.Option value={'All'}>All</Select.Option>
				{countries}
			</Select>
			<Select
				showSearch
				optionFilterProp='children'
				onSearch={onSearch}
				value={provinceText}
				className='options-inputs'
				onChange={(e) => changeCountryStateValue(e, 'state')}
			>
				<Select.Option value={'All'}>All</Select.Option>
				{states}
			</Select>
		</div>
	)
}

export default Options
