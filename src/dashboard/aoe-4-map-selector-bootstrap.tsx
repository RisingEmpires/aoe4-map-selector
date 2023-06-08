import React from 'react';
import { createRoot } from 'react-dom/client';
import { Aoe4MapSelector } from './Aoe4MapSelector';

const root = createRoot(document.getElementById('root')!);
root.render(<Aoe4MapSelector />);
