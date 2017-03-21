// @flow
import React, { Component } from 'react';
import { card, md } from 'corkboard';
import Button from '../../Button/Button';
import Column from '../../Column/Column';
import Divider from '../../Divider/Divider';
import Label from '../../Label/Label';
import Heading from '../../Heading/Heading';
import Modal from '../../Modal/Modal';
import SelectList from '../../SelectList/SelectList';
import Spinner from '../../Spinner/Spinner';
import Switch from '../../Switch/Switch';
import Text from '../../Text/Text';
import TextArea from '../../TextArea/TextArea';
import TextField from '../../TextField/TextField';
import { ns } from '../../../.corkboard/cards';

ns('Modal');

card('FlowType',
md`
\`\`\`jsx
type Props = {
  children?: any,
  closeLabel: string,
  footer?: any,
  header: any,
  modalLabel: string,
  role?: 'alertdialog' | 'dialog', /* default: dialog */
  onDismiss: () => void,
  size?: 'sm' | 'md' | 'lg', /* default: sm */
};
\`\`\`
`,
  <div>
    <div className="py2">
      <Text bold size="md">Header & Footer</Text>
      <Divider />
      <Text>
        These properties become fixed if the modal height expands beyond the window height.
      </Text>
    </div>
    <div className="py2">
      <Text bold size="md">Sizes</Text>
      <Divider />
      <Text><b>sm:</b> 414px</Text>
      <Text><b>md:</b> 544px</Text>
      <Text><b>lg:</b> 804px</Text>
      <Text italic>
        If you need additional sizes, please let us know!
        All sizes are subject to change upon design descretion.
      </Text>
    </div>
  </div>
);

card('Default padding & styling',
md`
Some of the padding required to style your modal has already been provided for ease of use. The modal shown
by clicking on the "View padding" button highlights what the default behavior is. It was created using the
\`props\` below. The two divider's between the \`header\`, \`children\`, and \`footer\` are included as well.

<b>\`header\`</b>
\`\`\`jsx
<div className="bg-gray">
  <Heading size="sm">Heading</Heading>
</div>
}
\`\`\`
<b>\`footer\`</b>
\`\`\`jsx
<div className="bg-gray">
  <Heading size="sm">Footer</Heading>
</div>

\`\`\`
<b>\`children\`</b>
\`\`\`jsx
<div className="bg-gray" style={{ height: 400 }}>
  <Heading size="sm">Children</Heading>
</div>
\`\`\`
`,
atom => (
  <div>
    <Button text="View padding" onClick={() => atom.reset({ isOpen: !atom.deref().isOpen })} />
    {atom.deref().isOpen ? (
      <Modal
        closeLabel="close"
        header={
          <div className="bg-gray">
            <Heading size="sm">Heading</Heading>
          </div>
        }
        modalLabel="View default padding and styling"
        onDismiss={() => atom.reset({ isOpen: false })}
        footer={
          <div className="bg-gray">
            <Heading size="sm">Footer</Heading>
          </div>
        }
        size="md"
      >
        <div className="bg-gray" style={{ height: 400 }}>
          <Heading size="sm">Children</Heading>
        </div>
      </Modal>
    ) : null }
  </div>
));


const editBoard = (
  <div className="flex relative">
    <Column xs={12}>
      <div className="p2">
        <Column xs={4}>
          <Label htmlFor="name">
            <Text align="left" bold>Name</Text>
          </Label>
        </Column>
        <Column xs={8}><TextField id="name" onChange={() => undefined} /></Column>
      </div>
      <Divider />
      <div className="p2">
        <Column xs={4}>
          <Label htmlFor="desc">
            <Text align="left" bold>Description</Text>
          </Label>
        </Column>
        <Column xs={8}><TextArea id="desc" onChange={() => undefined} /></Column>
      </div>
      <Divider />
      <div className="p2">
        <Column xs={4}>
          <Label htmlFor="category">
            <Text align="left" bold>Category</Text>
          </Label>
        </Column>
        <Column xs={8}>
          <SelectList id="category" onChange={() => undefined} options={[{ key: 'food', value: 'Food' }]} selectedKey="food" />
        </Column>
      </div>
      <Divider />
      <div className="p2">
        <Column xs={4}>
          <Label htmlFor="cover">
            <Text align="left" bold>Cover</Text>
          </Label>
        </Column>
        <Column xs={8}>
          <Button id="cover" label="Cover Photo" text="Cover" />
        </Column>
      </div>
      <Divider />
      <div className="p2">
        <Column xs={4}>
          <Label htmlFor="secret">
            <Text align="left" bold>Secret</Text>
          </Label>
        </Column>
        <Column xs={8}>
          <Switch id="secret" onChange={() => undefined} />
        </Column>
      </div>
      <Divider />
      <div className="p2">
        <Column xs={4}>
          <Label htmlFor="collabs">
            <Text align="left" bold>Collaborators</Text>
          </Label>
        </Column>
        <Column xs={8}>
          <TextField id="collabs" onChange={() => undefined} placeholder="Name or email" />
        </Column>
      </div>
      <Divider />
      <div className="p2">
        <Column xs={4}>
          <Label htmlFor="notifications">
            <Text align="left" bold>Email Notifications</Text>
          </Label>
        </Column>
        <Column xs={8}>
          <Switch id="notifications" onChange={() => undefined} switched />
        </Column>
      </div>
      <Divider />
      <div className="p2">
        <Column xs={4}>
          <Label htmlFor="collabs">
            <Text bold align="left">Let collaborators add people</Text>
          </Label>
        </Column>
        <Column xs={8}>
          <Switch id="collabs" onChange={() => undefined} />
        </Column>
      </div>
    </Column>
  </div>
);

