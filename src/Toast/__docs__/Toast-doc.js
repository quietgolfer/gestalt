// @flow
import React from 'react';
import { card, md } from 'corkboard';
import Button from '../../Button/Button';
import Image from '../../Image/Image';
import Toast from '../Toast';
import Box from '../../Box/Box';
import { ns } from '../../../.corkboard/cards';

ns('Toast');

card('FlowTypes',
md`
\`\`\`jsx
type Props = {
  thumbnail?: React$Element<any>, /* should fit nicely into a square */
  text: string | Array<string>,
};
\`\`\`
`);

card('Confirmation Toasts',
md`You can use Toasts to confirm an action has occured. When you are using a Toast as a confirmation, you should
always include a thumbnail and two lines of text.
\`\`\`jsx
<Toast
  text={['Saved to', 'Home decor']}
  thumbnail={
    <Image
      alt="Saved to casa board"
      src="https://s-media-cache-ak0.pinimg.com/564x/19/f4/87/19f487a680f9fb1ecc8aa139b2afac7f.jpg"
    />
  }
/>
\`\`\`
`,
atom => (
  <div>
    <Button inline text="Confirm save" onClick={() => atom.reset({ showToast: !atom.deref().showToast })} />
    {atom.deref().showToast ? (
      <Box
        fit
        dangerouslySetInlineStyle={{
          __style: {
            bottom: 68,
            left: '50%',
            transform: 'translateX(-50%)',
          }
        }}
        padding={{ x: 1 }}
        position="fixed"
      >
        <Toast
          text={['Saved to', 'Home decor']}
          thumbnail={
            <Image
              alt="Saved to home decor board"
              naturalHeight={564}
              naturalWidth={564}
              src="https://s-media-cache-ak0.pinimg.com/474x/b2/55/ed/b255edbf773ffb3985394e6efb9d2a49.jpg"
            />
          }
        />
      </Box>
      ) : null}
  </div>
));

card('Guide Toasts',
md`
You can also use Toasts to guide and educate your users. In this case, no thumbnail is needed. Simply provide
your instructional text to the Toast component. The arrow icon indicating the Toast is a link will be automatically
added. If you need a different Icon here, please contact the Gestalt team.
\`\`\`jsx
<Toast
  text="Same great profile, slightly new look. Learn more?"
/>
\`\`\`
`,
atom => (
  <div>
    <Button inline text="Educate me" onClick={() => atom.reset({ showToast: !atom.deref().showToast })} />
    {atom.deref().showToast ? (
      <Box
        fit
        dangerouslySetInlineStyle={{
          __style: {
            bottom: 68,
            left: '50%',
            transform: 'translateX(-50%)',
          }
        }}
        padding={{ x: 1 }}
        position="fixed"
      >
        <Toast
          text="Same great profile, slightly new look. Learn more?"
        />
      </Box>
      ) : null}
  </div>
));

card('Things to note',
md`
The Toast component is purely visual. In order to properly handle the showing and dismissing of Toasts, as well as any
animations, you will need to implement a Toast manager. For the purpose of this documentation, click the button used to open
the toast to remove it from the screen.
`);
