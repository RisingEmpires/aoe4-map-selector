import { useFunc } from 'ajv/dist/compile/util';
import React, { useEffect, useState } from 'react';
import Select from "react-select";
import { useReplicant } from 'use-nodecg';

interface DropdownOption {
	value: string;
	label: string;
}


export function Aoe4MapSelector() {

	const [map, set_map] = useReplicant<DropdownOption>('map', { value: '', label: '' });
	const [maps, set_maps] = useReplicant<Array<any>>('assets:maps', []);
	//@ts-ignore

	const [options, set_options] = useState([]);

	//Sometimes just fuck TypeScript.. I give up.. Ignore Errors and it still work 5head
	useEffect(() => {
		maps.forEach((element, i) => {
			//@ts-ignore
			set_options(oldArray => [...oldArray, { value: element.url, label: element.name }]);
		});
		//set_options(_options)
		console.log(JSON.stringify(options))
	}, [maps]);

	const handleChange = (selectedOption) => {
		set_map(selectedOption)
	}

	return (
		<>
			<Select options={options} onChange={handleChange} value={map} placeholder={'Select Map'} />
		</>
	)
}
