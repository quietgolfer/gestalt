import React from 'react';
import { registerCard } from 'corkboard';

export function dangerous(component) {
  registerCard(
    <div className="px3 py2">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ marginRight: '1rem' }}>
          <img src="https://twemoji.maxcdn.com/2/svg/1f645.svg" alt="No good!" style={{ width: '2rem', display: 'block' }} />
        </div>
        <div>
          <div className="bold" style={{color:'red'}}>Danger!</div>
          <div>{component} is still being designed & developed, it's API is likely to change.</div>
        </div>
      </div>
    </div>
  );
}