function editBoardFooter(onClose) {
  return (
    <div className="flex justify-between">
      <Column xs={6}>
        <Button label="delete" text="Delete Board" />
      </Column>
      <Column xs={6}>
        <div className="flex justify-end">
          <Button label="cancel" text="Cancel" onClick={onClose} />
          <Button color="red" label="save" text="Save" />
        </div>
      </Column>
    </div>
  );
}

card('Static Content Example',
md`Here is an example of the \`Modal\` component with static content.
\`\`\`jsx
<Button text="Edit board" onClick={() => this.setState({ isOpen: !this.state.isOpen })} />
{this.state.isOpen ? (
  <Modal
    closeLabel="close"
    header={<Heading size="xs">Edit your board</Heading>}
    modalLabel="Edit Julia's board"
    onDismiss={() => this.setState({ isOpen: false })}
    footer={footerButtons}
    size="md"
  >
    {children}
  </Modal>
  ) : null}
\`\`\`
`,
atom => (
  <div className="flex-column">
    <Button text="Edit board" onClick={() => atom.reset({ isOpen: !atom.deref().isOpen })} />
    {atom.deref().isOpen ? (
      <Modal
        closeLabel="close"
        header={<Heading size="xs">Edit your board</Heading>}
        modalLabel="Edit Julia's board"
        onDismiss={() => atom.reset({ isOpen: false })}
        footer={editBoardFooter(() => atom.reset({ isOpen: false }))}
        size="md"
      >
        {editBoard}
      </Modal>
        ) : null}
  </div>
  ));


class ImageModalContents extends Component {
  state = {
    hasLoaded: false,
  };

  handleLoad = () => {
    this.setState({ hasLoaded: true });
  }

  image: HTMLElement;

  render() {
    return (
      <div className="flex">
        <Spinner label="random image" show={!this.state.hasLoaded} />
        <div ref={(c) => { this.image = c; }}>
          <img alt="" onLoad={this.handleLoad} src="http://placebear.com/400/400" />
          <img alt="" onLoad={this.handleLoad} src="http://lorempixel.com/400/400" />
          <img alt="" onLoad={this.handleLoad} src="http://lorempixel.com/600/200" />
          <img alt="" onLoad={this.handleLoad} src="http://placebear.com/200/200" />
        </div>
      </div>
    );
  }
}

function viewImagesFooter(onClose) {
  return (
    <div className="flex justify-end">
      <Button label="cancel" text="Cancel" onClick={onClose} />
    </div>
  );
}

card('Dynamic Content Example',
md`
Here is an example of the \`Modal\` component with dynamic children. You may want to display a \`Spinner\`
while waiting for content to load. You can achieve this in a few ways. As shown in this example, the \`ImageModalContents\`
component first renders a \`Spinner\` and then switches to the actual images once loaded. This results in
the \`header\` and \`footer\` being rendered prior to the content. You could also choose to display the
\`Spinner\` while waiting for the contents to load and then only display the \`Modal\` once fully loaded.
\`\`\`jsx
<Button text="View images" onClick={() => this.setState({ isOpen: !this.state.isOpen })} />
{this.state.isOpen ? (
  <Modal
    closeLabel="close"
    header={<Heading size="xs">Images</Heading>}
    modalLabel="View random images"
    onDismiss={() => this.setState({ isOpen: false })}
    footer={footerButtons}
    size="lg"
  >
    <ImageModalContents />
  </Modal>
    ) : null}
\`\`\`
`,
atom => (
  <div className="flex-column">
    <Button text="View images" onClick={() => atom.reset({ isOpen: !atom.deref().isOpen })} />
    {atom.deref().isOpen ? (
      <Modal
        closeLabel="close"
        header={<Heading size="xs">Images</Heading>}
        modalLabel="View random images"
        onDismiss={() => atom.reset({ isOpen: false })}
        footer={viewImagesFooter(() => atom.reset({ isOpen: false }))}
        size="lg"
      >
        <ImageModalContents />
      </Modal>
        ) : null}
  </div>
  ));

const alertModal = (
  <div className="p2">
    <Text size="md">
      You will not be able to follow each other or interact with each others Pins.
    </Text>
  </div>
);

function alertFooter(onClose) {
  return (
    <div className="flex-column">
      <div className="py1">
        <Button fullWidth text="Cancel" onClick={onClose} />
      </div>
      <div className="py1">
        <Button color="red" fullWidth text="Block" onClick={onClose} />
      </div>
    </div>
  );
}

card('Alert Dialogs',
md`
The \`alertdialog\` role is used to notify the user of urgent information that demands the user's immediate attention.
We need to specify this role separately from other dialog's for accessibility.

*Note: There are 2 small visual differences from the other Modal's we've seen so far. First, there is no cancel button in the top
right, forcing the user to take an explicit action. Second, there is no divider between the heading, children,
and footer.*


`,
atom => (
  <div className="flex-column">
    <Button text="Block Chris" onClick={() => atom.reset({ isOpen: !atom.deref().isOpen })} />
    {atom.deref().isOpen ? (
      <Modal
        closeLabel="close"
        header={<Heading size="md">Block Chris?</Heading>}
        modalLabel="Would you like to block Chris?"
        onDismiss={() => atom.reset({ isOpen: false })}
        footer={alertFooter(() => atom.reset({ isOpen: false }))}
        role="alertdialog"
        size="sm"
      >
        {alertModal}
      </Modal>
        ) : null}
  </div>
));
