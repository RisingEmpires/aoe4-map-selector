import React, { useEffect, useState } from 'react';
import { useReplicant } from 'use-nodecg';

interface DropdownOption {
    value: string;
    label: string;
    picked: boolean;
}



export function MapName() {

    const [map1, set_map1] = useReplicant<DropdownOption>('map1', { value: '', label: '', picked: false });

    const [showSpoilerOverlay, set_showSpoilerOverlay] = useReplicant<boolean>('showSpoilerOverlay', true, { namespace: 'aoe4-score-display' });

    const [updateGraphics, set_updateGraphics] = useReplicant<boolean>('updateGraphics', true);


    useEffect(() => {
        
    }, [updateGraphics])

    const [theme, set_theme] = useReplicant<{ value: string; label: string; }>('theme', { value: '../../../assets/nodecg-themer/themes/default.css', label: 'default' }, { namespace: 'nodecg-themer' });

    const [themeDiv, set_themeDiv] = useState(<></>)

    useEffect(() => {
        console.log(theme)
        if (!theme) return;
        console.log(theme)
        set_themeDiv(<link rel='stylesheet' type='text/css' href={theme.value} />)
    }, [theme])

    return (
        <div className=''>

            {themeDiv}
            <div className={`${showSpoilerOverlay ? `mapSelector-mapNameDisplayInvert` : `mapSelector-mapNameDisplay`} `}>
                <h1 className='mapSelector-mapTitle'>Map: </h1>
                <h1 className='mapSelector-mapLabelName'>{map1?.label}</h1>
            </div>
        </div>
    );
}