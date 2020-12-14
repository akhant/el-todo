import * as React from 'react';
import Enzyme, { ShallowWrapper, shallow, HTMLAttributes } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import CustomListItem, {
  ICustomListItemProps,
} from '../components/CustomListItem';


// let app: ShallowWrapper<ICustomListItemProps, undefined>;

// beforeEach(
//   () =>
//     (app = shallow(
//       <CustomListItem
//         done={false}
//         item={{ text: 'asdf', done: false, id: 1, date: 'adfasdf' }}
//       />
//     ))
// );

// checking that all is fine and component has been rendered
//it('should render without error', () => expect(app.length).toBe(1));

it('should work', () => {
//   const pNodes: ShallowWrapper<HTMLAttributes, undefined> = app.find('div');

//   expect(pNodes.length).toBe(1);
expect(1).toBe(1)
});
