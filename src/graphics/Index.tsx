import React, { useEffect, useState } from 'react';
import { useReplicant } from 'use-nodecg';

interface DropdownOption {
	value: string;
	label: string;
}


export function Index() {
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


	//This should probably just be done in the Dashboard instead of 9 different replicants
	const maps = [map1, map2, map3, map4, map5, map6, map7, map8, map9]


	//@ts-ignore
	const [images, set_images] = useState([]);

	useEffect(() => {
		let _array = []
		for (let i = 0; i < amountOfMaps; i++) {
			//@ts-ignore
			_array.push(<img key={i} src={maps[i]?.value} style={{ width: '120px', padding: '0px 10px'}} />)
		}
		set_images(_array)
	}, [amountOfMaps, map1, map2, map3, map4, map5, map6, map7, map8, map9])

	return (
		<>
			<div style={{
				position:'absolute', top:'50%', left:'50%',
				transform: 'translate(-50%, -50%)',
				display: 'flex'
			}}>{images}</div>
		</>
	);
}