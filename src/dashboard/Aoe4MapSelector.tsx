import React, { useEffect, useState } from 'react';
import Select from "react-select";
import { useReplicant } from 'use-nodecg';
import * as NumericInput from "react-numeric-input";

interface DropdownOption {
	value: string;
	label: string;
}


export function Aoe4MapSelector() {

	//Images of all maps
	const [maps, set_maps] = useReplicant<Array<any>>('assets:maps', []);

	//You know.. I'm starting to think me coding is not a good idea
	const [map1, set_map1] = useReplicant<DropdownOption>('map1', { value: '', label: '' });
	const [map2, set_map2] = useReplicant<DropdownOption>('map2', { value: '', label: '' });
	const [map3, set_map3] = useReplicant<DropdownOption>('map3', { value: '', label: '' });
	const [map4, set_map4] = useReplicant<DropdownOption>('map4', { value: '', label: '' });
	const [map5, set_map5] = useReplicant<DropdownOption>('map5', { value: '', label: '' });
	const [map6, set_map6] = useReplicant<DropdownOption>('map6', { value: '', label: '' });
	const [map7, set_map7] = useReplicant<DropdownOption>('map7', { value: '', label: '' });
	const [map8, set_map8] = useReplicant<DropdownOption>('map8', { value: '', label: '' });
	const [map9, set_map9] = useReplicant<DropdownOption>('map9', { value: '', label: '' });

	const [amountOfMaps, set_amountOfMaps] = useReplicant<number>('amountOfMaps', 1);

	//@ts-ignore
	const [options, set_options] = useState([]);

	const [mapSelections, set_mapSelections] = useState([])

	//Set the options in the dropdown menu to avaliable maps from /assets/aoe4-map-selector/maps
	useEffect(() => {
		console.log(maps)
		if (!maps) return;
		maps.forEach((element, i) => {
			//Sometimes just fuck TypeScript.. I give up.. Ignore Errors and it still work 5head
			var name = element.name
			name = name.replace(/_/g, ' ');
			console.log(name)
			//@ts-ignore
			set_options(oldArray => [...oldArray, { value: element.url, label: name }]);
		});
		console.log(JSON.stringify(options))
	}, [maps]);


	//Set dropdown lists depending on how many maps
	//TODO: Revisit this in the future, didn't work as expected
	useEffect(() => {
		let _array = []
		for (let i = 0; i < amountOfMaps; i++) {
			//@ts-ignore
			_array.push(dropdowns[i])
		}
		set_mapSelections(_array)
	}, [amountOfMaps])

	//There has to be a better way of doing this.. I'm just to stupid to figure it out
	const handleChange1 = (selectedOption) => { set_map1(selectedOption) }
	const handleChange2 = (selectedOption) => { set_map2(selectedOption) }
	const handleChange3 = (selectedOption) => { set_map3(selectedOption) }
	const handleChange4 = (selectedOption) => { set_map4(selectedOption) }
	const handleChange5 = (selectedOption) => { set_map5(selectedOption) }
	const handleChange6 = (selectedOption) => { set_map6(selectedOption) }
	const handleChange7 = (selectedOption) => { set_map7(selectedOption) }
	const handleChange8 = (selectedOption) => { set_map8(selectedOption) }
	const handleChange9 = (selectedOption) => { set_map9(selectedOption) }

	let dropdowns = [
		(<div><label>Map 1</label>
			<Select options={options} onChange={handleChange1} value={map1} placeholder={'Select Map'} />
			<br></br></div>),

		(<div><label>Map 2</label>
			<Select options={options} onChange={handleChange2} value={map2} placeholder={'Select Map'} />
			<br></br></div>),

		(<div><label>Map 3</label>
			<Select options={options} onChange={handleChange3} value={map3} placeholder={'Select Map'} />
			<br></br></div>),

		(<div><label>Map 4</label>
			<Select options={options} onChange={handleChange4} value={map4} placeholder={'Select Map'} />
			<br></br></div>),

		(<div><label>Map 5</label>
			<Select options={options} onChange={handleChange5} value={map5} placeholder={'Select Map'} />
			<br></br></div>),

		(<div><label>Map 6</label>
			<Select options={options} onChange={handleChange6} value={map6} placeholder={'Select Map'} />
			<br></br></div>),

		(<div><label>Map 7</label>
			<Select options={options} onChange={handleChange7} value={map7} placeholder={'Select Map'} />
			<br></br></div>),

		(<div><label>Map 8</label>
			<Select options={options} onChange={handleChange8} value={map8} placeholder={'Select Map'} />
			<br></br></div>),

		(<div><label>Map 9</label>
			<Select options={options} onChange={handleChange9} value={map9} placeholder={'Select Map'} />
			<br></br></div>)]


	const handleAmountchange = (newValue) => {
		set_amountOfMaps(newValue)
	}

	return (
		<>
			<NumericInput min={1} max={9} value={amountOfMaps} onChange={handleAmountchange} />
			{amountOfMaps}

			<br></br>

			{mapSelections}
		</>
	)

}
