import React, { useEffect, useState } from 'react';
import { useReplicant } from 'use-nodecg';

interface DropdownOption {
	value: string;
	label: string;
	picked: boolean;
}



export function Index() {

	const [map1, set_map1] = useReplicant<DropdownOption>('map1', { value: '', label: '', picked: false });

	const [leftMapPicks, set_leftMapPicks] = useReplicant<DropdownOption[]>('leftMapPicks', [{ value: '', label: '', picked: false }]);
	const [leftMapPicksCount, set_leftMapPicksCount] = useReplicant<number>('leftMapPicksCount', 0);

	const [rightMapPicks, set_rightMapPicks] = useReplicant<DropdownOption[]>('rightMapPicks', [{ value: '', label: '', picked: false }]);
	const [rightMapPicksCount, set_rightMapPicksCount] = useReplicant<number>('rightMapPicksCount', 0);

	const [updateGraphics, set_updateGraphics] = useReplicant<boolean>('updateGraphics', true);

	//@ts-ignore
	const [leftMaps, set_leftMaps] = useState([]);
	const [rightMaps, set_rightMaps] = useState([]);

	useEffect(() => {
		let l_array = []
		for (let i = 0; i < leftMapPicksCount; i++) {
			//@ts-ignore
			l_array.push(<div className='map'>
				<img className={leftMapPicks[i]?.picked ? 'mapPicked mapPlayed' : 'mapPicked'} key={i} src={leftMapPicks[i]?.value}
					style={{ width: '140px'}} />
				<a className="mapName">{leftMapPicks[i]?.label}</a>
			</div>)
		}
		set_leftMaps(l_array)

		let r_array = []
		for (let i = 0; i < rightMapPicksCount; i++) {
			//@ts-ignore
			r_array.push(<div className='map'>
				<img className={rightMapPicks[i]?.picked ? 'mapPicked mapPlayed' : 'mapPicked'} key={i} src={rightMapPicks[i]?.value}
					style={{ width: '140px' }} />
				<a className="mapName">{rightMapPicks[i]?.label}</a>
			</div>)
		}
		set_rightMaps(r_array)
	}, [updateGraphics])

	return (
		<div className=''>
			<div className='flex flex-col leftSide'>
				{leftMaps}
			</div>


			<div className='flex flex-col middleMap'>
				<img className="mapPicked" src={map1?.value} style={{ width: '160px'}} />
			</div>


			<div className='flex flex-col rightSide'>
				{rightMaps}
			</div>
		</div>
	);
}