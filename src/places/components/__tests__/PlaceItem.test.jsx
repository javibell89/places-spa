import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PlaceItem from '../PlaceItem';
import { AuthContext } from '../../../shared/context/auth-context';
import * as httpHook from '../../../shared/hooks/http-hook';

// Mock the Map component
jest.mock('../../../shared/components/UIElements/Map', () => {
  return function MockMap() {
    return <div data-testid='map'>Map Component</div>;
  };
});

// Mock the http-hook
const mockSendRequest = jest.fn();
jest.spyOn(httpHook, 'useHttpClient').mockImplementation(() => ({
  isLoading: false,
  error: null,
  sendRequest: mockSendRequest,
  clearError: jest.fn(),
}));

const mockPlace = {
  id: 'p1',
  image: 'test.jpg',
  title: 'Test Place',
  description: 'Test Description',
  address: '123 Test St',
  creatorId: 'u1',
  coordinates: { lat: 40.7484, lng: -73.9857 },
};

describe('PlaceItem Component', () => {
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    // Setup portal elements
    const modalRoot = document.createElement('div');
    modalRoot.setAttribute('id', 'modal-hook');
    document.body.appendChild(modalRoot);

    const backdropRoot = document.createElement('div');
    backdropRoot.setAttribute('id', 'backdrop-hook');
    document.body.appendChild(backdropRoot);
  });

  afterEach(() => {
    // Cleanup portal elements
    document.body.innerHTML = '';
    jest.clearAllMocks();
  });

  const renderWithAuth = (userId = null, token = null) => {
    return render(
      <BrowserRouter>
        <AuthContext.Provider value={{ userId, token }}>
          <PlaceItem {...mockPlace} onDelete={mockOnDelete} />
        </AuthContext.Provider>
      </BrowserRouter>
    );
  };

  it('renders place details correctly', () => {
    renderWithAuth();

    expect(screen.getByText(mockPlace.title)).toBeInTheDocument();
    expect(screen.getByText(mockPlace.address)).toBeInTheDocument();
    expect(screen.getByText(mockPlace.description)).toBeInTheDocument();
    expect(screen.getByAltText(mockPlace.title)).toHaveAttribute(
      'src',
      `http://localhost:3000/${mockPlace.image}`
    );
  });

  it('shows map modal when "View on Map" is clicked', async () => {
    renderWithAuth();

    fireEvent.click(screen.getByText('View on Map'));
    await waitFor(() => {
      expect(screen.getByTestId('map')).toBeInTheDocument();
    });
  });

  it('closes map modal when "Close" button is clicked', async () => {
    renderWithAuth();

    fireEvent.click(screen.getByText('View on Map'));
    await waitFor(() => {
      expect(screen.getByTestId('map')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Close'));
    await waitFor(
      () => {
        expect(screen.queryByTestId('map')).not.toBeInTheDocument();
      },
      { timeout: 300 }
    ); // Increased timeout to account for animation
  });

  it('shows edit and delete buttons only for the creator', () => {
    renderWithAuth('u1'); // Same as creatorId

    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('hides edit and delete buttons for non-creators', () => {
    renderWithAuth('u2'); // Different from creatorId

    expect(screen.queryByText('Edit')).not.toBeInTheDocument();
    expect(screen.queryByText('Delete')).not.toBeInTheDocument();
  });

  it('shows delete confirmation modal when delete is clicked', async () => {
    renderWithAuth('u1');

    fireEvent.click(screen.getByText('Delete'));
    await waitFor(() => {
      expect(
        screen.getByText(/Do you want to proceed and delete this place?/)
      ).toBeInTheDocument();
    });
  });

  it('calls delete API when deletion is confirmed', async () => {
    const token = 'test-token';
    renderWithAuth('u1', token);

    fireEvent.click(screen.getByText('Delete'));
    await waitFor(() => {
      expect(
        screen.getByText(/Do you want to proceed and delete this place?/)
      ).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('DELETE'));
    await waitFor(() => {
      expect(mockSendRequest).toHaveBeenCalledWith(
        `http://localhost:3000/api/places/${mockPlace.id}`,
        'DELETE',
        null,
        {
          Authorization: 'Bearer ' + token,
        }
      );
      expect(mockOnDelete).toHaveBeenCalledWith(mockPlace.id);
    });
  });

  it('cancels deletion when cancel is clicked', async () => {
    renderWithAuth('u1');

    fireEvent.click(screen.getByText('Delete'));
    await waitFor(() => {
      expect(
        screen.getByText(/Do you want to proceed and delete this place?/)
      ).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('CANCEL'));
    await waitFor(
      () => {
        expect(
          screen.queryByText(/Do you want to proceed and delete this place?/)
        ).not.toBeInTheDocument();
      },
      { timeout: 300 }
    ); // Increased timeout to account for animation

    expect(mockSendRequest).not.toHaveBeenCalled();
    expect(mockOnDelete).not.toHaveBeenCalled();
  });
});
