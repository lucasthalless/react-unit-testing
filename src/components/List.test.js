import { render, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import List from './list';

describe('List component', () => {
  it('should render list items', () => {
    const { getByText, queryByText, rerender, unmount } = render(<List initialItems={['lucas', 'j']} />)

    expect(getByText('lucas')).toBeInTheDocument();
    expect(getByText('j')).toBeInTheDocument();

    unmount()
    rerender(<List initialItems={['wave']} />)

    expect(getByText('wave')).toBeInTheDocument();
    expect(queryByText('lucas')).not.toBeInTheDocument();
  });

  it('should be able to add item to the list', async () => {
    const { getByText, getByPlaceholderText, findByText } = render(<List initialItems={[]} />)

    const addButton = getByText('Adicionar');
    const inputElement = getByPlaceholderText('Novo item')

    userEvent.type(inputElement, 'novo')
    userEvent.click(addButton)

    // first way to do async expectations
    // expect(await findByText('novo')).toBeInTheDocument();

    // second way to do async expectations
    await waitFor(() => {
      expect(getByText('novo')).toBeInTheDocument();
    })

  })

  it('should be able to remove item from the list', async () => {
    const { getByText, getAllByText, findByText, queryByText } = render(<List initialItems={['lucas']} />)

    const addButton = getByText('Adicionar');
    const removeButtons = getAllByText('Remover');

    userEvent.click(removeButtons[0])

    // first way to do async expectations
    // expect(await findByText('novo')).toBeInTheDocument();

    // second way to do async expectations
    await waitFor(() => {
      expect(queryByText('lucas')).not.toBeInTheDocument();
    })

    // third way
    // await waitForElementToBeRemoved(() => {
    //   return getByText('lucas')
    // })

  })

})

